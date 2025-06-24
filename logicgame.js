//
// NỘI DUNG TỆP logicgame.js SAU KHI CHỈNH SỬA
// SAO CHÉP VÀ THAY THẾ TẤT CẢ
//

function simulateNetworkSpeed() {
    const speedValueEl = document.getElementById('speed-value');
    const speedUnitEl = document.getElementById('speed-unit');
    const statusEl = document.querySelector('.network-status');

    if (!speedValueEl || !speedUnitEl || !statusEl) return;

    const speedTimeline = [
        { time: 0,    speedFunc: () => ({ value: (Math.random() * 2.5 + 4.5).toFixed(1), unit: 'MB/s', status: 'good' }) },
        { time: 1300, speedFunc: () => ({ value: Math.floor(Math.random() * 200 + 300), unit: 'KB/s', status: 'unstable' }) },
        { time: 2300, speedFunc: () => ({ value: (Math.random() * 3 + 5).toFixed(1), unit: 'MB/s', status: 'good' }) },
        { time: 4000, speedFunc: () => ({ value: Math.floor(Math.random() * 50 + 50), unit: 'KB/s', status: 'bad' }) },
        { time: 5000, speedFunc: () => ({ value: Math.floor(Math.random() * 400 + 500), unit: 'KB/s', status: 'unstable' }) },
        { time: 5800, speedFunc: () => ({ value: (Math.random() * 2 + 6).toFixed(1), unit: 'MB/s', status: 'good' }) }
    ];

    speedTimeline.forEach(event => {
        setTimeout(() => {
            const { value, unit, status } = event.speedFunc();
            speedValueEl.textContent = value;
            speedUnitEl.textContent = unit;
            statusEl.className = 'network-status';
            if (status !== 'good') {
                statusEl.classList.add(status);
            }
        }, event.time);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các element cần thiết
    const loadingScreen = document.getElementById('loadingScreen');
    const mainMenu = document.getElementById('mainMenu');
    const playBtn = document.getElementById('playBtn');
    const quitBtn = document.getElementById('quitBtn');
    const notificationBtn = document.getElementById('notificationBtn');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const logoutOverlay = document.getElementById('logout-overlay');
    const confirmLogoutPanel = document.getElementById('confirm-logout-panel');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
    const gameLoadingScreen = document.getElementById('gameLoadingScreen');
    const characterInfoPanel = document.getElementById('character-info-panel');
    const closeCharacterInfoBtn = document.getElementById('close-character-info-btn');
    const clickableAvatar = document.getElementById('clickable-avatar-area');
    const avatarPanel = document.getElementById('avatar-select-panel');
    const avatarGrid = document.getElementById('avatar-grid');
    const closeAvatarBtn = document.getElementById('close-avatar-select-btn');
    const notificationPopup = document.getElementById('notification-popup');
    const closeNotificationBtn = document.getElementById('close-notification-btn');
    const sfxToggle = document.getElementById('sfx-toggle');
    const musicToggle = document.getElementById('music-toggle');
    const gifcodePanel = document.getElementById('gifcode-panel');
    const closeGifcodeBtn = document.getElementById('close-gifcode-btn');
    const submitGifcodeBtn = document.getElementById('submit-gifcode-btn');
    const gifcodeInput = document.getElementById('gifcode-input');
    const gifcodeMessage = document.getElementById('gifcode-message');
    const gameUI = document.getElementById('game-ui');

    let currentAvatar = localStorage.getItem('selectedAvatar') || 'asset/avt/avt (1).jpg';
    let sfxEnabled = localStorage.getItem('sfxEnabled') !== 'false';
    let musicEnabled = localStorage.getItem('musicEnabled') !== 'false';

    /* --- BẮT ĐẦU PHẦN THÊM MỚI --- */

    // Hàm để vào thẳng giao diện game
    function enterDevMode() {
        console.log("DEV MODE ACTIVATED: Bỏ qua màn hình chờ.");
        // Ẩn tất cả các màn hình không cần thiết
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainMenu) mainMenu.style.display = 'none';
        if (gameLoadingScreen) gameLoadingScreen.style.display = 'none';

        // Hiển thị giao diện game ngay lập tức
        document.body.style.backgroundImage = "url('background/uigame.png')";
        if (gameUI) gameUI.style.display = 'block';

        // Gắn các sự kiện cần thiết cho giao diện game
        if (clickableAvatar && characterInfoPanel) {
            clickableAvatar.addEventListener('click', () => {
                characterInfoPanel.classList.add('visible');
                attachDichDungEvent();
            });
        }
    }
    // Dành cho việc gọi hàm từ console
    window.enterDevMode = enterDevMode;

    /* --- KẾT THÚC PHẦN THÊM MỚI --- */

    function startLogoutSequence() {
        if (!logoutOverlay) return;
        logoutOverlay.classList.add('visible');
        setTimeout(() => {
            window.location.href = 'game.html'; 
        }, 2500);
    }

    function renderAvatar() {
        const frame = document.getElementById('clickable-avatar-area');
        if (!frame) return;

        let img = frame.querySelector('.pixel-avatar-img');
        if (!img) {
            img = document.createElement('img');
            img.className = 'pixel-avatar-img';
            frame.innerHTML = ''; 
            frame.appendChild(img);
        }
        img.src = currentAvatar;
        img.alt = 'avatar';
    }

    function openAvatarPanel() {
        if (!avatarPanel || !avatarGrid) return;
        avatarPanel.classList.add('visible');

        if (avatarGrid.childElementCount === 0) {
            for (let i = 1; i <= 100; i++) {
                const img = document.createElement('img');
                img.src = `asset/avt/avt (${i}).jpg`;
                img.alt = `Avatar ${i}`;
                img.loading = 'lazy'; 
                img.className = (img.src === currentAvatar) ? 'selected' : '';

                img.addEventListener('click', () => {
                    currentAvatar = img.src;
                    localStorage.setItem('selectedAvatar', currentAvatar);
                    renderAvatar();
                    
                    Array.from(avatarGrid.children).forEach(child => child.classList.remove('selected'));
                    img.classList.add('selected');
                    
                    setTimeout(() => avatarPanel.classList.remove('visible'), 200);
                });
                avatarGrid.appendChild(img);
            }
        } else {
            Array.from(avatarGrid.children).forEach(child => {
                child.classList.remove('selected');
                if (child.src === currentAvatar) child.classList.add('selected');
            });
        }
    }

    function attachDichDungEvent() {
        if (!characterInfoPanel) return;
        const [dichDungBtn, , settingBtn, gifcodeBtn] = characterInfoPanel.querySelectorAll('.action-buttons .menu-btn');
        if (dichDungBtn && !dichDungBtn._avatarEventAttached) {
            dichDungBtn.addEventListener('click', openAvatarPanel);
            dichDungBtn._avatarEventAttached = true;
        }
        if (settingBtn && !settingBtn._settingEventAttached) {
            settingBtn.addEventListener('click', () => {
                if (settingsPanel) settingsPanel.classList.add('visible');
            });
            settingBtn._settingEventAttached = true;
        }
        if (gifcodeBtn && !gifcodeBtn._gifcodeEventAttached) {
            gifcodeBtn.addEventListener('click', () => {
                if (gifcodePanel) gifcodePanel.classList.add('visible');
            });
            gifcodeBtn._gifcodeEventAttached = true;
        }
    }
    
    function updateToggleUI() {
        if (sfxToggle) sfxToggle.classList.toggle('active', sfxEnabled);
        if (musicToggle) musicToggle.classList.toggle('active', musicEnabled);
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (mainMenu) mainMenu.style.display = 'none';

            if (gameLoadingScreen) {
                gameLoadingScreen.classList.add('visible');
                setTimeout(() => {
                    gameLoadingScreen.style.display = 'none';
                    document.body.style.backgroundImage = "url('background/uigame.png')";
                    
                    if (gameUI) gameUI.style.display = 'block';

                    if (clickableAvatar && characterInfoPanel) {
                        clickableAvatar.addEventListener('click', () => {
                            characterInfoPanel.classList.add('visible');
                            attachDichDungEvent();
                        });
                    }
                }, 4000);
            }
            console.log('Bắt đầu cuộc phiêu lưu tại Exile of Realms!');
        });
    }
    
    // ... (Các hàm xử lý sự kiện còn lại giữ nguyên)
    if (quitBtn && confirmLogoutPanel) {
        quitBtn.addEventListener('click', () => {
            confirmLogoutPanel.classList.add('visible');
        });
    }
    
    if (cancelLogoutBtn && confirmLogoutPanel) {
        cancelLogoutBtn.addEventListener('click', () => {
            confirmLogoutPanel.classList.remove('visible');
        });
    }

    if (confirmLogoutBtn && confirmLogoutPanel) {
        confirmLogoutBtn.addEventListener('click', () => {
            confirmLogoutPanel.classList.remove('visible');
            setTimeout(startLogoutSequence, 200);
        });
    }
    
    if (notificationBtn && notificationPopup) {
        notificationBtn.addEventListener('click', () => notificationPopup.classList.add('visible'));
    }

    if (closeNotificationBtn && notificationPopup) {
        closeNotificationBtn.addEventListener('click', () => notificationPopup.classList.remove('visible'));
    }
    
    if (closeSettingsBtn && settingsPanel) {
        closeSettingsBtn.addEventListener('click', () => settingsPanel.classList.remove('visible'));
    }

    if (closeCharacterInfoBtn && characterInfoPanel) {
        closeCharacterInfoBtn.addEventListener('click', () => characterInfoPanel.classList.remove('visible'));
    }

    if (closeAvatarBtn && avatarPanel) {
        closeAvatarBtn.addEventListener('click', () => avatarPanel.classList.remove('visible'));
    }
     if (closeGifcodeBtn && gifcodePanel) {
        closeGifcodeBtn.addEventListener('click', () => {
            gifcodePanel.classList.remove('visible');
            if (gifcodeInput) gifcodeInput.value = '';
            if (gifcodeMessage) gifcodeMessage.textContent = '';
        });
    }
    if (submitGifcodeBtn && gifcodeInput && gifcodeMessage) {
        submitGifcodeBtn.addEventListener('click', () => {
            const code = gifcodeInput.value.trim();
            if (!code) {
                gifcodeMessage.textContent = 'Vui lòng nhập mã Gifcode!';
                return;
            }
            const usedCodes = JSON.parse(localStorage.getItem('usedGifcodes')) || [];
            if (code === 'EOR2024') {
                if (usedCodes.includes(code)) {
                    gifcodeMessage.textContent = 'Mã Gifcode này đã được sử dụng!';
                } else {
                    gifcodeMessage.textContent = 'Đổi Gifcode thành công!';
                    usedCodes.push(code);
                    localStorage.setItem('usedGifcodes', JSON.stringify(usedCodes));
                }
            } else {
                gifcodeMessage.textContent = 'Mã Gifcode không hợp lệ!';
            }
        });
    }
    if (sfxToggle) {
        sfxToggle.addEventListener('click', () => {
            sfxEnabled = !sfxEnabled;
            localStorage.setItem('sfxEnabled', sfxEnabled);
            updateToggleUI();
        });
    }
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            musicEnabled = !musicEnabled;
            localStorage.setItem('musicEnabled', musicEnabled);
            updateToggleUI();
        });
    }

    renderAvatar();
    updateToggleUI();
});

/* --- BẮT ĐẦU PHẦN CHỈNH SỬA --- */

// Thay đổi sự kiện window.load để kiểm tra chế độ dev
window.addEventListener('load', () => {
    // Kiểm tra xem URL có tham số 'dev' không
    const isDevMode = new URLSearchParams(window.location.search).has('dev');

    if (isDevMode) {
        // Nếu là dev mode, vào game ngay
        enterDevMode();
    } else {
        // Nếu không, chạy game bình thường
        const loadingScreen = document.getElementById('loadingScreen');
        const mainMenu = document.getElementById('mainMenu');

        setTimeout(() => {
            if (loadingScreen) loadingScreen.classList.add('hidden');
            if (mainMenu) mainMenu.style.display = 'flex';
        }, 6500);

        simulateNetworkSpeed();
    }
});
/* --- KẾT THÚC PHẦN CHỈNH SỬA --- */
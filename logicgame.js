function simulateNetworkSpeed() {
    const speedValueEl = document.getElementById('speed-value');
    const speedUnitEl = document.getElementById('speed-unit');
    const statusEl = document.querySelector('.network-status');

    if (!speedValueEl || !speedUnitEl || !statusEl) return;

    const speedTimeline = [
        { time: 0, speedFunc: () => ({ value: (Math.random() * 2.5 + 4.5).toFixed(1), unit: 'MB/s', status: 'good' }) },
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

    const GIFCODE_DATABASE = {
        'EOR2024': {
            message: 'Đổi code thành công! Bạn nhận được 1,000 Linh Thạch.',
            items: { linhThach: 1000 } 
        },
        'TANTHU': {
            message: 'Chào mừng tân thủ! Bạn nhận được 100 Linh Thạch và 5 Hồi Khí Đan.',
            items: { linhThach: 100, hoiKhiDan: 5 }
        },
        'UPDATE2025': {
            message: 'Quà mừng phiên bản mới! Bạn nhận được 500 Linh Thạch.',
            items: { linhThach: 500 }
        }
    };

    function setupAvatarClickEvent() {
        if (clickableAvatar && characterInfoPanel) {
            clickableAvatar.removeEventListener('click', handleAvatarClick);
            clickableAvatar.addEventListener('click', handleAvatarClick);
        }
    }

    function handleAvatarClick() {
        if (characterInfoPanel) {
            characterInfoPanel.classList.add('visible');
            attachDichDungEvent();
        }
    }

    function setupGameUI() {
        document.body.style.backgroundImage = "url('background/uigame.png')";
        if (gameUI) gameUI.style.display = 'block';
        setupAvatarClickEvent();
        renderAvatar();
    }


    function enterDevMode() {
        console.log("DEV MODE ACTIVATED: Bỏ qua màn hình chờ.");
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainMenu) mainMenu.style.display = 'none';
        if (gameLoadingScreen) gameLoadingScreen.style.display = 'none';
        setupGameUI();
    }

    window.enterDevMode = enterDevMode;

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
                img.className = (img.src.includes(currentAvatar)) ? 'selected' : '';

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
                if (child.src.includes(currentAvatar)) child.classList.add('selected');
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
                    setupGameUI();
                }, 4000);
            }
        });
    }

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

    console.log("--- Bắt đầu kiểm tra các element của Gifcode Panel ---");
    console.log("Nút Xác nhận (submitGifcodeBtn):", submitGifcodeBtn);
    console.log("Ô nhập liệu (gifcodeInput):", gifcodeInput);
    console.log("Vùng thông báo (gifcodeMessage):", gifcodeMessage);
    console.log("--- Kết thúc kiểm tra ---");

    if (submitGifcodeBtn && gifcodeInput && gifcodeMessage) {
        submitGifcodeBtn.addEventListener('click', () => {
            const code = gifcodeInput.value.trim().toUpperCase();
            
            console.log("Mã người dùng nhập (sau khi xử lý):", code);
            console.log("Kiểm tra trong kho dữ liệu:", GIFCODE_DATABASE);

            const usedCodes = JSON.parse(localStorage.getItem('usedGifcodes')) || [];
            const reward = GIFCODE_DATABASE[code];

            if (reward) {
                if (usedCodes.includes(code)) {
                    gifcodeMessage.textContent = 'Mã Gifcode này đã được sử dụng!';
                } else {
                    gifcodeMessage.textContent = reward.message;
                    console.log('Trao thưởng:', reward.items);
                    usedCodes.push(code);
                    localStorage.setItem('usedGifcodes', JSON.stringify(usedCodes));
                }
            } else {
                gifcodeMessage.textContent = 'Mã Gifcode không hợp lệ!';
            }
        });
    } else {
        console.error("LỖI: Không tìm thấy một hoặc nhiều element của Gifcode Panel. Vì vậy, không thể thêm sự kiện click cho nút 'Xác nhận'. Vui lòng kiểm tra lại ID trong file HTML.");
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
    setupAvatarClickEvent();
});

window.addEventListener('load', () => {
    const isDevMode = new URLSearchParams(window.location.search).has('dev');
    if (isDevMode) {
        enterDevMode();
    } else {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainMenu = document.getElementById('mainMenu');
        setTimeout(() => {
            if (loadingScreen) loadingScreen.classList.add('hidden');
            if (mainMenu) mainMenu.style.display = 'flex';
        }, 6500);
        simulateNetworkSpeed();
    }
});

function handleAreaClick(areaName, event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Clicked on area: ${areaName}`);
    alert(`Bạn đã click vào khu vực: ${areaName}`);
}

window.handleAreaClick = handleAreaClick;
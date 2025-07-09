document.addEventListener('DOMContentLoaded', () => {
    const gifcodePanel = document.getElementById('gifcode-panel');
    const closeGifcodeBtn = document.getElementById('close-gifcode-btn');
    const submitGifcodeBtn = document.getElementById('submit-gifcode-btn');
    const gifcodeInput = document.getElementById('gifcode-input');
    const gifcodeMessage = document.getElementById('gifcode-message');
    const gifcodeRewardPanel = document.getElementById('gifcode-reward-panel');
    const closeRewardPanelBtn = document.getElementById('close-reward-panel-btn');
    const confirmRewardBtn = document.getElementById('confirm-reward-btn');
    const rewardListContainer = document.getElementById('reward-list-container');
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
    const gameUI = document.getElementById('game-ui');
    const dongPhuOverlay = document.getElementById('dongphu-overlay');
    const dongPhuCloseBtn = document.getElementById('dongphu-close-btn');

    let currentAvatar = localStorage.getItem('selectedAvatar') || 'asset/avt/avt (1).jpg';
    let sfxEnabled = localStorage.getItem('sfxEnabled') !== 'false';
    let musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
    let linhThach = parseInt(localStorage.getItem('linhThach')) || 0;
    let tienNgoc = parseInt(localStorage.getItem('tienNgoc')) || 0;
    let playerLinhKhi = parseInt(localStorage.getItem('playerLinhKhi')) || 0;
    let playerRealmLevel = parseInt(localStorage.getItem('playerRealmLevel')) || 1;
    let linhKhiDisplayIntervalId = null;

    const GIFCODE_DATABASE = {
        'EOR2024': {
            rewards: [{
                name: 'Linh Thạch',
                quantity: 1000,
                image: 'asset/ui/linhthach.png',
                type: 'linhThach'
            }, {
                name: 'Hỗn Độn Thạch',
                quantity: 100,
                image: 'asset/ui/G.png',
                type: 'tienNgoc'
            }, ]
        },
        'TANTHU': {
            rewards: [{
                name: 'Linh Thạch',
                quantity: 500,
                image: 'asset/ui/linhthach.png',
                type: 'linhThach'
            }, ]
        },
        'UPDATE2025': {
            rewards: [{
                name: 'Hỗn Độn Thạch',
                quantity: 200,
                image: 'asset/ui/G.png',
                type: 'tienNgoc'
            }, ]
        },
        'ADMINNOPEE4326': {
            rewards: [{
                name: 'Linh Thạch',
                quantity: 10000000000000000000,
                image: 'asset/ui/linhthach.png',
                type: 'linhThach'
            }, {
                name: 'Hỗn Độn Thạch',
                quantity: 10000000000000000000,
                image: 'asset/ui/G.png',
                type: 'tienNgoc'
            }, ]
        }
    };

    const luyenKhiRealmData = [{
        level: 1,
        name: "Luyện Khí Tầng 1",
        required: 1000,
        rate: 10
    }, {
        level: 2,
        name: "Luyện Khí Tầng 2",
        required: 2000,
        rate: 20
    }, {
        level: 3,
        name: "Luyện Khí Tầng 3",
        required: 3000,
        rate: 30
    }, {
        level: 4,
        name: "Luyện Khí Tầng 4",
        required: 4000,
        rate: 40
    }, {
        level: 5,
        name: "Luyện Khí Tầng 5",
        required: 5000,
        rate: 50
    }, {
        level: 6,
        name: "Luyện Khí Tầng 6",
        required: 6000,
        rate: 100
    }, {
        level: 7,
        name: "Luyện Khí Tầng 7",
        required: 7000,
        rate: 100
    }, {
        level: 8,
        name: "Luyện Khí Tầng 8",
        required: 8000,
        rate: 100
    }, {
        level: 9,
        name: "Luyện Khí Tầng 9",
        required: 9000,
        rate: 100
    }, ];

    setInterval(() => {
        if (playerRealmLevel > luyenKhiRealmData.length) return;
        const currentRate = luyenKhiRealmData[playerRealmLevel - 1].rate;
        playerLinhKhi += currentRate;
        localStorage.setItem('playerLinhKhi', playerLinhKhi);
    }, 1000);

    function formatNumber(num) {
        if (num >= 1000000000000000000) {
            return (num / 1000000000000000000).toFixed(1).replace(/\.0$/, '') + ' BB';
        }
        if (num >= 1000000000000000) {
            return (num / 1000000000000000).toFixed(1).replace(/\.0$/, '') + ' MB';
        }
        if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + ' KB';
        }
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
        }
        return num.toLocaleString('vi-VN');
    }

    function updateCurrencyBar() {
        const linhThachEl = document.getElementById('linhThachAmount');
        const tienNgocEl = document.getElementById('tienNgocAmount');
        if (linhThachEl) linhThachEl.textContent = formatNumber(linhThach);
        if (tienNgocEl) tienNgocEl.textContent = formatNumber(tienNgoc);
    }

    function addCurrency(type, amount) {
        if (type === 'linhThach') {
            linhThach += amount;
            localStorage.setItem('linhThach', linhThach);
        } else if (type === 'tienNgoc') {
            tienNgoc += amount;
            localStorage.setItem('tienNgoc', tienNgoc);
        }
        updateCurrencyBar();
    }

    function showRewardPanel(rewards) {
        if (!rewardListContainer || !gifcodeRewardPanel) return;
        rewardListContainer.innerHTML = '';
        rewards.forEach(reward => {
            const rewardElement = `
                <div class="reward-item">
                    <img src="${reward.image}" alt="${reward.name}" class="reward-item-image">
                    <span class="reward-item-info">${reward.name} x${reward.quantity.toLocaleString('vi-VN')}</span>
                </div>
            `;
            rewardListContainer.innerHTML += rewardElement;
        });
        gifcodePanel.classList.remove('visible');
        gifcodeRewardPanel.classList.add('visible');
    }

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
        updatePlayerInfo();
    }

    function enterDevMode() {
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

    function showDongPhuOverlay() {
        if (!dongPhuOverlay) return;
        const contentArea = dongPhuOverlay.querySelector('.panel-content');
        if (contentArea.innerHTML === '') {
            const thienImage = document.createElement('img');
            thienImage.src = 'asset/ui/thien.png';
            thienImage.alt = 'Thiên';
            thienImage.className = 'thien-image';

            const particleContainer = document.createElement('div');
            particleContainer.className = 'spirit-particles-container';
            for (let i = 0; i < 25; i++) {
                const particle = document.createElement('div');
                particle.className = 'spirit-particle';
                particleContainer.appendChild(particle);
            }
            contentArea.appendChild(thienImage);
            contentArea.appendChild(particleContainer);
        }
        dongPhuOverlay.classList.remove('closing');
        dongPhuOverlay.classList.add('visible');
        startLinhKhiDisplayUpdates();
    }

    function closeDongPhuOverlay() {
        if (linhKhiDisplayIntervalId) {
            clearInterval(linhKhiDisplayIntervalId);
            linhKhiDisplayIntervalId = null;
        }
        if (!dongPhuOverlay) return;
        dongPhuOverlay.classList.add('closing');
        setTimeout(() => {
            dongPhuOverlay.classList.remove('visible');
            dongPhuOverlay.classList.remove('closing');
            const contentArea = dongPhuOverlay.querySelector('.panel-content');
            if (contentArea) {
                contentArea.innerHTML = '';
            }
        }, 400);
    }

    function startLinhKhiDisplayUpdates() {
        showProgressBar();
        if (linhKhiDisplayIntervalId) {
            clearInterval(linhKhiDisplayIntervalId);
        }
        linhKhiDisplayIntervalId = setInterval(() => {
            if (playerRealmLevel > luyenKhiRealmData.length) {
                clearInterval(linhKhiDisplayIntervalId);
                showMaxLevelMessage();
                return;
            }
            updateProgressBar();
            const required = luyenKhiRealmData[playerRealmLevel - 1].required;
            const contentArea = dongPhuOverlay.querySelector('.panel-content');
            const breakthroughBtn = contentArea.querySelector('#breakthroughBtn');
            if (playerLinhKhi >= required) {
                if (!breakthroughBtn) {
                    createBreakthroughButton();
                }
            } else {
                if (breakthroughBtn) {
                    breakthroughBtn.remove();
                }
            }
        }, 500);
    }

    function createBreakthroughButton() {
        const contentArea = dongPhuOverlay.querySelector('.panel-content');
        if (!contentArea || contentArea.querySelector('#breakthroughBtn')) return;
        const breakthroughContainer = document.createElement('div');
        breakthroughContainer.id = 'breakthroughBtn';
        const breakthroughText = document.createElement('span');
        breakthroughText.textContent = 'Đột Phá';
        breakthroughContainer.appendChild(breakthroughText);
        breakthroughContainer.onclick = handleBreakthrough;
        contentArea.appendChild(breakthroughContainer);
    }

    function handleBreakthrough() {
        const currentLevelData = luyenKhiRealmData[playerRealmLevel - 1];
        if (!currentLevelData) return;
        const required = currentLevelData.required;
        if (playerLinhKhi >= required) {
            if (playerRealmLevel >= luyenKhiRealmData.length) {
                alert("Bạn đã đạt cảnh giới tối đa của Luyện Khí Kỳ!");
                const breakthroughBtn = document.getElementById('breakthroughBtn');
                if (breakthroughBtn) breakthroughBtn.disabled = true;
                return;
            }
            playerLinhKhi -= required;
            playerRealmLevel++;
            localStorage.setItem('playerLinhKhi', playerLinhKhi);
            localStorage.setItem('playerRealmLevel', playerRealmLevel);
            updatePlayerInfo();
            const breakthroughBtn = document.getElementById('breakthroughBtn');
            if (breakthroughBtn) breakthroughBtn.remove();
        }
    }

    function showProgressBar() {
        const contentArea = dongPhuOverlay.querySelector('.panel-content');
        if (!contentArea || contentArea.querySelector('#linhKhiContainer')) return;
        const linhKhiContainer = document.createElement('div');
        linhKhiContainer.id = 'linhKhiContainer';
        const linhKhiBar = document.createElement('div');
        linhKhiBar.id = 'linhKhiBar';
        const linhKhiText = document.createElement('span');
        linhKhiText.id = 'linhKhiText';
        linhKhiContainer.appendChild(linhKhiBar);
        linhKhiContainer.appendChild(linhKhiText);
        contentArea.appendChild(linhKhiContainer);
        updateProgressBar();
    }

    function updateProgressBar() {
        const linhKhiBar = document.getElementById('linhKhiBar');
        const linhKhiText = document.getElementById('linhKhiText');
        if (!linhKhiBar || !linhKhiText || playerRealmLevel > luyenKhiRealmData.length) return;
        const currentLevelData = luyenKhiRealmData[playerRealmLevel - 1];
        const required = currentLevelData.required;
        const percentage = Math.min((playerLinhKhi / required) * 100, 100);
        linhKhiBar.style.width = `${percentage}%`;
        linhKhiText.textContent = `${formatNumber(playerLinhKhi)} / ${formatNumber(required)}`;
    }

    function showMaxLevelMessage() {
        const contentArea = dongPhuOverlay.querySelector('.panel-content');
        if (!contentArea) return;
        showProgressBar();
        const linhKhiBar = document.getElementById('linhKhiBar');
        if (linhKhiBar) linhKhiBar.style.width = '100%';
        const linhKhiText = document.getElementById('linhKhiText');
        if (linhKhiText) linhKhiText.textContent = "Đã đạt cảnh giới tối đa";
    }

    function updatePlayerInfo() {
        if (playerRealmLevel > luyenKhiRealmData.length) return;
        const currentLevelData = luyenKhiRealmData[playerRealmLevel - 1];
        const realmText = currentLevelData.name;
        const realmDisplay = document.getElementById('player-realm-display');
        if (realmDisplay) realmDisplay.textContent = realmText;
    }

    if (submitGifcodeBtn && gifcodeInput && gifcodeMessage) {
        submitGifcodeBtn.addEventListener('click', () => {
            const code = gifcodeInput.value.trim().toUpperCase();
            const usedCodes = JSON.parse(localStorage.getItem('usedGifcodes')) || [];
            const rewardData = GIFCODE_DATABASE[code];
            gifcodeMessage.textContent = '';
            if (rewardData) {
                if (usedCodes.includes(code)) {
                    gifcodeMessage.textContent = 'Mã Gifcode này đã được sử dụng!';
                } else {
                    if (rewardData.rewards) {
                        rewardData.rewards.forEach(item => {
                            addCurrency(item.type, item.quantity);
                        });
                    }
                    usedCodes.push(code);
                    localStorage.setItem('usedGifcodes', JSON.stringify(usedCodes));
                    showRewardPanel(rewardData.rewards);
                }
            } else {
                gifcodeMessage.textContent = 'Mã Gifcode không hợp lệ!';
            }
        });
    }
    if (closeGifcodeBtn && gifcodePanel) {
        closeGifcodeBtn.addEventListener('click', () => {
            gifcodePanel.classList.remove('visible');
            if (gifcodeInput) gifcodeInput.value = '';
            if (gifcodeMessage) gifcodeMessage.textContent = '';
        });
    }
    if (closeRewardPanelBtn && gifcodeRewardPanel) {
        closeRewardPanelBtn.addEventListener('click', () => {
            gifcodeRewardPanel.classList.remove('visible');
        });
    }
    if (confirmRewardBtn && gifcodeRewardPanel) {
        confirmRewardBtn.addEventListener('click', () => {
            gifcodeRewardPanel.classList.remove('visible');
        });
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
    if (dongPhuCloseBtn) {
        dongPhuCloseBtn.addEventListener('click', closeDongPhuOverlay);
    }

    window.handleAreaClick = function(areaName, event) {
        event.preventDefault();
        event.stopPropagation();
        if (areaName === 'Động Phủ') {
            showDongPhuOverlay();
            return;
        }
        alert(` ${areaName}`);
    };

    updateCurrencyBar();
    renderAvatar();
    updateToggleUI();
    setupAvatarClickEvent();
    updatePlayerInfo();
});

window.addEventListener('load', () => {
    function simulateNetworkSpeed() {
        const speedValueEl = document.getElementById('speed-value');
        const speedUnitEl = document.getElementById('speed-unit');
        const statusEl = document.querySelector('.network-status');
        if (!speedValueEl || !speedUnitEl || !statusEl) return;
        const speedTimeline = [{
            time: 0,
            speedFunc: () => ({
                value: (Math.random() * 2.5 + 4.5).toFixed(1),
                unit: 'MB/s',
                status: 'good'
            })
        }, {
            time: 1300,
            speedFunc: () => ({
                value: Math.floor(Math.random() * 200 + 300),
                unit: 'KB/s',
                status: 'unstable'
            })
        }, {
            time: 2300,
            speedFunc: () => ({
                value: (Math.random() * 3 + 5).toFixed(1),
                unit: 'MB/s',
                status: 'good'
            })
        }, {
            time: 4000,
            speedFunc: () => ({
                value: Math.floor(Math.random() * 50 + 50),
                unit: 'KB/s',
                status: 'bad'
            })
        }, {
            time: 5000,
            speedFunc: () => ({
                value: Math.floor(Math.random() * 400 + 500),
                unit: 'KB/s',
                status: 'unstable'
            })
        }, {
            time: 5800,
            speedFunc: () => ({
                value: (Math.random() * 2 + 6).toFixed(1),
                unit: 'MB/s',
                status: 'good'
            })
        }, ];
        speedTimeline.forEach(event => {
            setTimeout(() => {
                const {
                    value,
                    unit,
                    status
                } = event.speedFunc();
                speedValueEl.textContent = value;
                speedUnitEl.textContent = unit;
                statusEl.className = 'network-status';
                if (status !== 'good') {
                    statusEl.classList.add(status);
                }
            }, event.time);
        });
    }
    const isDevMode = new URLSearchParams(window.location.search).has('dev');
    if (isDevMode) {
        window.enterDevMode();
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
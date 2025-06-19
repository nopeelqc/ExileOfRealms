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
    const settingsBtn = document.getElementById('settingsBtn');
    const playBtn = document.getElementById('playBtn');
    const quitBtn = document.getElementById('quitBtn');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeFill = document.getElementById('volume-fill');
    const volumeValue = document.getElementById('volume-value');
    const logoutOverlay = document.getElementById('logout-overlay');
    const confirmLogoutPanel = document.getElementById('confirm-logout-panel');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
    function startLogoutSequence() {
        if (!logoutOverlay) return;
        logoutOverlay.classList.add('visible');
        setTimeout(() => {
            window.location.href = 'game.html'; 
        }, 2500);
    }

    function updateVolumeDisplay() {
        const value = volumeSlider.value;
        volumeValue.textContent = `${value}%`;
        volumeFill.style.width = `${value}%`;
    }
    settingsBtn.addEventListener('click', () => settingsPanel.classList.add('visible'));
    closeSettingsBtn.addEventListener('click', () => settingsPanel.classList.remove('visible'));
    volumeSlider.addEventListener('input', updateVolumeDisplay);
    updateVolumeDisplay();
    playBtn.addEventListener('click', () => {
        const mainMenu = document.getElementById('mainMenu');
        if (mainMenu) mainMenu.style.display = 'none';
        console.log('Bắt đầu cuộc phiêu lưu tại Exile of Realms!');
    });
    quitBtn.addEventListener('click', () => {
        confirmLogoutPanel.classList.add('visible');
    });
    cancelLogoutBtn.addEventListener('click', () => {
        confirmLogoutPanel.classList.remove('visible');
    });
    confirmLogoutBtn.addEventListener('click', () => {
        confirmLogoutPanel.classList.remove('visible');
        setTimeout(startLogoutSequence, 200);
    });
});

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainMenu = document.getElementById('mainMenu');
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        if (mainMenu) {
            mainMenu.style.display = 'flex';
        }
    }, 6500);

    simulateNetworkSpeed(); 
});
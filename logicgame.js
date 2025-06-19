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

document.getElementById('playBtn').addEventListener('click', () => {
    alert('Bắt đầu cuộc phiêu lưu tại Exile of Realms!');
});

document.getElementById('settingsBtn').addEventListener('click', () => {
    alert('Mở bảng cài đặt đồ họa và âm thanh!');
});

document.getElementById('quitBtn').addEventListener('click', () => {
    alert('Hẹn gặp lại bạn lần sau!');
});
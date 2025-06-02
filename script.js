const socialLinks = {
    facebook: 'https://www.facebook.com/Nopeedepptryy',
    github: 'https://github.com/nopeelqc?tab=overview&from=2025-06-01&to=2025-06-02',
    instagram: 'https://www.instagram.com/lqc432/profilecard/?igsh=MWswdjU5bHo0MDdyZg==',
    tiktok: 'https://www.tiktok.com/@nopeelqc?_t=ZS-8wrRrsKmvQY&_r=1'
};

const platformNames = {
    facebook: 'Facebook',
    github: 'GitHub', 
    instagram: 'Instagram',
    tiktok: 'TikTok'
};

const qrImages = {
    facebook: 'linkfb.png',
    github: 'linkgh.png',
    instagram: 'linkins.png',
    tiktok: 'linktt.png'
};

const qrAltText = {
    facebook: 'Facebook QR',
    github: 'GitHub QR',
    instagram: 'Instagram QR',
    tiktok: 'TikTok QR'
};

function handlePlatform(platform) {
    console.log(`${platform} platform selected`);
    
    if (platform === 'PC') {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent.trim() === 'Chơi Ngay') {
                item.classList.add('active');
                item.style.transform = 'scale(1.1)';
                item.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 300);
            }
        });
        
        console.log('Chuyển đến tab Chơi Ngay');
        
    } else if (platform === 'MOBILE') {
        showMobileComingSoonModal();
    }
}

function showMobileComingSoonModal() {
    const modal = document.createElement('div');
    modal.className = 'mobile-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-icon">
                📱✨
            </div>
            <h2 class="modal-title">Phiên Bản Mobile Sắp Ra Mắt!</h2>
            <p class="modal-message">
                Game sẽ ra mắt phiên bản mobile sớm nhất.<br>
                Theo dõi chúng tôi để cập nhật thông tin mới nhất!
            </p>
            <div class="modal-buttons">
                <button class="follow-btn" onclick="followForUpdates()">
                    <i class="fas fa-bell"></i>
                    Theo Dõi Cập Nhật
                </button>
                <button class="close-btn" onclick="closeMobileModal()">
                    Đóng
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeMobileModal() {
    const modal = document.querySelector('.mobile-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function followForUpdates() {
    const followBtn = document.querySelector('.follow-btn');
    followBtn.innerHTML = '<i class="fas fa-check"></i> Đã Theo Dõi!';
    followBtn.style.background = '#10B981';
    setTimeout(() => {
        closeMobileModal();
        showNotification('🔔 Cảm ơn! Bạn sẽ nhận được thông báo khi game mobile ra mắt');
    }, 1000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function showSocialQR(platform) {
    hideAllQR();
    
    const qr = document.createElement('div');
    qr.className = 'social-qr-popup';
    qr.innerHTML = `
        <div class="qr-content">
            <div class="qr-header">
                <i class="fab fa-${platform}"></i>
                <span>Theo dõi ${platformNames[platform]}</span>
            </div>
            <div class="qr-placeholder">
                <div class="qr-code-area">
                    <img src="${qrImages[platform]}" alt="${qrAltText[platform]}" style="width: 120px; height: 120px;">
                </div>
            </div>
            <button class="follow-link-btn" onclick="followSocial('${platform}')">
                <i class="fas fa-external-link-alt"></i>
                Theo dõi ngay
            </button>
        </div>
    `;
    
    document.body.appendChild(qr);
    
    const socialIcon = document.querySelector(`.social-icon.${platform}`);
    const rect = socialIcon.getBoundingClientRect();
    
    qr.style.left = rect.right + 20 + 'px';
    qr.style.top = rect.top + 'px';
    
    setTimeout(() => {
        qr.classList.add('show');
    }, 10);
}

function hideAllQR() {
    const existingQR = document.querySelectorAll('.social-qr-popup');
    existingQR.forEach(qr => qr.remove());
}

function followSocial(platform) {
    const url = socialLinks[platform];
    if (url) {
        const btn = document.querySelector('.follow-link-btn');
        btn.style.transform = 'scale(0.95)';
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang chuyển...';
        
        setTimeout(() => {
            window.open(url, '_blank');
            hideAllQR();
        }, 500);
    }
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        console.log(`Navigation: ${this.textContent}`);
    });
});

document.querySelectorAll('.social-icon').forEach(icon => {
    const platform = icon.className.split(' ')[1];
    icon.addEventListener('mouseenter', function() {
        showSocialQR(platform);
        console.log(`Hover ${platform} - showing QR`);
    });
    icon.addEventListener('click', function() {
        showSocialQR(platform);
        console.log(`Click ${platform} - showing QR`);
        this.style.transform = 'scale(1.3)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1)';
        }, 150);
    });
});

document.querySelector('.social-sidebar').addEventListener('mouseleave', function() {
    setTimeout(() => {
        const qrPopup = document.querySelector('.social-qr-popup:hover');
        if (!qrPopup) {
            hideAllQR();
        }
    }, 300);
});

document.querySelector('.music-btn').addEventListener('click', function() {
    console.log('Music button clicked');
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-backdrop')) {
        closeMobileModal();
    }
    if (!e.target.closest('.social-qr-popup') && !e.target.closest('.social-icon')) {
        hideAllQR();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileModal();
        hideAllQR();
    }
});
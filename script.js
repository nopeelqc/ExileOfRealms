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
    facebook: 'qr/linkfb.png',
    github: 'qr/linkgh.png',
    instagram: 'qr/linkins.png',
    tiktok: 'qr/linktt.png'
};

const qrAltText = {
    facebook: 'Facebook QR',
    github: 'GitHub QR',
    instagram: 'Instagram QR',
    tiktok: 'TikTok QR'
};

const backgroundMusic = document.getElementById('backgroundMusic');
const musicButton = document.querySelector('.music-btn');
const musicMuteSlash = document.getElementById('musicMuteSlash');
let musicPlayedOnce = false; 

function toggleMusic() {
    if (!backgroundMusic || !musicMuteSlash) {
        console.error('Music elements not found!');
        return;
    }

    if (backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => {
                console.log('Music playing');
                musicMuteSlash.style.display = 'none';
            })
            .catch(error => {
                console.error('Error playing music:', error);
            });
    } else {
        backgroundMusic.pause();
        console.log('Music paused');
        musicMuteSlash.style.display = 'block';
    }
}

if (musicButton) {
    musicButton.addEventListener('click', function(event) {
        event.stopPropagation(); 
        console.log('Music button clicked');
        toggleMusic();
        musicPlayedOnce = true; 
    });
}


document.addEventListener('click', function playMusicOnClick(event) {
    if (!musicPlayedOnce && backgroundMusic && backgroundMusic.paused) {
        const isMusicButtonDescendant = event.target.closest('.music-btn');
        if(isMusicButtonDescendant) return; 

        backgroundMusic.play()
            .then(() => {
                console.log('Music started on first general click');
                if (musicMuteSlash) musicMuteSlash.style.display = 'none';
                musicPlayedOnce = true; 
            })
            .catch(error => {
                console.error('Autoplay was prevented. User interaction is needed.', error);
            });
    }
}); 

function handlePlatform(platform) {
    console.log(`${platform} platform selected`);
    
    if (platform === 'PC') {
        showSection('Trang Chủ');
        const navItemsToActivate = document.querySelectorAll('.nav-item');
        navItemsToActivate.forEach(item => {
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
        showNotification('🚀 Sẵn sàng trải nghiệm Exile of Realms trên PC!');
        
    } else if (platform === 'MOBILE') {
        showMobileComingSoonModal();
    }
}

function showMobileComingSoonModal() {
    const existingModal = document.querySelector('.mobile-modal');
    if (existingModal) return; 

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
    const followBtn = document.querySelector('.mobile-modal .follow-btn');
    if (followBtn) {
        followBtn.innerHTML = '<i class="fas fa-check"></i> Đã Theo Dõi!';
        followBtn.disabled = true;
        followBtn.style.background = '#10B981';
    }
    setTimeout(() => {
        closeMobileModal();
        showNotification('🔔 Cảm ơn! Bạn sẽ nhận được thông báo khi game mobile ra mắt.');
    }, 1000);
}

function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) existingNotification.remove();

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
    }, 3500);
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
    if (socialIcon) {
        const rect = socialIcon.getBoundingClientRect();
        if (window.innerWidth <= 768) {
             qr.style.left = '50%';
             qr.style.top = '50%';
             qr.style.transform = 'translate(-50%, -50%)';
        } else {
            qr.style.left = rect.right + 15 + 'px';
            qr.style.top = rect.top + (rect.height / 2) - (qr.offsetHeight / 2) + 'px';
        }
    }
    
    setTimeout(() => {
        qr.classList.add('show');
        if (window.innerWidth > 768 && socialIcon) {
            const rect = socialIcon.getBoundingClientRect();
            qr.style.top = rect.top + (rect.height / 2) - (qr.offsetHeight / 2) + 'px';
        }
    }, 10);
}

function hideAllQR() {
    const existingQR = document.querySelectorAll('.social-qr-popup');
    existingQR.forEach(qr => qr.remove());
}

function followSocial(platform) {
    const url = socialLinks[platform];
    if (url) {
        const btn = document.querySelector('.social-qr-popup .follow-link-btn');
        if(btn) {
            btn.style.transform = 'scale(0.95)';
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang chuyển...';
        }
        
        setTimeout(() => {
            window.open(url, '_blank');
            hideAllQR();
        }, 500);
    }
}

const mainPageContentArea = document.querySelector('.content-area');
const mainPageHeroSection = document.getElementById('hero');
const introductionContentWrapper = document.getElementById('introduction-content-wrapper');
const mainSocialSidebar = document.querySelector('.social-sidebar');

function showSection(sectionNameToDisplay) {
    if (mainPageContentArea) mainPageContentArea.style.display = 'none';
    if (mainPageHeroSection) mainPageHeroSection.style.display = 'none';
    if (introductionContentWrapper) introductionContentWrapper.style.display = 'none';
    if (mainSocialSidebar) mainSocialSidebar.style.display = 'none';

    if (sectionNameToDisplay === 'Trang Chủ') {
        if (mainPageContentArea) mainPageContentArea.style.display = 'block'; 
        if (mainPageHeroSection) mainPageHeroSection.style.display = 'block';
        if (mainSocialSidebar) mainSocialSidebar.style.display = 'flex'; 
        window.scrollTo(0, 0);
    } else if (sectionNameToDisplay === 'Giới Thiệu') {
        if (introductionContentWrapper) introductionContentWrapper.style.display = 'block';
        window.scrollTo(0, 0);
    }
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => {
            i.classList.remove('active');
            i.style.transform = 'scale(1)'; 
        });
        this.classList.add('active');
        const sectionName = this.textContent.trim();
        console.log(`Navigation: Chuyển đến ${sectionName}`);

        showSection(sectionName);

        if (sectionName === 'Chơi Ngay') {
            handlePlatform('PC');
        } else if (sectionName !== 'Trang Chủ' && sectionName !== 'Giới Thiệu') {
            showNotification(`"${sectionName}" hiện chưa có nội dung. Vui lòng quay lại sau!`);
        }
    });
});

document.querySelectorAll('.social-icon').forEach(icon => {
    const platform = icon.className.split(' ')[1]; 
    icon.setAttribute('data-platform', platformNames[platform] || platform);

    icon.addEventListener('mouseenter', function() {
        showSocialQR(platform);
        console.log(`Hover ${platform} - showing QR`);
    });
    icon.addEventListener('click', function(event) {
        event.stopPropagation(); 
        showSocialQR(platform);
        console.log(`Click ${platform} - showing QR`);
        this.style.transform = 'scale(1.3)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1)';
        }, 150);
    });
});

const socialSidebarElement = document.querySelector('.social-sidebar');
if (socialSidebarElement) {
    socialSidebarElement.addEventListener('mouseleave', function() {
        setTimeout(() => {
            const qrPopup = document.querySelector('.social-qr-popup:hover');
            const socialIconHovered = document.querySelector('.social-icon:hover');
            if (!qrPopup && !socialIconHovered) {
                hideAllQR();
            }
        }, 300); 
    });
}


document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-backdrop')) {
        closeMobileModal();
    }
    if (!e.target.closest('.social-icon') && !e.target.closest('.social-qr-popup')) {
        hideAllQR();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileModal();
        hideAllQR();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    showSection('Trang Chủ');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const homeNavItem = Array.from(document.querySelectorAll('.nav-item')).find(el => el.textContent.trim() === 'Trang Chủ');
    if (homeNavItem) {
        homeNavItem.classList.add('active');
    }
});
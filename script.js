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
        const isOnIntroPage = document.getElementById('introduction-content-wrapper') && 
                              document.getElementById('introduction-content-wrapper').style.display !== 'none';
        
        if (isOnIntroPage) {
            window.location.href = 'game.html';
        } else {
            const navItems = document.querySelectorAll('.nav-item');
            let playNowItem = null;
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.textContent.trim() === 'Chơi Ngay') {
                    playNowItem = item;
                }
            });

            if (playNowItem) {
                playNowItem.classList.add('active');
                playNowItem.style.transform = 'scale(1.1)';
                playNowItem.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    playNowItem.style.transform = 'scale(1)';
                }, 300);
            }
            window.location.href = 'game.html';
        }

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
        <div class="modal-backdrop" onclick="closeMobileModal()"></div>
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
        qr.style.position = 'fixed';
        if (window.innerWidth <= 768) {
             qr.style.left = '50%';
             qr.style.top = '50%';
             qr.style.transform = 'translate(-50%, -50%)';
        } else {
            qr.style.left = rect.right + 15 + 'px';
             qr.style.top = rect.top + (rect.height / 2) + 'px';
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
const forumContentWrapper = document.getElementById('forum-content-wrapper');
const mainSocialSidebar = document.querySelector('.social-sidebar');

function showSection(sectionNameToDisplay) {
    console.log(`Showing section: ${sectionNameToDisplay}`);
    
    if (mainPageContentArea) mainPageContentArea.style.display = 'none';
    if (mainPageHeroSection) mainPageHeroSection.style.display = 'none';
    if (introductionContentWrapper) introductionContentWrapper.style.display = 'none';
    if (forumContentWrapper) forumContentWrapper.style.display = 'none';
    
    if (mainSocialSidebar) {
        if (sectionNameToDisplay === 'Trang Chủ') {
            mainSocialSidebar.style.display = 'flex';
        } else {
            mainSocialSidebar.style.display = 'none';
        }
    }

    switch(sectionNameToDisplay) {
        case 'Trang Chủ':
            if (mainPageContentArea) mainPageContentArea.style.display = 'block';
            if (mainPageHeroSection) mainPageHeroSection.style.display = 'block';
            break;
        case 'Giới Thiệu':
            if (introductionContentWrapper) introductionContentWrapper.style.display = 'block';
            break;
        case 'Diễn Đàn':
            if (forumContentWrapper) forumContentWrapper.style.display = 'block';
            break;
        default:
            break;
    }
    
    window.scrollTo(0, 0);
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const sectionName = this.textContent.trim();
        console.log(`Navigation clicked: ${sectionName}`);

        if (sectionName === 'Trang Chủ') {
            if (window.location.pathname.includes('gioithieu.html')) {
                window.location.href = 'index.html';
                return;
            } else {
                showSection('Trang Chủ');
            }
        } else if (sectionName === 'Giới Thiệu') {
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                window.location.href = 'gioithieu.html';
                return;
            } else {
                showSection('Giới Thiệu');
            }
        } else if (sectionName === 'Diễn Đàn') {
            window.location.href = 'forum.html';
            return;
        } else if (sectionName === 'Chơi Ngay') {
            window.location.href = 'game.html';
            return;
        } else {
            showNotification(`"${sectionName}" hiện chưa có nội dung. Vui lòng quay lại sau!`);
        }

        document.querySelectorAll('.nav-item').forEach(i => {
            i.classList.remove('active');
            i.style.transform = 'scale(1)';
        });
        this.classList.add('active');
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
        if (document.querySelector('.mobile-modal.show')) {
            closeMobileModal();
        }
        if (document.querySelector('.forum-modal.active')) {
            closeForumModal();
        }
    }
    if (!e.target.closest('.social-icon') && !e.target.closest('.social-qr-popup')) {
        hideAllQR();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (document.querySelector('.mobile-modal.show')) {
            closeMobileModal();
        }
        if (document.querySelector('.forum-modal.active')) {
            closeForumModal();
        }
        hideAllQR();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    if (window.location.pathname.includes('gioithieu.html')) {
        showSection('Giới Thiệu');
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        const introNavItem = Array.from(document.querySelectorAll('.nav-item')).find(el => el.textContent.trim() === 'Giới Thiệu');
        if (introNavItem) {
            introNavItem.classList.add('active');
        }
    } else {
        if (window.location.pathname.includes('game.html')) {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            const playNowItem = Array.from(document.querySelectorAll('.nav-item')).find(el => el.textContent.trim() === 'Chơi Ngay');
            if (playNowItem) {
                playNowItem.classList.add('active');
            }
        } else if (window.location.hash === '#introduction') {
            window.location.href = 'gioithieu.html';
        } else {
            showSection('Trang Chủ');
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            const homeNavItem = Array.from(document.querySelectorAll('.nav-item')).find(el => el.textContent.trim() === 'Trang Chủ');
            if (homeNavItem) {
                homeNavItem.classList.add('active');
            }
        }
    }
});

function closeForumModal() {
    const modal = document.querySelector('.forum-modal.active');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentElement) { 
                modal.remove();
            }
        }, 300);
    }
}

function showLoginModal() {
    closeForumModal();
    const existingModal = document.querySelector('#login-modal-instance');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'login-modal-instance';
    modal.className = 'forum-modal'
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeForumModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Đăng Nhập Diễn Đàn</h2>
                <button class="modal-close" onclick="closeForumModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="loginForm">
                    <div class="form-group">
                        <label for="username">Tên đăng nhập:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="forum-btn primary">Đăng Nhập</button>
                </form>
                <p>Chưa có tài khoản? <a href="#" onclick="showRegisterModal(); return false;">Đăng ký tại đây</a></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Chức năng đăng nhập đang được phát triển!');
        closeForumModal();
        window.location.href = 'game.html';
    });
}

function showRegisterModal() {
    closeForumModal();
    const existingModal = document.querySelector('#register-modal-instance');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'register-modal-instance';
    modal.className = 'forum-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeForumModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Đăng Ký Tài Khoản</h2>
                <button class="modal-close" onclick="closeForumModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="registerForm">
                    <div class="form-group">
                        <label for="reg_username">Tên đăng nhập:</label>
                        <input type="text" id="reg_username" name="reg_username" required>
                    </div>
                    <div class="form-group">
                        <label for="reg_email">Email:</label>
                        <input type="email" id="reg_email" name="reg_email" required>
                    </div>
                    <div class="form-group">
                        <label for="reg_password">Mật khẩu:</label>
                        <input type="password" id="reg_password" name="reg_password" required>
                    </div>
                     <div class="form-group">
                        <label for="reg_confirm_password">Xác nhận mật khẩu:</label>
                        <input type="password" id="reg_confirm_password" name="reg_confirm_password" required>
                    </div>
                    <button type="submit" class="forum-btn primary">Đăng Ký</button>
                </form>
                <p>Đã có tài khoản? <a href="#" onclick="showLoginModal(); return false;">Đăng nhập tại đây</a></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('reg_password').value;
        const confirmPassword = document.getElementById('reg_confirm_password').value;
        if (password !== confirmPassword) {
            showNotification('Mật khẩu xác nhận không khớp!');
            return;
        }
        showNotification('Chức năng đăng ký đang được phát triển!');
        closeForumModal();
        window.location.href = 'game.html';
    });
}

function showRulesModal() {
    closeForumModal();
    const existingModal = document.querySelector('#rules-modal-instance');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'rules-modal-instance';
    modal.className = 'forum-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeForumModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Quy Định Diễn Đàn</h2>
                <button class="modal-close" onclick="closeForumModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p><strong>1. Tôn trọng mọi người:</strong> Không sử dụng ngôn ngữ công kích, xúc phạm, phân biệt đối xử.</p>
                <p><strong>2. Nội dung phù hợp:</strong> Không đăng tải nội dung bất hợp pháp, đồi trụy, bạo lực, hoặc vi phạm bản quyền.</p>
                <p><strong>3. Không spam:</strong> Không gửi tin nhắn, bài viết quảng cáo, lặp đi lặp lại không cần thiết.</p>
                <p><strong>4. Bảo mật thông tin:</strong> Không chia sẻ thông tin cá nhân nhạy cảm của bạn hoặc người khác.</p>
                <p><strong>5. Tuân thủ hướng dẫn:</strong> Làm theo hướng dẫn của Quản trị viên và Điều hành viên.</p>
                <hr style="border-color: rgba(249,115,22,0.3); margin: 15px 0;">
                <p class="text-center text-orange-400">Chúc bạn có những giây phút thảo luận vui vẻ và bổ ích!</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}
function showExitModal() {
    document.getElementById('exitModal').style.display = 'block';
    playWarningSound();
}

function closeExitModal() {
    document.getElementById('exitModal').style.display = 'none';
    playClickSound();
}

function exitApp() {
    playSuccessSound();
    setTimeout(() => {
        alert('Terima kasih telah menggunakan aplikasi Pencemaran Air! Sampai jumpa! 👋');
        // Reset aplikasi ke halaman awal
        localStorage.removeItem('userName');
        closeExitModal();
        window.location.href = 'index.html';
    }, 500);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Tampilkan nama user
    const userName = getUserData();
    if (userName) {
        document.getElementById('welcomeMessage').textContent = `Selamat datang, ${userName}! 👋`;
        document.getElementById('userInfo').style.display = 'block';
    } else {
        // Jika tidak ada nama, redirect ke halaman input nama
        window.location.href = 'name-input.html';
    }

    // Close modal when clicking outside
    document.getElementById('exitModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeExitModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('exitModal');
            if (modal.style.display === 'block') {
                closeExitModal();
            }
        }
    });

    // Tambahkan event listener untuk semua tombol
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn') ||
            e.target.classList.contains('menu-item') ||
            e.target.classList.contains('material-item') ||
            e.target.classList.contains('back-btn')) {
            playClickSound();
        }
    });
});
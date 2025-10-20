function showNameInput() {
    playClickSound();
    window.location.href = 'name-input.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Welcome sound saat aplikasi dimuat
    setTimeout(() => {
        playWelcomeSound();
    }, 1000);

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
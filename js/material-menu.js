// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Cek apakah user sudah login
    const userName = getUserData();
    if (!userName) {
        // Jika tidak ada nama, redirect ke halaman input nama
        window.location.href = 'name-input.html';
        return;
    }

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
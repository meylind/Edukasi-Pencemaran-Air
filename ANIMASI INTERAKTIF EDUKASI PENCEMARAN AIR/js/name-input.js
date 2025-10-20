function saveName() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (nameInput === '') {
        showNameRequiredPopup();
        document.getElementById('nameInput').focus();
        return;
    }

    saveUserData(nameInput);
    playSuccessSound();
    window.location.href = 'main-menu.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Enter key untuk input nama
    document.getElementById('nameInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            saveName();
        }
    });

    // Focus pada input saat halaman dimuat
    document.getElementById('nameInput').focus();

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
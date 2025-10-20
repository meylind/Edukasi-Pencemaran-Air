let currentMaterialPage = 0;
let currentMaterialTopic = '';

function displayMaterialPage() {
    const materialData = getMaterialData();
    const data = materialData[currentMaterialTopic];
    const currentPage = data.pages[currentMaterialPage];
    const totalPages = data.pages.length;

    const materialContent = document.getElementById('materialContent');
    materialContent.innerHTML = `
        <h2>${data.title}</h2>
        <div style="text-align: center; margin-bottom: 20px;">
            <span>Halaman ${currentMaterialPage + 1} dari ${totalPages}</span>
        </div>
        <h3>${currentPage.title}</h3>
        ${currentPage.content}
        <div style="text-align: center; margin-top: 30px;">
            ${currentMaterialPage > 0 ? '<button class="btn" onclick="prevMaterialPage()">← Sebelumnya</button>' : ''}
            ${currentMaterialPage < totalPages - 1 ? '<button class="btn btn-next" onclick="nextMaterialPage()">Selanjutnya →</button>' : ''}
        </div>
    `;
}

function nextMaterialPage() {
    const materialData = getMaterialData();
    const totalPages = materialData[currentMaterialTopic].pages.length;
    if (currentMaterialPage < totalPages - 1) {
        currentMaterialPage++;
        localStorage.setItem('currentMaterialPage', currentMaterialPage.toString());
        displayMaterialPage();
        playClickSound();
    }
}

function prevMaterialPage() {
    if (currentMaterialPage > 0) {
        currentMaterialPage--;
        localStorage.setItem('currentMaterialPage', currentMaterialPage.toString());
        displayMaterialPage();
        playClickSound();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Cek apakah user sudah login
    const userName = getUserData();
    if (!userName) {
        // Jika tidak ada nama, redirect ke halaman input nama
        window.location.href = 'name-input.html';
        return;
    }

    // Ambil data dari localStorage
    currentMaterialTopic = localStorage.getItem('currentMaterialTopic') || 'limbah';
    currentMaterialPage = parseInt(localStorage.getItem('currentMaterialPage')) || 0;

    // Tampilkan halaman material
    displayMaterialPage();

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
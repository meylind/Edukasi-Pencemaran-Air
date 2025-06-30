// Sound effects menggunakan Web Audio API
function playSound(frequency = 440, duration = 200, type = 'sine') {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        console.log('Audio tidak didukung');
    }
}

// Berbagai jenis suara
function playClickSound() {
    playSound(550, 150, 'sine');
}

function playSuccessSound() {
    playSound(659, 200, 'sine');
    setTimeout(() => playSound(784, 300, 'sine'), 150);
}

function playErrorSound() {
    playSound(220, 300, 'sawtooth');
}

function playWarningSound() {
    playSound(330, 200, 'triangle');
}

function playWelcomeSound() {
    playSound(523, 200);
    setTimeout(() => playSound(659, 200), 200);
    setTimeout(() => playSound(784, 300), 400);
}

// Fungsi untuk menampilkan popup nama harus diisi
function showNameRequiredPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.5em;">⚠️</span>
            <span style="font-weight: bold;">Harus diisi!</span>
        </div>
    `;
    document.body.appendChild(popup);

    playErrorSound();

    setTimeout(() => {
        popup.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 300);
    }, 2000);
}

// Fungsi untuk mendapatkan data dari localStorage
function getUserData() {
    return localStorage.getItem('userName') || '';
}

// Fungsi untuk menyimpan data ke localStorage
function saveUserData(name) {
    localStorage.setItem('userName', name);
}

// Fungsi untuk mendapatkan data material dari localStorage
function getMaterialData() {
    const materialDataStored = localStorage.getItem('materialData');
    if (materialDataStored) {
        return JSON.parse(materialDataStored);
    }

    // Default material data
    const materialData = {
        limbah: {
            title: "🏭 Apa itu Pencemaran Air dan Limbah?",
            pages: [
                {
                    title: "Pengertian Pencemaran air",
                    content: `
                        <div class="content-section">
                            <h3>Apa itu Pencemaran Air?</h3>
                            <p>Pencemaran air terjadi ketika zat-zat asing masuk ke dalam sumber air dan mengubah kualitas alaminya. 
                            Berbagai aktivitas manusia seperti industri, pertanian, dan rumah tangga berkontribusi terhadap tercemarnya air di lingkungan sekitar.
                            Air yang seharusnya bersih dan jernih kini sering terkontaminasi oleh limbah cair dan bahan kimia.</p>
                        </div>
                    `
                },
                {
                    title: "Pengertian Limbah",
                    content: `
                        <div class="content-section">
                            <h3>Apa itu Limbah?</h3>
                            <p>Limbah adalah sisa atau buangan dari suatu kegiatan manusia, baik itu berasal dari rumah tangga, industri, pertanian, maupun kegiatan lainnya, 
                            yang sudah tidak digunakan lagi dan dapat menimbulkan dampak negatif terhadap lingkungan dan kesehatan jika tidak dikelola dengan baik.</p>
                            <p>Limbah yang tidak dikelola dengan baik dapat mencemari lingkungan, termasuk air.</p>
                        </div>
                    `
                },
                {
                    title: "Jenis-jenis Limbah",
                    content: `
                        <div class="content-section">
                            <h3>Jenis-jenis Limbah Berdasarkan Bentuknya</h3>
                            <p><strong>🌊 Limbah Cair:</strong> Limbah cair adalah limbah yang berbentuk cairan dan biasanya berasal dari rumah tangga, industri, atau pertanian. 
                            Limbah ini bisa langsung mengalir ke saluran air jika tidak diolah terlebih dahulu. 
                            Contohnya : Air bekas industri, rumah tangga</p>
                            <p><strong>🗑️ Limbah Padat:</strong> Limbah padat adalah sisa bahan yang berbentuk padat dan biasanya berasal dari kegiatan manusia. 
                            Contohnya : Sampah plastik, kertas, logam</p>
                            <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 10px; margin-top: 20px;">
                                <strong>Fakta:</strong> Setiap hari, satu orang menghasilkan 2-3 liter air limbah!
                            </div>
                        </div>
                    `
                },
                {
                    title: "Jenis-jenis Limbah",
                    content: `
                        <div class="content-section">
                            <h3>Jenis-jenis Limbah Berdasarkan Bentuknya</h3>
                            <p><strong>💨 Limbah Gas:</strong> Limbah gas adalah sisa buangan dalam bentuk gas yang biasanya berasal dari pembakaran atau proses industri. 
                            Contohnya : Asap pabrik, kendaraan</p>
                            <p><strong>☠️ Limbah B3:</strong> imbah B3 adalah jenis limbah yang mengandung zat berbahaya atau beracun bagi manusia dan lingkungan,
                            Pengelolaan limbah ini harus dilakukan secara khusus dan hati-hati. Contohnya : Bahan Berbahaya dan Beracun</p>
                            <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 10px; margin-top: 20px;">
                                <strong>Fakta:</strong> Banyak limbah B3 seperti merkuri atau pestisida sangat sulit terurai dan bisa mencemari tanah serta air selama puluhan tahun.
                            </div>
                        </div>
                    `
                }
            ]
        },
        penyebab: {
            title: "⚠️ Faktor Penyebab Pencemaran Air",
            pages: [
                {
                    title: "Penyebab Utama",
                    content: `
                        <div class="content-section">
                            <h3>Penyebab Pencemaran Air</h3>
                            <p>Pencemaran air terjadi karena berbagai faktor termasuk rendahnya kesadaran masyarakat dalam menjaga kebersihan 
                            lingkungan dan sumber air. Edukasi mengenai pentingnya menjaga air bersih perlu ditanamkan sejak dini agar generasi muda 
                            peduli terhadap lingkungan.</p><br>
                            <b>Berikut Adalah Faktor Penyebab Pencemaran Air</b>
                            <p><strong>🏭 Limbah Industri</strong></p>
                            <p>Pabrik membuang limbah kimia ke sungai</p>
                        </div>
                    `
                },
                {
                    title: "Penyebab Lainnya",
                    content: `
                        <div class="content-section">
                            <p><strong>🏠 Limbah Rumah Tangga</strong></p>
                            <p>Air sabun dan deterjen dari rumah</p>
                            <p><strong>🚗 Polusi Kendaraan</strong></p>
                            <p>Oli dan bahan bakar bocor ke air</p>
                            <p><strong>🌾 Pestisida Pertanian</strong></p>
                            <p>Pupuk kimia mencemari air tanah</p>
                            <p><strong>🗑️ Sampah Plastik</strong></p>
                            <p>Plastik mengotori sumber air</p>
                        </div>
                    `
                }
            ]
        },
        dampak: {
            title: "🌍 Dampak Pencemaran Air",
            pages: [
                {
                    title: "Dampak Pencemaran Air",
                    content: `
                        <div class="content-section">
                            <h3>Tidakan Pencegahan Pencemaran Air</h3>
                            <p>Pencemaran air merupakan permasalahan lingkungan yang serius dan tidak bisa diabaikan. Saat air tercemar, 
                            tidak hanya kualitasnya yang menurun, tetapi juga keseimbangan ekosistem dan kehidupan makhluk hidup di sekitarnya ikut terganggu</p><br>
                            <p>Oleh karena itu, penting bagi kita semua untuk memahami dampaknya dan mulai mengambil langkah nyata untuk mencegahnya.</p>
                        </div>
                    `
                },
                {
                    title: "Dampak Kesehatan",
                    content: `
                        <div class="content-section">
                            <h3>Dampak Terhadap Kesehatan</h3>
                            <p>🤒 Penyakit diare dan kolera</p>
                            <p>🤢 Keracunan logam berat</p>
                            <p>🫁 Gangguan pernapasan</p>
                            <p>🍼 Masalah pertumbuhan anak</p>
                        </div>
                    `
                },
                {
                    title: "Dampak Lingkungan & Ekonomi",
                    content: `
                        <div class="content-section">
                            <h3>Dampak Lingkungan</h3>
                            <p>🐟 Kematian ikan dan biota air</p>
                            <p>🌱 Kerusakan ekosistem</p>
                            <p>💧 Kelangkaan air bersih</p>
                            
                            <h3>Dampak Ekonomi</h3>
                            <p>💰 Biaya pengobatan tinggi</p>
                            <p>🎣 Penurunan hasil perikanan</p>
                            <p>🏖️ Penurunan pariwisata</p>
                        </div>
                    `
                }
            ]
        },
        pencegahan: {
            title: "🛡️ Cara Pencegahan Pencemaran Air",
            pages: [
                {
                    title: "Pencegahan Pencemaran Air",
                    content: `
                        <div class="content-section">
                            <h3>Tidakan Pencegahan Pencemaran Air</h3>
                            <p>Menjaga kebersihan air bukan hanya tanggung jawab pemerintah atau petugas kebersihan, tetapi juga tanggung jawab setiap individu. 
                            Kesadaran pribadi sangat penting untuk memulai perubahan. 
                            <p>Kebiasaan kecil yang dilakukan setiap hari dapat berdampak besar jika dilakukan bersama-sama. 
                            Mulailah dari diri sendiri, karena perubahan besar dimulai dari langkah kecil.</p>
                        </div>
                    `
                },
                {
                    title: "Pencegahan di Lingkungan",
                    content: `
                        <div class="content-section">
                            <h3>🏠 Di Rumah</h3>
                            <p>✅ Gunakan sabun ramah lingkungan</p>
                            <p>✅ Jangan buang minyak ke saluran air</p>
                            <p>✅ Pisahkan sampah organik dan anorganik</p>
                            <p>✅ Hemat penggunaan air</p>
                        </div>
                    `
                },
                {
                    title: "Pencegahan di Lingkungan",
                    content: `
                        <div class="content-section">
                            <h3>🏭 Di Industri</h3>
                            <p>✅ Install sistem pengolahan limbah</p>
                            <p>✅ Gunakan teknologi bersih</p>
                            
                            <h3>🌾 Di Pertanian</h3>
                            <p>✅ Gunakan pupuk organik</p>
                            <p>✅ Kurangi pestisida kimia</p>
                            
                            <div style="background: #27ae60; color: white; padding: 15px; border-radius: 10px; margin-top: 20px;">
                                <strong>Ingat:</strong> Mulai dari diri sendiri untuk lingkungan yang lebih baik.
                            </div>
                        </div>
                    `
                }
            ]
        }
    };

    localStorage.setItem('materialData', JSON.stringify(materialData));
    return materialData;
}

// Fungsi untuk mendapatkan data quiz dari localStorage
function getQuizData() {
    const quizDataStored = localStorage.getItem('quizData');
    if (quizDataStored) {
        return JSON.parse(quizDataStored);
    }

    // Default quiz data
    const quizQuestions = [
        {
            question: "Dampak percemaran air bagi manusia adalah?",
            options: [
                "Meningkatkan kesuburan tanah",
                "Menyebabkan gangguan kesehatan seperti diare, gatal-gatal, keracunan",
                "Membuat sungai lebih jernih",
                "Terjadinya kebakaran"
            ],
            correct: 1
        },
        {
            question: "Apa yang dimaksud dengan pencemaran air?",
            options: [
                "Air yang berada di laut",
                "Air yang digunakan untuk mandi dan mencuci",
                "tidak membuang sampah di saluran air",
                "Air yang mengalami perubahan kualitas akibat masuknya zat berbahaya"
            ],
            correct: 3
        },
        {
            question: "Sungai yang terlihat bersih ternyata mengandung limbah kimia berbahaya, hal ini membuktikan bahwa",
            options: [
                "Limbah tidak selalu berwarna",
                "Limbah selalu berwarna",
                "Sungai jernih dan bersih selalu aman ",
                "Sungai tidak tercemar"
            ],
            correct: 0
        },
        {
            question: "Penggunaan pestisida berlebihan akan mengakibatkan?",
            options: [
                "Tanah menjadi subur",
                "Meningkatkan hasil pertanian",
                "Mengendalikan Hama",
                "Racun pestisida mencemari air tanah dan merusak ekosistem"
            ],
            correct: 3
        },
        {
            question: "Apa yang dimaksud dengan limbah B3?",
            options: [
                "Bahan Bersih dan Berguna",
                "Bahan Berbahaya dan Beracun",
                "Bahan Berat dan Besar",
                "Bahan Basah dan Berminyak"
            ],
            correct: 1
        },
        {
            question: "Manakah yang BUKAN penyebab pencemaran air?",
            options: [
                "Limbah industri",
                "Sampah plastik",
                "Air hujan yang bersih",
                "Pestisida pertanian"
            ],
            correct: 2
        },
        {
            question: "Dampak pencemaran air terhadap kesehatan adalah...",
            options: [
                "Meningkatkan daya tahan tubuh",
                "Menyebabkan penyakit diare",
                "Membuat kulit lebih halus",
                "Meningkatkan nafsu makan"
            ],
            correct: 1
        },
        {
            question: "Cara mencegah pencemaran air di rumah adalah...",
            options: [
                "Membuang minyak bekas ke saluran air",
                "Menggunakan deterjen sebanyak-banyaknya",
                "Menggunakan sabun ramah lingkungan",
                "Membuang sampah ke sungai"
            ],
            correct: 2
        },
        {
            question: "Berapa liter air limbah yang dihasilkan satu orang per hari?",
            options: [
                "1-2 liter",
                "2-3 liter",
                "4-5 liter",
                "6-7 liter"
            ],
            correct: 1
        },
        {
            question: "Di bawah ini yang merupakan salah satu upaya mencegah pencemaran air adalah?",
            options: [
                "tidak mengelola limbah sebelum dibuang",
                "Menggunakan pestisida berlebihan",
                "Membuang limbah pabrik langsung ke sungai",
                "Meningkatkan kesadaran masyarakat tentang pentingnya menjaga air bersih."
            ],
            correct: 3
        }
    ];

    localStorage.setItem('quizData', JSON.stringify(quizQuestions));
    return quizQuestions;
}

// Navigation functions (akan digunakan di semua halaman)
function goToMainMenu() {
    window.location.href = 'main-menu.html';
}

function goToMaterialMenu() {
    window.location.href = 'material-menu.html';
}

function goToQuiz() {
    window.location.href = 'quiz.html';
}

function goToDeveloper() {
    window.location.href = 'developer.html';
}

function goToMaterial(topic) {
    localStorage.setItem('currentMaterialTopic', topic);
    localStorage.setItem('currentMaterialPage', '0');
    window.location.href = 'material-content.html';
}
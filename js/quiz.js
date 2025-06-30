let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let quizQuestions = [];

function initQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    quizQuestions = getQuizData();
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    const quizContent = document.getElementById('quizContent');

    quizContent.innerHTML = `
        <div class="question">
            <h3>Pertanyaan ${currentQuestionIndex + 1} dari ${quizQuestions.length}</h3>
            <p><strong>${question.question}</strong></p>
            <div style="margin-top: 15px;">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectOption(${index})" data-index="${index}">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </div>
                `).join('')}
            </div>
            <button class="btn" onclick="nextQuestion()" style="margin-top: 20px;">Lanjut</button>
        </div>
    `;
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    userAnswers[currentQuestionIndex] = index;
    playClickSound();
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        showNameRequiredPopup(); // Reuse popup untuk peringatan
        return;
    }

    if (userAnswers[currentQuestionIndex] === quizQuestions[currentQuestionIndex].correct) {
        score++;
        playSuccessSound();
    } else {
        playErrorSound();
    }

    currentQuestionIndex++;
    displayQuestion();
}

function showQuizResult() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const quizContent = document.getElementById('quizContent');

    let message = '';
    let emoji = '';

    if (percentage >= 80) {
        message = 'Luar Biasa! Anda sangat memahami materi!';
        emoji = '🏆';
        playWelcomeSound();
    } else if (percentage >= 60) {
        message = 'Bagus! Terus belajar ya!';
        emoji = '👍';
        playSuccessSound();
    } else {
        message = 'Jangan menyerah! Coba pelajari materi lagi.';
        emoji = '💪';
        playWarningSound();
    }

    quizContent.innerHTML = `
        <div class="score-display">
            <div style="font-size: 4em; margin-bottom: 20px;">${emoji}</div>
            <h2>Hasil Kuis</h2>
            <div style="font-size: 2em; margin: 20px 0;">
                ${score}/${quizQuestions.length}
            </div>
            <div style="font-size: 1.5em; margin-bottom: 20px;">
                ${percentage}%
            </div>
            <p>${message}</p>
            <button class="btn" onclick="initQuiz()" style="margin: 10px;">🔄 Ulangi Kuis</button>
            <button class="btn" onclick="goToMainMenu()" style="margin: 10px;">🏠 Menu Utama</button>
        </div>
    `;
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

    // Inisialisasi quiz
    initQuiz();

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
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: "What is money used for?", options: ["Buying things", "Decorating", "Cooking"], answer: "Buying things" },
        { question: "Which currency is used in India?", options: ["Dollar", "Euro", "Rupees"], answer: "Rupees" },
        { question: "What were people doing before money existed?", options: ["Trading things", "Making money", "Collecting leaves"], answer: "Trading things" },
        { question: "What can you do with ₹50?", options: ["Buy something", "Eat it", "Throw it away"], answer: "Buy something" },
        { question: "What is a piggy bank used for?", options: ["Saving money", "Spending money", "Collecting toys"], answer: "Saving money" },
        { question: "Why did people stop trading things?", options: ["It was tricky", "They liked shoes", "They hated rice"], answer: "It was tricky" },
        { question: "What makes money important?", options: ["It's shiny", "It's useful for buying things", "It's pretty"], answer: "It's useful for buying things" },
        { question: "What can you save in?", options: ["A piggy bank", "A toy box", "A cupboard"], answer: "A piggy bank" },
        { question: "What is a ₹10 note?", options: ["A key to buying things", "A toy", "A game"], answer: "A key to buying things" },
        { question: "How do you earn money?", options: ["Doing chores", "Sleeping", "Watching TV"], answer: "Doing chores" }
    ];

    let currentQuestion = 0;
    let score = 0;
    const totalQuestions = questions.length;

    const quizQuestionsEl = document.getElementById('quiz-questions');
    const progressBarFillEl = document.getElementById('progress-fill');
    const resultModalEl = document.getElementById('result-modal');
    const scoreResultEl = document.getElementById('score-result');
    const retryBtn = document.getElementById('retry-btn');
    const nextBtn = document.getElementById('next-btn');

    function loadQuestion() {
        const question = questions[currentQuestion];
        quizQuestionsEl.innerHTML = `
            <h4>${question.question}</h4>
            <div class="options">
                ${question.options.map(option => `<button class="option-btn">${option}</button>`).join('')}
            </div>
        `;

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                if (this.textContent === question.answer) score++;
                currentQuestion++;
                updateProgress();
                if (currentQuestion < totalQuestions) {
                    loadQuestion();
                } else {
                    showResult();
                }
            });
        });
    }

    function updateProgress() {
        const progressPercent = ((currentQuestion / totalQuestions) * 100);
        progressBarFillEl.style.width = `${progressPercent}%`;
    }

    function showResult() {
        const passMark = Math.ceil(totalQuestions * 0.6);
        resultModalEl.style.display = 'flex';
        scoreResultEl.textContent = `You scored ${score} out of ${totalQuestions}. ${score >= passMark ? 'Pass' : 'Fail'}`;
        retryBtn.style.display = score < passMark ? 'inline-block' : 'none';
        nextBtn.style.display = score >= passMark ? 'inline-block' : 'none';
    }

    retryBtn.addEventListener('click', () => {
        resultModalEl.style.display = 'none';
        currentQuestion = 0;
        score = 0;
        loadQuestion();
    });

    nextBtn.addEventListener('click', () => {
        window.location.href = 'l1t1s2.html';
    });

    loadQuestion();

    
});



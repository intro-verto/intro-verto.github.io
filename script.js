document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    const toggleAllBtn = document.getElementById('toggleAll');
    let allShown = false;

    // Обработка клика по отдельному вопросу
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            question.classList.toggle('active');
            answer.classList.toggle('show');
        });
    });

    // Обработка клика по кнопке "Показать/Скрыть все"
    toggleAllBtn.addEventListener('click', () => {
        const answers = document.querySelectorAll('.answer');
        const questionElements = document.querySelectorAll('.question');
        
        answers.forEach(answer => {
            if (allShown) {
                answer.classList.remove('show');
            } else {
                answer.classList.add('show');
            }
        });

        questionElements.forEach(question => {
            if (allShown) {
                question.classList.remove('active');
            } else {
                question.classList.add('active');
            }
        });
        
        toggleAllBtn.textContent = allShown ? 'Показать все ответы' : 'Скрыть все ответы';
        allShown = !allShown;
    });
});

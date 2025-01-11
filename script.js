document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки с вопросами
    const questionButtons = document.querySelectorAll('.question-btn');
    const toggleAllButton = document.querySelector('.toggle-all-btn');
    let isAllExpanded = false;

    // Функция для переключения состояния одного вопроса
    function toggleQuestion(button) {
        const answer = button.nextElementSibling;
        button.classList.toggle('active');
        answer.classList.toggle('show');
    }

    // Обработчик клика по кнопке вопроса
    questionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            toggleQuestion(button);
        });
    });

    // Обработчик клика по кнопке "Показать/Скрыть все"
    toggleAllButton.addEventListener('click', () => {
        isAllExpanded = !isAllExpanded;
        
        questionButtons.forEach(button => {
            const answer = button.nextElementSibling;
            if (isAllExpanded) {
                button.classList.add('active');
                answer.classList.add('show');
            } else {
                button.classList.remove('active');
                answer.classList.remove('show');
            }
        });

        toggleAllButton.textContent = isAllExpanded ? 'Свернуть все' : 'Показать все';
    });
});

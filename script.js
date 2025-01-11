document.addEventListener('DOMContentLoaded', () => {
    const questionItems = document.querySelectorAll('.question-item');
    const toggleAllBtn = document.getElementById('toggleAll');
    let allShown = false;

    // Слушатель для каждого блока вопроса
    questionItems.forEach(item => {
        const questionButton = item.querySelector('.question');
        const answerDiv = item.querySelector('.answer');
        const arrow = item.querySelector('.arrow');

        questionButton.addEventListener('click', () => {
            // Переключаем видимость ответа
            answerDiv.classList.toggle('show');
            // Поворачиваем стрелку
            arrow.style.transform = answerDiv.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });

    // Слушатель для кнопки "Показать/Скрыть все"
    toggleAllBtn.addEventListener('click', () => {
        const answers = document.querySelectorAll('.answer');
        const arrows = document.querySelectorAll('.arrow');
        
        allShown = !allShown; // Инвертируем состояние

        // Обновляем все ответы
        answers.forEach(answer => {
            if (allShown) {
                answer.classList.add('show');
            } else {
                answer.classList.remove('show');
            }
        });

        // Обновляем все стрелки
        arrows.forEach(arrow => {
            arrow.style.transform = allShown ? 'rotate(180deg)' : 'rotate(0)';
        });

        // Обновляем текст кнопки
        toggleAllBtn.textContent = allShown ? 'Скрыть все ответы' : 'Показать все ответы';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleAllBtn = document.querySelector('.toggle-all-btn');
    const questionBtns = document.querySelectorAll('.question-btn');
    const columnsContainer = document.querySelector('.columns-container');
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');
    let isAllExpanded = false;

    // Обработка кнопки "Показать все"
    toggleAllBtn.addEventListener('click', function() {
        isAllExpanded = !isAllExpanded;
        questionBtns.forEach(btn => {
            const answer = btn.nextElementSibling;
            answer.style.display = isAllExpanded ? 'block' : 'none';
            btn.classList.toggle('active', isAllExpanded);
        });
        toggleAllBtn.textContent = isAllExpanded ? 'Скрыть все' : 'Показать все';
    });

    // Обработка кнопок вопросов
    questionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isVisible = answer.style.display === 'block';
            answer.style.display = isVisible ? 'none' : 'block';
            this.classList.toggle('active');
        });
    });

    // Обработка горизонтальной прокрутки
    columnsContainer.addEventListener('scroll', function() {
        const scrollPosition = this.scrollLeft;
        const maxScroll = this.scrollWidth - this.clientWidth;
        const threshold = maxScroll / 2;

        scrollIndicators[0].classList.toggle('active', scrollPosition < threshold);
        scrollIndicators[1].classList.toggle('active', scrollPosition >= threshold);
    });

    // Обработка клика по индикаторам
    scrollIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const columnWidth = columnsContainer.querySelector('.column').offsetWidth;
            columnsContainer.scrollTo({
                left: index * columnWidth,
                behavior: 'smooth'
            });
        });
    });
});

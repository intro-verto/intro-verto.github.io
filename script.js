document.addEventListener('DOMContentLoaded', function() {
    // Загрузка контента из файлов
    const week1Content = document.getElementById('week1-content');
    const week2Content = document.getElementById('week2-content');
    const week3Content = document.getElementById('week3-content');

    // Загружаем содержимое файлов
    fetch('./week1.html')
        .then(response => response.text())
        .then(html => week1Content.innerHTML = html)
        .catch(error => console.error('Error loading week1:', error));

    fetch('./week2.html')
        .then(response => response.text())
        .then(html => week2Content.innerHTML = html)
        .catch(error => console.error('Error loading week2:', error));

    fetch('./week3.html')
        .then(response => response.text())
        .then(html => week3Content.innerHTML = html)
        .catch(error => console.error('Error loading week3:', error));

    // Инициализация кнопок после загрузки всего контента
    Promise.all([
        fetch('./week1.html').then(response => response.text()),
        fetch('./week2.html').then(response => response.text()),
        fetch('./week3.html').then(response => response.text())
    ]).then(() => {
        initializeButtons();
    });

    function initializeButtons() {
        const questionButtons = document.querySelectorAll('.question-btn');
        const toggleAllBtn = document.querySelector('.toggle-all-btn');
        const columnsContainer = document.querySelector('.columns-container');
        const scrollIndicators = document.querySelectorAll('.scroll-indicator');

        // Обработка кнопок вопросов
        questionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            });
        });

        // Обработка кнопки "Показать все"
        toggleAllBtn.addEventListener('click', function() {
            const answers = document.querySelectorAll('.answer-container');
            const allVisible = Array.from(answers).every(answer => answer.style.display === 'block');
            answers.forEach(answer => {
                answer.style.display = allVisible ? 'none' : 'block';
            });
        });

        // Обработка горизонтальной прокрутки
        columnsContainer.addEventListener('scroll', function() {
            const scrollPosition = this.scrollLeft;
            const maxScroll = this.scrollWidth - this.clientWidth;
            const threshold1 = maxScroll / 3;
            const threshold2 = (maxScroll * 2) / 3;

            scrollIndicators[0].classList.toggle('active', scrollPosition < threshold1);
            scrollIndicators[1].classList.toggle('active', scrollPosition >= threshold1 && scrollPosition < threshold2);
            scrollIndicators[2].classList.toggle('active', scrollPosition >= threshold2);
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
    }
});

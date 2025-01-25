document.addEventListener('DOMContentLoaded', function() {
    // Загрузка контента из файлов
    const week1Content = document.getElementById('week1-content');
    const week2Content = document.getElementById('week2-content');
    const week3Content = document.getElementById('week3-content');
    const additionalContent = document.getElementById('additional-content');

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

    fetch('./additional.html')
        .then(response => response.text())
        .then(html => additionalContent.innerHTML = html)
        .catch(error => console.error('Error loading additional:', error));

    // Инициализация кнопок после загрузки всего контента
    Promise.all([
        fetch('./week1.html').then(response => response.text()),
        fetch('./week2.html').then(response => response.text()),
        fetch('./week3.html').then(response => response.text()),
        fetch('./additional.html').then(response => response.text())
    ]).then(() => {
        initializeButtons();
    });

    function initializeButtons() {
        const questionButtons = document.querySelectorAll('.question-btn');
        const toggleAllBtn = document.querySelector('.toggle-all-btn');
        const columnsContainer = document.querySelector('.columns-container');
        const scrollIndicators = document.querySelectorAll('.scroll-indicator');
        const columns = document.querySelectorAll('.column');

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
            const containerWidth = this.clientWidth;
            const columnWidth = columns[0].offsetWidth;
            const gap = 20; // Отступ между колонками
            
            // Определяем, какая колонка находится в центре видимой области
            const centerPosition = scrollPosition + (containerWidth / 2);
            const activeColumnIndex = Math.floor(centerPosition / (columnWidth + gap));
            
            // Обновляем индикаторы
            scrollIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === activeColumnIndex);
            });
        });

        // Обработка клика по индикаторам
        scrollIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                const columnWidth = columns[0].offsetWidth;
                const gap = 20;
                const targetScroll = index * (columnWidth + gap);
                
                // Плавная прокрутка к нужной колонке
                columnsContainer.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Quiz Modal Functionality
    const startQuizBtn = document.querySelector('.start-quiz-btn');
    const quizModal = document.getElementById('quizModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const weekButtons = document.querySelectorAll('.week-btn');
    const allQuestionsBtn = document.querySelector('.all-questions-btn');

    // Open modal
    startQuizBtn.addEventListener('click', () => {
        quizModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        quizModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside
    quizModal.addEventListener('click', (e) => {
        if (e.target === quizModal) {
            quizModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle quiz button clicks
    weekButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            weekButtons.forEach(btn => btn.classList.remove('active'));
            allQuestionsBtn.classList.remove('active');
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Load week-specific questions
            const week = button.dataset.week;
            loadQuizQuestions(week);
        });
    });

    allQuestionsBtn.addEventListener('click', () => {
        // Remove active class from all buttons
        weekButtons.forEach(btn => btn.classList.remove('active'));
        allQuestionsBtn.classList.add('active');
        
        // Load all questions
        loadQuizQuestions('all');
    });

    function loadQuizQuestions(type) {
        const quizContent = document.querySelector('.quiz-content');
        // Here we'll add the actual quiz questions loading logic
        quizContent.innerHTML = `<h2>${type === 'all' ? 'Все вопросы' : 'Неделя ' + type}</h2>`;
    }
});

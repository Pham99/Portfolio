const mainMenuText = document.querySelectorAll('.text');

const darkModeToggle = document.getElementById('dark_mode_toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        const bg = document.querySelector('.background');
        bg.classList.toggle('background_dark');
        mainMenuText.forEach(item => {
            item.classList.toggle('text-light');
        });
        darkModeToggle.children[0].classList.toggle('fa-moon');
        darkModeToggle.children[0].classList.toggle('fa-sun');
    });
    darkModeToggle.addEventListener('mouseover', () => {
        mainMenuText.forEach(item => {
            item.style.transition = 'color 1s ease-in-out, transform 0.2s ease-in-out';
        });
    });
}
mainMenuText.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transition = 'color 0.2s ease-in-out, transform 0.2s ease-in-out';
    });
});

const techItems = document.querySelectorAll('.tech_item_shine');
techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('shine_animation')) {
            item.classList.add('shine_animation');
        }
    });
    item.addEventListener('animationend', () => {
        item.classList.remove('shine_animation');
    });
});

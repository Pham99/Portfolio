const mainMenuText = document.querySelectorAll('.text');
const mainMenuTextArray = Array.from(mainMenuText);
const img = document.querySelectorAll('img');

const darkModeToggle = document.getElementById('dark_mode_toggle');
const bg = document.querySelector('.background');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        bg.classList.toggle('background_dark');
        darkModeToggle.children[0].classList.toggle('fa-moon');
        darkModeToggle.children[0].classList.toggle('fa-sun');
        img.forEach(image => {
            image.classList.toggle('invert');
        });
    });
}

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

const textContainersArray = Array.from(document.querySelectorAll('.text-container'));
const scene3D = document.getElementsByClassName('scene3D')[0];
const topMenu = document.getElementsByClassName('top_menu')[0];
const topMenuItemsArray = Array.from(document.querySelectorAll('.top_menu_container'));

function removeSlideAnimation(el) {
    el.currentTarget.classList.remove('slideSide', 'slideUp', 'slideDown', 'slideSideReverse', 'slideUpReverse', 'slideDownReverse');
}
function addDisplayNone(el) {
    el.currentTarget.classList.add('display-none');
}
function removePointerDisable(el) {
    el.currentTarget.classList.remove('disabled');
}

textContainersArray.forEach(e => {
    e.addEventListener('animationend', removeSlideAnimation);
    e.addEventListener('animationend', removePointerDisable);
});

function reveal(ev) {
    const text = ev.currentTarget.querySelector('[data-target]');
    const target = text.getAttribute('data-target');
    document.getElementById(target).classList.remove('display-none');
    document.getElementById(target).classList.add('animation_fade_in');
}

const title = document.querySelector('.title-text');

mainMenuTextArray.forEach((el, idx) => {
    el.addEventListener('click', () => {
        scene3D.addEventListener('animationend', addDisplayNone, { once: true });
        textContainersArray.forEach(e => {
            e.classList.add('disabled');
        });
        reveal({ currentTarget: textContainersArray[idx] });
        for (let i = 0; i < idx; i++) {
            textContainersArray[i].classList.add('slideUp');
        }
        textContainersArray[idx].classList.add('slideSide');
        for (let i = idx + 1; i < textContainersArray.length; i++) {
            textContainersArray[i].classList.add('slideDown');
        }
        topMenu.classList.remove('display-none');
        topMenu.classList.add('animation_fade_in');
        title.classList.add('faded');
    });
});

const reverseSlideAnimations = [
    'slideSideReverse',
    'slideUpReverse',
    'slideDownReverse'
];

const mainContentArray = Array.from(document.querySelectorAll('.main_container > div'));
function toggleMenu() {
    scene3D.classList.remove('display-none');
    textContainersArray.forEach(e => {
        e.classList.add('disabled');
        // randomly choose an animation from reverseSlideAnimations and add it to the element
        const randomAnim = reverseSlideAnimations[Math.floor(Math.random() * reverseSlideAnimations.length)];
        e.classList.add(randomAnim);
    });
}

topMenu.addEventListener('animationend', () => {
    topMenu.classList.remove('animation_fade_in');
    topMenu.classList.remove('animation_fade_out');
});

mainContentArray.forEach(section => {
    section.addEventListener('animationend', () => {
        section.classList.remove('animation_fade_in');
    });
});

topMenuItemsArray.forEach((el, idx) => {
    if (idx === 0){
        el.addEventListener('click', () => {
            toggleMenu();
            title.classList.remove('faded');
            topMenu.classList.add('animation_fade_out');
            topMenu.addEventListener('animationend', () => {
                topMenu.classList.add('display-none');
            }, { once: true });
            mainContentArray.forEach(section => {
                section.classList.add('display-none');
            });
        });
    }
    else{
        el.addEventListener('click', (e) => {
            mainContentArray.forEach(section => {
                section.classList.add('display-none');
            });
            reveal(e);
        });
    }
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        toggleMenu();
    }
});

const about_section = document.getElementById('about_section');
document.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'A') {
        about_section.classList.remove('display-none');
    }
});
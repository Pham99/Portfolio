// dark mode
const darkModeToggle = document.getElementById('dark_mode_toggle');
const bg = document.querySelector('.background');
const img = document.querySelectorAll('img');
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

// tech item shine 
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

const textArray = Array.from(document.querySelectorAll('.text'));
const scene3D = document.getElementsByClassName('scene3D')[0];
const topMenu = document.getElementsByClassName('top_menu')[0];
const topMenuItemsArray = Array.from(document.querySelectorAll('.top_menu_item'));

function removeSlideAnimation(el) {
    el.currentTarget.classList.remove('slideSide', 'slideUp', 'slideDown', 'slideSideReverse', 'slideUpReverse', 'slideDownReverse');
}
function addDisplayNone(el) {
    el.currentTarget.classList.add('display-none');
}
function removePointerDisable(el) {
    el.currentTarget.classList.remove('disabled');
}

textArray.forEach(e => {
    e.addEventListener('animationend', removeSlideAnimation);
    e.addEventListener('animationend', removePointerDisable);
});

function reveal(ev) {
    if (!ev) return;
    const target = ev.getAttribute('data-target');
    document.getElementById(target).classList.remove('display-none');
    document.getElementById(target).classList.add('animation_fade_in');
}

const title = document.querySelector('.title-text');
const mainMenuTextArray = Array.from(document.querySelectorAll('.text'));

mainMenuTextArray.forEach((el, idx) => {
    el.addEventListener('click', () => {
        scene3D.addEventListener('animationend', addDisplayNone, { once: true });
        textArray.forEach(e => {
            e.classList.add('disabled');
        });
        reveal(textArray[idx]);
        for (let i = 0; i < idx; i++) {
            textArray[i].classList.add('slideUp');
        }
        textArray[idx].classList.add('slideSide');
        for (let i = idx + 1; i < textArray.length; i++) {
            textArray[i].classList.add('slideDown');
        }
        topMenuItemsArray.forEach(highlight => {
            highlight.classList.remove('active');
        });
        idxy = idx + 1;
        topMenuItemsArray[idxy].classList.add('active');
        topMenu.classList.remove('display-none');
        //topMenu.classList.add('animation_fade_in');
        title.classList.add('faded');
        topMenuItemsArray[0].classList.remove('disabled');
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
    textArray.forEach(e => {
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
            el.classList.add('disabled');
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
        el.addEventListener('click', () => {
            mainContentArray.forEach(section => {
                section.classList.add('display-none');
            });
            topMenuItemsArray.forEach(highlight => {
                highlight.classList.remove('active');
            });
            topMenuItemsArray[idx].classList.add('active');
            reveal(el);
        });
    }
});
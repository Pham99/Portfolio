// dark mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
const bg = document.querySelector('.background');
const img = document.querySelectorAll('img');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        bg.classList.toggle('background-dark');
        darkModeToggle.children[0].classList.toggle('fa-moon');
        darkModeToggle.children[0].classList.toggle('fa-sun');
        img.forEach(image => {
            image.classList.toggle('invert');
        });
    });
}

// tech item shine
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach(item => {
    const shine = item.getElementsByClassName('tech-item-shine')[0];
    item.addEventListener('pointerenter', () => {
        if (!shine.classList.contains('shine-animation')) {
            shine.classList.add('shine-animation');
        }
    });
    item.addEventListener('animationend', () => {
        shine.classList.remove('shine-animation');
    });
});

const textArray = Array.from(document.querySelectorAll('.main-menu-item'));
const scene3D = document.getElementsByClassName('scene3D')[0];
const topMenu = document.getElementsByClassName('nav-menu')[0];
const topMenuItemsArray = Array.from(document.querySelectorAll('.nav-menu-item'));

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
    document.getElementById(target).classList.add('animation-fade-in');
}

const title = document.querySelector('.title-text');
const mainMenuTextArray = Array.from(document.querySelectorAll('.main-menu-item'));

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
        let idxy = idx + 1;
        topMenuItemsArray[idxy].classList.add('active');
        topMenu.classList.remove('display-none');
        //topMenu.classList.add('animation-fade-in');
        title.classList.add('faded');
        topMenuItemsArray[0].classList.remove('disabled');
        hamburger_button.classList.add('expanded');
    });
});

const reverseSlideAnimations = [
    'slideSideReverse',
    'slideUpReverse',
    'slideDownReverse'
];

const mainContentArray = Array.from(document.querySelectorAll('.main-container > div'));
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
    topMenu.classList.remove('animation-fade-in');
    topMenu.classList.remove('animation-fade-out');
});

mainContentArray.forEach(section => {
    section.addEventListener('animationend', () => {
        section.classList.remove('animation-fade-in');
    });
});

function closeSideMenu() {
    const topMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.nav-menu-overlay');
    overlay.classList.remove('nav-menu-overlay-active');
    topMenu.classList.add('nav-menu-hidden');
}

function openSideMenu() {
    const topMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.nav-menu-overlay');
    overlay.addEventListener('click', closeSideMenu);
    overlay.classList.add('nav-menu-overlay-active');
    topMenu.classList.remove('nav-menu-hidden');
}

const hamburger_button = document.querySelector(".hamburger-button");
hamburger_button.addEventListener("click", (e) => {
  openSideMenu();
});

topMenuItemsArray.forEach((el, idx) => {
    if (idx === 0){
        el.addEventListener('click', () => {
            topMenuItemsArray.forEach((e) => {
              e.classList.add('diabled');
            });
            toggleMenu();
            title.classList.remove('faded');
            closeSideMenu();
            hamburger_button.classList.remove("expanded");
            topMenu.classList.add('animation-fade-out');
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
            closeSideMenu();
            hamburger_button.classList.add('expanded');
        });
    }
});

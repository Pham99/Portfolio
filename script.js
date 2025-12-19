// dark mode
const darkModeToggle = document.getElementById("dark-mode-toggle");
const bg = document.querySelector(".background");
const img = document.querySelectorAll("img");
if (darkModeToggle) {
	darkModeToggle.addEventListener("click", () => {
		bg.classList.toggle("background-dark");
		darkModeToggle.children[0].classList.toggle("fa-moon");
		darkModeToggle.children[0].classList.toggle("fa-sun");
		img.forEach((image) => {
			image.classList.toggle("invert");
		});
	});
}

// tech item shine
const techItems = document.querySelectorAll(".tech-item");
techItems.forEach((item) => {
	const shine = item.getElementsByClassName("tech-item-shine")[0];
	item.addEventListener("pointerenter", () => {
		if (!shine.classList.contains("shine-animation")) {
			shine.classList.add("shine-animation");
		}
	});
	item.addEventListener("animationend", () => {
		shine.classList.remove("shine-animation");
	});
});

const mainMenuItemsArray = Array.from(
	document.querySelectorAll(".main-menu-item"),
);
const scene3D = document.getElementsByClassName("scene3D")[0];
const navMenu = document.getElementsByClassName("nav-menu")[0];
const navMenuItemsArray = Array.from(
	document.querySelectorAll(".nav-menu-item"),
);

function removePointerDisable(el) {
	el.currentTarget.classList.remove("disabled");
}

mainMenuItemsArray.forEach((e) => {
	e.addEventListener("animationend", (e) => {
		e.currentTarget.classList.remove(
			"slideSide",
			"slideUp",
			"slideDown",
			"slideSideReverse",
			"slideUpReverse",
			"slideDownReverse",
		);
	});
	e.addEventListener("animationend", (e) => {
	  e.currentTarget.classList.remove("disabled");
	});
});

function reveal(ev) {
	if (!ev) return;
	const target = ev.getAttribute("data-target");
	document.getElementById(target).classList.remove("display-none");
	document.getElementById(target).classList.add("animation-fade-in");
}

const title = document.querySelector(".title-text");
const mainMenuTextArray = Array.from(
	document.querySelectorAll(".main-menu-item"),
);

mainMenuTextArray.forEach((el, idx) => {
	el.addEventListener("click", () => {
		scene3D.addEventListener("animationend", (el) => {
		  el.currentTarget.classList.add("display-none");
		}, { once: true });
		mainMenuItemsArray.forEach((e) => {
			e.classList.add("disabled");
		});
		reveal(mainMenuItemsArray[idx]);
		for (let i = 0; i < idx; i++) {
			mainMenuItemsArray[i].classList.add("slideUp");
		}
		mainMenuItemsArray[idx].classList.add("slideSide");
		for (let i = idx + 1; i < mainMenuItemsArray.length; i++) {
			mainMenuItemsArray[i].classList.add("slideDown");
		}
		let idxy = idx + 1;
		navMenuItemsArray.forEach((e) => {
			e.classList.remove("active");
		  e.classList.remove("disabled");
		});
		navMenuItemsArray[idxy].classList.add("active");
		navMenu.classList.remove("display-none");
		title.classList.add("faded");
		hamburger_button.classList.add("expanded");
	});
});

const reverseSlideAnimations = [
	"slideSideReverse",
	"slideUpReverse",
	"slideDownReverse",
];

const mainContentArray = Array.from(
	document.querySelectorAll(".main-container > div"),
);
function toggleMenu() {
	scene3D.classList.remove("display-none");
	mainMenuItemsArray.forEach((e) => {
		e.classList.add("disabled");
		// randomly choose an animation from reverseSlideAnimations and add it to the element
		const randomAnim =
			reverseSlideAnimations[
				Math.floor(Math.random() * reverseSlideAnimations.length)
			];
		e.classList.add(randomAnim);
	});
}

navMenu.addEventListener("animationend", () => {
	navMenu.classList.remove("animation-fade-in");
	navMenu.classList.remove("animation-fade-out");
});

mainContentArray.forEach((section) => {
	section.addEventListener("animationend", () => {
		section.classList.remove("animation-fade-in");
	});
});

const overlay = document.querySelector(".nav-menu-overlay");
overlay.addEventListener("click", closeSideMenu);

function closeSideMenu() {
	overlay.classList.remove("nav-menu-overlay-active");
	navMenu.classList.add("nav-menu-hidden");
}

function openSideMenu() {
	overlay.classList.add("nav-menu-overlay-active");
	navMenu.classList.remove("nav-menu-hidden");
}

const hamburger_button = document.querySelector(".hamburger-button");
hamburger_button.addEventListener("click", () => {
	openSideMenu();
});

navMenuItemsArray.forEach((el, idx) => {
	if (idx === 0) {
		el.addEventListener("click", () => {
			navMenuItemsArray.forEach((e) => {
				e.classList.add("disabled");
			});
			toggleMenu();
			title.classList.remove("faded");
			closeSideMenu();
			hamburger_button.classList.remove("expanded");
			navMenu.classList.add("animation-fade-out");
			navMenu.addEventListener(
				"animationend",
				() => {
					navMenu.classList.add("display-none");
				},
				{ once: true },
			);
			mainContentArray.forEach((section) => {
				section.classList.add("display-none");
			});
		});
	} else {
		el.addEventListener("click", () => {
			mainContentArray.forEach((section) => {
				section.classList.add("display-none");
			});
			navMenuItemsArray.forEach((highlight) => {
				highlight.classList.remove("active");
			});
			navMenuItemsArray[idx].classList.add("active");
			reveal(el);
			closeSideMenu();
			hamburger_button.classList.add("expanded");
		});
	}
});

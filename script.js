// dark mode
const darkModeToggle = document.querySelector("#dark-mode-toggle");
const darkModeToggle2 = document.querySelector("#dark-mode-toggle-2");
const bg = document.querySelector(".background");
const img = document.querySelectorAll("img");

function toggleDarkMode() {
	bg.classList.toggle("background-dark");
	const darkModeToggleIcon = darkModeToggle.querySelector("i");
	darkModeToggleIcon.classList.toggle("fa-moon");
	darkModeToggleIcon.classList.toggle("fa-sun");
	if (darkModeToggle2.textContent === "Light Mode") {
		darkModeToggle2.textContent = "Dark Mode";
	}
	else {
		darkModeToggle2.textContent = "Light Mode";
	}
	img.forEach((image) => {
		image.classList.toggle("invert");
	});
}
darkModeToggle.addEventListener("pointerdown", () => toggleDarkMode());
darkModeToggle2.addEventListener("pointerdown", () => toggleDarkMode());

// tech item shine
const techItems = document.querySelectorAll(".tech-item");
techItems.forEach((item) => {
	const shine = item.querySelector(".tech-item-shine");
	item.addEventListener("pointerenter", () => {
		if (!shine.classList.contains("shine-animation")) {
			shine.classList.add("shine-animation");
		}
	});
	item.addEventListener("animationend", () => {
		shine.classList.remove("shine-animation");
	});
});

const MenuSystem = {
	items: document.querySelectorAll(".main-menu-item"),
	selectedItem: 0,
	scene: document.querySelector(".scene3D"),
	reverseAnimations: [
		"slideSideReverse",
		"slideUpReverse",
		"slideDownReverse",
	],

	disableAllItems() {
		this.items.forEach((e) => e.classList.add("disabled"));
	},

	hideMenu(id) {
		for (let i = 0; i < id; i++) {
			this.items[i].classList.add("slideUp");
		}
		this.items[id].classList.add("slideSide");
		for (let i = id + 1; i < this.items.length; i++) {
			this.items[i].classList.add("slideDown");
		}
		this.selectedItem = id;
	},

	showMenu() {
		this.scene.classList.remove("display-none");
		this.items.forEach((e) => {
			e.classList.remove(
				"slideSide",
				"slideUp",
				"slideDown",
				"slideSideReverse",
				"slideUpReverse",
				"slideDownReverse",
				"disabled",
			);
			e.classList.remove("display-none");
			e.classList.add("disabled");
			let id = this.selectedItem;
			for (let i = 0; i < id; i++) {
				this.items[i].classList.add("slideUpReverse");
			}
			this.items[id].classList.add("slideSideReverse");
			for (let i = id + 1; i < this.items.length; i++) {
				this.items[i].classList.add("slideDownReverse");
			}
		});
	},

	init() {
		this.items.forEach((el, idx) => {
			el.addEventListener("animationend", (e) => {
				if (
					e.currentTarget.classList.contains("slideSide") ||
					e.currentTarget.classList.contains("slideDown") ||
					e.currentTarget.classList.contains("slideUp")
				) {
					e.currentTarget.classList.add("display-none");
					this.scene.classList.add("display-none");
				}
				e.currentTarget.classList.remove(
					"slideSide",
					"slideUp",
					"slideDown",
					"slideSideReverse",
					"slideUpReverse",
					"slideDownReverse",
					"disabled",
				);
			});
			el.addEventListener("pointerdown", () => {
				this.disableAllItems();
				MainContentSystem.revealMainContent(this.items[idx]);
				this.hideMenu(idx);
				let idxy = idx + 1;
				NavbarSystem.setActiveNavMenuItem(idxy);
				NavbarSystem.showNavbar();
			});
			el.addEventListener("touchstart", (ev) => {
				ev.preventDefault();
				this.disableAllItems();
				MainContentSystem.revealMainContent(this.items[idx]);
				this.hideMenu(idx);
				let idxy = idx + 1;
				NavbarSystem.setActiveNavMenuItem(idxy);
				NavbarSystem.showNavbar();
			});
		});
	},
};

const MainContentSystem = {
	mainContentArray: document.querySelectorAll(".main-container > div"),

	revealMainContent(ev) {
		if (!ev) return;
		const target = ev.getAttribute("data-target");
		document.getElementById(target).classList.remove("display-none");
		document.getElementById(target).classList.add("animation-fade-in");
	},
	hideMainContent() {
		this.mainContentArray.forEach((section) => {
			section.classList.add("display-none");
		});
	},

	init() {
		this.mainContentArray.forEach((section) => {
			section.addEventListener("animationend", () => {
				section.classList.remove("animation-fade-in");
			});
		});
	},
};

const NavbarSystem = {
	navMenu: document.querySelector(".nav-menu-container"),
	navItems: document.querySelector(".nav-menu").querySelectorAll(".nav-menu-item"),
	title: document.querySelector(".title-text"),
	overlay: document.querySelector(".nav-menu-overlay"),
	hamburgerButton: document.querySelector(".hamburger-button"),

	setActiveNavMenuItem(i) {
		this.navItems.forEach((e) => {
			e.classList.remove("active");
			e.classList.remove("disabled");
		});
		this.navItems[i].classList.add("active");
	},
	showNavbar() {
		this.navMenu.classList.remove("display-none");
		this.title.classList.add("faded");
		this.hamburgerButton.classList.add("expanded");
	},
	closeSideMenu() {
		this.overlay.classList.remove("nav-menu-overlay-active");
		this.navMenu.classList.add("nav-menu-hidden");
	},
	openSideMenu() {
		this.overlay.classList.add("nav-menu-overlay-active");
		this.navMenu.classList.remove("nav-menu-hidden");
	},

	init() {
		this.navMenu.addEventListener("animationend", () => {
			this.navMenu.classList.remove("animation-fade-in");
			this.navMenu.classList.remove("animation-fade-out");
		});
		this.overlay.addEventListener("pointerdown", () =>
			this.closeSideMenu(),
		);
		this.hamburgerButton.addEventListener("pointerdown", () =>
			this.openSideMenu(),
		);
		this.navItems.forEach((el, idx) => {
			if (idx === 0) {
				el.addEventListener("pointerdown", () => {
					this.title.classList.remove("faded");
					MenuSystem.showMenu();
					this.closeSideMenu();
					this.hamburgerButton.classList.remove("expanded");
					this.navItems.forEach((e) => {
						e.classList.add("disabled");
					});
					this.navMenu.classList.add("animation-fade-out");
					this.navMenu.addEventListener(
						"animationend",
						() => {
							this.navMenu.classList.add("display-none");
						},
						{ once: true },
					);
					MainContentSystem.hideMainContent();
				});
			} else {
				el.addEventListener("pointerdown", () => {
					MainContentSystem.hideMainContent();
					MainContentSystem.revealMainContent(el);
					this.setActiveNavMenuItem(idx);
					this.closeSideMenu();
				});
			}
		});
	},
};

MenuSystem.init();
MainContentSystem.init();
NavbarSystem.init();

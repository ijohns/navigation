export class Navigation {
  /**
   * Creates an instance of Navigation
   * @param {HTMLUListElement} element 
   */
  constructor(element) {
    this.nav = element;
    this.#setEventListeners();
  }

  /**
   * Sets the event listeners for the navigation
   */
  #setEventListeners() {
    const paddingX = getComputedStyle(this.nav).getPropertyValue("--nav-padding-x").replace(/\D/g,'');
    
    this.nav?.addEventListener("click", (event) => {
      event.preventDefault();

      if (event?.target?.classList?.contains("nav__link")) {
        this.#setActiveLink(event.target);
        this.#setUnderlineProperties(event.target, paddingX);
      }
    });

    //TODO: optimize the resize event
    window.addEventListener("resize", (event) => {
      const activeLink = this.nav?.querySelector(".nav__link--active");
      console.log("resize", activeLink.offsetWidth);
      if (activeLink) {
        this.#setUnderlineProperties(activeLink, paddingX);
      }
    })
  }

  /** 
   * set active link
   */
  #setActiveLink(element) {
    this.nav?.querySelectorAll(".nav__link").forEach((link) => {
      if (link !== element) {
        link.classList.remove("nav__link--active");
        link.setAttribute('aria-selected', 'false');
      } else {
        link.classList.add("nav__link--active");
        link.setAttribute('aria-selected', 'true');
      }
    });
  }

  /**
   * Set underline properties
   */
  #setUnderlineProperties(target, paddingX) {
    this.nav.style.setProperty(
      "--nav-underline-width",
      `${target.offsetWidth}px`
    );

    this.nav.style.setProperty(
      "--nav-underline-offset-x",
      `${target.offsetLeft - paddingX}px`
    );
  }


  /**
   * Create a list element for the navigation
   * @param {string} text
   * @param {string} href 
   * @returns HTMLLIElement
   */

  #createListElement({ label, section }) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    
    li.classList.add("nav__item");

    button.id = section;
    button.classList.add("nav__link");
    button.setAttribute('aria-selected', 'false');
    
    button.textContent = label;

    li.appendChild(button);

    return li;
  }

  /**
   * Create a navigation element
   * @param {Array<{label: string, section: string}>} data
   * @returns HTMLNavElement
   */
  #createNavigation(data) {
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    
    nav.classList.add("nav");
    ul.classList.add("nav__items");

    data.forEach((item) => {
      ul.appendChild(this.#createListElement(item));
    });

    nav.appendChild(ul);

    console.log(nav);

    return nav;
  }
}
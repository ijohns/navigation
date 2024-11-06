import './style.css'
import { Navigation } from './navigation.js';
import { cities } from './data/navigation.json';


// I ran out of time. 
function createNavigation(data) {
  return`
    <nav class="nav">
      <ul class="nav__items">
        ${data.map((item, index) => {
          return `
            <li class="nav__item">
              <button class="nav__link ${index == 0 && "nav__link--active"}">
                ${item.label}
              </button>
            </li>
          `;
        }).join('')}
      </ul>
    </nav>
  `;
}

document.querySelector('#app').innerHTML = createNavigation(cities);

const menus = document.querySelectorAll(".nav__items")

menus && menus?.forEach(element => {
	new Navigation(element);
});

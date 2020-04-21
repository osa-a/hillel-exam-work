'use strict';

//*   MAIN   *//

function insertMain(page) {
    const mainFooter = document.getElementById('main-footer');
    let parentDiv = mainFooter.parentNode;
    parentDiv.insertBefore(page, mainFooter);
}

function switchPage(page, reload) {
    switch (page) {
        case 'homepage':
            document.getElementById('cartButton').style.visibility = 'visible';
            cleaner(reload);
            createHomepage();
            break;
        case 'decoration':
            document.getElementById('cartButton').style.visibility = 'visible';
            createCategoryPage('Decoration', reload);
            setSelectedFilter(reload);
            watchPriceRange();
            break;
        case 'furniture':
            document.getElementById('cartButton').style.visibility = 'visible';
            createCategoryPage('Furniture', reload);
            setSelectedFilter(reload);
            watchPriceRange();
            break;
        case 'shop':
            document.getElementById('cartButton').style.visibility = 'visible';
            createCategoryPage('Shop', reload);
            setSelectedFilter(reload);
            watchPriceRange();
            break;
        case 'cart':
            getCartLocal();
            if (cart.length > 0) {
                createCartPage(reload);
            } else {
                createModalCart();
            }
            break;
        case 'item-card':
            document.getElementById('cartButton').style.visibility = 'visible';
            сreateItemCardPage(reload);
            break;
        default:
            createHomepage();
            break;
    }
}

function cleaner(reload) {
    if (!reload) {
        const mainContainer = document.querySelector('.main');
        mainContainer.innerHTML = '';
        mainContainer.remove();
    }
}

function cartFilter(cart, element) {
    for (let i = 0; i < cart.length; i++) {
        if(cart[i].id === element){
            return 'already';
        }
    }
}

function sorryMessage() {
    const container = document.querySelector('.category-wrapper');
    const section = document.createElement('section');
    section.classList.add('shop-head');
    const message = document.createElement('div');
    message.classList.add('empty-message');
    message.innerText = 'We\'re  sorry to say but we don\'t have products you were looking for';
    section.appendChild(message);
    container.appendChild(section);
}
//*   HOMEPAGE  +  CATEGORY    *// 

function createShopLine(array, start, amount, calssName, page, secondClass) {
    const section = document.createElement('section');
    section.classList.add(calssName);
    if (secondClass) {
        section.classList.add(secondClass);
    }
    for (let i = start; i < amount; i++) {
        createCard(array, i, section);
    }
    page.appendChild(section);
}

function createCard(items, i, container) {
    const shopCard = document.createElement('div');
    shopCard.classList.add('shop-card');
    const cardImg = document.createElement('img');
    cardImg.classList.add('card-image', 'another-page');
    cardImg.setAttribute('data-page', 'item-card');
    cardImg.setAttribute('data-item', items[i].id);
    cardImg.setAttribute('src', `img/category-shop-cards/${items[i].id}.png`);
    cardImg.setAttribute('alt', 'item');

    const description = document.createElement('div');
    description.classList.add('card-description');
    const itemName = document.createElement('h4');
    itemName.classList.add('card-item-name');
    itemName.innerText = items[i].name;
    const price = document.createElement('p');
    price.classList.add('card-price');
    price.innerText = `${items[i].price}$`;
    const cartBtn = document.createElement('button');
    cartBtn.classList.add('card-cart-button');
    cartBtn.setAttribute('type', 'buton');
    cartBtn.setAttribute('data-cart', items[i].id);

    description.appendChild(itemName);
    description.appendChild(price);
    shopCard.appendChild(cardImg);
    shopCard.appendChild(description);
    shopCard.appendChild(cartBtn);
    container.appendChild(shopCard);
}

//*   LISTENERS   *//

function mainPageListener(wrapper) {
    wrapper.addEventListener('click', e => {
        const click = e.target.classList.contains('another-page');
        if (!click) {
            return;
        }
        setIdToSession(e, 'page', 'page');
        const page = e.target.getAttribute('data-page');
        switchPage(page);
        document.documentElement.scrollTop = 0;
    });
}

function shopCardListener(container, reload) {
    container.addEventListener('click', (e) => {
        let clicked = e.target.getAttribute('data-item');
        if (!clicked) {
            return;
        }
        setIdToStorage(e, 'item', 'item');
        сreateItemCardPage(reload);
    });
}

function cartButtonListener(wrapper) {
    wrapper.addEventListener('click', (e) => {
        let clicked = e.target.getAttribute('data-cart');
        if (!clicked) {
            return;
        };
        let itemElement = {
            id: clicked,
            amount: 1,
        };
        let filteredCart = cartFilter(cart, itemElement.id);
        if (filteredCart === 'already') {
            createModalCart();
            return;
        }
        cart.push(itemElement);
        setDataToLocal('cart', cart);
        createModalCart();
    });
}

function filterListener() {
    wrapper.addEventListener('click', (e) => {
        let clicked = e.target.classList.contains('filter-button');
        if (!clicked) {
            return;
        }
        const section = document.querySelector('.category-wrapper');
        shopLineCleaner();
        let filtered = filterFormTrigger();
        if (filtered.length === 0) {
            setDataToSession('sorry', true);
            sorryMessage();
            return;
        }
        sessionStorage.removeItem('Data-sorry');
        setDataToSession('filter', filtered);
        createShopLine(filtered, 0, filtered.length, 'shop-head', section);
        let checkboxes = getCheckedForStorage();
        setDataToSession('checkbox', checkboxes);
    });
}

//*   LOCAL + SESSION STORAGES   *//

let setDataToLocal = (dataName, data) => {
    let cartInJSONFormat = JSON.stringify(data);
    return localStorage.setItem(dataName, cartInJSONFormat);
};

let getCartLocal = () => {
    if (localStorage.getItem('cart')) {
        return cart = JSON.parse(localStorage.getItem('cart'));
    }
};

let getOrdersLocal = () => {
    if (localStorage.getItem('orders')) {
        return orders = JSON.parse(localStorage.getItem('orders'));
    }
};

let setIdToStorage = (e, data, item) => {
    let selectedData = e.target.dataset[item];
    localStorage.setItem(`Data-${data}`, JSON.stringify(selectedData));
};

let getIdFromStorage = (data) => {
    let selectedData = JSON.parse(localStorage.getItem(`Data-${data}`));
    return selectedData;
};

let setIdToSession = (e, data, item) => {
    let selectedData = e.target.dataset[item];
    sessionStorage.setItem(`Data-${data}`, JSON.stringify(selectedData));
};

let setDataToSession = (data, array) => {
    sessionStorage.setItem(`Data-${data}`, JSON.stringify(array));
};

let getDataFromSession = (data) => {
    let selectedData = JSON.parse(sessionStorage.getItem(`Data-${data}`));
    return selectedData;
};

//* RATING *// 

let createRatingArray = () => {
    items.forEach(element => {
        if (element.comments.length > 1) {
            let innerArr = [];
            for (let k = 0; k < element.comments.length; k++) {
                let newEl = parseInt(element.comments[k].rate);
                innerArr.push(newEl);
            }
            let average = findAverage(innerArr);
            addRatingToProduct(element.id, average);

        } else {
            for (let i = 0; i < element.comments.length; i++) {
                let newEl = [parseInt(element.comments[i].rate)];
                let average = findAverage(newEl);
                addRatingToProduct(element.id, average);
            }
        }
    });
};

let findAverage = (element) => {
    const rating = element;
    let average = 0;

    for (let item of rating) {
        average += item;
    }
    average = average / rating.length;
    average = Math.round(average);
    return average;
};

let addRatingToProduct = (id, average) => {
    items.forEach(element => {
        if (element.id === id) {
            element.rating = average;
        }
    });
};

//*   SCROLL TOP BTN   *//

$(document).on('scroll', window, function () {
    if ($(window).scrollTop() > 200) {
        $('#scrollTopButton').show();
    } else {
        $('#scrollTopButton').hide();
    }
});

function scrollTop(){
    document.getElementById('scrollTopButton').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });
}
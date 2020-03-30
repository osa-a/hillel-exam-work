'use strict';

function createCard(items, i, path, section) {
    const shopCard = document.createElement('div');
    shopCard.classList.add('shop-card');
    const cardImg = document.createElement('img');
    cardImg.classList.add('card-image');
    cardImg.setAttribute('data-item', items[i].id);
    cardImg.setAttribute('src', `${path}img/category-shop-cards/${items[i].id}.png`);
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
    section.appendChild(shopCard);
}

function shopCardListener(container) {
    container.addEventListener('click', (e) => {
        let clicked = e.target.getAttribute('data-item');
        if (!clicked) {
                return;
        };
//функция перехода на страницу карточки товара + отрисовка
        document.location.href = "../pages/product_card.html";
    })
}

function cartButtonListener(container) {
    container.addEventListener('click', (e) => {
        let clicked = e.target.getAttribute('data-cart');
        if (!clicked) {
                return;
        };
//функция добавления в корзину 
    })
}
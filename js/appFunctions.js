'use strict';

//*   MAIN   *//

function insertMain(page) {
    const mainFooter = document.getElementById('main-footer');
    let parentDiv = mainFooter.parentNode;
    parentDiv.insertBefore(page, mainFooter);
}

function switchPage(page, reload) {
    switch (page) {
        case '1':
            cleaner(reload);
            createHomepage();
            break;
        case '2':
            createCategoryPage('Decoration', reload);
            setSelectedFilter(reload);
            watchPriceRange()
            break;
        case '3':
            createCategoryPage('Furniture', reload);
            setSelectedFilter(reload);
            watchPriceRange()
            break;
        case '4':
            createCategoryPage('Shop', reload);
            setSelectedFilter(reload);
            watchPriceRange()
            break;
        case '5':
            if (cart.length > 0) {
                createCartPage(reload);
                sendOrder();
            } else {
                createModalCart();
            }
            break;
        case '6':
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

// function changeCss(style) {
//     const mainCss = document.querySelector('.style-css-files');
//     mainCss.setAttribute('href', `css/${style}/${style}.css`)
// }

//*   HOMEPAGE  +  CATEGORY    *// 

function createShopLine(array, start, amount, calssName, page, secondClass) {
    const section = document.createElement('section');
    section.classList.add(calssName);
    if(secondClass){
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
    cardImg.setAttribute('data-page', '6');
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
    cartBtn.classList.add('card-cart-button', 'another-page');
    cartBtn.setAttribute('type', 'buton');
    cartBtn.setAttribute('data-page', '6');
    cartBtn.setAttribute('data-item', items[i].id);

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
    });
}

function shopCardListener(container, reload) {
    container.addEventListener('click', (e) => {
        let clicked = e.target.getAttribute('data-item');
        if (!clicked) {
            return;
        };
        setIdToStorage(e, 'item', 'item');
        сreateItemCardPage(reload);
    })
}

function cartButtonListener(wrapper) {
    wrapper.addEventListener('click', (e) => {
        let clicked = e.target.classList.contains('item-card-btn');
        if (!clicked) {
            return;
        };
        const amount = document.querySelector('.amount-of-goods__int').innerText;
        const itemElement = {
            id: e.target.getAttribute('data-product'),
            amount: parseInt(amount),
        }
        cart.push(itemElement);
        cart = cartFilter(cart);
    })
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
            sorryMessage();
            return;
        }
        setDataToSession('filter', filtered);
        createShopLine(filtered, 0, filtered.length, 'shop-head', section);
        let checkboxes = getCheckedForStorage();
        setDataToSession('checkbox', checkboxes);
    });
}

//*   LOCAL + SESSION STORAGES   *//

let setDataToSession = (data, array) => {
    sessionStorage.setItem(`Data-${data}`, JSON.stringify(array));
}

let setIdToSession = (e, data, item) => {
    let selectedData = e.target.dataset[item];
    sessionStorage.setItem(`Data-${data}`, JSON.stringify(selectedData));
}

let getIdFromSession = (data) => {
    let selectedData = JSON.parse(sessionStorage.getItem(`Data-${data}`));
    return selectedData;
}

let setIdToStorage = (e, data, item) => {
    let selectedData = e.target.dataset[item];
    localStorage.setItem(`Data-${data}`, JSON.stringify(selectedData));
}

let getIdFromStorage = (data) => {
    let selectedData = JSON.parse(localStorage.getItem(`Data-${data}`));
    return selectedData;
}

//*   MODAL CART   *//

function createModalCart() {
    const nav = document.querySelector('.navigation');
    const modalOrder = document.createElement('section');
    modalOrder.classList.add('modal-order');
    modalOrder.setAttribute('id', 'modalOrder');
    nav.appendChild(modalOrder);
    const modalOrderBody = document.createElement('div');
    modalOrderBody.classList.add('modal-order-body');
    modalOrder.appendChild(modalOrderBody);
    createButtonOrderClose(modalOrderBody);
    createOrderHeader(modalOrderBody);
    createOrderContent(modalOrderBody);
    createOrderFooter(modalOrderBody);
}

function createSelectedItems(parent) {
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (cart[i]['id'] === items[j]['id']) {
                const modalOrderItem = document.createElement('div');
                modalOrderItem.classList.add('modal-order-item');
                parent.appendChild(modalOrderItem);

                const modalOrderPic = document.createElement('img');
                modalOrderPic.classList.add('modal-order-pic');
                modalOrderPic.setAttribute('src', `./img/category-shop-cards/${items[j]['img']}`);
                modalOrderPic.setAttribute('alt', 'item__pic')
                modalOrderItem.appendChild(modalOrderPic);

                const modalOrderInfo = document.createElement('div');
                modalOrderInfo.classList.add('modal-order-info');
                modalOrderItem.appendChild(modalOrderInfo);

                const buttonDeleteItem = document.createElement('button');
                buttonDeleteItem.setAttribute('type', 'button');
                buttonDeleteItem.classList.add('modal-order-delete');
                buttonDeleteItem.innerText = 'x';
                modalOrderItem.appendChild(buttonDeleteItem);
                // delete item func
                deleteOrderItem();
                function deleteOrderItem() {

                }

                const modalOrderName = document.createElement('div');
                modalOrderName.classList.add('modal-order-name');
                modalOrderName.innerText = items[j]['name'];
                modalOrderInfo.appendChild(modalOrderName);

                const modalOrderNuminfo = document.createElement('div');
                modalOrderNuminfo.classList.add('modal-order-numinfo');
                modalOrderInfo.appendChild(modalOrderNuminfo);

                const modalOrderAmount = document.createElement('div');
                modalOrderAmount.classList.add('modal-order-amount');
                modalOrderNuminfo.appendChild(modalOrderAmount);
                const modalOrderAmountInit = document.createElement('div');
                modalOrderAmountInit.classList.add('modal-order-amount-init');
                modalOrderAmountInit.innerText = cart[i]['amount'];
                modalOrderAmount.appendChild(modalOrderAmountInit);
                const modalOrderAmountCounter = document.createElement('div');
                modalOrderAmountCounter.classList.add('modal-order-amount-counter');
                modalOrderAmount.appendChild(modalOrderAmountCounter);
                const modalOrderAmountPlus = document.createElement('div');
                modalOrderAmountPlus.classList.add('modal-order-amount-plus');
                modalOrderAmountPlus.innerText = '+';
                modalOrderAmountCounter.appendChild(modalOrderAmountPlus);
                const modalOrderAmountMinus = document.createElement('div');
                modalOrderAmountMinus.classList.add('modal-order-amount-minus');
                modalOrderAmountMinus.innerText = '-';
                modalOrderAmountCounter.appendChild(modalOrderAmountMinus);

                const modalOrderSum = document.createElement('div');
                modalOrderSum.classList.add('modal-order-sum');
                let price = parseInt(items[j]['price']);
                let amount = parseInt(cart[i]['amount']);
                let sumOfItems = price * amount;
                modalOrderSum.innerText = `${sumOfItems}$`;
                modalOrderNuminfo.appendChild(modalOrderSum);
            }
        }
    }
    //при создании модалки, у тебя идет проверка
    // на то, есть ли одинаковы товары, если есть
    // тогда этот элемент удаляется их массива и к другому такому же
    // прибавляется кол-во повторяющегося
    //обязательно проследи, что бы все работало корректно
    // функция проверки карзины лежит этажом ниже
}

function cartFilter(cart) {
    let cartAr = cart;
    for (let i = 0; i < cartAr.length;i++) {
        for (let j = 0; j < cartAr.length && j !== i; j++) {
            if (cartAr[i].id === cartAr[j].id) {
                cartAr[i].amount += cartAr[j].amount;
                cartAr.splice(j, 1);
            }
        }
    }
    return cartAr;
}

function createButtonOrderClose(modalOrderBody) {
    const buttonOrderClose = document.createElement('button');
    buttonOrderClose.setAttribute('type', 'button');
    buttonOrderClose.classList.add('modal-order-close');
    buttonOrderClose.setAttribute('id', 'modalOrderClose');
    buttonOrderClose.innerText = 'x';
    modalOrderBody.appendChild(buttonOrderClose);
    closeOrderCart();
}

function createOrderHeader(modalOrderBody) {
    const modalOrderHeader = document.createElement('div');
    modalOrderHeader.classList.add('modal-order-header');
    modalOrderBody.appendChild(modalOrderHeader);
    const modalOrderTitle = document.createElement('div');
    modalOrderTitle.classList.add('modal-order-title');
    modalOrderHeader.appendChild(modalOrderTitle);
    if (cart.length > 0) {
        modalOrderTitle.innerText = 'Your order';
    } else {
        modalOrderHeader.style.textAlign = 'center';
        modalOrderTitle.innerText = 'There are no products in the cart.';
    }
}

function createOrderContent(modalOrderBody) {
    const modalOrderContent = document.createElement('div');
    modalOrderContent.classList.add('modal-order-content');
    modalOrderBody.appendChild(modalOrderContent);
    if (cart.length > 0) {
        createSelectedItems(modalOrderContent);
    } else {
        modalOrderContent.style.textAlign = 'center';
        const modalOrderNoItems = document.createElement('div');
        modalOrderNoItems.classList.add('modal-order-noitems');
        modalOrderNoItems.innerText = 'You have a good taste. And we have a lot of interesting and necessary items.';
        modalOrderContent.appendChild(modalOrderNoItems);
    }
}

function createOrderFooter(modalOrderBody) {
    const modalOrderFooter = document.createElement('div');
    modalOrderFooter.classList.add('modal-order-footer');
    modalOrderBody.appendChild(modalOrderFooter);
    if (cart.length > 0) {
        const modalOrderTotal = document.createElement('div');
        modalOrderTotal.classList.add('modal-order-total');
        modalOrderTotal.innerText = 'Total:';
        modalOrderFooter.appendChild(modalOrderTotal);

        const buttonOrderContinue = document.createElement('button');
        buttonOrderContinue.setAttribute('type', 'button');
        buttonOrderContinue.classList.add('modal-order-button', 'modal-order-continue');
        buttonOrderContinue.setAttribute('id', 'modalOrderContinue');
        buttonOrderContinue.innerText = 'Continue shopping';
        modalOrderFooter.appendChild(buttonOrderContinue);

        const buttonOrderCheckout = document.createElement('button');
        buttonOrderCheckout.setAttribute('type', 'button');
        buttonOrderCheckout.classList.add('modal-order-button');
        buttonOrderCheckout.setAttribute('id', 'modalOrderCheckout');
        buttonOrderCheckout.innerText = 'Checkout';
        modalOrderFooter.appendChild(buttonOrderCheckout);
        continueOrder();
        openOrder();
    } else {
        const buttonOrderShopping = document.createElement('button');
        buttonOrderShopping.setAttribute('type', 'button');
        buttonOrderShopping.classList.add('modal-order-button');
        buttonOrderShopping.setAttribute('id', 'modalOrderShopping');
        buttonOrderShopping.innerText = 'Start shopping';
        modalOrderFooter.appendChild(buttonOrderShopping);
        modalOrderFooter.style.textAlign = 'center';
        startShopping();
    }
}

function openModalOrder() {
    let cartButton = document.getElementById('cartButton');
    cartButton.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        createModalCart();
    })
}

function closeOrderCart() {
    let modalOrderClose = document.getElementById('modalOrderClose');
    let modalOrder = document.getElementById('modalOrder');
    modalOrderClose.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
        modalOrder.remove();
    })
}

function continueOrder() {
    let modalOrderContinue = document.getElementById('modalOrderContinue');
    let modalOrder = document.getElementById('modalOrder');
    modalOrderContinue.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
        modalOrder.remove();
    })
}

function openOrder() {
    let modalOrderCheckout = document.getElementById('modalOrderCheckout');
    let modalOrder = document.getElementById('modalOrder');
    modalOrderCheckout.addEventListener('click', () => {
        modalOrderCheckout.classList.add('another-page');
        modalOrderCheckout.setAttribute('data-page', '5');
        document.body.style.overflow = 'auto';
        modalOrder.remove();
    })
}

function startShopping() {
    let cartButtonShopping = document.getElementById('modalOrderShopping');
    let modalOrder = document.getElementById('modalOrder');
    cartButtonShopping.addEventListener('click', () => {
        cartButtonShopping.classList.add('another-page');
        cartButtonShopping.setAttribute('data-page', '4');
        document.body.style.overflow = 'auto';
        modalOrder.remove();
    })
}
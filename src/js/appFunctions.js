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
            watchPriceRange();
            break;
        case '3':
            createCategoryPage('Furniture', reload);
            setSelectedFilter(reload);
            watchPriceRange();
            break;
        case '4':
            createCategoryPage('Shop', reload);
            setSelectedFilter(reload);
            watchPriceRange();
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

function cartFilter(cart, element) {
    for (let i = 0; i < cart.length; i++) {
        if(cart[i].id === element){
            return 'already';
        }
    }
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
        sendToLS(cart);
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

let sendToLS = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

let reloadCart = () => {
    if (localStorage.getItem('cart')) {
        return cart = JSON.parse(localStorage.getItem('cart'));
    }
};

let setDataToSession = (data, array) => {
    sessionStorage.setItem(`Data-${data}`, JSON.stringify(array));
};

let setIdToSession = (e, data, item) => {
    let selectedData = e.target.dataset[item];
    sessionStorage.setItem(`Data-${data}`, JSON.stringify(selectedData));
};

let getIdFromSession = (data) => {
    return selectedData = JSON.parse(sessionStorage.getItem(`Data-${data}`));
};

let setIdToStorage = (e, data, item) => {
    let selectedData = e.target.dataset[item];
    localStorage.setItem(`Data-${data}`, JSON.stringify(selectedData));
};

let getIdFromStorage = (data) => {
    return selectedData = JSON.parse(localStorage.getItem(`Data-${data}`));
};

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
    deleteOrderItem();
}

function createSelectedItems(parent) {
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (cart[i]['id'] === items[j]['id']) {
                createOrderItem(parent, i, j);
            }
        }
    }
}

function createOrderItem(parent, i, j) {
    const modalOrderItem = document.createElement('div');
    modalOrderItem.classList.add('modal-order-item');
    modalOrderItem.setAttribute('data-selected', cart[i].id);
    parent.appendChild(modalOrderItem);
    createOrderPic(modalOrderItem, j);
    createOrderInfo(modalOrderItem, i, j);
    createOrderDeleteBtn(modalOrderItem, i);
}

function createOrderPic(modalOrderItem, j) {
    const modalOrderPic = document.createElement('img');
    modalOrderPic.classList.add('modal-order-pic');
    modalOrderPic.setAttribute('src', `./img/category-shop-cards/${items[j]['img']}`);
    modalOrderPic.setAttribute('alt', 'item__pic');
    modalOrderItem.appendChild(modalOrderPic);
}

function createOrderInfo(modalOrderItem, i, j) {
    const modalOrderInfo = document.createElement('div');
    modalOrderInfo.classList.add('modal-order-info');
    modalOrderItem.appendChild(modalOrderInfo);
    createOrderNameItem(modalOrderInfo, j);
    createOrderNumInfo(modalOrderInfo, i, j);
}

function createOrderDeleteBtn(modalOrderItem, i) {
    const buttonDeleteItem = document.createElement('button');
    buttonDeleteItem.setAttribute('type', 'button');
    buttonDeleteItem.classList.add('modal-order-delete');
    buttonDeleteItem.setAttribute('data-delete', cart[i].id);
    buttonDeleteItem.innerText = 'x';
    modalOrderItem.appendChild(buttonDeleteItem);
}
// delete item func
function deleteOrderItem() {
    const modalOrderContent = document.getElementById('modalOrderContent');
    modalOrderContent.addEventListener('click', (e) => {
        let clicked = e.target.getAttribute('data-delete');
        if (!clicked) {
            return;
        }
        const modalOrderItem = document.querySelectorAll('.modal-order-item');
        for (let i = 0; i < modalOrderItem.length; i++) {
            if (modalOrderItem[i].dataset.selected === clicked) {
                modalOrderItem[i].remove();
            }
            for (let j = 0; j < cart.length; j++) {
                if (cart[j]['id'] === clicked) {
                    cart.splice(j, 1);
                    sendToLS(cart);
                    return;
                }
            }
            if (modalOrderItem.length === 1) {
                let modalOrder = document.getElementById('modalOrder');
                document.body.style.overflow = 'auto';
                modalOrder.remove();
            }
        }
    });
}

function createOrderNameItem(modalOrderInfo, j) {
    const modalOrderName = document.createElement('div');
    modalOrderName.classList.add('modal-order-name');
    modalOrderName.innerText = items[j]['name'];
    modalOrderInfo.appendChild(modalOrderName);
}

function createOrderNumInfo(modalOrderInfo, i, j) {
    const modalOrderNumInfo = document.createElement('div');
    modalOrderNumInfo.classList.add('modal-order-numinfo');
    modalOrderInfo.appendChild(modalOrderNumInfo);
    createOrderAmount(modalOrderNumInfo, i);
    createOrderSum(modalOrderNumInfo, i, j);
}

function createOrderAmount(modalOrderNumInfo, i) {
    const modalOrderAmount = document.createElement('div');
    modalOrderAmount.classList.add('modal-order-amount');
    modalOrderNumInfo.appendChild(modalOrderAmount);
    createOrderAmountInit(modalOrderAmount, i);
    createOrderAmountCounter(modalOrderAmount);
    calcAmountOfItem(i);
}

function createOrderAmountInit(modalOrderAmount, i) {
    const modalOrderAmountInit = document.createElement('div');
    modalOrderAmountInit.classList.add('modal-order-amount-init');
    modalOrderAmount.appendChild(modalOrderAmountInit);
}

function createOrderAmountCounter(modalOrderAmount) {
    const modalOrderAmountCounter = document.createElement('div');
    modalOrderAmountCounter.classList.add('modal-order-amount-counter');
    modalOrderAmount.appendChild(modalOrderAmountCounter);
    OrderAmountPlus(modalOrderAmountCounter);
    createOrderAmountMinus(modalOrderAmountCounter);
}

function OrderAmountPlus(modalOrderAmountCounter) {
    const modalOrderAmountPlus = document.createElement('div');
    modalOrderAmountPlus.classList.add('modal-order-amount-plus');
    modalOrderAmountPlus.innerText = '+';
    modalOrderAmountCounter.appendChild(modalOrderAmountPlus);
}

function createOrderAmountMinus(modalOrderAmountCounter) {
    const modalOrderAmountMinus = document.createElement('div');
    modalOrderAmountMinus.classList.add('modal-order-amount-minus');
    modalOrderAmountMinus.innerText = '-';
    modalOrderAmountCounter.appendChild(modalOrderAmountMinus);
}
function calcAmountOfItem(i) {
    let amount = document.querySelector('.modal-order-amount-init').innerText = cart[i]['amount'];
    document.querySelector('.modal-order-amount-counter').addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-order-amount-plus')) {
            amount += 1;
            changeAmountValue(amount, i);
        } else if (e.target.classList.contains('modal-order-amount-minus')) {
            if (amount <= 1) {
                document.querySelector('.modal-order-amount-init').innerText = cart[i]['amount'];
                amount = 1;
            } else {
                amount -= 1;
                changeAmountValue(amount, i);
            }
        }
    });
}
let changeAmountValue = (amount, i) => {
    if (amount < 1) {
        document.querySelector('.modal-order-amount-init').innerText = cart[i]['amount'];
        amount = 1;
    } else {
        document.querySelector('.modal-order-amount-init').innerText = amount;
        cart[i]['amount'] = amount;
        let price = parseInt(items[i]['price']);
        let sumOfItems = price * amount;
        document.querySelector('.modal-order-sum').innerText = `${sumOfItems}$`;
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            for (let j = 0; j < items.length; j++) {
                if (cart[i]['id'] === items[j]['id']) {
                    let price = parseInt(items[j]['price']);
                    let amount = parseInt(cart[i]['amount']);
                    let sumOfOneItem = price * amount;
                    total += sumOfOneItem;
                }
            }
        }
        document.querySelector('.modal-order-total').innerText = `Total: ${total}$`;
        sendToLS(cart);
    }
    return amount;
};

function createOrderSum(modalOrderNumInfo, i, j) {
    const modalOrderSum = document.createElement('div');
    modalOrderSum.classList.add('modal-order-sum');
    let price = parseInt(items[j]['price']);
    let amount = parseInt(cart[i]['amount']);
    let sumOfItems = price * amount;
    modalOrderSum.innerText = `${sumOfItems}$`;
    modalOrderNumInfo.appendChild(modalOrderSum);
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
    modalOrderContent.setAttribute('id', 'modalOrderContent');
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
        createOrderTotal(modalOrderFooter);
        createOrderContinueBtn(modalOrderFooter);
        createOrderCheckoutBtn(modalOrderFooter);
    } else {
        createOrderShoppingBtn(modalOrderFooter);
    }
}

function createOrderTotal(parent) {
    const modalOrderTotal = document.createElement('div');
    modalOrderTotal.classList.add('modal-order-total');
    parent.appendChild(modalOrderTotal);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (cart[i]['id'] === items[j]['id']) {
                let price = parseInt(items[j]['price']);
                let amount = parseInt(cart[i]['amount']);
                let sumOfOneItem = price * amount;
                total += sumOfOneItem;
            }
        }
    }
    modalOrderTotal.innerText = `Total: ${total}$`;
}

function createOrderContinueBtn(modalOrderFooter) {
    const buttonOrderContinue = document.createElement('button');
    buttonOrderContinue.setAttribute('type', 'button');
    buttonOrderContinue.classList.add('modal-order-button', 'modal-order-continue');
    buttonOrderContinue.setAttribute('id', 'modalOrderContinue');
    buttonOrderContinue.innerText = 'Continue shopping';
    modalOrderFooter.appendChild(buttonOrderContinue);
    continueOrder();
}

function createOrderCheckoutBtn(modalOrderFooter) {
    const buttonOrderCheckout = document.createElement('button');
    buttonOrderCheckout.setAttribute('type', 'button');
    buttonOrderCheckout.classList.add('modal-order-button');
    buttonOrderCheckout.setAttribute('id', 'modalOrderCheckout');
    buttonOrderCheckout.innerText = 'Checkout';
    modalOrderFooter.appendChild(buttonOrderCheckout);
    openOrder();
}

function createOrderShoppingBtn(modalOrderFooter) {
    const buttonOrderShopping = document.createElement('button');
    buttonOrderShopping.setAttribute('type', 'button');
    buttonOrderShopping.classList.add('modal-order-button');
    buttonOrderShopping.setAttribute('id', 'modalOrderShopping');
    buttonOrderShopping.innerText = 'Start shopping';
    modalOrderFooter.appendChild(buttonOrderShopping);
    modalOrderFooter.style.textAlign = 'center';
    startShopping();
}

function openModalOrder() {
    let cartButton = document.getElementById('cartButton');
    cartButton.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        createModalCart();
    });
}

function closeOrderCart() {
    let modalOrderClose = document.getElementById('modalOrderClose');
    let modalOrder = document.getElementById('modalOrder');
    modalOrderClose.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
        modalOrder.remove();
    });
}

function continueOrder() {
    let modalOrderContinue = document.getElementById('modalOrderContinue');
    let modalOrder = document.getElementById('modalOrder');
    modalOrderContinue.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
        modalOrder.remove();
    });
}

function openOrder() {
    let modalOrderCheckout = document.getElementById('modalOrderCheckout');
    let modalOrder = document.getElementById('modalOrder');
    modalOrderCheckout.addEventListener('click', () => {
        modalOrderCheckout.classList.add('another-page');
        modalOrderCheckout.setAttribute('data-page', '5');
        document.body.style.overflow = 'auto';
        modalOrder.remove();
    });
}

function startShopping() {
    let cartButtonShopping = document.getElementById('modalOrderShopping');
    let modalOrder = document.getElementById('modalOrder');
    cartButtonShopping.addEventListener('click', () => {
        cartButtonShopping.classList.add('another-page');
        cartButtonShopping.setAttribute('data-page', '4');
        document.body.style.overflow = 'auto';
        modalOrder.remove();
    });
}

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
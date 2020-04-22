'use strict';

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
    if (cart.length > 0) {
        deleteOrderItem();
        calcCounter();
        calcTotal();
    }
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
    const modalOrderContent = document.querySelector('.modal-order-content');
    modalOrderContent.addEventListener('click', (e) => {
        let page = getDataFromSession('Data-page');
        let clicked = e.target.getAttribute('data-delete');
        if (!clicked) {
            return;
        }
        const modalOrderItem = document.querySelectorAll('.modal-order-item');
        const modalOrderDelete = document.querySelectorAll('.modal-order-delete');
        for (let i = 0; i < modalOrderItem.length; i++) {
            if (modalOrderItem[i].dataset.selected === clicked) {
                modalOrderItem[i].remove();
            }
            for (let j = 0; j < cart.length; j++) {
                if (cart[j]['id'] === clicked) {
                    cart.splice(j, 1);
                    setDataToLocal('cart', cart);
                }
                calcTotal();
            }
            if (cart.length === 0) {
                localStorage.removeItem('cart');
                if (page === 'cart') {
                    modalOrderDelete[i].classList.add('another-page');
                    modalOrderDelete[i].setAttribute('data-page', 'homepage');
                    document.getElementById('cartButton').style.visibility = 'visible';
                    window.scrollTo(0, 0);
                } else {
                    removeModalCart();
                }
            }
        }
    });
}

function removeModalCart() {
    let modalOrder = document.getElementById('modalOrder');
    document.body.style.overflow = 'auto';
    modalOrder.innerHTML = '';
    modalOrder.remove();
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
    createOrderAmountCounter(modalOrderAmount, i);
}

function createOrderAmountInit(modalOrderAmount, i) {
    const modalOrderAmountInit = document.createElement('div');
    modalOrderAmountInit.classList.add('modal-order-amount-init');
    if (cart.length > 0) {
        modalOrderAmountInit.innerText = cart[i]['amount'];
        modalOrderAmountInit.setAttribute('data-counter', cart[i]['id']);
        modalOrderAmount.appendChild(modalOrderAmountInit);
    }
}

function createOrderAmountCounter(modalOrderAmount, i) {
    const modalOrderAmountCounter = document.createElement('div');
    modalOrderAmountCounter.classList.add('modal-order-amount-counter');
    modalOrderAmount.appendChild(modalOrderAmountCounter);
    OrderAmountPlus(modalOrderAmountCounter, i);
    createOrderAmountMinus(modalOrderAmountCounter, i);
}

function OrderAmountPlus(modalOrderAmountCounter, i) {
    const modalOrderAmountPlus = document.createElement('div');
    modalOrderAmountPlus.classList.add('modal-order-amount-plus');
    modalOrderAmountPlus.innerText = '+';
    modalOrderAmountPlus.setAttribute('data-plus', cart[i]['id']);
    modalOrderAmountCounter.appendChild(modalOrderAmountPlus);
}

function createOrderAmountMinus(modalOrderAmountCounter, i) {
    const modalOrderAmountMinus = document.createElement('div');
    modalOrderAmountMinus.classList.add('modal-order-amount-minus');
    modalOrderAmountMinus.innerText = '-';
    modalOrderAmountMinus.setAttribute('data-minus', cart[i]['id']);
    modalOrderAmountCounter.appendChild(modalOrderAmountMinus);
}

// counter
function calcCounter() {
    let content = document.querySelector('.modal-order-content');
    let counter = document.querySelectorAll('.modal-order-amount-init');
    let sum = document.querySelectorAll('.modal-order-sum');
    content.addEventListener('click', (e) => {
        let plusClick = e.target.getAttribute('data-plus');
        let minusClick = e.target.getAttribute('data-minus');
        if (!plusClick && !minusClick) {
            return;
        }
        for (let i = 0; i < counter.length; i++) {
            let amount = counter[i].innerText = cart[i]['amount'];
            let price = parseInt(sum[i].innerText) / cart[i]['amount'];
            if (counter[i].dataset.counter === plusClick) {
                amount += 1;
                changeAmountValue(amount, i);
            }
            if (counter[i].dataset.counter === minusClick) {
                amount -= 1;
                changeAmountValue(amount, i);
            }
            sum[i].innerText = `${price * cart[i]['amount']}$`;
            calcTotal();
            setDataToLocal('cart', cart);
        }
    });
}

let changeAmountValue = (amount, i) => {
    let counter = document.querySelectorAll('.modal-order-amount-init');
    if (amount <= 1) {
        counter[i].innerText = 1;
        cart[i]['amount'] = amount = 1;
    } else {
        counter[i].innerText = amount;
        cart[i]['amount'] = amount;
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
    if (document.querySelector('.sendOrder')) {
        modalOrderHeader.style.textAlign = 'center';
        modalOrderTitle.innerText = 'Thank you for the order.';
    } else if (cart.length > 0) {
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
    if (document.querySelector('.sendOrder')) {
        const modalThanksItems = document.createElement('div');
        modalThanksItems.classList.add('modal-order-items');
        modalOrderContent.appendChild(modalThanksItems);
        modalOrderContent.style.textAlign = 'center';
        modalThanksItems.innerText = 'Looking forward to see you again';
    } else if (cart.length > 0) {
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
    if (!document.querySelector('.sendOrder')) {
        if (cart.length > 0) {
            createOrderTotal(modalOrderFooter);
            createOrderContinueBtn(modalOrderFooter);
            createOrderCheckoutBtn(modalOrderFooter);
        } else {
            createOrderShoppingBtn(modalOrderFooter);
        }
    }
}

function createOrderTotal(parent) {
    const modalOrderTotal = document.createElement('div');
    modalOrderTotal.classList.add('modal-order-total');
    parent.appendChild(modalOrderTotal);
}

function calcTotal() {
    const modalOrderTotal = document.querySelector('.modal-order-total');
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
    modalOrderClose.addEventListener('click', () => {
        removeModalCart();
    });
}

function continueOrder() {
    let modalOrderContinue = document.getElementById('modalOrderContinue');
    modalOrderContinue.addEventListener('click', () => {
        removeModalCart();
    });
}

function openOrder() {
    let modalOrderCheckout = document.getElementById('modalOrderCheckout');
    modalOrderCheckout.addEventListener('click', () => {
        modalOrderCheckout.classList.add('another-page');
        modalOrderCheckout.setAttribute('data-page', 'cart');
        removeModalCart();
    });
}

function startShopping() {
    let cartButtonShopping = document.getElementById('modalOrderShopping');
    cartButtonShopping.addEventListener('click', () => {
        cartButtonShopping.classList.add('another-page');
        cartButtonShopping.setAttribute('data-page', 'shop');
        removeModalCart();
    });
}
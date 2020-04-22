'use strict';

function createCartPage(reload) {
    cleaner(reload);
    const cartPage = document.createElement('main');
    cartPage.classList.add('main');
    document.getElementById('cartButton').style.visibility = 'hidden';
    createCartPageHead(cartPage);
    createCartPageBody(cartPage);
    insertMain(cartPage);
    sendOrder();
    calcTotal();
    calcCounter();
    deleteOrderItem();
}
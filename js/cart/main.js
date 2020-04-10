'use strict';

function createCartPage(reload) {
    cleaner(reload);
    changeCss('cart');
    const cartPage = document.createElement('main');
    cartPage.classList.add('main');
    createCartPageHead(cartPage);
    createCartPageBody(cartPage);

    insertMain(cartPage);
}
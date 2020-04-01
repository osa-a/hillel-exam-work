'use strict';

function createCartPage() {
    cleaner();
    changeCss('cart');
    const cartPage = document.createElement('main');
    cartPage.classList.add('cartpage');
    creatCartPageHead(cartPage);
    creatCartPageBody(cartPage);

    //shopCardListener(wrapper);
    insertMain(cartPage);
}
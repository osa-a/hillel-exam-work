'use strict'

function createHomepage() {
    changeCss('style');
    const homepage = document.createElement('main');
    homepage.classList.add('main');
    createHomepageHead(homepage);
    createShopLine(items, 0, 4, 'shop-head', homepage);
    createBanner(homepage);
    createShopLine(items, 4, 8, 'shop-footer', homepage);
    createAboutUs(homepage);
    shopCardListener(wrapper);
    cartButtonListener(wrapper);
    insertMain(homepage);
}
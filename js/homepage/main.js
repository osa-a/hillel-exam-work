'use strict'

function createHomepage() {
    const homepage = document.createElement('main');
    homepage.classList.add('homepage');
    createHomepageHead(homepage);
    createShopLine(items, 0, 4, 'shop-head', homepage);
    createBanner(homepage);
    createShopLine(items, 4, 8, 'shop-footer', homepage);
    createAboutUs(homepage);
    shopCardListener(wrapper);
    cartButtonListener(wrapper);
    insertMain(homepage);
}


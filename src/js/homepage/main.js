'use strict';

function createHomepage() {
    const homepage = document.createElement('main');
    homepage.classList.add('main');
    createHomepageSlider(homepage, slider);
    createShopLine(items, 0, 4, 'shop-line', homepage, 'shop-line-top');
    createBanner(homepage);
    createShopLine(items, 4, 8, 'shop-line', homepage, 'shop-line-bot');
    createAboutUs(homepage);
    insertMain(homepage);
}
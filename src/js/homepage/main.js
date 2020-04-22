'use strict';

function createHomepage() {
    const homepage = document.createElement('main');
    homepage.classList.add('main');
    // slider из data.json получаем
    createHomepageSlider(homepage, slider);
    //передается индекс элемента с которого начать и до которого идти 
    createShopLine(items, 0, 4, 'shop-line', homepage, 'shop-line-top');
    createBanner(homepage);
    createShopLine(items, 4, 8, 'shop-line', homepage, 'shop-line-bot');
    createAboutUs(homepage);
    insertMain(homepage);
}
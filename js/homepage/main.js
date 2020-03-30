'use strict'

const shopHead = document.querySelector('.shop-head');
const shopFooter = document.querySelector('.shop-footer');

fetch('data.json')
    .then((res) => res.json())
    .then((res) => {
        categories = [...res.categories];
        material = [...res.material];
        type = [...res.type];
        descriptions = { ...res.descriptions };
        smallImg = { ...res.smallImg };
        createData();
        createHomepage();
    });

function createHomepage(){
    createShopLine(items, 0, 4, '../../', shopHead);
    createShopLine(items, 4, 8, '../../', shopFooter);
    shopCardListener(shopHead);
    shopCardListener(shopFooter);
    cartButtonListener(shopHead);
    cartButtonListener(shopFooter);
}


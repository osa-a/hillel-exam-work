'use strict'

const shopHead = document.querySelector('.shop-head');
const shopFooter = document.querySelector('.shop-footer');

createShopLine(items, 0, 4, '../../', shopHead);
createShopLine(items, 4, 8, '../../', shopFooter);
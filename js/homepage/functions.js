'use strict'

function createShopLine(items, amount, path) {
    for (let i = 0; i < amount; i++) {
        createCard(items, i, path);
    }
}
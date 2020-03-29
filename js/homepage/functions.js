'use strict'

function createShopLine(items, start, amount, path, section) {
    for (let i = start; i < amount; i++) {
        createCard(items, i, path, section);
    }
}
'use strict'

fetch('../../data.json')
    .then((res) => res.json())
    .then((res) => {
        categories = [...res.categories];
        material = [...res.material];
        type = [...res.type];
        descriptions = { ...res.descriptions };
        smallImg = { ...res.smallImg };
        createData();
        renderingProductCard(selectedId);
        renderingPics(selectedId);
    });

// SWITCHES LISTENERS

hideBlock();
addlistenerToSwitches();

// COUNTER OF AMOUNT OF THE PRODUCT

addlistenerToAmountOfProduct();

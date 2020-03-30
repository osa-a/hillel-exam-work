'use strict';

const categoryFilterContainer = document.querySelector('.category-filter');
const materialFilterContainer = document.querySelector('.material-filter');
const typeFilterContainer = document.querySelector('.type-filter');
const ratingFilterContainer = document.querySelector('.rating-filter');
const section = document.querySelector('.shop-head');

fetch('../../data.json')
    .then((res) => res.json())
    .then((res) => {
        categories = [...res.categories];
        material = [...res.material];
        type = [...res.type];
        descriptions = { ...res.descriptions };
        smallImg = { ...res.smallImg };
        createData();
        createCategoryPage();
    });


function createCategoryPage(){
    createItemsShop(items, items.length, '../../', section);
    createFilter(categoryFilterContainer, categories);
    createFilter(materialFilterContainer, material);
    createFilter(typeFilterContainer, type);
    createFilter(ratingFilterContainer, rating);
    shopCardListener(section);
    cartButtonListener(section);
}
'use strict';

const categoryFilterContainer = document.querySelector('.category-filter');
const materialFilterContainer = document.querySelector('.material-filter');
const typeFilterContainer = document.querySelector('.type-filter');
const ratingFilterContainer = document.querySelector('.rating-filter');

createItemsShop(items, items.length, '../');
createFilter(categoryFilterContainer, categories);
createFilter(materialFilterContainer, material);
createFilter(typeFilterContainer, type);
createFilter(ratingFilterContainer, rating);
'use strict';

let сreateItemCardPage = (reload) => {
    //get items from storage

//! setDataToLocal + getDataFromLocal 
//! ты тут дублируешь функции из файла commonFunc.js
//! 197 строчка
//! у нас так кругом бегом 10 функций связанных со стореджами
//! перебор
//! переделай пожалуйста с использованием тех, что уже есть

//? start
    items = createStorage(items, 'Items-data');
//? end
    // rating
    createRatingArray(); 

    // rendering main & css 
    const itemCardPage = document.createElement('main');
    itemCardPage.classList.add('main');

    insertMain(itemCardPage);
    cleaner(reload);

    createSectionCategoryHead();
    createSwitchesSection();
    createDescriptionBlock();
    createReviewSection();
    createReviewFormSection();

    // content rendering
    renderingProductCard();
    renderingPics();

    // switches listener
    hideBlock();
    addlistenerToSwitches();

    // change main pic
    addListenerToChangeMainPic();

    // add comments to review
//? start
    createStorage(comments, 'Comment-data');
//? end
};

// ADD DATA TO STORAGE
//? start
let createStorage = (arr, storageName) => {
    if (localStorage.getItem(storageName)) {
        arr = JSON.parse(localStorage.getItem(storageName)); 
    } else {
        localStorage.setItem(storageName, JSON.stringify(arr)); 
    }
        return arr;
};

let setDataToStorage = (arr, storageName) => localStorage.setItem(storageName, JSON.stringify(arr));
//? end
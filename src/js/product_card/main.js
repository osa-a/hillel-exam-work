'use strict';

let сreateItemCardPage = (reload) => {
    //get items from storage
    items = createItemsStorage(items);
    
    // rating
    createRatingArray(); 

    // отрисовка main и css 
    const itemCardPage = document.createElement('main');
    itemCardPage.classList.add('main');

    insertMain(itemCardPage);
    cleaner(reload);
    // changeCss('product_card');

    createSectionCategoryHead();
    createSwitchesSection();
    createDescriptionBlock();
    createReviewSection();
    createReviewFormSection();

    // отрисовка контента страницы
    renderingProductCard();
    renderingPics();

    // switches listener
    hideBlock();
    addlistenerToSwitches();

    // change main pic
    addListenerToChangeMainPic();

    // add comments to review
    // addEventListenetToReviewSubmit();
    createCommentStorage(comments);
};

function createItemsStorage(arr) {
    if (localStorage.getItem('Items-data')) {
        arr = JSON.parse(localStorage.getItem('Items-data')); 
    } else {
        localStorage.setItem('Items-data', JSON.stringify(arr)); 
    }

    return arr;
}

let setItemsToStorage = (arr) => localStorage.setItem('Items-data', JSON.stringify(arr));
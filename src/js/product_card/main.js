'use strict';

let сreateItemCardPage = (reload) => {
    //get items from storage
    items = createStorage(items, 'Items-data');
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
    createStorage(comments, 'Comment-data');
};
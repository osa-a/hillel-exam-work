'use strict'

'use strict'

let сreateItemCardPage = (reload) => {
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

    // counter of amount of product
    addlistenerToAmountOfProduct();

    // change main pic
    addListenerToChangeMainPic();

    // add comments to review
    addEventListenetToReviewSubmit();
};
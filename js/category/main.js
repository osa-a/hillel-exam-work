'use strict';


function createCategoryPage(text) {
    cleaner();
    changeCss('category');
    const category = document.createElement('main');
    category.classList.add('main');
    let filteredArray = items;
    if (text !== 'Shop') {
        filteredArray = items.filter((item) => {
            return item.category === text;
        });
    }
    console.log(filteredArray);
    createCategoryHead(category, text);
    createCategoryWrapper(category, filteredArray);
    shopCardListener(wrapper);
    cartButtonListener(wrapper);
    insertMain(category);
}
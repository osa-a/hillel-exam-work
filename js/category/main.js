'use strict';


function createCategoryPage(text, reload) {
    cleaner(reload);
    changeCss('category');
    const category = document.createElement('main');
    category.classList.add('main');
    let filteredArray = items;
    let shop = true;
    if (text !== 'Shop') {
        shop = false;
        filteredArray = items.filter((item) => {
            return item.category === text;
        });
    }
    let check = getIdFromSession('filter');
    if (check && check.lenght !== 0 && reload) {
        filteredArray = check;
    }
    createCategoryHead(category, text);
    createCategoryWrapper(category, filteredArray, shop, reload);
    insertMain(category);
}
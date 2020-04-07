'use strict';


function createCategoryPage(page, reload) {
    cleaner(reload);
    changeCss('category');
    const category = document.createElement('main');
    category.classList.add('main');
    let filteredArray = items;
    let shop = true;
    if (page !== 'Shop') {
        shop = false;
        filteredArray = items.filter((item) => {
            return item.category === page;
        });
    }
    let check = getIdFromSession('filter');
    if (check && check.lenght !== 0 && reload) {
        filteredArray = check;
    }
    createCategoryHead(category, page);
    createCategoryWrapper(category, filteredArray, shop);
    insertMain(category);
}
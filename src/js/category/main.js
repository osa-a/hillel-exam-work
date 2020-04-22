'use strict';

function createCategoryPage(page, reload) {
    cleaner(reload);
    createRatingArray();
    const category = document.createElement('main');
    category.classList.add('main');
    let filteredArray = items;
    // страница магазина
    let shop = true;
    //фильтрует массив продуктов в соответствии с категрией продуктов
    if (page !== 'Shop') {
        shop = false;
        filteredArray = items.filter((item) => {
            return item.category === page;
        });
    }
    //получение уже имеющихся фильтров в сешн сторедже
    let check = getDataFromSession('Data-filter');
    let sorry = getDataFromSession('Data-sorry');
    //выводит сорри меседж, если нет товара
    if(sorry){
        createCategoryHead(category, page);
        createCategoryWrapper(category, shop);
        insertMain(category);
        sorryMessage();
        return;
    }
    if (check && check.lenght !== 0 && reload ) {
        filteredArray = check;
    }
    createCategoryHead(category, page);
    createCategoryWrapper(category, shop, filteredArray);
    insertMain(category);
}
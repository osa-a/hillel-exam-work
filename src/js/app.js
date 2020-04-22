'use strict';

const wrapper = document.querySelector('.web-wrapper');
let page;

fetch('data.json')
    .then((res) => res.json())
    .then((res) => {
        categories = [...res.categories];
        material = [...res.material];
        type = [...res.type];
        descriptions = { ...res.descriptions };
        smallImg = { ...res.smallImg };
        slider = [...res.slider];
        createCommentsData();
        //создается data товаров из файла сущности Item.js
        createData();
        //страница из сешн сторедж
        page = getDataFromSession('Data-page');
        //переключатель страниц в который передается страница
        // и ture- была ли перезагрузка
        switchPage(page, true);
        //слушает переключение страниц
        mainPageListener(wrapper);
        //слушает переход на страницу кнкретного товара
        shopCardListener(wrapper);
        //слушает добавление товара в корзину
        cartButtonListener(wrapper);
        // слушает кнопку фильтр
        filterListener(wrapper);
        createRatingArray();
        getCartLocal();
        getOrdersLocal();
    });

openModalOrder();
scrollTop();
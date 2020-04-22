'use strict';

//*   CREATE   *//

function createCategoryHead(category, text) {
    const section = document.createElement('section');
    section.classList.add('category-head');
    const pageHead = document.createElement('div');
    pageHead.classList.add('page-head');
    const cartTitle = document.createElement('p');
    cartTitle.classList.add('cart-title');
    cartTitle.innerText = text;

    pageHead.appendChild(cartTitle);
    section.appendChild(pageHead);
    category.appendChild(section);
}

function createCategoryWrapper(category, shop, filteredArray) {
    const section = document.createElement('section');
    section.classList.add('category-wrapper');
    createFilterForm(section, shop);
    //отрисовывает товары в соответствии с отфильтрованным массивом
    if (filteredArray) {
        createShopLine(filteredArray, 0, filteredArray.length, 'shop-head', section);
    }
    category.appendChild(section);
}

function createFilterForm(section, shop) {
    const form = document.createElement('form');
    form.classList.add('filter-form');
    form.setAttribute('name', 'filterForm');
    createRange(form);
    const filterButton = document.createElement('button');
    filterButton.classList.add('filter-button');
    filterButton.setAttribute('type', 'button');
    filterButton.innerText = 'Filter';
    form.appendChild(filterButton);
    //если магаз, показывает все фильтры + по категориям
    if (shop) {
        createFilter(categories, form, 'category', 'Category');
    }
    createFilter(material, form, 'material', 'Material');
    createFilter(type, form, 'type', 'Type');
    createFilter(rating, form, 'rating', 'Rating');
    section.appendChild(form);
}

function createRange(form) {
    const rangeSlider = document.createElement('div');
    rangeSlider.classList.add('range-slider', 'filter');
    const rangeLabel = document.createElement('label');
    rangeLabel.classList.add('filter-name');
    rangeLabel.setAttribute('for', 'price');
    rangeLabel.innerText = 'Price:';
    const priceInput = document.createElement('div');
    priceInput.classList.add('price-input');
    const input = document.createElement('input');
    input.setAttribute('name', 'price');
    input.setAttribute('type', 'range');
    input.setAttribute('id', 'customRange');
    input.setAttribute('min', '0');
    input.setAttribute('max', '300');
    const spanValue = document.createElement('span');
    spanValue.classList.add('spanValue');

    priceInput.appendChild(input);
    priceInput.appendChild(spanValue);
    rangeSlider.appendChild(rangeLabel);
    rangeSlider.appendChild(priceInput);
    form.appendChild(rangeSlider);
}

function watchPriceRange() {
    $(document).ready(function () {
        //получаем элемент c отображением цены
        const $spanValue = $('.spanValue');
        //получаем цену
        const $value = $('#customRange');
        //устанавливаем текущую цену в спан
        $spanValue.html(`min: ${$value.val()}$`);
        //динамически меняем цену в спане при изменении ползунка
        $value.on('input change', () => {
            $spanValue.html(`min: ${$value.val()}$`);
        });
    });
}

function createFilter(dataArray, form, filterClass, text) {
    const container = document.createElement('div');
    container.classList.add(`${filterClass}-filter`, 'filter');
    const filterName = document.createElement('h5');
    filterName.classList.add('filter-name');
    filterName.innerText = text;
    container.appendChild(filterName);
    for (let i = 0; i < dataArray.length; i++) {
        createCheckBox(container, dataArray, i, text);
    }
    form.appendChild(container);
}

function createCheckBox(container, dataArray, i, text) {
    let input = document.createElement('input');
    let labelContainer = document.createElement('div');
    let label = document.createElement('label');
    let boxContainer = document.createElement('div');
    boxContainer.classList.add('pretty', 'p-default', 'p-curve', 'check-container');

    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `box${dataArray[i]}`);
    input.setAttribute('name', `check${text}`);
    input.setAttribute('value', dataArray[i]);
    input.classList.add('checkbox-margin', 'checkbox');

    labelContainer.classList.add('state', 'p-warning');
    label.setAttribute('for', `box${dataArray[i]}`);
    label.classList.add('filter-label');
    label.innerText = dataArray[i];

    boxContainer.appendChild(input);
    labelContainer.appendChild(label);
    boxContainer.appendChild(labelContainer);
    container.appendChild(boxContainer);
}

//*   RUN FILTER   *//

function getCheckboxesValue(checkboxName) {
    let ar = [];
    let check = document.querySelectorAll(`input[name=${checkboxName}]:checked`);
    for (let i = 0; i < check.length; i++) {
        ar.push(check[i].value);
    }
    return ar;
}

//получает данные из чекбоксов и ренджа
function filterFormTrigger() {
    const form = document.forms.filterForm;
    let obj = {
        price: form.elements.price.value,
        category: getCheckboxesValue('checkCategory'),
        material: getCheckboxesValue('checkMaterial'),
        type: getCheckboxesValue('checkType'),
        rating: getCheckboxesValue('checkRating'),
    };
    //сетит цену отдельно в сешн сторедж
    setDataToSession('Data-price', obj.price);
    //получает страницу на которой находится
    const page = getDataFromSession('Data-page');
    //фильтрует общий массив всех товаров, в зависимости от страницы категории
    let itemsAr = filterPageCategories(items, page);
    //с готовым массивом элементов и объектом выбранных чеков
    //запускается последовательность фильтров
    return filtersRun(itemsAr, obj);
}

function filterPageCategories(items, page) {
    let ar = [];
    switch (page) {
        case 'decoration':
            //если страница decor, возвращает массив элементов без элементов фурнитуры
            ar = items.filter((item) => {
                return item.category === 'Decoration';
            });
            break;
        case 'furniture':
            ar = items.filter((item) => {
                return item.category === 'Furniture';
            });
            break;
        case 'shop':
            ar = items;
            break;
    }
    return ar;
}

function filtersRun(elements, obj) {
    let array = elements.filter(element => {
        return element.price >= obj.price &&
            filtered(element, element.category, obj.category) &&
            filtered(element, element.material, obj.material) &&
            filtered(element, element.type, obj.type) &&
            filtered(element, element.rating, obj.rating, true);
    });
    return array;
}

let filtered = (element, property, obj, rating) => {
    //если какой-то тип чекбоксов не выбран,
    //например не выбран материалб что бы фильтр работал
    // исправно дальше
    if (obj.length === 0) {
        return true;
    }
    for (let elem of obj) {
        if (rating) {
            elem = parseInt(elem);
        }
        if (property === elem) {
            return element;
        }
    }
};

//*   AFTER RELOAD   *//

function setSelectedFilter(reload) {
    if (reload) {
        let checkboxes = document.getElementsByClassName('checkbox');
        let selected = getDataFromSession('Data-checkbox');
        if (!selected) {
            selected = [];
        }
        //* -- start  (price range from storage)
        let price = getDataFromSession('Data-price');
        const $value = $('#customRange');
        $value.val(price);
        //* -- ending
        for (let i = 0; i < checkboxes.length; i++) {
            for (let j = 0; j < selected.length; j++) {
                if (checkboxes[i].value === selected[j]) {
                    checkboxes[i].setAttribute('checked', 'checked');
                }
            }
        }
    }
}

function shopLineCleaner() {
    const container = document.querySelector('.shop-head');
    container.innerHTML = '';
    container.remove();
}

function getCheckedForStorage() {
    let checkboxes = document.getElementsByClassName('checkbox');
    let checked = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked.push(checkboxes[i].value);
        }
    }
    return checked;
}
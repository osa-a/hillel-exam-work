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

function createCategoryWrapper(category, filteredArray, shop) {
    const section = document.createElement('section');
    section.classList.add('category-wrapper');
    createFilterForm(section, shop);
    createShopLine(filteredArray, 0, filteredArray.length, 'shop-head', section);
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
        const $spanValue = $('.spanValue');
        const $value = $('#customRange');
        $spanValue.html(`${$value.val()}$`);
        $value.on('input change', () => {
            $spanValue.html(`${$value.val()}$`);
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
    let label = document.createElement('label');
    let boxContainer = document.createElement('div');

    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `box${dataArray[i]}`);
    input.setAttribute('name', `check${text}`);
    input.setAttribute('value', dataArray[i]);
    input.classList.add('checkbox-margin', 'checkbox');

    label.setAttribute('for', `box${dataArray[i]}`);
    label.classList.add('filter-label');
    label.innerText = dataArray[i];

    boxContainer.appendChild(input);
    boxContainer.appendChild(label);
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

function filterFormTrigger() {
    const form = document.forms.filterForm;
    let obj = {
        price: form.elements.price.value,
        category: getCheckboxesValue('checkCategory'),
        material: getCheckboxesValue('checkMaterial'),
        type: getCheckboxesValue('checkType'),
        rating: getCheckboxesValue('checkRating'),
    };

    setDataToSession('price', obj.price);
    const page = getIdFromSession('page');

    let itemsAr = filterPageCategories(items, page);
    return filtersRun(itemsAr, obj);
}

function filterPageCategories(items, page) {
    let ar = [];
    switch (page) {
        case '2':
            ar = items.filter((item) => {
                return item.category === 'Decoration';
            });
            break;
        case '3':
            ar = items.filter((item) => {
                return item.category === 'Furniture';
            });
            break;
        case '4':
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
        let selected = getIdFromSession('checkbox');
        if (!selected) {
            selected = [];
        }
        //* -- start  (price range from storage)
        let price = getIdFromSession('price');
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

function sorryMessage() {
    const container = document.querySelector('.category-wrapper');
    const section = document.createElement('section');
    section.classList.add('shop-head');
    const message = document.createElement('div');
    message.classList.add('empty-message');
    message.innerText = 'We\'re  sorry to say but we don\'t have products you were looking for';
    section.appendChild(message);
    container.appendChild(section);
}
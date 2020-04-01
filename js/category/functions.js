'use strict'

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

function createCategoryWrapper(category, filteredArray) {
    const section = document.createElement('section');
    section.classList.add('category-wrapper');
    createFilterForm(section);
    createShopLine(filteredArray, 0, filteredArray.length, 'shop-head', section);
    category.appendChild(section);
}

function createFilterForm(section) {
    const form = document.createElement('form');
    form.classList.add('filter-form');
    form.setAttribute('name', 'filter-form');
    createRange(form);
    const filterButton = document.createElement('button');
    filterButton.classList.add('filter-button');
    filterButton.setAttribute('type', 'button');
    filterButton.innerText = 'Filter';
    form.appendChild(filterButton);
    createFilter(categories, form, 'category', 'Category');
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
    priceInput.classList.add('price-input')
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
    form.appendChild(rangeSlider)
}

function createFilter(dataArray, form, filterClass, text) {
    const container = document.createElement('div');
    container.classList.add(`${filterClass}-filter`, 'filter');
    const filterName = document.createElement('h5');
    filterName.classList.add('filter-name');
    filterName.innerText = text;
    container.appendChild(filterName);
    for (let i = 0; i < dataArray.length; i++) {
        createCheckBox(container, dataArray, i);
    }
    form.appendChild(container);
}

function createCheckBox(container, dataArray, i) {
    let input = document.createElement('input');
    let label = document.createElement('label');
    let boxContainer = document.createElement('div');

    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `box${dataArray[i]}`);
    input.setAttribute('name', `check${dataArray[i]}`);
    input.setAttribute('value', dataArray[i]);
    input.classList.add('checkbox-margin');

    label.setAttribute('for', `box${dataArray[i]}`)
    label.classList.add('filter-label');
    label.innerText = dataArray[i];

    boxContainer.appendChild(input);
    boxContainer.appendChild(label);
    container.appendChild(boxContainer);
}

function watchPriceRange(){
    $(document).ready(function () {
        const $spanValue = $('.spanValue'); //получает инпут
        const $value = $('#customRange'); //получает value инпута
        $spanValue.html($value.val() + '$');  // сетит value инпута и отображает его со старта
        $value.on('input change', () => { // .on тоже самое что повесить обработчик
            $spanValue.html($value.val() + '$');  //динамически отображает цену
        });
    });
}
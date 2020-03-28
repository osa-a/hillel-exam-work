'use strict'

function createItemsShop(items, amount, path) {
    for (let i = 0; i < amount; i++) {
        createCard(items, i, path);
    }
}

$(document).ready(function () {
    const $spanValue = $('.spanValue'); //получает инпут
    const $value = $('#customRange'); //получает value инпута
    $spanValue.html($value.val()+'$');  // сетит value инпута и отображает его со старта
    $value.on('input change', () => { // .on тоже самое что повесить обработчик
        $spanValue.html($value.val()+'$');  //динамически отображает цену
    });
});

function createCheckBox(container, dataArray, i) {
    let input = document.createElement('input');
    let label = document.createElement('label');
    let boxContainer =  document.createElement('div');

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

function createFilter(container, dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
        createCheckBox(container, dataArray, i);
    }
}
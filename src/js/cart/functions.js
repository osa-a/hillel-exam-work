'use strict';

function createCartPageHead(cartPage) {
    const section = document.createElement('section');
    section.classList.add('page-head');
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('cart-title');
    sectionTitle.innerText = 'Order';
    section.appendChild(sectionTitle);
    cartPage.appendChild(section);
}

function createCartPageBody(cartPage) {
    const cartBody = document.createElement('section');
    cartBody.classList.add('cart-body', 'cart-body-wrapper');
    createCartPageBilling(cartBody);
    createCartPageOrder(cartBody);
    cartPage.appendChild(cartBody);
}

function createCartPageBilling(cartBody) {
    const billing = document.createElement('section');
    billing.classList.add('billing');
    const billingTitle = document.createElement('div');
    billingTitle.classList.add('billing-title');
    billingTitle.innerText = 'Billing details';
    billing.appendChild(billingTitle);
    cartBody.appendChild(billing);
    createOrderForm(billing);
}

function createOrderForm(billing) {
    const orderForm = document.createElement('form');
    orderForm.setAttribute('name', 'orderForm');
    createInputs(orderForm);
    createTextArea(orderForm);
    createRadioPaymentBlock(orderForm);
    createBillingButtonBlock(orderForm);
    billing.appendChild(orderForm);
}

function createInputs(orderForm) {
    const divHalfBlock = document.createElement('div');
    divHalfBlock.classList.add('half');
    //! все компоненты такого рода, я бы вынесла в data.js   
    const inputHalf = [
        { name: 'name', placeholder: 'First Name *' },
        { name: 'surname', placeholder: 'Second Name *' }
    ];

    //! одинаковые циклы
    //! хорошо бы сделать из него одну универсальную функцию, с передающимися аргументами
    //!вызванная два раза

    //? start
    for (let i = 0; i < inputHalf.length; i++) {
        let inputBlock = document.createElement('div');
        inputBlock.classList.add('parent-error', `parent-${inputHalf[i]['name']}`, 'input-half');
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', inputHalf[i]['name']);
        input.setAttribute('placeholder', inputHalf[i]['placeholder']);
        input.classList.add('input-text');
        let error = document.createElement('div');
        error.innerText = `Incorrect ${inputHalf[i]['placeholder']}`;
        error.classList.add('error');
        inputBlock.appendChild(input);
        inputBlock.appendChild(error);
        divHalfBlock.appendChild(inputBlock);
    }
    //? end
    orderForm.appendChild(divHalfBlock);

    //! тоже вынесла бы в data.js
    const inputFull = [
        {
            type: 'text',
            name: 'address',
            placeholder: 'Address ( 00000 Street Name str./№ ) *'
        },
        {
            type: 'text',
            name: 'city',
            placeholder: 'Town/City *'
        },
        {
            type: 'text',
            name: 'country',
            placeholder: 'Country *'
        },
        {
            type: 'text',
            name: 'phone',
            placeholder: 'Phone *'
        },
        {
            type: 'email',
            name: 'email',
            placeholder: 'Email Address *'
        }
    ];
    //? start
    for (let j = 0; j < inputFull.length; j++) {
        let divFullBlock = document.createElement('div');
        divFullBlock.classList.add('parent-error', `parent-${inputFull[j]['name']}`);
        let input = document.createElement('input');
        input.classList.add('input-text', 'input-full');
        input.setAttribute('type', inputFull[j]['type']);
        input.setAttribute('name', inputFull[j]['name']);
        input.setAttribute('placeholder', inputFull[j]['placeholder']);
        let error = document.createElement('div');
        error.innerText = `Incorrect ${inputFull[j]['placeholder']}`;
        error.classList.add('error');
        divFullBlock.appendChild(input);
        divFullBlock.appendChild(error);
        orderForm.appendChild(divFullBlock);
    }
    //? end
}

function createTextArea(orderForm) {
    const divBlock = document.createElement('div');
    divBlock.classList.add('textarea');
    const textarea = document.createElement('textarea');
    textarea.classList.add('textarea-body');
    textarea.setAttribute('placeholder', 'Note about your order, eg. special notes for delivery.');
    divBlock.appendChild(textarea);
    orderForm.appendChild(divBlock);
}

function createRadioPaymentBlock(orderForm) {
    const radio = document.createElement('div');
    radio.classList.add('radio', 'parent-error', `parent-payment`);
    let error = document.createElement('div');
    error.innerText = `Please, choose a kind of payment`;
    error.classList.add('error', 'error-radio');
    orderForm.appendChild(radio);
    
 //! тоже вынесла бы в data.js
    let radioInfo = [
        { id: 'orderBank', text: 'Direct bank transfer', value: 'Bank' },
        { id: 'orderCheck', text: 'Check payments', value: 'Check' },
        { id: 'orderCash', text: 'Cash on delivery', value: 'Cash' }
    ];
    for (let i = 0; i < radioInfo.length; i++) {
        const div = document.createElement('div');
        div.classList.add('pretty', 'p-default', 'p-round');
        radio.appendChild(div);
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'payment');
        input.setAttribute('id', radioInfo[i]['id']);
        input.setAttribute('value', radioInfo[i]['value']);
        input.classList.add('radio-payment');
        div.appendChild(input);
        const divLable = document.createElement('div');
        divLable.classList.add('state', 'p-success-o');
        const label = document.createElement('label');
        label.setAttribute('for', radioInfo[i]['id']);
        label.innerText = radioInfo[i]['text'];
        divLable.appendChild(label);
        div.appendChild(divLable);
    }
    radio.appendChild(error);
}

function createBillingButtonBlock(orderForm) {
    const billingButtonBlock = document.createElement('div');
    billingButtonBlock.classList.add('billing-button');
    const placeOrderButton = document.createElement('button');
    placeOrderButton.setAttribute('type', 'button');
    placeOrderButton.classList.add('billing-button-body');
    placeOrderButton.setAttribute('id', 'sendOrderBtn');
    placeOrderButton.innerText = 'Place Order';
    orderForm.appendChild(billingButtonBlock);
    billingButtonBlock.appendChild(placeOrderButton);
}

function createCartPageOrder(cartBody) {
    const order = document.createElement('section');
    order.classList.add('order');
    cartBody.appendChild(order);
    createOrderHeader(order);
    createOrderContent(order);
    createOrderTotal(order);
}

// FUNC THAT WILL SEND FORM //
let validateCart = (isValidCart, key) => {
    if (!isValidCart) {
        document.querySelector(`.parent-${key} > .error`).style.display = 'block';
    } else {
        document.querySelector(`.parent-${key} > .error`).style.display = 'none';
    }
};

let isValidCart = (value, key, pattern) => {
    return pattern[key].test(value);
};

function sendOrder() {
    const sendOrderBtn = document.getElementById('sendOrderBtn');
    sendOrderBtn.addEventListener('click', function () {
        sendOrderBtn.classList.add('sendOrder');
        // validation of form
        //! нужно оставить всего один вариант паттернов
        // const valuePattern = {
        //     name: /^[A-Z][a-z]{1,}$/,
        //     surname: /^[A-Z][a-z]{1,}$/,
        //     address: /^[0-9]{1,7}((\-|\s)?[A-Z]?[a-z]{1,}){0,5}[str]\.\/\d{1,4}$/,
        //     city: /^([A-Z]{2,3}|[the[A-Z][a-z]{1,}(\s[A-Z]?[a-z]{1,}){0,8})$/,
        //     country: /^([A-Z]{2,3}|[the[A-Z][a-z]{1,}(\s[A-Z]?[a-z]{1,}){0,8})$/,
        //     phone: /^((\+38)?[\(\-]?)?0\d{2}[\)\-]?\d{3}\-?\d{2}\-?\d{2}$/,
        //     email: /^[0-9a-z]+([_\.]?[a-z0-9]{1,10}){0,2}@[a-z]{2,7}\.[a-z]{2,4}$/,
        // };

        const validValues = {};
        const elements = document.forms.orderForm.elements;
        const elementsArr = Object.values(elements);
        for (let element of elementsArr) {
            if (!element.name || element.name === 'payment') {
                continue;
            }
            const isValueValid = isValidCart(element.value, element.name, valuePattern);

            if (isValueValid) {
                validValues[element.name] = element.value;
            } else {
                delete validValues[element.name];
            }
            validateCart(isValueValid, element.name);
        }
        if (!document.querySelector('input[type="radio"]:checked')) {
            document.querySelector(`.parent-payment > .error`).style.display = 'block';
        } else {
            document.querySelector(`.parent-payment > .error`).style.display = 'none';
        }
        let inputs = document.querySelectorAll('.input-text');
        if (Object.keys(validValues).length === inputs.length && document.querySelector('input[type="radio"]:checked')) {
            sendOrderBtn.classList.add('another-page');
            sendOrderBtn.setAttribute('data-page', 'homepage');
            window.scrollTo(0, 0);
            cart = [];
            localStorage.removeItem('cart');
            getDataOrder(elementsArr);
            createModalCart();
        }
    });
}

//! это сущность объекта, она должна быть в отдельном файле, так же как Item/Comments через классы
//! если в нему есть методы, туда же 
function Order(name, surname, address, city, country, phone, email, payment, cart) {
    this.name = name;
    this.surname = surname;
    this.address = address;
    this.city = city;
    this.country = country;
    this.phone = phone;
    this.email = email;
    this.payment = payment;
    this.cart = cart;
}

function getDataOrder(elementsArr) {
    let order = new Order();
    for (let element of elementsArr) {
        for (let key in order) {
            if (key === element.name) {
                order[key] = element.value;
                //? он тут нужен еще? 
                console.log(order[key]);
            } else if (key === 'cart') {
                order[key] = cart;
            }
        }
    }
    orders.push(order);
    setDataToLocal('orders', orders);
}
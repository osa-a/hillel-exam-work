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
    const inputHalf = [
        { name: 'name', placeholder: 'First Name *' },
        { name: 'surname', placeholder: 'Second Name *' }
    ];
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
    orderForm.appendChild(divHalfBlock);

    const inputFull = [
        {
            type: 'text',
            name: 'address',
            placeholder: 'Address *'
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
    error.innerText = `You don't choose kind of payment`;
    error.classList.add('error', 'error-radio');
    orderForm.appendChild(radio);
    let radioInfo = [
        { id: 'orderBank', text: 'Direct bank transfer', value: 'Bank' },
        { id: 'orderCheck', text: 'Check payments', value: 'Check' },
        { id: 'orderCash', text: 'Cash on delivery', value: 'Cash' }
    ];
    for (let i = 0; i < radioInfo.length; i++) {
        const div = document.createElement('div');
        radio.appendChild(div);
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'payment');
        input.setAttribute('id', radioInfo[i]['id']);
        input.setAttribute('value', radioInfo[i]['value']);
        input.classList.add('radio-payment');
        div.appendChild(input);
        const label = document.createElement('label');
        label.setAttribute('for', radioInfo[i]['id']);
        label.innerText = radioInfo[i]['text'];
        div.appendChild(label);
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

// CREATE MODAL THANKS //
function createModalThanks() {
    document.body.style.overflow = 'hidden';
    const pageHead = document.querySelector('.navigation');
    const modalThanks = document.createElement('section');
    modalThanks.classList.add('modal-order');
    modalThanks.setAttribute('id', 'modalThanks');
    pageHead.appendChild(modalThanks);
    const modalThanksBody = document.createElement('div');
    modalThanksBody.classList.add('modal-order-body');
    modalThanks.appendChild(modalThanksBody);
    createButtonThanksClose(modalThanksBody);
    createThanksHeader(modalThanksBody);
    createThanksContent(modalThanksBody);
}

function createButtonThanksClose(modalThanksBody) {
    const buttonThanksClose = document.createElement('button');
    buttonThanksClose.setAttribute('type', 'button');
    buttonThanksClose.classList.add('modal-order-close');
    buttonThanksClose.setAttribute('id', 'modalThanksClose');
    buttonThanksClose.innerText = 'x';
    modalThanksBody.appendChild(buttonThanksClose);
    closeModalThanks();
}

function createThanksHeader(modalThanksBody) {
    const modalThanksHeader = document.createElement('div');
    modalThanksHeader.classList.add('modal-order-header');
    modalThanksBody.appendChild(modalThanksHeader);
    const modalThanksTitle = document.createElement('div');
    modalThanksTitle.classList.add('modal-order-title');
    modalThanksHeader.appendChild(modalThanksTitle);
    modalThanksHeader.style.textAlign = 'center';
    modalThanksTitle.innerText = 'Thank you for the order';
}

function createThanksContent(modalThanksBody) {
    const modalThanksContent = document.createElement('div');
    modalThanksContent.classList.add('modal-order-content');
    modalThanksBody.appendChild(modalThanksContent);
    const modalThanksItems = document.createElement('div');
    modalThanksItems.classList.add('modal-order-items');
    modalThanksContent.appendChild(modalThanksItems);
    modalThanksContent.style.textAlign = 'center';
    modalThanksItems.innerText = 'Looking forward to seeing you again';
}

function closeModalThanks() {
    let modalThanksClose = document.getElementById('modalThanksClose');
    let modalThanks = document.getElementById('modalThanks');
    modalThanksClose.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
        modalThanks.remove();
    });
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
        // validation of form
        const valuePattern = {
            name: /^[A-Z][a-z]{1,}$/,
            surname: /^[A-Z][a-z]{1,}$/,
            address: /^[0-9]{1,7}((\-|\s)?[A-Z]?[a-z]{1,}){0,5}[str]\.\/\d{1,4}$/,
            city: /^([A-Z]{2,3}|[the[A-Z][a-z]{1,}(\s[A-Z]?[a-z]{1,}){0,8})$/,
            country: /^([A-Z]{2,3}|[the[A-Z][a-z]{1,}(\s[A-Z]?[a-z]{1,}){0,8})$/,
            phone: /^((\+38)?[\(\-]?)?0\d{2}[\)\-]?\d{3}\-?\d{2}\-?\d{2}$/,
            email: /^[0-9a-z]+([_\.]?[a-z0-9]{1,10}){0,2}@[a-z]{2,7}\.[a-z]{2,4}$/,
        };

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
        if (!document.querySelector('input[type="radio"]').checked) {
            document.querySelector(`.parent-payment > .error`).style.display = 'block';
        } else {
            document.querySelector(`.parent-payment > .error`).style.display = 'none';
        }
        let inputs = document.querySelectorAll('.input-text');

        if (Object.keys(validValues).length === inputs.length && document.querySelector('input[type="radio"]').checked) {
            sendOrderBtn.classList.add('another-page');
            sendOrderBtn.setAttribute('data-page', '1');
            window.scrollTo(0, 0);
            cart = [];
            localStorage.removeItem('cart');
            createModalThanks();
        }
    });
}
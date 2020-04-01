'use strict';

function creatCartPageHead(cartPage) {
    const section = document.createElement('section');
    section.classList.add('page-head');
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('cart-title');
    section.appendChild(sectionTitle);
    cartPage.appendChild(section);
}

function creatCartPageBody(cartPage) {
    const cartBody = document.createElement('section');
    cartBody.classList.add('cart-body', 'wrapper');
    creatCartPageBilling(cartBody);
    creatCartPageOrder(cartBody);
    cartPage.appendChild(cartBody);
}

function creatCartPageBilling(cartBody) {
    const billing = document.createElement('section');
    billing.classList.add('billing');
    const billingTitle = document.createElement('div');
    billingTitle.classList.add('billing-title');
    billingTitle.innerText = 'Billing details';
    creatOrderForm(billing);
    billing.appendChild(billingTitle);
    cartBody.appendChild(billing);
}

function creatOrderForm(billing) {
    const orderForm = document.createElement('form');
    orderForm.setAttribute('name', 'orderForm');
    creatInputs(orderForm);
    creatTextArea(orderForm);
    creatRadioPaymentBlock(orderForm);
    creatBillingButtonBlock(orderForm);
    billing.appendChild(orderForm);
}

function creatInputs(orderForm) {
    const divHalfBlock = document.createElement('div');
    divHalfBlock.setAttribute('name', 'half');
    const inputHalf = [
        { name: 'name', placeholder: 'First Name *' },
        { name: 'surname', placeholder: 'Second Name *' }
    ];
    for (let i = 0; i < inputHalf.length; i++) {
        let input = document.createElement('input');
        input.classList.add('input-text', 'input-half');
        input.setAttribute('type', 'text');
        input.setAttribute('name', inputHalf[i]['name']);
        input.setAttribute('placeholder', inputHalf[i]['placeholder']);
        divHalfBlock.appendChild(input);
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
        let input = document.createElement('input');
        input.classList.add('input-text', 'input-text', 'input-full');
        input.setAttribute('type', inputFull[j]['type']);
        input.setAttribute('name', inputFull[j]['name']);
        input.setAttribute('placeholder', inputFull[j]['placeholder']);
        divFullBlock.appendChild(input);
        orderForm.appendChild(divFullBlock);
    }
}

function creatTextArea(orderForm) {
    const divBlock = document.createElement('div');
    divBlock.classList.add('textarea');
    const textarea = document.createElement('textarea');
    textarea.classList.add('textarea-body');
    textarea.setAttribute('placeholder', 'Note about your order, eg. special notes for delivery.');
    divBlock.appendChild(textarea);
    orderForm.appendChild(divBlock);
}

function creatRadioPaymentBlock(orderForm) {
    const radioPayment = document.createElement('div');
    radioPayment.setAttribute('name', 'radio-payment');
    let radioInfo = [
        { id: 'orderBank', text: 'Direct bank transfer' },
        { id: 'orderCheck', text: 'Check payments' },
        { id: 'orderCash', text: 'Cash on delivery' }
    ];
    for (let i = 0; i < radioInfo.length; i++) {
        const div = document.createElement('div');
        const input = document.createElement('input');
        input.setAttribute('name', 'payment');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', radioInfo[i]['id']);
        div.appendChild(input);
        const label = document.createElement('input');
        label.setAttribute('for', radioInfo[i]['id']);
        label.innerText = radioInfo[i]['text'];
        div.appendChild(label);
    }
    orderForm.appendChild(radioPayment);
}

function creatBillingButtonBlock(orderForm) {
    const billingButtonBlock = document.createElement('div');
    billingButtonBlock.setAttribute('name', 'billing-button');
    const placeOrderButton = document.createElement('button');
    placeOrderButton.classList.add('billing-button-body');
    placeOrderButton.setAttribute('type', 'button');
    placeOrderButton.innerText = 'Place Order';
    orderForm.appendChild(billingButtonBlock);
    billingButtonBlock.appendChild(placeOrderButton);
}

function creatCartPageOrder(cartBody) {
    const order = document.createElement('section');
    order.classList.add('order');
    const orderTitle = document.createElement('div');
    orderTitle.classList.add('order-title');
    orderTitle.innerText = 'Your order';
    creatItemsInCart(order);
    const orderTotal = document.createElement('div');
    orderTotal.classList.add('order-total');
    orderTotal.innerText = 'Total:';
    order.appendChild(orderTitle);
    order.appendChild(orderTotal);
    cartBody.appendChild(order);
}

// FUNC THAT WILL SHOW ITEMS THAT USER ADD TO CART //
function creatItemsInCart(order) {
    const orderItem = document.createElement('div');
    orderItem.classList.add('order-item');
    orderItem.innerText = 'Items written on JS';
    order.appendChild(orderItem);
}

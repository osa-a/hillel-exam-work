'use strict';

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
            } else if (key === 'cart') {
                order[key] = cart;
            }
        }
    }
    orders.push(order);
    setDataToLocal('orders', orders);
}
'use strict';

let items = [];
let orders = [];
let cart = [];
let categories = [];
let material = [];
let type = [];
let descriptions = {};
let smallImg = {};
let comments = [];
const rating = ['1', '2', '3', '4', '5'];
const slider = [];

const patterns = {
    empty: /^$/,
    name: /^[A-Z][a-z]{1,}$/,
    surname: /^[A-Z][a-z]{1,}$/,
    address: /^[0-9]{1,7}((\-|\s)?[A-Z]?[a-z]{1,}){0,5}[str]\.\/\d{1,4}$/,
    city: /^([A-Z]{2,3}|[the[A-Z][a-z]{1,}(\s[A-Z]?[a-z]{1,}){0,8})$/,
    country: /^([A-Z]{2,3}|[the[A-Z][a-z]{1,}(\s[A-Z]?[a-z]{1,}){0,8})$/,
    phone: /^((\+38)?[\(\-]?)?0\d{2}[\)\-]?\d{3}\-?\d{2}\-?\d{2}$/,
    email: /^[0-9a-z]+([_\.]?[a-z0-9]{1,10}){0,2}@[a-z]{2,7}\.[a-z]{2,4}$/,
};
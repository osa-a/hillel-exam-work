'use strict'

// RENDER


let getIdFromStorage = () => {
    let selectedCategory = JSON.parse(localStorage.getItem('Data-id'));
    localStorage.clear();
    return selectedCategory; 
}

const selectedId = getIdFromStorage(); 

let renderingProductCard = (selectedId) => {
    console.log(selectedId);

    const productName = document.querySelector('.item-card__info-of-good--title');
    const productPrice = document.querySelector('.item-card__info-of-good--price');
    const productDescription = document.querySelector('.item-card__info-of-good--description');
    const productId = document.querySelector('.id-of-good');
    const productCategory = document.querySelector('.category-of-good');
    const productType = document.querySelector('.features-of-good__type');
    const productMaterial = document.querySelector('.features-of-good__material');

    items.forEach(element => {
        if (element.id === selectedId) {
            productName.innerText = element.name;
            productPrice.innerText = `${element.price}$`;
            productDescription.innerText = element.description;
            productId.innerText = `ID: ${element.id}`;
            productCategory.innerText = `Category: ${element.category}`;
            productType.innerText = `Type: ${element.type}`;
            productMaterial.innerText = `Material: ${element.material}`;
        }
    });
}


// SWITCHES LISTENERS


let hideBlock = () => {
    let block = document.querySelector('.review-block');
    let form = document.forms['review-form'];
    form.classList.toggle('hidden');
    block.classList.toggle('hidden');
}

let addlistenerToSwitches = () => {

    let reviewBlock = document.querySelector('.review-block');
    let descrBlock = document.querySelector('.description-block');
    let form = document.forms['review-form'];

    document.querySelector('.switches').addEventListener('click', function(e) {

        if (e.target.classList.contains('review-window__btn')) {
            form.classList.remove('hidden');
            reviewBlock.classList.remove('hidden');  
            descrBlock.classList.add('hidden');
            document.querySelector('.review-window__btn').classList.remove('non-active');
            document.querySelector('.description-window__btn').classList.add('non-active');
        } else if (e.target.classList.contains('description-window__btn')) {
            form.classList.add('hidden');
            reviewBlock.classList.add('hidden');  
            descrBlock.classList.remove('hidden');
            document.querySelector('.review-window__btn').classList.add('non-active');
            document.querySelector('.description-window__btn').classList.remove('non-active');
        }
    });
}

let addlistenerToAmountOfProduct = () => {

let amount = document.querySelector('.amount-of-goods__int').innerHTML = 1;
    
    document.querySelector('.amount-of-goods__counter').addEventListener('click', function(e) {

        if (e.target.classList.contains('plus-one')) {
            amount += 1;
            changeAmountValue(amount);
        } else if (e.target.classList.contains('minus-one')) {
            if (amount <= 1) {
                document.querySelector('.amount-of-goods__int').innerHTML = 1;
                amount = 1;
            } else {
                amount -= 1;
                changeAmountValue(amount);
            }
        }
    });

}

let changeAmountValue = (amount) => {
    if (amount < 1) {
        document.querySelector('.amount-of-goods__int').innerHTML = 1;
        amount = 1;
    } else {
        document.querySelector('.amount-of-goods__int').innerHTML = amount;
    }
    return amount;
}
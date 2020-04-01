'use strict'
// RENGERING HTML

let createElement = (element, setclass, classOfParent) => {
    let item = document.createElement(element);
    let parent = document.querySelector(classOfParent);
    item.classList.add(setclass);
    parent.append(item);
}

let createImg = (setclass, alt, width, height, classOfParent) => {
    let img = document.createElement('img');
    let parent = document.querySelector(classOfParent);
    img.classList.add(setclass);
    img.setAttribute('alt', alt);
    img.setAttribute('width', width);
    img.setAttribute('height', height);
    parent.append(img);
}

let createInput = (name, type, id, placeholder, classOfParent) => {
    let input = document.createElement('input');
    let parent = document.querySelector(classOfParent);
    input.setAttribute('name', name);
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('placeholder', placeholder)
    parent.append(input);
}

let createReviewForm = () => {
    let form = document.createElement('form');
    let parent = document.querySelector('.wrapper');
    form.classList.add('review-form');
    form.setAttribute('name', 'review-form');
    form.setAttribute('action', 'https://mcslayer.com/hillel/post.php'); // добавить action
    parent.append(form);
}

let createTextareaReview = () => {
    let textarea = document.createElement('textarea');
    let parent = document.querySelector('.review-info');
    textarea.setAttribute('name', 'review-field');
    textarea.setAttribute('type', type);
    textarea.setAttribute('id', 'review-field-id');
    textarea.setAttribute('cols', '30');
    textarea.setAttribute('rows', '10');
    textarea.setAttribute('placeholder', 'Write your review')
    parent.append(textarea);
}

let mnemonFunc = () => {
    let mnemon = '&rarr;';
    let htmlDecode = value => $('<div/>').html(value).text(); 
    mnemon = htmlDecode(mnemon);
    return mnemon;
}

let createSubmitButtonReview = () => {
    let input = document.createElement('input');
    let parent = document.querySelector('.review-info');
    input.setAttribute('type', 'submit');
    input.setAttribute('value', `Submit ${mnemonFunc()}`);
    parent.append(input);
} 

let clearAllMainBlock = () => {
    document.getElementsByTagName('main')[0].innerHTML = '';
};

let changeLinkCSS = () => {
    let startedLink = document.querySelector('.style-css-files'); 
    startedLink.removeAttribute('href');
    startedLink.setAttribute('href', 'css/product_card/product_card.css');
} 

let createSectionCategoryHead = () => {
    createElement('section', 'category-head', '.main');
    createElement('div', 'page-head', '.category-head');
    createElement('div', 'cart-title', '.page-head');
    document.querySelector('.cart-title').innerText = 'Shop';

    createItemCardSection();
    
}

let createItemCardSection = () => {
    // create wrapper
    createElement('div', 'wrapper', '.main');

    // create section - item-card
    createElement('section', 'item-card', '.wrapper');
    createElement('div', 'item-card__mini-reviewer', '.item-card');

    for (let i = 1; i < 5; i++) {
        createImg(`mini-pic-${i}`, i, '108', '118', '.item-card__mini-reviewer');
    }

    createElement('div', 'item-card__max-reviewer', '.item-card');
    createImg('main-pic', 'big', 'auto', 'auto', '.item-card__max-reviewer');

    createElement('div', 'item-card__info-of-good', '.item-card');
    createElement('h3', 'item-card__info-of-good--title', '.item-card__info-of-good');
    createElement('h4', 'item-card__info-of-good--price', '.item-card__info-of-good');
    createElement('div', 'product-rating', '.item-card__info-of-good'); 
    // сюда допилить рейтинг звездочками

    createElement('p', 'item-card__info-of-good--description', '.item-card__info-of-good');
    createElement('div', 'buy-block', '.item-card__info-of-good');

    createElement('div', 'amount-of-goods', '.buy-block');
    createElement('div', 'amount-of-goods__int', '.amount-of-goods');
    createElement('div', 'amount-of-goods__counter', '.amount-of-goods'); 
    createElement('div', 'plus-one', '.amount-of-goods__counter'); 
    createElement('div', 'minus-one', '.amount-of-goods__counter');
    document.querySelector('.amount-of-goods__int').innerText = "1";
    document.querySelector('.plus-one').innerText = "+"; 
    document.querySelector('.minus-one').innerText = "-"; 

    createElement('div', 'buy-block__button', '.buy-block');
    createElement('button', 'buy-button', '.buy-block__button');
    document.querySelector('.buy-button').innerText = "BUY"; 

    createElement('div', 'item-card__info-of-good--id', '.item-card__info-of-good');
    createElement('p', 'id-of-good', '.item-card__info-of-good--id');
    createElement('p', 'category-of-good', '.item-card__info-of-good--id');
}

let createSwitchesSection = () => {
    createElement('section', 'switches', '.wrapper');
    createElement('button', 'description-window__btn', '.switches');
    createElement('button', 'review-window__btn', '.switches');

    document.querySelector('.description-window__btn').innerText = 'Description';
    document.querySelector('.review-window__btn').classList.add('non-active');
    document.querySelector('.review-window__btn').innerText = 'Reviews';
}

let createDescriptionBlock = () => {
    createElement('section', 'description-section', '.wrapper');

    createElement('div', 'description-block__info', '.description-section');
    createImg('description-pic-1', 'description-block__info-pic', '300', '375', '.description-block__info');
    createElement('div', 'description-block__info--content', '.description-block__info');

    createElement('div', 'features-of-good', '.description-block__info--content');
    createElement('p', 'features-of-good__type', '.features-of-good');
    createElement('p', 'features-of-good__material', '.features-of-good');

    createElement('div', 'description-block__portfolio', '.description-section');
    createImg('description-pic-2', 'description-block__portfolio', '400', '530', '.description-block__portfolio');
    
    
}

let createReviewSection = () => {
    createElement('section', 'review-block', '.wrapper');

    createElement('div', 'user-avatar', '.review-block');
    createImg('user-avatar-photo', 'avatar', '110', '110', ".user-avatar")

    createElement('div', 'user-review', '.review-block');

    createElement('div', 'review-title', '.user-review');
    createElement('h5', 'user-name', '.review-title');
    createElement('div', 'user-rating', '.review-title');
    addRatingToComment('.user-rating');
    // сюда запилить рейтинг звездочками

    createElement('div', 'review-date', '.user-review');
    createElement('div', 'review-content', '.user-review');
}

let createReviewFormSection = () => {
    createReviewForm();

    createElement('div', 'review-info', '.review-form');
    createElement('p', 'review-info__add-review', '.review-info');
    createElement('p', 'review-info__sub-info', '.review-info');
    createElement('p', 'review-info__rating', '.review-info');

    document.querySelector('.review-info__add-review').innerText = "Add a review";
    document.querySelector('.review-info__sub-info').innerText = "Your email address will not be published. Required fields are marked *";
    document.querySelector('.review-info__rating').innerText = "Choose rating";

    createElement('div', 'chose-rating', '.review-info');

    $('<div>', {
        class: 'br-wrapper br-theme-fontawesome-stars',
        html: 
        `<select id="rating-scale">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>`
    }).appendTo(document.querySelector('.chose-rating'));
    $('select').barrating('show');
    $('#rating-scale').barrating('show', { // еще разбираюсь как эта хрень работает
        theme: 'my-awesome-theme',
        onSelect: function(value, event) {
          if (typeof(event) !== 'undefined') {
            // rating was selected by a user
            console.log(event.target);
          }
        }
      });


    
    // сюда запились рейтинг звездочками

    createInput('name-field', 'text', 'name-field-id', 'Your name', '.review-info'); 
    createInput('email-field', 'text', 'email-field-id', 'Your email', '.review-info');

    createTextareaReview();
    createSubmitButtonReview();
}

let renderingPage = () => {
    clearAllMainBlock();
    changeLinkCSS();
    createSectionCategoryHead();
    createSwitchesSection();
    createDescriptionBlock();
    createReviewSection();
    createReviewFormSection();

    renderingProductCard();
    renderingPics();

    // switches listener

    hideBlock();
    addlistenerToSwitches();

// counter of amount of product

    addlistenerToAmountOfProduct();

// change main pic

    addListenerToChangeMainPic();
}





// RENDER

let getIdFromStorage = () => {
    let selectedCategory = JSON.parse(localStorage.getItem('Data-id'));
    return selectedCategory; 
}

// const selectedId = getIdFromStorage(); 


let renderingProductCard = () => {
    let selectedId = getIdFromStorage();
    const productName = document.querySelector('.item-card__info-of-good--title');
    const productPrice = document.querySelector('.item-card__info-of-good--price');
    const productDescription = document.querySelector('.item-card__info-of-good--description');
    const productId = document.querySelector('.id-of-good');
    const productCategory = document.querySelector('.category-of-good');
    const productType = document.querySelector('.features-of-good__type');
    const productMaterial = document.querySelector('.features-of-good__material');
    const commentUserName = document.querySelector('.user-name');
    const commentUserText = document.querySelector('.review-content');
    const commentUserDate = document.querySelector('.review-date');


    items.forEach(element => {
        if (element.id === selectedId) {
            productName.innerText = element.name;
            productPrice.innerText = `${element.price}$`;
            productDescription.innerText = element.description;
            productId.innerText = `ID: ${element.id}`;
            productCategory.innerText = `Category: ${element.category}`;
            productType.innerText = `Type: ${element.type}`;
            productMaterial.innerText = `Material: ${element.material}`;
            commentUserName.innerText = element.comments.name;
            commentUserText.innerText = element.comments.comment;
            commentUserDate.innerText = element.comments.date;
        }
    });
}

let renderingPics = () => {
    let selectedId = getIdFromStorage();
    const mainPic = document.querySelector('.main-pic');
    const miniPic1 = document.querySelector('.mini-pic-1');
    const miniPic2 = document.querySelector('.mini-pic-2');
    const miniPic3 = document.querySelector('.mini-pic-3');
    const miniPic4 = document.querySelector('.mini-pic-4');
    const descPic1 = document.querySelector('.description-pic-1');
    const descPic2 = document.querySelector('.description-pic-2');
    const userAvatar = document.querySelector('.user-avatar-photo');

    for (let value in smallImg) {
         if (value === selectedId) {
            mainPic.setAttribute('src', `../img/category-shop-cards/smallImg/${value}-1.png`);
            miniPic1.setAttribute('src', `../img/category-shop-cards/smallImg/${value}-1.png`);
            miniPic2.setAttribute('src', `../img/category-shop-cards/smallImg/${value}-2.png`);
            miniPic3.setAttribute('src', `../img/category-shop-cards/smallImg/${value}-3.png`);
            miniPic4.setAttribute('src', `../img/category-shop-cards/smallImg/${value}-4.png`);
            descPic1.setAttribute('src', `../img/category-shop-cards/descr/${value}-1.jpg`); 
            descPic2.setAttribute('src', `../img/category-shop-cards/descr/${value}-2.jpg`);
        }
    }

    items.forEach(element => { // не отображается, разобраться
        if (element.id === selectedId) {
            userAvatar.setAttribute('src', `img/product_card/avatars/${element.comments.avatar}`);
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
    let descrBlock = document.querySelector('.description-section');
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

// CHANGE MAIN PIC

let addListenerToChangeMainPic = () => {
    let selectedId = getIdFromStorage();
    const miniPicBlock = document.querySelector('.item-card__mini-reviewer');
    const mainPic = document.querySelector('.main-pic');

    miniPicBlock.addEventListener('mouseover', (e) => {
        for (let i = 1; i < 5; i++) {
            if (e.target.classList.contains(`mini-pic-${i}`)) {
                mainPic.setAttribute('src', `../img/category-shop-cards/smallImg/${selectedId}-${i}.png`)
            }
        }
    });
}


let addRatingToProduct = () => {
    
}

let addRatingToComment = (parent) => {
    let selectedId = getIdFromStorage()
    for (let i = 1; i < 6; i++) {
        createImg(`rate-star-${i}`, 'star', '25', '25', parent);
        document.querySelector(`.rate-star-${i}`).setAttribute('src', '../img/product_card/empty_star.png');
    }

    items.forEach(elem => {
        if (elem.id === selectedId) {
            for (let i = 1; i < parseInt(elem.comments.rate); i++) {
                document.querySelector(`.rate-star-${i}`).setAttribute('src', '../img/product_card/full_star.png');
            }
        }
    })
}
'use strict';

function createHomepageSlider(homepage, slider) {
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('carousel', 'slide');
    carouselWrapper.setAttribute('id', 'homePageCarousel');
    carouselWrapper.setAttribute('data-ride', 'carousel');
    //создание индикаторов
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    for (let i = 0; i < slider.length; i++) {
        const indicatorElem = document.createElement('li');
        if (i === 0) {
            indicatorElem.classList.add('active');
        }
        indicatorElem.setAttribute('data-target', '#homePageCarousel');
        indicatorElem.setAttribute('data-slide-to', i);
        indicators.appendChild(indicatorElem);
    }
    carouselWrapper.appendChild(indicators);
    //создание слайдов
    const carousel = document.createElement('div');
    carousel.classList.add('carousel-inner');
    for (let i = 0; i < slider.length; i++) {
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        slide.setAttribute('data-interval', '3000');
        //если первый элеменит, то он активен
        if (i === 0) {
            slide.classList.add('active');
        }
        const slideImg = document.createElement('img');
        slideImg.classList.add('d-block', 'w-100','slider-img');
        slideImg.setAttribute('alt', 'decor');
        slideImg.setAttribute('src', `./img/homepage/slider/${slider[i]}`);
        slide.appendChild(slideImg);
        carousel.appendChild(slide);
    }
    carouselWrapper.appendChild(carousel);
    createSliderText(carouselWrapper);
    homepage.appendChild(carouselWrapper);
}

function createSliderText(wrapper) {
    const textBlock = document.createElement('div');
    textBlock.classList.add('head-text-block');
    const firstHeader = document.createElement('h1');
    firstHeader.classList.add('main-header');
    firstHeader.innerText = 'Interior Decor';
    const secondHeader = document.createElement('h2');
    secondHeader.classList.add('header-description');
    secondHeader.innerText = 'LATEST COLLECTION 2020';
    const buyButton = document.createElement('button');
    buyButton.classList.add('head-buy-button', 'another-page');
    buyButton.setAttribute('data-page', 'decoration');
    buyButton.setAttribute('type', 'button');
    buyButton.innerText = 'BUY';

    textBlock.appendChild(firstHeader);
    textBlock.appendChild(secondHeader);
    textBlock.appendChild(buyButton);
    wrapper.appendChild(textBlock);
}

function createBanner(homepage) {
    const section = document.createElement('section');
    section.classList.add('banner-head');
    const bannerInfo = document.createElement('div');
    bannerInfo.classList.add('banner-info');
    const secondHeader = document.createElement('h2');
    secondHeader.classList.add('banner-text');
    secondHeader.innerText = 'Collection of Furniture';
    const buyButton = document.createElement('button');
    buyButton.classList.add('banner-button', 'another-page');
    buyButton.setAttribute('data-page', 'furniture');
    buyButton.setAttribute('type', 'button');
    buyButton.innerText = 'SHOP NOW';
    const bannerImage = document.createElement('img');
    bannerImage.setAttribute('src', 'img/homepage/2.png');
    bannerImage.setAttribute('alt', 'banner');

    bannerInfo.appendChild(secondHeader);
    bannerInfo.appendChild(buyButton);
    section.appendChild(bannerInfo);
    section.appendChild(bannerImage);
    homepage.appendChild(section);
}

function createAboutUs(homepage) {
    const section = document.createElement('section');
    section.classList.add('about-us');
    const aboutImg = document.createElement('img');
    aboutImg.classList.add('about-img');
    aboutImg.setAttribute('src', 'img/homepage/3.png');
    aboutImg.setAttribute('alt', 'director');
    const texture = document.createElement('img');
    texture.classList.add('texture');
    texture.setAttribute('src', 'img/homepage/dot.png');
    const aboutInfo = document.createElement('div');
    aboutInfo.classList.add('about-info');
    const aboutHeader = document.createElement('h2');
    aboutHeader.classList.add('about-header');
    aboutHeader.innerText = 'Our Story';
    const aboutDescription = document.createElement('div');
    aboutDescription.classList.add('about-description');
    aboutDescription.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud commodo consequat sit voluptatem accusantium doloremque laudantium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud commodo consequat sit voluptatem accusantium doloremque laudantium.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    const signatureName = document.createElement('p');
    signatureName.classList.add('about-signature-name');
    signatureName.innerText = 'Catherine Shaw';
    const signaturePosition = document.createElement('p');
    signaturePosition.classList.add('about-signature-position');
    signaturePosition.innerText = '- Director -';

    aboutInfo.appendChild(aboutHeader);
    aboutInfo.appendChild(aboutDescription);
    aboutInfo.appendChild(signatureName);
    aboutInfo.appendChild(signaturePosition);
    section.appendChild(aboutImg);
    section.appendChild(texture);
    section.appendChild(aboutInfo);
    homepage.appendChild(section);
}
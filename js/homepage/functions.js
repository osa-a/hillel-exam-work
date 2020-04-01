'use strict'

function createHomepageHead(homepage) {
    const section = document.createElement('section');
    section.classList.add('homepage-head');
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
    buyButton.setAttribute('data-page', '2');
    buyButton.setAttribute('type', 'button');
    buyButton.innerText = 'BUY';

    textBlock.appendChild(firstHeader);
    textBlock.appendChild(secondHeader);
    textBlock.appendChild(buyButton);
    section.appendChild(textBlock);
    homepage.appendChild(section);
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
    buyButton.setAttribute('data-page', '3');
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
    const aboutInfo = document.createElement('div');
    aboutInfo.classList.add('about-info');
    const aboutHeader = document.createElement('h2');
    aboutHeader.classList.add('about-header');
    aboutHeader.innerText = 'Our Story';
    const aboutDescription = document.createElement('div');
    aboutDescription.classList.add('about-description');
    aboutDescription.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud commodo consequat sit voluptatem accusantium doloremque laudantium. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud commodo consequat sit voluptatem accusantium doloremque laudantium.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
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
    section.appendChild(aboutInfo);
    homepage.appendChild(section);
}
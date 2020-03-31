'use strict';

const wrapper = document.querySelector('.web-wrapper');

fetch('data.json')
    .then((res) => res.json())
    .then((res) => {
        categories = [...res.categories];
        material = [...res.material];
        type = [...res.type];
        descriptions = { ...res.descriptions };
        smallImg = { ...res.smallImg };
        createData();
        createHomepage();
        mainPageListener(wrapper);
    });

openDropDownOrder();
'use strict';

class Item {
    constructor(id, name, price, category, material, type, comments) {
        this.id = id,
            this.img = `${this.id}.png`,
            this.name = name,
            this.price = price,
            this.category = category,
            this.description = descriptions[this.id],
            this.material = material,
            this.type = type,
            this.rating = 0,
            this.comments = comments;
    }
    pushToAr = (itemElem) => items.push(itemElem);
}

function createData() {
    let itemElem = new Item('76', 'Tweed Armchair', 180, categories[0], material[0], type[0], [comments[0], comments[1]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('4gh', 'Hocko Blanket', 20, categories[1], material[1], type[1], [comments[1]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('74', 'Pendant Lamp', 80, categories[1], material[2], type[2], [comments[2]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('k78', 'Low Table', 150, categories[0], material[0], type[3], [comments[3]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('1s3', 'Cynco Pendant Lamp', 90, categories[1], material[2], type[2], [comments[4]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('75t', 'Yellow Armchair', 250, categories[0], material[0], type[0], [comments[5]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('kg', 'Side Table', 130, categories[0], material[0], type[3], [comments[1]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('24d', 'Forrest Vase', 55, categories[1], material[3], type[4], [comments[0]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('54vt', 'Hocko Picture', 30, categories[1], material[0], type[5], [comments[2]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('9mn', 'Amyndas Pendant Lamp', 100, categories[1], material[2], type[2], [comments[3], comments[2], comments[1]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('5b', 'Planting Light', 35, categories[1], material[4], type[2], [comments[5]]);
    itemElem.pushToAr(itemElem);
    itemElem = new Item('51', 'Planting Vase Set', 200, categories[1], material[4], type[4], [comments[4]]);
    itemElem.pushToAr(itemElem);
}
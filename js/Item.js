'use strict';

function ItemProto() {
    this.pushToAr = (itemElem) => items.push(itemElem);
}

const Item = function (id, name, price, category, material, type) {
    this.id = id,
        this.img = `${this.id}.png`,
        this.name = name,
        this.price = price,
        this.category = category,
        // this.description = descriptions.id,
        this.material = material,
        this.type = type,
        this.rating = 0,
        this.comments = []
};

Item.prototype = new ItemProto();

let itemElem = new Item('76', 'Tweed Armchair', 131, 'Furniture', 'wooden', 'chair');
itemElem.pushToAr(itemElem);
itemElem = new Item('4gh', 'Hocko Blanket', 42, 'Decoration', 'wool', 'textile');
itemElem.pushToAr(itemElem);
itemElem = new Item('74', 'Pendant Lamp', 85, 'Decoration', 'metal', 'light');
itemElem.pushToAr(itemElem);
itemElem = new Item('k78', 'Low Table', 149, 'Furniture', 'wooden', 'chair');
itemElem.pushToAr(itemElem);
itemElem = new Item('1s3', 'Cynco Pendant Lamp', 91, 'Decoration', 'metal', 'light');
itemElem.pushToAr(itemElem);
itemElem = new Item('75t', 'Yellow Armchair', 181, 'Furniture', 'wooden', 'chair');
itemElem.pushToAr(itemElem);
itemElem = new Item('kg', 'Side Table', 122, 'Furniture', 'wooden', 'table');
itemElem.pushToAr(itemElem);
itemElem = new Item('24d', 'Forrest Vase', 31, 'Decoration', 'stone', 'vase');
itemElem.pushToAr(itemElem);
itemElem = new Item('54vt', 'Hocko Picture', 21, 'Decoration', 'wooden', 'picture');
itemElem.pushToAr(itemElem);
itemElem = new Item('9mn', 'Amyndas Pendant Lamp', 99, 'Decoration', 'metal', 'light');
itemElem.pushToAr(itemElem);
itemElem = new Item('5b', 'Planting Light', 25, 'Decoration', 'glass', 'light');
itemElem.pushToAr(itemElem);
itemElem = new Item('51v', 'Planting Vase Set', 100, 'Decoration', 'glass', 'vase');
itemElem.pushToAr(itemElem);


console.log(items);
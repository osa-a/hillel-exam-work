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

let itemElem = new Item('76', 'Tweed Armchair', 131, 'Furniture', 'Wooden', 'Chair');
itemElem.pushToAr(itemElem);
itemElem = new Item('4gh', 'Hocko Blanket', 42, 'Decoration', 'Wool', 'Textile');
itemElem.pushToAr(itemElem);
itemElem = new Item('74', 'Pendant Lamp', 85, 'Decoration', 'Metal', 'Light');
itemElem.pushToAr(itemElem);
itemElem = new Item('k78', 'Low Table', 149, 'Furniture', 'Wooden', 'Chair');
itemElem.pushToAr(itemElem);
itemElem = new Item('1s3', 'Cynco Pendant Lamp', 91, 'Decoration', 'Metal', 'Light');
itemElem.pushToAr(itemElem);
itemElem = new Item('75t', 'Yellow Armchair', 181, 'Furniture', 'Wooden', 'Chair');
itemElem.pushToAr(itemElem);
itemElem = new Item('kg', 'Side Table', 122, 'Furniture', 'Wooden', 'Table');
itemElem.pushToAr(itemElem);
itemElem = new Item('24d', 'Forrest Vase', 31, 'Decoration', 'Stone', 'Vase');
itemElem.pushToAr(itemElem);
itemElem = new Item('54vt', 'Hocko Picture', 21, 'Decoration', 'Wooden', 'Picture');
itemElem.pushToAr(itemElem);
itemElem = new Item('9mn', 'Amyndas Pendant Lamp', 99, 'Decoration', 'Metal', 'Light');
itemElem.pushToAr(itemElem);
itemElem = new Item('5b', 'Planting Light', 25, 'Decoration', 'Glass', 'Light');
itemElem.pushToAr(itemElem);
itemElem = new Item('51', 'Planting Vase Set', 100, 'Decoration', 'Glass', 'Vase');
itemElem.pushToAr(itemElem);
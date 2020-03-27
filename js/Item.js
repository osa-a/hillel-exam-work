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

let itemElem = new Item('76gda', 'Tweed Armchair', 131, 'Furniture', 'wooden', 'chair');
itemElem.pushToAr(itemElem);
itemElem = new Item('4g34', 'Hocko Blanket', 42, 'Decoration', 'wool', 'textile');
itemElem.pushToAr(itemElem);
itemElem = new Item('745t', 'Pendant Lamp', 85, 'Decoration', 'metal', 'light');
itemElem.pushToAr(itemElem);
itemElem = new Item('k678', 'Low Table', 149, 'Furniture', 'wooden', 'chair');
itemElem.pushToAr(itemElem);
itemElem = new Item('1sd23', 'Cynco Pendant Lamp', 91, 'Decoration', 'metal', 'light');
itemElem.pushToAr(itemElem);
itemElem = new Item('76tg', 'Yellow Armchair', 181, 'Furniture', 'wooden', 'chair');
itemElem.pushToAr(itemElem);
itemElem = new Item('kjhg', 'Side Table', 122, 'Furniture', 'wooden', 'table');
itemElem.pushToAr(itemElem);
itemElem = new Item('2234d', 'Forrest Vase', 31, 'Decoration', 'stone', 'vase');
itemElem.pushToAr(itemElem);
itemElem = new Item('54vrt', 'Hocko Picture', 21, 'Decoration', 'wooden', 'picture');
itemElem.pushToAr(itemElem);
itemElem = new Item('9o8mn', 'Amyndas Pendant Lamp', 99, 'Decoration', 'metal', 'light');
itemElem.pushToAr(itemElem);
itemElem = new Item('54hbh', 'Planting Light', 25, 'Decoration', 'glass', 'light');
itemElem.pushToAr(itemElem);
itemElem = new Item('567vh', 'Planting Vase Set', 100, 'Decoration', 'glass', 'vase');
itemElem.pushToAr(itemElem);


console.log(items);
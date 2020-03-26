'use strict';

function ItemProto() {
    this.pushToAr = (task) => data.tasks.push(task);
}

const Task = function (id, img, name, price, category, material, type) {
    this.id = id,
        this.img = img,
        this.name = name,
        this.price = price,
        this.description = 'This th best armchair you\'ve ever saeen. Just buy it',
        this.category = category,
        this.material = material,
        this.type = type,
        this.rating = 0,
        this.comments = []
};


Item.prototype = new ItemProto;

let itemElem = new Car('687u', 'Tesla S', 'Black', 80000);
vehicle.pushToAr(vehicle);


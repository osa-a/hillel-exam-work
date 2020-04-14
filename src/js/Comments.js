'use strict';
class Comment {
    constructor(name, rate, comment) {
        this.name = name,
        this.date = moment().subtract(3, 'days').format('LL');
        this.rate = rate,
        this.comment = comment,
        this.avatar = 'full_star.png';
    }
    pushToAr = (commentElem) => comments.push(commentElem) ;
}

function createCommentsData(){
    let commentElem = new Comment('Marta', rating[4], 'I have bought this good from your company for the last 3 years. This was the first time I have purchased something from there. The experience has been great. I highly recommend your shop.');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Marta', rating[1], 'I bought one of these weeks ago when my bf bought a garage door opener to try it out. It is no idea how he has not destroyed it yet! I have not installed it yet as it will take around 20 minutes for the thing to assemble and it is pretty heavy! So I was surprised when it gave me a strange noise that sounded like it was connected to the garage floor!! I assumed the device was being powered on the garage floor and that\'s how the noise came from. I decided to cut it loose before it damaged my floor. Not good in my opinion! Could you possibly get this product replaced? Would you recommend this? Thanks');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Donald', rating[3], 'The delivery was as good as could be expected. To sum it up, this is the best purchase I have made in a long time. It is like a can of sardines for guns!');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Tom', rating[4], 'This is the best purchase! It really is amazing I am taking advantage of everything you can give!');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Scott', rating[0], 'The purchase was terrible and the service absolutely awful. My wife was angry, the FBO was closed, and we\'re not sure how or if this will ever happen again. I can only assume the entire process and expectations were flawed on this case. We absolutely would recommend buying products with a trusted service, I truly hope this doesn\'t happen to anyone else. We tried to place an order months ago with the same FBO, but they went on vacation and didn\'t respond. Never again!');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Daniel', rating[3], 'Package came perfectly packaged, very good value, decent quality');
    commentElem.pushToAr(commentElem);

    return commentElem;
}
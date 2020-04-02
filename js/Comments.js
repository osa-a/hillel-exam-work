'use strict';

function CommentProto() {
    this.pushToAr = (commentElem) => comments.push(commentElem);
}

const Comment = function (name, rate, comment, avatar) {
        this.name = name,
        this.date = moment().subtract(3, 'days').format('LL');
        this.rate = rate,
        this.comment = comment,
        this.avatar = avatar;
};

Comment.prototype = new CommentProto();

function createCommentsData(){
    let commentElem = new Comment('Marta', rating[3], 'Oh, that\'s what I found so long!', 'marta.png');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Marta', rating[2], 'Unfortunately, it has proved futile for me..:(', 'marta.png');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Donald', rating[4], 'Oh, that\'s what I found so long!', 'donald.png');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Tom', rating[2], 'Oh, that\'s what I found so long!', 'hardy.png');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Scott', rating[1], 'Oh, that\'s what I found so long!', 'scott.png');
    commentElem.pushToAr(commentElem);
    commentElem = new Comment('Daniel', rating[4], 'Oh, that\'s what I found so long!', 'craig.png');
    commentElem.pushToAr(commentElem);
}
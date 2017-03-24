var push = function(news, document) {
    var element = document.createElement('LABEL');
    element.id = 'news-' + news.id;
    element.innerHTML = news.content.message;
    element.className = 'news';

    var target = document.getElementById('news');
    target.insertBefore(element, target.firstChild);
};

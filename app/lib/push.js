var push = function(news, document) {
    var element = document.createElement('LABEL');
    element.id = 'news-' + news.id;
    element.innerHTML = news.content.message;
    element.className = 'news';

    var target = document.getElementById('news');
    var existing = document.querySelectorAll('.news');
    if (existing.length == 5 ) {
        target.removeChild(target.lastChild);
    }
    target.insertBefore(element, target.firstChild);
};

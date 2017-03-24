var expect = require('chai').expect;
var jsdom = require("jsdom").jsdom;
var path = require('path').join(__dirname, 'lib/push.js');
var content = require('fs').readFileSync(path).toString();
var push = (new Function( content + 'return push;'))();

describe('push', function() {

    var document;

    beforeEach(function() {
        document = jsdom('<div id="news"></div>');
    });
    it('adds the news message', function() {
        push({id:25, content:{message:'hello world'}}, document);
        var news = document.querySelector('#news-25.news');

        expect(news.innerHTML).to.equal('hello world');
    });
    it('pills up the news message', function() {
        push({id:1, content:{message:'first'}}, document);
        push({id:2, content:{message:'second'}}, document);
        var news = document.querySelector('.news');

        expect(news.id).to.equal('news-2');
    });

    describe('list', function() {

        var news;

        beforeEach(function() {
            push({id:1, content:{message:'one'}}, document);
            push({id:2, content:{message:'two'}}, document);
            push({id:3, content:{message:'three'}}, document);
            push({id:4, content:{message:'four'}}, document);
            push({id:5, content:{message:'five'}}, document);
            push({id:6, content:{message:'six'}}, document);
            news = document.querySelectorAll('.news');
        });
        it('has a limit of 5 news', function() {
            expect(news.length).to.equal(5);
        });
        it('does not keep the oldest news', function() {
            expect(news[4].id).to.equal('news-2');
        });
    });
});

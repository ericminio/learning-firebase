var expect = require('chai').expect;
var sinon = require('sinon');
require('chai').use(require('sinon-chai'));
var jsdom = require("jsdom").jsdom;
var path = require('path').join(__dirname, 'lib/create.js');
var content = require('fs').readFileSync(path).toString();
var create = (new Function( content + 'return create;'))();

describe('create', function() {

    var input;
    var reference;
    var data;

    beforeEach(function() {
        var document = jsdom('<input id="message" />');
        input = document.getElementById('message');
        input.value = 'this wonderful news!';
        var firebase = {
            database: function() {
                return {
                    ref: function(value) {
                        reference = value;
                        return {
                            set: function(value) {
                                data = value;
                            }
                        }
                    }
                };
            }
        };
        create(document, firebase, 1234);
    });

    it('saves data to the expected reference', function() {
        expect(reference).to.equal('news/1234');
    });
    it('sends the expected data', function() {
        expect(data).to.deep.equal({
            message: 'this wonderful news!',
            timestamp: 1234
        });
    });
    it('clears the input field', function() {
        expect(input.value).to.equal('');
    });
});

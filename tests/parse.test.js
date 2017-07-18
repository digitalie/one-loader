process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const parse = require('../src/parse');

/**
 * parse module
 */
describe('parse', () => {

    /**
     * append function
     */
    describe('append', () => {
        it('sets value when property does not exist', done => {
            let object = {};
            let expectedObject = {
                test1: {
                    test2: "\r\ntest3"
                }
            }
            parse.append(object, ['test1', 'test2'], 'test3');
            expect(object).to.eql(expectedObject);
            done();
        });
        it('adds value when property does exist', done => {
            let object = {
                test1: {
                    test2: "\r\ntest3"
                }
            };
            let expectedObject = {
                test1: {
                    test2: "\r\ntest3\r\ntest4"
                }
            }
            parse.append(object, ['test1', 'test2'], 'test4');
            expect(object).to.eql(expectedObject);
            done();
        });
    });

    /**
     * getContent function
     */
    describe('getContent', () => {
        it('', () => {

        });
    });
});

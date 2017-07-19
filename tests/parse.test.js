process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const parse = require('../src/parse');

/**
 * parse module
 */
describe('parse', () => {
    /**
     * default function
     */
    describe('default', () => {
        it('returns code type structure', done => {
            const code = `
                <style>
                    html {
                        background: black;
                    }
                </style>
                <script>
                    alert('test1');
                </script>
            `;
            const actual = parse.default(code);

            expect(actual).to.have.property('style');
            expect(actual.style).to.have.property('text/css');
            expect(actual).to.have.nested.property('script.javascript');
            done();
        });
    });

    /**
     * append function
     */
    describe('append', () => {
        it('creates property and sets value when property does not exist', done => {
            let object = {};
            const expectedObject = {
                test1: {
                    test2: "\r\ntest3"
                }
            }
            parse.append(object, ['test1', 'test2'], 'test3');
            expect(object).to.eql(expectedObject);
            done();
        });
        it('appends value to existing property', done => {
            let object = {
                test1: {
                    test2: "\r\ntest3"
                }
            };
            const expectedObject = {
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
        it('returns content of input node', done => {
            const node = {
                content: ['test1']
            };

            const multiNode = {
                content: ['test1', 'test2']
            };

            expect(parse.getContent(node)).to.eql('test1');
            expect(parse.getContent(multiNode)).to.eql('test1 test2');
            done();
        });

        it('returns empty content by default', done => {
            const node = {};

            expect(parse.getContent(node)).to.eql('');
            done();
        });
    });

    /**
     * getType function
     */
    describe('getType', () => {
        it('returns code type from type attribute', done => {
            const node = {
                attrs: {
                    type: 'test1'
                }
            };
            expect(parse.getType(node)).to.eql('test1');
            done();
        });
        it('returns code type based on wrapping tag', done => {
            const node = {
                tag: 'script'
            };
            expect(parse.getType(node)).to.eql('javascript');
            done();
        });
    });

    /**
     * verifyTag function
     */
    describe('verifyTag', () => {
        it('returns true for script and style tags', done => {
            const scriptNode = {
                tag: 'script'
            };
            const styleNode = {
                tag: 'style'
            };
            const divNode = {
                tag: 'div'
            }
            expect(parse.verifyTag(scriptNode)).to.be.true;
            expect(parse.verifyTag(styleNode)).to.be.true;
            expect(parse.verifyTag(divNode)).to.be.false;
            done();
        });
    });
});

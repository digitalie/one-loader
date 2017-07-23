process.env.NODE_ENV = 'test';

const parse = require('../src/parse');

/**
 * parse module
 */
describe('parse', () => {
    /**
     * default function
     */
    describe('default', () => {
        it('returns code type structure', () => {
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

            expect(actual).toHaveProperty('style');
            expect(actual.style).toHaveProperty('text/css');
            expect(actual).toHaveProperty('script.javascript');
        });
    });

    /**
     * append function
     */
    describe('append', () => {
        it('creates property and sets value when property does not exist', () => {
            let object = {};
            const expectedObject = {
                test1: {
                    test2: "\r\ntest3"
                }
            }
            parse.append(object, ['test1', 'test2'], 'test3');
            expect(object).toEqual(expectedObject);
        });
        it('appends value to existing property', () => {
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
            expect(object).toEqual(expectedObject);
        });
    });

    /**
     * getContent function
     */
    describe('getContent', () => {
        it('returns content of input node', () => {
            const node = {
                content: ['test1']
            };

            const multiNode = {
                content: ['test1', 'test2']
            };

            expect(parse.getContent(node)).toEqual('test1');
            expect(parse.getContent(multiNode)).toEqual('test1 test2');
        });

        it('returns empty content by default', () => {
            const node = {};

            expect(parse.getContent(node)).toEqual('');
        });
    });

    /**
     * getType function
     */
    describe('getType', () => {
        it('returns code type from type attribute', () => {
            const node = {
                attrs: {
                    type: 'test1'
                }
            };
            expect(parse.getType(node)).toEqual('test1');
        });
        it('returns code type based on wrapping tag', () => {
            const node = {
                tag: 'script'
            };
            expect(parse.getType(node)).toEqual('javascript');
        });
    });

    /**
     * verifyTag function
     */
    describe('verifyTag', () => {
        it('returns true for script and style tags', () => {
            const scriptNode = {
                tag: 'script'
            };
            const styleNode = {
                tag: 'style'
            };
            const divNode = {
                tag: 'div'
            }
            expect(parse.verifyTag(scriptNode)).toBe(true);
            expect(parse.verifyTag(styleNode)).toBe(true);
            expect(parse.verifyTag(divNode)).toBe(false);
        });
    });
});

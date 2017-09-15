process.env.NODE_ENV = 'test';

const { getRequire, normalizeLoaders, stringifyLoaders} = require('../src/require');

/**
 * main module
 */
describe('require', () => {
    /**
     * getRequire function
     */
    describe('getRequire', () => {
        it('exports javascript code', () => {
            expect(getRequire({}, { map: {'js': 'js' }}, 'script', 'js', 'resource').startsWith('module.exports = ')).toBe(true);
            expect(getRequire({}, { map: {'js': 'js' }}, 'style', 'js', 'resource').startsWith('module.exports = ')).toBe(false);
        })
    });

    /**
     * normalizeLoaders function
     */
    describe('normalizeLoaders', () => {
        it('normalizes loaders string input', () => {
            expect(normalizeLoaders('test1')).toEqual('test1');
            expect(normalizeLoaders('test1!')).toEqual('test1');
        });
        it('normalizes loaders array input', () => {
            const simpleArray = [{loader: 'test1'}];
            expect(normalizeLoaders(simpleArray)).toEqual('test1');
        });


    });

    /**
     * stringifyLoaders function
     */
    describe('stringifyLoaders', () => {
        it('converts array of loader objects to string', () => {
            const arrayWithOptions = [{
                loader: 'test1',
                options: {
                    test2: 'test3',
                    test4: 'test5'
                }
            }];
            expect(stringifyLoaders(arrayWithOptions)).toEqual('test1?' + JSON.stringify(arrayWithOptions[0].options));

            const multiArrayWithOptions = [
                {
                    loader: 'test1',
                    options: {
                        test2: 'test3',
                        test4: 'test5'
                    }
                },
                {
                    loader: 'test6',
                    options: {
                        test7: 'test8'
                    }
                }
            ];
            expect(stringifyLoaders(multiArrayWithOptions)).toEqual(
                'test1?' + JSON.stringify(multiArrayWithOptions[0].options) +
                '!test6?' + JSON.stringify(multiArrayWithOptions[1].options)
            );
        })
    });
});

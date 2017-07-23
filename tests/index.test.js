process.env.NODE_ENV = 'test';

const loader = require('../src/index');

/**
 * main module
 */
describe('one-loader', () => {
    /**
     * getRequire function
     */
    describe('getRequire', () => {
        it('exports javascript code', () => {
            expect(loader.getRequire({}, { map: {'js': 'js' }}, 'script', 'js', 'resource').startsWith('module.exports = ')).toBe(true);
            expect(loader.getRequire({}, { map: {'js': 'js' }}, 'style', 'js', 'resource').startsWith('module.exports = ')).toBe(false);
        })
    });

    /**
     * normalizeLoaders function
     */
    describe('normalizeLoaders', () => {
        it('normalizes loaders string input', () => {
            expect(loader.normalizeLoaders('test1')).toEqual('test1');
            expect(loader.normalizeLoaders('test1!')).toEqual('test1');
        });
        it('normalizes loaders array input', () => {
            const simpleArray = [{loader: 'test1'}];
            expect(loader.normalizeLoaders(simpleArray)).toEqual('test1');
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
            expect(loader.normalizeLoaders(arrayWithOptions)).toEqual('test1?' + JSON.stringify(arrayWithOptions[0].options));

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
            expect(loader.normalizeLoaders(multiArrayWithOptions)).toEqual(
                'test1?' + JSON.stringify(multiArrayWithOptions[0].options) +
                '!test6?' + JSON.stringify(multiArrayWithOptions[1].options)
            );
        })
    });
});

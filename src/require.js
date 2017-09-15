const loaderUtils = require('loader-utils');

/**
 * Return full require() statement for given resource and type
 *
 * @param {object} context
 * @param {object} options
 * @param {string} tag
 * @param {string} type
 * @param {string} resource
 * @returns {string}
 */
function getRequire(context, options, tag, type, resource) {
    const loaders = normalizeLoaders(options.map[type]);
    const selectLoader = require.resolve('./loader.js');
    const request = {
        tag,
        type,
        options
    };
    const url = loaderUtils.stringifyRequest(context, `!${loaders}!${selectLoader}?${JSON.stringify(request)}!${resource}`)
    const prefix = tag === 'script' ? 'module.exports = ' : 'const $style = ';
    return `${prefix}require(${url});\r\n`;
}

/**
 * Decides whether loaders need to be stringified
 * @param {array|string} loaders
 * @returns {string}
 */
function normalizeLoaders(loaders) {
    return typeof loaders === 'string' ? loaders.replace(/!$/, '') : stringifyLoaders(loaders);
}

/**
 * Compiles array of loader objects into a request string
 * together with options
 *
 * @param {array} loaders
 * @returns {string}
 */
function stringifyLoaders(loaders) {
    return loaders.map(function (obj) {
        return obj && typeof obj === 'object' && typeof obj.loader === 'string'
            ? obj.loader + (obj.options ? '?' + JSON.stringify(obj.options) : '')
            : obj
    }).join('!')
}

module.exports =  { getRequire };

/*
 * Export private functions for testing purposes
 */
if (process.env.NODE_ENV === 'test') {
    module.exports.normalizeLoaders = normalizeLoaders;
    module.exports.stringifyLoaders = stringifyLoaders;
}

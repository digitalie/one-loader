const loaderUtils = require('loader-utils');

/**
 * Return full require() statement for the first script tag which is used as the component part
 *
 * @param {object} context
 * @param {object} part
 * @param {object} options
 * @param {string} resource
 * @returns {string}
 */
function getRequirePrimary(context, part, options, resource) {
    const fileContentPartLoader = require.resolve('./partLoaderPrimaryScript.js');
    const loaders = normalizeLoaders(options.map[part.mimeType]);
    const request = {
        id: part.id,
        options
    };
    const url = loaderUtils.stringifyRequest(context, `!${loaders}!${fileContentPartLoader}?${JSON.stringify(request)}!${resource}`);
    return `require(${url});\r\n`;
}
/**
 * Return full require() statement for given resource and type
 *
 * @param {object} context
 * @param {object} part
 * @param {object} options
 * @param {string} resource
 * @returns {string}
 */
function getRequireAdditional(context, part, options, resource) {
    const fileContentPartLoader = require.resolve('./partLoaderAdditional.js');
    const loaders = normalizeLoaders(options.map[part.mimeType]);
    const request = {
        id: part.id,
    };
    const url = loaderUtils.stringifyRequest(context, `!${loaders}!${fileContentPartLoader}?${JSON.stringify(request)}!${resource}`)
    return `require(${url});\r\n`;
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

module.exports =  { getRequirePrimary, getRequireAdditional };

/*
 * Export private functions for testing purposes
 */
if (process.env.NODE_ENV === 'test') {
    module.exports.normalizeLoaders = normalizeLoaders;
    module.exports.stringifyLoaders = stringifyLoaders;
}

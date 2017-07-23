const get = require('lodash.get');
const forEach = require('lodash.foreach');
const defaultsDeep = require('lodash.defaultsdeep');
const loaderUtils = require('loader-utils');
const parse = require('./parse').default;
const defaultOptions = require('./options');

/**
 * ComponentOne Loader
 *
 * @param {string} content
 */
module.exports = function (content) {
    let output = '';

    const cb = this.async();
    const parts = parse(content);

    const options = defaultsDeep(loaderUtils.getOptions(this), defaultOptions);
    const resource = loaderUtils.getRemainingRequest(this);

    forEach(parts, (part, tag) => {
        forEach(part, (code, type) => {
            if (options.map.hasOwnProperty(type)) {
                output += getRequire(this, options, tag, type, resource);
            }
        });
    });

    cb(null, output);
}

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
    const selectLoader = require.resolve('./select-loader.js');
    const url = loaderUtils.stringifyRequest(context, `!${loaders}!${selectLoader}?tag=${tag}&type=${type}!${resource}`)
    const prefix = tag === 'script' ? 'module.exports = ' : '';
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

/*
 * Export private functions for testing purposes
 */
if (process.env.NODE_ENV === 'test') {
    module.exports.getRequire = getRequire;
    module.exports.normalizeLoaders = normalizeLoaders;
    module.exports.stringifyLoaders = stringifyLoaders;
}

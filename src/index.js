const get = require('lodash.get');
const forEach = require('lodash.foreach');
const defaultsDeep = require('lodash.defaultsdeep');
const loaderUtils = require('loader-utils');
const parse = require('./parse').default;
const defaultOptions = require('./options');

/**
 * ComponentOne Loader
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
 * @param {object} context
 * @param {object} options
 * @param {string} tag
 * @param {string} type
 * @param {string} resource
 * @returns {string}
 */
function getRequire(context, options, tag, type, resource) {
    const url = loaderUtils.stringifyRequest(context, '!' + options.map[type] + require.resolve('./select-loader.js') + '?tag=' + tag + '&type=' + type + '!' + resource)
    const prefix = tag === 'script' ? 'module.exports = ' : '';
    return `${prefix}require(${url});\r\n`;
}

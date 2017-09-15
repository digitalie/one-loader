const defaultsDeep = require('lodash.defaultsdeep');
const loaderUtils = require('loader-utils');
const parse = require('./parse').default;
const { getRequire } = require('./require');
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
    const scriptKeys = Object.keys(parts['script']);

    if (scriptKeys.length === 1) {
        output = getRequire(this, options, 'script', scriptKeys.pop(), resource)
    } else if (scriptKeys.length > 1) {
        this.emitWarning(`Only one type script tag is allowed per component. The last one will be used.`);
    } else {
        this.emitError('At least one script tag per component is required!');
    }

    cb(null, output);
}

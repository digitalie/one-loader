const loaderUtils = require('loader-utils');
const parse = require('./parse').default;
const { getRequire } = require('./require');

/**
 * Helper loader that returns content based on requested tag and type
 *
 * @param {string} content
 */
module.exports = function (content) {
    let output = '';

    const cb = this.async()
    const parts = parse(content);
    const query = loaderUtils.parseQuery(this.query);
    const resource = loaderUtils.getRemainingRequest(this);
    const styleKeys = Object.keys(parts['style']);

    if (query.tag === 'script') {
        if (styleKeys.length === 1) {
            output += getRequire(this, query.options, 'style', styleKeys.pop(), resource);
        } else if (styleKeys.length > 1) {
            this.emitWarning(`Only one type of style tag is allowed per component. The last one will be used.`);
        }

        output += parts['script'][query.type];
    } else if (query.tag === 'style') {
        output = parts['style'][query.type];
    }

    cb(null, output)
}

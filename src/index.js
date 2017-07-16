const get = require('lodash.get');
const forEach = require('lodash.foreach');
const defaultsDeep = require('lodash.defaultsdeep');
const loaderUtils = require('loader-utils');
const parse = require('./parse').default;
const defaultOptions = require('./options');

module.exports = function (content) {
    let output = '';

    const cb = this.async();
    const parts = parse(content);

    const options = defaultsDeep(loaderUtils.getOptions(this), defaultOptions);
    const resource = loaderUtils.getRemainingRequest(this);

    forEach(parts, (part, tag) => {
        forEach(part, (code, lang) => {
            if (options.map.hasOwnProperty(lang)) {
                output += getRequire(this, options, tag, lang, resource);
            }
        });
    });

    cb(null, output);
}

function getRequire(context, options, tag, lang, resource) {
    let url = loaderUtils.stringifyRequest(context, '!' + options.map[lang] + require.resolve('./select-loader.js') + '?tag=' + tag + '&lang=' + lang + '!' + resource)
    return `require(${url});\r\n`;
}

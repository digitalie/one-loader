const loaderUtils = require('loader-utils');
const parse = require('./parse').default;

module.exports = function (content) {
    const cb = this.async()
    const parts = parse(content);
    const query = loaderUtils.parseQuery(this.query);

    cb(null, parts[query.tag][query.type])
}

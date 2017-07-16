const get = require('lodash.get');
const set = require('lodash.set');
const isObject = require('lodash.isobject');
const forEach = require('lodash.foreach');
const parser = require('posthtml-parser');

module.exports.default = function (content) {
    let output = {};

    const nodes = parser(content);

    forEach(nodes, (node) => {
        if (isObject(node) && verifyTag(node)) {
            append(output, [node.tag, getLanguage(node)], getContent(node));
        }
    });

    return output;
}

function append(object, path, value) {
    set(object, path, get(object, path, '') + `\r\n${value}`);
}

function getContent(node) {
    return get(node, 'content', []).join('');
}

function getLanguage(node) {
    const tagLoaders = {
        script: '',
        style: 'css'
    };

    return get(node, 'attrs.lang', tagLoaders[node.tag]);
}

function verifyTag(node) {
    return node.tag === 'script' || node.tag === 'style';
}

if (process.env.NODE_ENV === 'testing') {
    module.exports.append = append;
    module.exports.getContent = getContent;
    module.exports.getLanguage = getLanguage;
    module.exports.verifyTag = verifyTag;
}

const get = require('lodash.get');
const set = require('lodash.set');
const isObject = require('lodash.isobject');
const forEach = require('lodash.foreach');
const parser = require('posthtml-parser');

/**
 * Parse file content (html) and categorize it by tag and type
 *
 * @param {string} content
 * @returns {object}
 */
module.exports.default = function (content) {
    let output = {};

    const nodes = parser(content);

    forEach(nodes, (node) => {
        if (isObject(node) && isCorrectTag(node)) {
            append(output, [node.tag, getType(node)], getContent(node));
        }
    });

    return output;
}

/**
 * Add property of given path to the object
 *
 * @param {object} object
 * @param {array} path
 * @param {string} value
 */
function append(object, path, value) {
    set(object, path, get(object, path, '') + `\r\n${value}`);
}

/**
 * Get code content of given tag (node)
 * @param {object} node
 * @returns {string}
 */
function getContent(node) {
    return get(node, 'content', []).join(' ');
}

/**
 * Get tag type property
 * @param {object} node
 * @returns {string}
 */
function getType(node) {
    const tagLoaders = {
        script: 'javascript',
        style: 'text/css'
    };

    return get(node, 'attrs.type', tagLoaders[node.tag]);
}

/**
 * Verify tag is either `script` or `style`
 *
 * @param {object} node
 * @returns {boolean}
 */
function isCorrectTag(node) {
    return node.tag === 'script' || node.tag === 'style';
}

/*
 * Export private functions for testing purposes
 */
if (process.env.NODE_ENV === 'test') {
    module.exports.append = append;
    module.exports.getContent = getContent;
    module.exports.getType = getType;
    module.exports.isCorrectTag = isCorrectTag;
}

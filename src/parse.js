const parser = require('posthtml-parser');

/**
 * Parse file content (html) and categorize it by tag and type
 *
 * @param {string} content
 * @returns {object}
 */
module.exports.default = function (content) {
    let output = [];
    const nodes = parser(content);
    nodes.forEach((node, i) => {
        if (typeof node == 'object' && isCorrectTag(node)) {
            output.push({
                id: typeof node.attrs !== 'undefined' && node.attrs.id || `__one_loader_internal__part-${i}`,
                tag: node.tag,
                mimeType: getType(node),
                content: getContent(node),
            })
        }
    });
    return output;
}

/**
 * Get code content of given tag (node)
 * @param {object} node
 * @returns {string}
 */
function getContent(node) {
    return (node.content || []).join(' ');
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

    if(typeof node.attrs == 'undefined' || typeof node.attrs.type == 'undefined')
        return tagLoaders[node.tag];

    return node.attrs.type;
}

/**
 * Verify tag is either `script` or `style`
 *
 * @param {object} node
 * @returns {boolean}
 */
function isCorrectTag(node) {
    return node.tag === 'script' || node.tag === 'style' || node.tag === 'template';
}

/*
 * Export private functions for testing purposes
 */
if (process.env.NODE_ENV === 'test') {
    module.exports.getContent = getContent;
    module.exports.getType = getType;
    module.exports.isCorrectTag = isCorrectTag;
}

const cheerio = require('cheerio');

/**
 * Parse file content (html) and categorize it by tag and type
 *
 * @param {string} content
 * @returns {object}
 */
module.exports.default = function (content) {
    const defaultTagTypes = {
        script: 'javascript',
        style: 'text/css',
        template: 'text/html',
    }
    const $ = cheerio.load(`<!DOCTYPE html><html><head></head><body>${content}</body></html>`, {decodeEntities: false});
    let output = [];
    $('body > script, body > style, body > template').each(function (i) {
        const node = $(this);
        output.push({
            id: node.attr('id') || `__one_loader_internal__part-${i}`,
            tag: this.tagName,
            mimeType: node.attr('type') || defaultTagTypes[this.tagName],
            content: node.html(),
        })
    });
    return output;
}


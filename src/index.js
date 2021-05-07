const defaultsDeep = require('lodash.defaultsdeep');
const loaderUtils = require('loader-utils');
const parse = require('./parse').default;
const {getRequirePrimary} = require('./require');
const defaultOptions = require('./options');

/**
 * ComponentOne Loader
 *
 * @param {string} content
 */
module.exports = function (content) {
    const options = defaultsDeep(loaderUtils.getOptions(this), defaultOptions);
    const resource = loaderUtils.getRemainingRequest(this);
    // parse content for validation, no transpiling or processing of parts is actually done here
    const parts = parse(content);
    const scriptParts = [];
    let primaryPart;
    parts.forEach((part) => {
        // validate options, making sure we have loaders for each mimeType
        if (typeof options.map[part.mimeType] === 'undefined') {
            this.emitError(`Missing loader for tag <${part.tag} type="${part.mimeType}"> in one-loader`);
        }
        // look for scripts
        if (part.tag === 'script') {
            if (part.id === 'component') {
                primaryPart = part;
            } else {
                scriptParts.push(part);
            }
        }
    });
    if (!primaryPart) {
        if (scriptParts.length > 1) {
            this.emitWarning(`Multiple script tags found, using the first as the component. Set id="component" on the primary tag to avoid this warning`);
        } else if (scriptParts.length < 1) {
            this.emitError(`A script tag is required in every .one file`);
        }
        primaryPart = scriptParts[0];
    }
    // require just the javascript part of the .one file here.
    // The other components will be stuffed into the content of the javascript part by the partLoaderPrimaryScript.js loader
    return 'module.exports = ' + getRequirePrimary(this, primaryPart, options, resource);
}

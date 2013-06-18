var fs = require('fs'),
    util = require('../util');

var Backend = module.exports = function(options) {
    this.options = options || {};
    this.options.resourcesPath = this.options.resourcesPath || 'locales/__locale__/__ns__.json';
};

Backend.prototype.init = function(model, locale, ns, cb) {
    var filename = util.applyReplacement(this.options.resourcesPath, {locale: locale, ns: ns});

    var self = this;
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            cb(err);
        } else {
            model.set('_session.i18n_'+locale+'_'+ns, JSON.parse(data));
            cb(null);
        }
    });
}

Backend.prototype.get = function(model, locale, ns, key) {
    return model.get('_session.i18n_'+locale+'_'+ns+'.'+key) || locale+'.'+ns+'.'+key;
}
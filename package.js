Package.describe({
  name: 'east5th:wrap-promise',
  version: '0.0.2',
  summary: 'Exposes the wrapPromise utility method',
  git: 'https://github.com/East5th/wrap-promise',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('underscore');
  api.versionsFrom('1.1.0.2');
  api.addFiles('lib/wrap-promise.js');
  api.export('wrapPromise');
});
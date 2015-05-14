Package.describe({
  name: 'gopatrik:marker',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles('gopatrik:marker.js');

  api.addFiles('marker-graphs/src/app.js', 'client');
  // api.addFiles('marker-graphs/src/atoms/scatter-plot/atom.js', 'client');
  // api.addFiles('marker-graphs/src/atoms/pie-chart/atom.js', 'client');
  // api.addFiles('marker-graphs/src/atoms/bar-chart/atom.js', 'client');


  api.addFiles('marker-graphs/src/atoms/scatter-plot/atom.js', 'client');
  api.addFiles('marker-graphs/src/atoms/scatter-plot-3d/atom.js', 'client');
  api.addFiles('marker-graphs/src/atoms/pie-chart/atom.js', 'client');
  api.addFiles('marker-graphs/src/atoms/line-chart/atom.js', 'client');
  api.addFiles('marker-graphs/src/atoms/area-chart/atom.js', 'client');
  api.addFiles('marker-graphs/src/atoms/chord-chart/atom.js', 'client');
  api.addFiles('marker-graphs/src/atoms/3d-pie-chart/atom.js', 'client');
  api.addFiles('marker-graphs/src/atoms/world/atom.js', 'client');
  api.addFiles('marker-graphs/src/atoms/bar-chart/atom.js', 'client');

  api.export('Molecule', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gopatrik:marker');
  api.addFiles('gopatrik:marker-tests.js');
});

const webpackConfig = require("./webpack.test.js"); // Assurez-vous d'importer votre configuration Webpack

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("karma-jasmine-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-webpack"), // Ajoutez ce plugin
    ],
    client: {
      clearContext: false, // laisse Jasmine afficher les résultats des tests dans le navigateur
    },
    files: [{ pattern: "./src/**/*.spec.ts", watched: false }],
    preprocessors: {
      "**/*.ts": ["webpack"], // Prétraiter les fichiers .ts avec Webpack
    },
    webpack: webpackConfig, // Utiliser votre configuration Webpack ici
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
  });
};

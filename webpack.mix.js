const mix = require('laravel-mix');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const glob = require('glob');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
mix.setPublicPath('assets');

// Компилируем каждый файл JS в отдельный файл с таким же названием
glob.sync('src/js/*.js').forEach(function(file) {
    mix.js(file, 'assets').vue();
});

// Компилируем каждый файл SCSS в отдельный файл с таким же названием
glob.sync('src/scss/*.scss').forEach(function(file) {
    mix.sass(file, 'assets').options({
        processCssUrls: false,
        postCss: [
            tailwindcss(),
            autoprefixer(),
        ],
    });
});

// Добавляем BrowserSync
mix.browserSync({
    proxy: 'http://127.0.0.1:9292',
    https: true,
    files: [
        'assets/**/*',
        'templates/**/*',
    ],
    reloadDelay: 500,
});

mix.disableSuccessNotifications();

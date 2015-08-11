#!/usr/bin/node

var gm = require('gm');
var fs = require('fs-extra');
var async = require('async');
var parseArgs = require('minimist')
var argv = parseArgs(process.argv);
if (!argv.i || !argv.o) {
    console.log('Usage: node iconiser.js -i icon.png -o ./output_dir');
    process.exit();
}
console.log(argv);
var inputFile = argv.i;
var outputDir = argv.o;
// read in original file.
fs.exists(inputFile, function(exists) {
    if (!exists) {
        console.log('Unable to locate file ' + inputFile);
        process.exit();
    }
    async.eachSeries(icons, function(icon, callback) {
        fs.ensureDir(outputDir + '/' + icon.platform, function(err) {
            if (err) return callback(err);
            gm(inputFile).resize(icon.width, icon.height).write(outputDir + '/' + icon.platform + '/icon' + icon.height + (icon.filetype ? icon.filetype : '') + '.png', callback);
        });
    }, function(err) {
        console.log(err);
        process.exit();
    });
});

var icons = [{
    platform: 'ios',
    height: 1024,
    width: 1024,
    device: 'App Store'
}, {
    platform: 'ios',
    height: 180,
    width: 180,
    device: 'iPhone 6 Plus',
    filetype: '@3x'
}, {
    platform: 'ios',
    height: 152,
    width: 152,
    device: 'iPad',
    filetype: '@2x'
}, {
    platform: 'ios',
    height: 120,
    width: 120,
    device: 'iPhone 6',
    filetype: '@2x'
}, {
    platform: 'ios',
    height: 120,
    width: 120,
    device: 'Spotlight search',
    filetype: '@3x'
}, {
    platform: 'ios',
    height: 87,
    width: 87,
    device: 'Settings',
    filetype: '@3x'
}, {
    platform: 'ios',
    height: 80,
    width: 80,
    device: 'Spotlight search',
    filetype: '@2x'
}, {
    platform: 'ios',
    height: 76,
    width: 76,
    device: 'iPad 2'
}, {
    platform: 'ios',
    height: 58,
    width: 58,
    device: 'Settings',
    filetype: '@2x'
}, {
    platform: 'ios',
    height: 40,
    width: 40,
    device: 'Spotlight search'
}, {
    platform: 'ios',
    height: 29,
    width: 29,
    device: 'Settings'
}, {
    platform: 'android',
    height: 512,
    width: 512,
    device: 'Android Market'
}, {
    platform: 'android',
    height: 192,
    width: 192,
    device: 'xxxhdpi',
    filetype: 'xxxhdpi'
}, {
    platform: 'android',
    height: 144,
    width: 144,
    device: 'xxhdpi',
    filetype: 'xxhdpi'
}, {
    platform: 'android',
    height: 96,
    width: 96,
    device: 'xhdpi',
    filetype: 'xhdpi'
}, {
    platform: 'android',
    height: 72,
    width: 72,
    device: 'hdpi',
    filetype: 'hdpi'
}, {
    platform: 'android',
    height: 48,
    width: 48,
    device: 'mdpi',
    filetype: 'mdpi'
}, {
    platform: 'android',
    height: 36,
    width: 36,
    device: 'ldpi',
    filetype: 'ldpi'
}];
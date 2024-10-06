(function () {
    'use strict';

    angular.module('MenuApp', ['ui.router', 'Data']);

    angular.module('MenuApp')
    .config(function() {
        console.log("MenuApp config executed.");
    }).

    run(function() {
        console.log("MenuApp run executed.");
    })

})();
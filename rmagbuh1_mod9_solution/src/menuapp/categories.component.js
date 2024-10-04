(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('menuApp', {
      templateUrl: 'src/menuapp/templates/categories.template.html',
      bindings: {
        items: '<'
      }
    });
    
    })();
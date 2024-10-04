(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('menuApp', {
      templateUrl: 'src/menuapp/templates/items.template.html',
      bindings: {
        items: '<'
      }
    });
    
    })();
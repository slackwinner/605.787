(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('categoryItems', {
      templateUrl: 'src/menuapp/templates/items.template.html',
      bindings: {
        items: '<'
      }
    });
    
    })();
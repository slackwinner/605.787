(function () {
    'use strict';

    angular.module('MenuApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home Page
        .state('home', {
            url: '/',
            templateURL: 'src/menuapp/templates/home.template.html'
        })

        // Categories Page
        .state('categories', {
            url: '/categories',
            templateURL: 'src/menuapp/templates/categories.template.html',
            controller: 'CategoriesController as categoryCtrl',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        // Category Items Page
        .state('categoryItems', {
            url: '/categoryItems/{categoryShortName}',
            templateURL: 'src/menuapp/templates/items.template.html',
            controller: 'CategoryItemsController as categoryItemsCtrl',
            resolve: {
                categoryItems: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoriesShortName);
                }]
            }
        })
    }
})();
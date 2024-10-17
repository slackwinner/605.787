(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://coursera-jhu-default-rtdb.firebaseio.com')
.constant('ImagePath', 'images/menu')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();

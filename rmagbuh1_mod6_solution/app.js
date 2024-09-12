(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.listInput = "";
    $scope.message = "";

    $scope.checkList = function () {
        // Split up input list into an array by the comma delimiter
        var splitList = $scope.listInput.split(",");
        // Filter out empty strings within array
        var filterList = splitList.filter(item => item.trim() != '');
        // Get the appropriate message based on array size
        getMessage(filterList.length);
    };

    function getMessage (inputSize) {
        // Is the array size empty?
        if(inputSize == 0) {
            $scope.message = "Please enter data first";
        }
        // Does the array size fall in between 1-3 items?
        else if (inputSize >= 1 && inputSize <= 3) {
            $scope.message = "Enjoy!!";
        }
        else {
            $scope.message = "Too Much!!";
        }
    }
}
})();
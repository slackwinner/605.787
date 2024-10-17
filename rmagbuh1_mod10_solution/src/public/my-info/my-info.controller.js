(function (){
    'use strict';

    angular.module('public')
      .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['user', 'ImagePath'];
    function MyInfoController(user, ImagePath) {
        var infoCtrl = this;
        infoCtrl.user = user;

        // Is there a saved user profile?
        if (infoCtrl.user == null) {
            infoCtrl.noUserFound = true;
        } else {
            // Set the variable values for the my-info page
            // User Info
            infoCtrl.firstName = user.firstName;
            infoCtrl.lastName = user.lastName;
            infoCtrl.email = user.email;
            infoCtrl.phone = user.phone;

            // Menu Info
            infoCtrl.menuCategory = user.menuCategory;
            infoCtrl.menuName = user.menuInfo.name;
            infoCtrl.menuShortName = user.menuInfo.short_name;
            infoCtrl.menuDesc = user.menuInfo.description;
            infoCtrl.menuItemPath = (ImagePath + "/" + infoCtrl.menuCategory + "/" + infoCtrl.menuShortName + ".jpg");
        }
    }
})();
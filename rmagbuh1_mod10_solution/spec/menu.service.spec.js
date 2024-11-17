describe('menuService', function () {

    // Angular Related Variables
    var menuService;
    var $httpBackend;
    var ApiPath;

    beforeEach(function () {
      module('common');
  
      inject(function ($injector) {
        menuService = $injector.get('MenuService');
        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath');
      });
    });
  
    it('should return a valid response if menu item exists', function() {
        // Valid input/response variables
        var validMenuCategory = 'FR';
        var validMenuItemNum = '1';
        var validMenuItem = 'FR2';
        var validResponse = {"description": "white meat chicken sauteed with onions and bean sprouts with rice", 
                        "large_portion_name": "large",
                        "name": "Chicken Fried Rice",
                        "price_large": 12.45,
                        "price_small": 9.95,
                        "short_name": "FR2",
                        "small_portion_name": "pint"
        };
      $httpBackend.whenGET(ApiPath + "/menu_items/" + validMenuCategory + "/menu_items/" + validMenuItemNum + ".json").respond(validResponse);
      menuService.checkDish(validMenuItem).then(function(msResponse) {
        expect(msResponse.menuInfo).toEqual(validResponse);
      });
      $httpBackend.flush();
    });

    it('should return an invalid response if menu item does not exists', function() {
        // Invalid input/response variables
        var invalidMenuCategory = 'C';
        var invalidMenuItemNum = '53';
        var invalidMenuItem = 'C54';
        var invalidResponse = null;

        $httpBackend.whenGET(ApiPath + "/menu_items/" + invalidMenuCategory + "/menu_items/" + invalidMenuItemNum + ".json").respond(invalidResponse);
        menuService.checkDish(invalidMenuItem).then(function(msResponse) {
          expect(msResponse.menuInfo).toEqual(invalidResponse);
        });
        $httpBackend.flush();
      });
  
  });
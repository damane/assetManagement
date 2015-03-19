var assetApp = angular.module('app', ['ngRoute', 'ngResource', 'ngTable', 'controllers', 'googlechart', 'ui.bootstrap', 'ang-drag-drop',
                                       'route-segment', 'view-segment', 'textAngular', 'angularFileUpload']);
angular.module('controllers', []);

soccerApp.run(['$rootScope', function($rootScope) {
	$rootScope.url = jQuery('#context_path').val() + '/rest'; // FIXME hard
																// coding of
																// context root
	$rootScope.dateFormat = 'yyyy-MMMM-dd';
//	$rootScope.activePlayer = null; // this is the name and id of the currently
									// selected player
} ]);

// http://angular-route-segment.com/ - replaced routeProvider as I need to
// handle nested routes
assetApp.config([ '$routeSegmentProvider', '$routeProvider', '$httpProvider', function($routeSegmentProvider, $routeProvider) {

			// @See http://angular-route-segment.com/
	 $routeSegmentProvider.when('/assets', 's1')
	 .when('/assets/createasset', 's1.createasset')
	 .when('/assets/createcenter', 's1.createcenter')
	 
	 $routeSegmentProvider .when('/section', 's2')
	 .when('/section/users', 's2.users')
	 .when('/section/dashboard','s2.dashboard')
	 
	 $routeSegmentProvider.segment('s2', {
				templateUrl : 'views/deshdoard.html',
				controller : 'DashboardController'});
			$routeSegmentProvider.within('s2').segment('dashboard', {
				'default': true,
				templateUrl : 'views/assets/addAsset.html'});
	 
	 $routeSegmentProvider.segment('s1', {
	 templateUrl: 'views/assets/addAsset.html',
	 controller: 'AddAssetController'});
	
	 $routeSegmentProvider.within('s1').segment('createasset', {
	 templateUrl: 'views/assets/addAsset.html'});
	 $routeSegmentProvider.within('s1').segment('createcenter', {
			templateUrl : 'views/assets/createCenter.xhtml',
			controller: 'CreateCenterController'});
	 
	 $routeSegmentProvider.segment('s2', {
		 templateUrl: 'views/section/users.html',
		 controller: 'CreateUserController'});
		
		 $routeSegmentProvider.within('s2').segment('users', {
		 templateUrl: 'views/section/createUser.html'});
	 
		// https://ssms.co.za/img/logonomerge.png

		} ]);

assetApp.config(['datepickerConfig', 'datepickerPopupConfig', function(datepickerConfig, datepickerPopupConfig) {
   
    datepickerConfig.showWeeks = false;
    // this line below does not work yet.
    datepickerPopupConfig.datepickerPopup = 'yyyy-MMMM-dd';
    datepickerPopupConfig.showButtonBar = false;
    
}]);



assetApp.directive('ngConfirmClick', [ function() {
	return {
		priority : -1,
		restrict : 'A',
		link : function(scope, element, attrs) {
			element.bind('click', function(e) {
				var message = attrs.ngConfirmClick;
				if (message && !confirm(message)) {
					e.stopImmediatePropagation();
					e.preventDefault();
				}
			});
		}
	}
} ]);

// found on stackoverflow:
// http://stackoverflow.com/questions/23712497/angularjs-ng-table-fixed-headers
soccerApp.directive('fixedTableHeaders', [ '$timeout', function($timeout) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			$timeout(function() {
				container = element.parentsUntil(attrs.fixedTableHeaders);
				element.stickyTableHeaders({
					scrollableArea : container,
					"fixedOffset" : 2
				});
			}, 0);
		}
	}
} ]);

// http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
soccerApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

mainModule
	.config(Router);

Router.$inject = ['$routeProvider'];

function Router($routeProvider) {
	$routeProvider.otherwise( { redirectTo:'/' });

	 $routeProvider
	 	.when('/', { 
	 		templateUrl:'/html/home.html'})
        .when('/beerPanel/:brewery/:beer', {
            templateUrl:'/html/beerPanel.html'})
		.when('/beerPanel2/:brewery/:beer', {
            templateUrl:'/html/beerPanel2.html'})
        .when('/about', {
        	templateUrl:'/html/about.html'})
        .when('/beerDesc/:brewery/:beer', {
        	templateUrl: '/html/beerDesc.html'})
		.when('/breweryAll/:brewery', {
        	templateUrl: '/html/breweryAll.html'})
		.when('/dashboard', {
        	templateUrl: '/html/dashboard.html'})	
    }

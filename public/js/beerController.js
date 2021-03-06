mainModule
	.controller("beerController", function($http) {

		var beer = this;
		beer.beerData2={};
		beer.beerData = {};
		beer.brewerData = {};
		$http.beerDesc = false;
		beer.currentPage = 1;
		beer.users=[];
		beer.breweryName = {};
        window.beer = beer;
		
		
// searches for beer name from search bar
beer.search = function () {
		$http.get('/api/search?q='+ beer.beerName )
			.then(function successCallback(success) {
				if(success.data.data) {
                beer.beerData = success.data.data[0];
				console.log(beer.beerData);
					} else {function errorCallback(err) {	
				console.log("ERROR ERROR ERROR!!!", err)
				};
			}	
			})},
// searches beer from list of all beers from brewery
	beer.searchList = function (oneBeer) {
		$http.get('/api/search?q='+ oneBeer.breweries[0].name +' '+ oneBeer.name)
			.then(function successCallback(success) {
				if(success.data.data) {
                beer.beerData = success.data.data[0];
				console.log(beer.beerData);
				} else {function errorCallback(err) {
				console.log("ERROR ERROR ERROR!!!", err)
				};
			}	
			})},
		console.log("Finding Beer!");
// shows list of all beers from particular brewery
	beer.searchBrewery = function () {
		$http.get('/api/brewery/'+ beer.beerData.breweries[0].id + '/beers')
			.then(function successCallback(success) {
				if(success.data.data) {
                beer.brewerData = success.data.data;
				console.log(beer.brewerData)
				} else {
				console.log("Brewery not found.");
				} function errorCallback(err) {
				console.log("ERROR ERROR ERROR!!!", err)
				};
			}	
		)},
		
		console.log("Finding Breweries!");
// trying to search breweries in addition to beers in search bar
	beer.searchBreweries = function () {
		$http.get('/api/breweries?name=' + beer.brewerData.name )
		.then(function sucessCallback(success){
				if(success.data.data) {
                beer.beerData = success.data.data[0];
				console.log(beer.brewerData);
				} else {
				console.log("Brewery not found.");
				} function errorCallback(err) {
				console.log("ERROR ERROR ERROR!!!", err)
				};
			}	
		)},
		console.log("Brewery search done.")
	});

/* Homepage Factory
======================================================================================
======================================================================================
*/

factoryApp.factory('homePageData', function($http){
	return {
		getHomePageData: function(){
	    	return $http.get("https://eygb.sharepoint.com/sites/CSG-Test-V2/Factory-JST/_api/web/lists/getByTitle('Lst_Docs')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getDocLibraryData: function(){
	    	return $http.get("https://eygb.sharepoint.com/sites/CSG-Test-V2/Factory-JST/_api/web/lists/getByTitle('Documents')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getFactoryData: function(){
	    	return $http.get("https://eygb.sharepoint.com/sites/CSG-Test-V2/Factory-JST/_api/web/lists/getByTitle('Factory-Orders')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}	
	}
	
});
/* Home Controller
====================================================================================================
==================================================================================================*/

factoryApp.controller('homeCtrl', function (homePageData, docParams, $scope, $sce, $http, $stateParams, $window, $filter, $q) {
    'use strict';
  
    $window.scrollTo(0, 0);
	$scope.$sce = $sce;
	$scope.successUploadedArr = [];

    console.log('url', _spPageContextInfo.siteAbsoluteUrl);

   
    homePageData.getDocLibraryData().then(function(data){
        console.log('docs data: ', data.d.results);
	});
	
	homePageData.getFactoryData().then(function(data){
		console.log('factory data: ', data.d.results);
	});

    // APP
		var APP_BLD = 20181209;
		// CONST
		var HTML_SPINNER = '<div class="sprlib-spinner"><div class="sprlib-bounce1"></div><div class="sprlib-bounce2"></div><div class="sprlib-bounce3"></div></div>';

		/*
			REFS:
			https://blogs.msdn.microsoft.com/uksharepoint/2013/04/20/uploading-files-using-the-rest-api-and-client-side-techniques/
			https://msdn.microsoft.com/en-us/library/office/dn769086.aspx
			http://sharepoint.stackexchange.com/questions/74969/properties-when-uploading-files-using-rest-in-sp-2013
		*/

	$scope.getFilesDetails = function(){
		console.log('output content', $('#console'));
	}

    $scope.doPopulateApp = function() {
			var fileName = "";
			try { fileName = $('#filePicker')[0].files[0]; } catch(ex){}

			// STEP 1:
			$('#sprLibCode').text(
				'// STEP 1: Use FilePicker to read file\n'
				+'var reader = new FileReader();\n'
				+'reader.readAsArrayBuffer( $(\'#filePicker\')[0].files[0] );\n'
				+'reader.onloadend = function(e){\n'
				+'    var parts = $(\'#filePicker\')[0].value.split("\\\\");\n'
				+'    var fileName = parts[parts.length - 1];\n'
				+'    var foldName = $(\'#selDestLib\').val();\n'
				+'\n'
				+'    // STEP 2: Upload file to SharePoint\n'
				+'    sprLib.folder( foldName ).upload({\n'
				+'        name: fileName,\n'
				+'        data: e.target.result,\n'
				+'        overwrite: true\n'
				+'    });\n'
				+'});'
			);
			Prism.highlightElement( $('#sprLibCode')[0] );

			// STEP 2:
			sprLib.site().lists()
			.then(function(arrLists){
				arrLists.forEach(function(list){
					if ( list.BaseType == 'Library' && !list.Hidden ) {
						$('#selDestLib').append('<option value="'+ list.ServerRelativeUrl +'">'+ list.Title +'</option>');
					}
				});

				$('#contOptions .sprlib-spinner').hide();
			})
			.catch(function(strErr){
				alert(strErr);
			});
		}

    $scope.uploadFile = function(){
        //console.log($('#filePicker')[0].files);
        let fileArr = [];
        for (var file in $('#filePicker')[0].files){
            fileArr.push($('#filePicker')[0].files[file]);
        }
        fileArr.length = fileArr.length - 2;
        //console.log('fileArr ', fileArr);
        for (let i = 0; i < fileArr.length; i++){
            //console.log('file ', fileArr[i]);
            var reader = new FileReader();
            reader.readAsArrayBuffer(fileArr[i]);
            reader.onloadend = function(e){
                //console.log('file in onload', fileArr[i]);
                // var parts = $('#filePicker')[0].value.split('\\');
                //console.log('parts '+i, fileArr[i].name);
                //var fileName = parts[parts.length - 1];
                let fileName = fileArr[i].name;
                //console.log('filename '+i, fileName)
                var strAjaxUrl = _spPageContextInfo.siteAbsoluteUrl
                    + "/Factory-JST/_api/web/lists/getByTitle('Documents')/RootFolder/files/Add(url='"+ fileName +"',overwrite=true)";

                //console.log('strAjaxUrl ', strAjaxUrl);
                //console.log('e.target.result', e.target.result);
                sprLib.rest({
                    type: "POST",
                    url: strAjaxUrl,                
					data: e.target.result
                })
                .then(function(arr){
					console.log('result arr ', arr);
					$('#console').append('SUCCESS: "'+ arr[0].Name +'" uploaded to: '+ arr[0].ServerRelativeUrl +'<br>');
					$scope.successUploadedArr.push({FileName: arr[0].Name, FileUrl: arr[0].ServerRelativeUrl});

					docParams.addDoc({FileName: arr[0].Name, FileUrl: arr[0].ServerRelativeUrl});

				})
                .catch(function(strErr){
                    console.error(strErr);
				})				
            };
			reader.onerror = function(e){
				alert(e.target.error.responseText);
				console.error(e.target.error);
			};		
			
		}

			setInterval(function(){
				console.log('success array', $scope.successUploadedArr);
			}, 1000);
			
			var docArr = docParams.getDocArr();
			console.log('docParams', docArr);
			// STEP 2: Show version
			// $('#console').append('<h5 class="text-primary">FYI: sprLib.version = '+ sprLib.version +'</h5>');

			// STEP 3: Populate
			//$scope.doPopulateApp();
		}

   
		// $scope.submitInfo = function(){
		// 	     // console.log('formData', formData);
		// 		 var newItem = {
		// 			'__metadata':{ type :'SP.Data.Lst_x005f_DocsListItem'},
		// 			'uploaded_x002d_Docs': formData
		// 		};
		// 		console.log('newItem', newItem);
		// 		$.ajax({
		// 		  url:
		// 			_spPageContextInfo.siteAbsoluteUrl + "/Factory-JST/_api/web/lists/getbytitle('Lst_Docs')/Items",
		// 			type: "POST",
		// 			// contentType: undefined,
		// 			data: JSON.stringify(newItem),
		// 		//   processData: false,            
		// 			transformRequest: angular.identity,
		// 			headers: {
		// 			accept: "application/json;odata=verbose", //It defines the Data format
		// 			"content-type": "application/json;odata=verbose", //It defines the content type as JSON
		// 			"X-RequestDigest": $("#__REQUESTDIGEST").val()
		// 		  },
		// 		  success: function(result) {
		// 			console.log ('success ', result);
		// 		  },
		// 		  error: function(error) {
		// 			  console.log("error " + error);
		// 		  }
		// 		});
		// }
   
});  


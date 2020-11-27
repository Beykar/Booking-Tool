 // $scope.uploadFile = function() {
            console.log('value ', $('#filePicker')[0].files);


            var formData = [];
            for (var i = 0; i < $('#filePicker')[0].files.length; i++){
                console.log('type', File);
                formData.push(File);
            }

            // console.log('formData', formData);
            var newItem = {
                '__metadata':{ type :'SP.Data.Lst_x005f_DocsListItem'},
                'uploaded_x002d_Docs': formData
            };
            console.log('newItem', newItem);
            $.ajax({
              url:
                _spPageContextInfo.siteAbsoluteUrl + "/Factory-JST/_api/web/lists/getbytitle('Lst_Docs')/Items",
                type: "POST",
                // contentType: undefined,
                data: JSON.stringify(newItem),
            //   processData: false,            
                transformRequest: angular.identity,
                headers: {
                accept: "application/json;odata=verbose", //It defines the Data format
                "content-type": "application/json;odata=verbose", //It defines the content type as JSON
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
              },
              success: function(result) {
                console.log ('success ', result);
              },
              error: function(error) {
                  console.log("error " + error);
              }
            });
        }
    
    // $scope.fileUpload = function() {
    //     console.log('url ', _spPageContextInfo.siteAbsoluteUrl + "/Factory-JST/_api/web/lists/getbytitle('Lst_Docs')/");
            
    //     // console.log('files ', $('#filePicker')[0]['files'][0]);
        
    //     var dataValue = {
    //         '__metadata':{ type :'SP.Data.Lst_x005f_DocsListItem'},
    //         'uploaded_x002d_Docs': 'hello'
    //     },
    //         deferred = $q.defer();
    //     $http({
    //         url: "https://eygb.sharepoint.com/sites/CSG-Test-V2/Factory-JST/_api/lists/getbytitle('Lst_Docs')/Items",
    //         method: "POST",
    //         //processData: false,
            
    //         //transformRequest: angular.identity,
    //         headers: {
    //             Accept: "application/json;odata=verbose",
    //             "X-RequestDigest": $("__REQUESTDIGEST").val(),
    //             "Content-Type": "application/json; odata=verbose"
    //         },
    //         data: dataValue
    //     })
    //         .then(function (result) {
    //             deferred.resolve(result);
    //         })
    //         .catch(function (err) {
    //             console.log('error message ', err);
    //         });
    //     return deferred.promise;
    // }
    
    // $scope.uploadFile = function(){
    //     console.log('file', $('#filePicker').val());
    //     var dataValue =  "{'__metadata':{'type':'SP.Data.Lst_x005f_DocsListItem'}}"; 
    //     console.log('dataValue ', dataValue);
    //     // $.ajax({
            
    //     //     url:  _spPageContextInfo.siteAbsoluteUrl + "/_api/lists/getbytitle('Lst_Docs')",
    //     //     type: "POST",
    //     //     data: JSON.stringify({
    //     //     '__metadata':{'type' :'SP.Data.Lst_x005f_DocsListItem'},
    //     //     'uploaded_x002d_Docs': $('#filePicker').val()
    //     //     }),
    //     //     headers:{
    //     //         "accept": "application/json;odata=verbose",
    //     //         "content-type": "application/json; odata=verbose",
    //     //         "X-RequestDigest": $("#__REQUESTDIGEST").val()
    //     //     },
    //     //     success: function(data){
    //     //         console.log('success: ', data);
    //     //     },
    //     //     error: function(error){
    //     //         console.log('failed ', error);
    //     //     }
    //     // })

      
        
    // }

    // $scope.uploadFile = function(){
    //     console.log('file', $('#filePicker')[0].files[0]);
    //     var reader = new FileReader();
    //     reader.readAsArrayBuffer( $('#filePicker')[0].files[0] );
    //     reader.onloadend = function(e){
    //         var parts = $('#filePicker')[0].value.split('\\');
    //         var fileName = parts[parts.length - 1];
    //         var strAjaxUrl = _spPageContextInfo.siteAbsoluteUrl
    //             + "/_api/web/lists/getByTitle('Site&#xA0Assets')"
    //             + "/RootFolder/files/add(overwrite=true,url='"+ fileName +"')";

    //             console.log('strAjaxUrl', strAjaxUrl);
    //         sprLib.rest({
    //             url: strAjaxUrl,
    //             type: "POST",
    //             data: e.target.result
    //         })
    //         .then(function(arr){
    //             $('#console').append('SUCCESS: "'+ arr[0].Name +'" uploaded to: '+ arr[0].ServerRelativeUrl +'<br>');
    //         })
    //         .catch(function(strErr){
    //             console.error(strErr);
    //         });
    //     };
    //     reader.onerror = function(e){
    //         alert(e.target.error.responseText);
    //         console.error(e.target.error);
    //     };
    // }

    
factoryApp.directive("uploadFile", function() {
    return {
      restrict: "AE",
      templateUrl:
        "https://eygb.sharepoint.com/sites/CSG-Test-V2/Factory-JST/SiteAssets/web-assets/assets/js/partials/uploadPartial.html",
      scope: true,
      link: function(scope, elem, attr) {
      

        scope.uploadFile = function(newItem) {
            console.log('value ', $('#filePicker')[0].files[0]);
            var newItem2 = {
                '__metadata':{ type :'SP.Data.Lst_x005f_DocsListItem'},
                'uploaded_x002d_Docs': $('#filePicker')[0].files[0]
            };
            console.log('newItem',newItem)
            $.ajax({
              url:
              _spPageContextInfo.siteAbsoluteUrl + "/Factory-JST/_api/web/lists/getbytitle('Lst_Docs')/Items",
              type: "POST",
              contentType: undefined,
              data: JSON.stringify(newItem2),
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
                  console.log('error ', error);
              }
            });
          }
        }
    };
})   
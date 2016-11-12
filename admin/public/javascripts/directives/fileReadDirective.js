
var h3Framework = angular.module('h3Framework')

.directive("fileread", function () {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {

        for(var i=0; i<changeEvent.target.files.length; i++){
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = scope.fileread || [];
              scope.fileread.push(loadEvent.target.result);

              if(element[0].parentNode && element[0].parentNode.classList.contains('btn-primary')){
                element[0].parentNode.classList.remove('btn-primary');
                element[0].parentNode.classList.add('btn-success');
                element[0].parentNode.textContent += " : " + (i) + "개";
              }

            });
          }
          reader.readAsDataURL(changeEvent.target.files[i]);
        }
      });
    }
  }
});

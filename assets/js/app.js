'use strict';

var app = angular.module('app', []);

// truncate the length of the body
app.filter('truncate', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';
        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
});

//remove html tags/brackets
app.filter('removeHTMLTags', function() {
	return function(text) {
		return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
	};
});

//controller
app.controller('EmailCtrl', function($scope, $http) {
  $http.get('assets/js/emails.json')
    .then(function(res){
      $scope.emails = res.data;
    });
});

app.controller('emailDetailViewCtrl', function($scope) {
  var vm = this;
  vm.theEmail = null;
  vm.showDetailView = function($index) {
    console.log($index);
    vm.isDetail = !vm.isDetail;
  }
})

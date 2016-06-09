'use strict';

angular.module('babitchFrontendApp').controller('babitchTournamentCtrl', function($scope, Restangular, $stateParams, $location) {

    $scope.tournament = {
        id: 0
    };

    Restangular.one('tournaments', $stateParams.id).get().then(function(data) {
        // var teams = [];
        // angular.forEach(data.teams, function(value, key) {
        //   this.push(value.id);
        // }, teams);
        // data.teams = teams;
        $scope.tournament = data;
    });

    // function to submit the form after all validation has occurred
    // $scope.submitForm = function() {

    //     // check to make sure the form is completely valid
    //     if ($scope.tournamentForm.$valid) {
    //         Restangular.all('tournaments').post($scope.tournament).then(function() {
    //             $location.path('/admin/tournaments');
    //         });
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // };
});

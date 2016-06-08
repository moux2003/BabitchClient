'use strict';

angular.module('babitchFrontendApp').controller('babitchAdminTournamentCtrl', function($scope, Restangular, $location) {

    Restangular.all('teams').getList().then(function(teams) {
        $scope.teams = teams;
    });

    // function to submit the form after all validation has occurred
    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.tournamentForm.$valid) {
            Restangular.all('tournaments').post($scope.tournament).then(function() {
                $location.path('/admin/tournaments');
            });
            return true;
        }
        else {
            return false;
        }
    };
});

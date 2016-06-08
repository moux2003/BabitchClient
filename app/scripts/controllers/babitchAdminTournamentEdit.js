'use strict';

angular.module('babitchFrontendApp').controller('babitchAdminTournamentEditCtrl', function($scope, Restangular, $stateParams, $location) {

    $scope.tournament = {
        id: 0
    };

    Restangular.one('tournaments', $stateParams.id).get().then(function(data) {
        var teams = [];
        angular.forEach(data.teams, function(value, key) {
          this.push(value.id);
        }, teams);
        data.teams = teams;
        $scope.tournament = data;
    });

    Restangular.all('teams').getList().then(function(teams) {
        $scope.teams = teams;
    });

    // function to submit the form after all validation has occurred
    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.tournamentForm.$valid) {
            // transform data
            // $scope.tournament.player1 = $scope.tournament.player1.id ? $scope.tournament.player1.id : $scope.tournament.player1;
            // $scope.tournament.player2 = $scope.tournament.player2.id ? $scope.tournament.player2.id : $scope.tournament.player2;
            console.log($scope.tournament);

            $scope.tournament.put().then(function() {
                $location.path('/admin/tournaments');
            });
            return true;
        } else {
            return false;
        }
    };
});

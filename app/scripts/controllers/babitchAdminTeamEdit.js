'use strict';

angular.module('babitchFrontendApp').controller('babitchAdminTeamEditCtrl', function($scope, Restangular, $stateParams, $location) {

    $scope.team = {
        id: 0
    };

    Restangular.one('teams', $stateParams.id).get().then(function(data) {
        $scope.team = data;
    });

    Restangular.all('players').getList().then(function(players) {
        $scope.players = players;
    });

    // function to submit the form after all validation has occurred
    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.teamForm.$valid) {
            // transform data
            $scope.team.player1 = $scope.team.player1.id ? $scope.team.player1.id : $scope.team.player1;
            $scope.team.player2 = $scope.team.player2.id ? $scope.team.player2.id : $scope.team.player2;

            $scope.team.put().then(function() {
                $location.path('/admin/teams');
            });
            return true;
        } else {
            return false;
        }
    };
});

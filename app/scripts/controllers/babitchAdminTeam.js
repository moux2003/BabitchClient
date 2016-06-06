'use strict';

angular.module('babitchFrontendApp').controller('babitchAdminTeamCtrl', function($scope, Restangular, $location) {

    Restangular.all('players').getList().then(function(players) {
        $scope.players = players;
    });

    // function to submit the form after all validation has occurred
    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.teamForm.$valid) {
            Restangular.all('teams').post($scope.team).then(function() {
                $location.path('/admin/teams');
            });
            return true;
        }
        else {
            return false;
        }
    };
});

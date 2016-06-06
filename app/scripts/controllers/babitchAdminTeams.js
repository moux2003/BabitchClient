'use strict';

angular.module('babitchFrontendApp').controller('babitchAdminTeamsCtrl', function($scope, $window, Restangular) {

    Restangular.all('teams').getList().then(function(teams) {
        $scope.teams = teams;
    });

    $scope.deleteTeam = function(team) {
        if($window.confirm('Are you sure to delete team "' + team.name +'" ?')) {
            team.remove().then(function() {
                $scope.teams = _.without($scope.teams, team);
            });
        }
    };

});

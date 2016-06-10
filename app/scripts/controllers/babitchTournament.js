'use strict';

angular.module('babitchFrontendApp').controller('babitchTournamentCtrl', function($scope, Restangular, $stateParams, $window) {

    $scope.tournament = {
        id: 0
    };

    $scope.groups = [];

    Restangular.one('tournaments', $stateParams.id).get().then(function(data) {
        $scope.tournament = data;
        $scope.tournament.getList('groups').then(function(groups) {
            $scope.groups = groups;
        });
    });

    $scope.deleteGroups = function() {
        if($window.confirm('Are you sure you want to delete all groups from tournament ' + $scope.tournament.name +' ?')) {
            angular.forEach($scope.groups, function(group, key) {
                group.remove().then(function() {
                    $scope.groups = _.without($scope.groups, group);
                });
            });
        }
    }

    $scope.generateGroups = function() {
        if($window.confirm('Are you sure ?')) {
            var groupA = {
                name: 'Poule A',
                tournament: $scope.tournament.id,
                teams: []
            };
            var groupB = {
                name: 'Poule B',
                tournament: $scope.tournament.id,
                teams: []
            };

            for(var i = 0; i < $scope.tournament.teams.length; i++) {
                if ((i+1) <= $scope.tournament.teams.length/2) {
                    groupA.teams.push($scope.tournament.teams[i].id);
                } else {
                    groupB.teams.push($scope.tournament.teams[i].id);
                }
            }

            $scope.tournament.post('groups', groupA).then(function() {
                $scope.tournament.post('groups', groupB).then(function() {
                    $scope.tournament.getList('groups').then(function(groups) {
                        $scope.groups = groups;
                    });
                });
            });
        }
    };
});

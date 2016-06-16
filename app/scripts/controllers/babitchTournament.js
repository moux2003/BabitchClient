'use strict';

angular.module('babitchFrontendApp').controller('babitchTournamentCtrl', function($scope, Restangular, $stateParams, $window) {

    $scope.tournament = {
        id: 0
    };

    $scope.groups = [];

    $scope.teamPoints = {};

    Restangular.one('tournaments', $stateParams.id).get().then(function(data) {
        $scope.tournament = data;
        // Find groups and fill ranking
        $scope.tournament.getList('groups').then(function(groups) {
            $scope.groups = groups;
            initRanking();
        });
    });

    function initRanking() {
      angular.forEach($scope.groups, function(group, key) {
              // Init ranking
              angular.forEach(group.teams, function(team, key) {
                $scope.teamPoints[group.id] = $scope.teamPoints[group.id] || {};
                $scope.teamPoints[group.id][team.id] = {
                  points: 0,
                  name: team.name
                };
              });
              angular.forEach(group.matchs, function(match, key) {
                if (match.game) {
                  if (match.game.red_score > match.game.blue_score) {
                    $scope.teamPoints[group.id][red_team.id].points += 3;
                  } else {
                    $scope.teamPoints[group.id][blue_team.id].points += 3;
                  }
                }
              });
            });
    }

    $scope.updateGroups = function(groups) {
        angular.forEach(groups, function(group, key) {
            // Data transformation
            group.matchs = [];
            group.tournament = group.tournament.id;
            var teams = [];
            angular.forEach(group.teams, function(team, key) {
                this.push(team.id);
            }, teams);
            group.teams = teams;
            // Matchs generation
            for (var i = 0; i < group.teams.length; i++) {
                for (var j = i+1; j < group.teams.length; j++) {
                    group.matchs.push({
                        red_team: group.teams[i],
                        blue_team: group.teams[j],
                        game: null
                    });
                }
            }
            group.put();
        });

        $scope.groups = groups;
    }

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
                        $scope.updateGroups(groups);
                    });
                });
            });
        }
    };
});

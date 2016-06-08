'use strict';

angular.module('babitchFrontendApp').controller('babitchAdminTournamentsCtrl', function($scope, $window, Restangular) {

    Restangular.all('tournaments').getList().then(function(tournaments) {
        $scope.tournaments = tournaments;
    });

    $scope.deleteTournament = function(tournament) {
        if($window.confirm('Are you sure to delete tournament "' + tournament.name +'" ?')) {
            tournament.remove().then(function() {
                $scope.tournaments = _.without($scope.tournaments, tournament);
            });
        }
    };

});

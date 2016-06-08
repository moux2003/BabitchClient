'use strict';

angular.module('babitchFrontendApp', [
    'ngCookies',
    'ngSanitize',
    'ui.router',
    'babitchServer',
    'faye',
    'ui.gravatar',
    'restangular',
    'checklist-model'
])
    .config(function($stateProvider,  $urlRouterProvider, $httpProvider, gravatarServiceProvider, RestangularProvider, CONFIG) {
        gravatarServiceProvider.defaults = {
            size: 400,
            default: 'mm' // Mystery man as default for missing avatars
        };

        $urlRouterProvider.otherwise('/');

        $urlRouterProvider.when('/admin', '/admin/players');

        $stateProvider
            .state('root', {
                url: '/',
                templateUrl: 'views/main.html',
                abstract: true
            })
            .state('root.home', {
                url: '',
                views: {
                    'main': {
                        templateUrl: 'views/partial/home.html',
                        controller: 'babitchHomeCtrl'
                    }
                }
            })
            .state('game', {
                url: '/game',
                controller: 'babitchCtrl',
                templateUrl: 'views/game.html'
            })
            .state('root.live', {
                url: 'live',
                views: {
                    'main': {
                        templateUrl: 'views/live.html',
                        controller: 'babitchLiveCtrl'
                    },
                    'extraMenu': {
                        templateUrl: 'views/menu/liveExtraMenu.html'
                    }
                }
            })
            .state('root.admin', {
                url: 'admin/',
                abstract:true
            })
            .state('root.admin.players', {
                url: 'players',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/adminPlayers.html',
                        controller: 'babitchAdminPlayersCtrl'
                    }
                }
            })
            .state('root.admin.player-new', {
                url: 'players/new',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/adminPlayer.html',
                        controller: 'babitchAdminPlayerCtrl'
                    }
                }
            })
            .state('root.admin.player-edit', {
                url: 'players/:id',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/adminPlayer.html',
                        controller: 'babitchAdminPlayerEditCtrl'
                    }
                }
            })
            .state('root.admin.teams', {
                url: 'teams',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/adminTeams.html',
                        controller: 'babitchAdminTeamsCtrl'
                    }
                }
            })
            .state('root.admin.team-new', {
                url: 'teams/new',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/adminTeam.html',
                        controller: 'babitchAdminTeamCtrl'
                    }
                }
            })
            .state('root.admin.team-edit', {
                url: 'teams/:id',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/adminTeam.html',
                        controller: 'babitchAdminTeamEditCtrl'
                    }
                }
            })
            .state('root.admin.tournaments', {
                url: 'tournaments',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/adminTournaments.html',
                        controller: 'babitchAdminTournamentsCtrl'
                    }
                }
            })
            .state('root.admin.tournament-new', {
                url: 'tournaments/new',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/adminTournament.html',
                        controller: 'babitchAdminTournamentCtrl'
                    }
                }
            })
            .state('root.admin.tournament-edit', {
                url: 'tournaments/:id',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/adminTournament.html',
                        controller: 'babitchAdminTournamentEditCtrl'
                    }
                }
            })
            .state('root.stats', {
                url: 'stats/',
                templateUrl: 'views/main.html',
                abstract: true
            })
            .state('root.stats.games', {
                url: 'games',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/statsLastGames.html',
                        controller: 'babitchStatsGamesCtrl'
                    }
                }
            })
            .state('root.stats.game', {
                url: 'games/:selectedGame',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/statsGame.html',
                        controller: 'babitchStatsGameCtrl'
                    }
                }
            })
            .state('root.stats.players', {
                url: 'players',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/statsPlayers.html',
                        controller: 'babitchStatsPlayersCtrl'
                    }
                }
            })
            .state('root.stats.player', {
                url: 'players/:selectedPlayer',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/statsPlayer.html',
                        controller: 'babitchStatsPlayerCtrl'
                    }
                }
            })
            .state('root.stats.teams', {
                url: 'teams',
                views: {
                    'main@root': {
                        templateUrl: 'views/partial/statsTeams.html',
                        controller: 'babitchStatsTeamsCtrl'
                    }
                }
            });

        RestangularProvider.setBaseUrl(CONFIG.BABITCH_WS_URL);

        RestangularProvider.setRequestInterceptor(function(element, operation) {
            if (operation === 'put' || operation === 'post') {
                delete element._links;
                delete element.id;
                delete element.route;
                return element;
            }
        });


        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;


        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });

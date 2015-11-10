angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngTouch', 'ngCordova', 'ngStorage'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.songs', {
        url: '/songs',
        views: {
            'menuContent': {
                templateUrl: 'templates/songs.html',
                controller: 'SongCtrl'
            }
        }
    })

    .state('app.artists', {
            url: '/artists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/artists.html',
                    controller: 'ArtistCtrl'
                }
            }
        })
    
    .state('app.playlists', {
        url: '/playlists',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlists.html',
                controller: 'PlaylistCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/songs');
});
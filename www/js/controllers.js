angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, LocalStorageService) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    //Initialize local storage for vibration
    if (LocalStorageService.getStorageList("ball0133-vibe")) {
        $scope.vibe = LocalStorageService.getStorageList("ball0133-vibe");
    } else {
        $scope.vibe = {
            isChecked: false
        };
        $scope.checkVibe = function () {
            LocalStorageService.setStorageList("ball0133-vibe", $scope.vibe);
        }
    }

    //Initialize local storage for notifications
    if (LocalStorageService.getStorageList("ball0133-notify")) {
        $scope.notify = LocalStorageService.getStorageList("ball0133-notify");
    } else {
        $scope.notify = {
            isChecked: false
        };
        $scope.checkNotify = function () {
            LocalStorageService.setStorageList("ball0133-notify", $scope.notify);
        }
    }
})

.controller('PlaylistsCtrl', function ($scope) {

})

.controller('SongCtrl', function ($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification, filterFilter) {
    if (LocalStorageService.getStorageList("ball0133-1")) {
        //Get whatever items are in localstorage
        $scope.songs = LocalStorageService.getStorageList("ball0133-1");
    } else {
        //If there's nothing in local storage, use these items
        $scope.songs = [
            {
                text: "Afire Love",
                isChecked: false
            },
            {
                text: "Suit & Tie",
                isChecked: false
            }
        ];
        LocalStorageService.setStorageList("ball0133-1", $scope.songs);

    };

    //Add new items to the list and sync localstorage
    $scope.submitForm = function (isValid) {
        if (isValid) {
            $scope.songs.push({
                text: $scope.newSong,
                isChecked: false
            });
            LocalStorageService.setStorageList("ball0133-1", $scope.songs);
            $scope.newSong = "";
        };
    }

    //Delete checked item(s) and sync localstorage
    $scope.delete = function (index) {
        $scope.songs = filterFilter($scope.songs, function (song) {
            return !song.isChecked;
        });
        LocalStorageService.setStorageList("ball0133-1", $scope.songs);
    }

    //Tracking which item is checked so it can be deleted
    $scope.isChecked = function () {
        for (var e in $scope.songs) {
            var listItem = $scope.songs[e];
            if (listItem.isChecked) {
                return true;
            }
        }
        return false;
    };

    //A counter that says how many items are selected to be deleted
    $scope.deleteAllSelected = function () {
        var counter = 0;
        angular.forEach($scope.songs, function (song) {
            counter += song.isChecked ? 1 : 0;
        });
        return counter;
    };

    //See if the item is checked
    $scope.setChecked = function (index) {
        //console.log($scope.songs[index].isChecked);

        //vibration
        if ($scope.songs[index].isChecked && $scope.vibe.isChecked) {
            //alert("Vibration");
            $cordovaVibration.vibrate(300);
        }

        //notification
        var count = 0;
        angular.forEach($scope.songs, function (song) {
            if (song.isChecked) {
                count++;
            }
        });

        //If all items are checked, send off a notification
        if (count == $scope.songs.length && $scope.notify.isChecked) {
            //alert("Notification");
            $cordovaLocalNotification.add({
                id: 'songs_notification',
                title: "Songs List",
                text: 'All songs are selected to be deleted.'
            }).then(function () {
                console.log('notification fired');
            });
        }
    };

    //Delete one item on swipe right
    $scope.deleteItem = function (song) {
        $scope.songs.splice($scope.songs.indexOf(song), 1);
    };
})

.controller('ArtistCtrl', function ($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification, filterFilter) {
    if (LocalStorageService.getStorageList("ball0133-2")) {
        //Get whatever items are in localstorage
        $scope.artists = LocalStorageService.getStorageList("ball0133-2");
    } else {
        //If there's nothing in local storage, use these items
        $scope.artists = [
            {
                text: "Ed Sheeran",
                isChecked: false
            },
            {
                text: "Justin Timberlake",
                isChecked: false
            }
        ];
        LocalStorageService.setStorageList("ball0133-2", $scope.artists);

    };

    //Add new items to the list and sync localstorage
    $scope.submitForm = function (isValid) {
        if (isValid) {
            $scope.artists.push({
                text: $scope.newArtist,
                isChecked: false
            });
            LocalStorageService.setStorageList("ball0133-2", $scope.artists);
            $scope.newArtist = "";
        };
    }

    //Delete checked item(s) and sync localstorage
    $scope.delete = function (index) {
        $scope.artists = filterFilter($scope.artists, function (artist) {
            return !artist.isChecked;
        });
        LocalStorageService.setStorageList("ball0133-2", $scope.artists);
    }

    //Tracking which item is checked so it can be deleted
    $scope.isChecked = function () {
        for (var e in $scope.artists) {
            var listItem = $scope.artists[e];
            if (listItem.isChecked) {
                return true;
            }
        }
        return false;
    };

    //A counter that says how many items are selected to be deleted
    $scope.deleteAllSelected = function () {
        var counter = 0;
        angular.forEach($scope.artists, function (artist) {
            counter += artist.isChecked ? 1 : 0;
        });
        return counter;
    };

    //See if the item is checked
    $scope.setChecked = function (index) {
        //console.log($scope.songs[index].isChecked);

        //vibration
        if ($scope.artists[index].isChecked && $scope.vibe.isChecked) {
            //alert("Vibration");
            $cordovaVibration.vibrate(300);
        }

        //notification
        var count = 0;
        angular.forEach($scope.artists, function (artist) {
            if (artist.isChecked) {
                count++;
            }
        });

        //If all items are checked, send off a notification
        if (count == $scope.artists.length && $scope.notify.isChecked) {
            //alert("Notification");
            $cordovaLocalNotification.add({
                id: 'artists_notification',
                title: "Artists List",
                text: 'All artists are selected to be deleted.'
            }).then(function () {
                console.log('notification fired');
            });
        }
    };

    //Delete one item on swipe right
    $scope.deleteItem = function (artist) {
        $scope.artists.splice($scope.artists.indexOf(artist), 1);
    };
})


.controller('PlaylistCtrl', function ($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification, filterFilter) {
if (LocalStorageService.getStorageList("ball0133-3")) {
        //Get whatever items are in localstorage
        $scope.playlists = LocalStorageService.getStorageList("ball0133-3");
    } else {
        //If there's nothing in local storage, use these items
        $scope.playlists = [
            {
                text: "90s Hit Music",
                isChecked: false
            },
            {
                text: "Brand New Music",
                isChecked: false
            }
        ];
        LocalStorageService.setStorageList("ball0133-3", $scope.playlists);

    };

    //Add new items to the list and sync localstorage
    $scope.submitForm = function (isValid) {
        if (isValid) {
            $scope.playlists.push({
                text: $scope.newPlaylist,
                isChecked: false
            });
            LocalStorageService.setStorageList("ball0133-3", $scope.playlists);
            $scope.newPlaylist = "";
        };
    }

    //Delete checked item(s) and sync localstorage
    $scope.delete = function (index) {
        $scope.playlists = filterFilter($scope.playlists, function (playlist) {
            return !playlist.isChecked;
        });
        LocalStorageService.setStorageList("ball0133-3", $scope.playlists);
    }

    //Tracking which item is checked so it can be deleted
    $scope.isChecked = function () {
        for (var e in $scope.playlists) {
            var listItem = $scope.playlists[e];
            if (listItem.isChecked) {
                return true;
            }
        }
        return false;
    };

    //A counter that says how many items are selected to be deleted
    $scope.deleteAllSelected = function () {
        var counter = 0;
        angular.forEach($scope.playlists, function (artist) {
            counter += artist.isChecked ? 1 : 0;
        });
        return counter;
    };

    //See if the item is checked
    $scope.setChecked = function (index) {
        //console.log($scope.songs[index].isChecked);

        //vibration
        if ($scope.playlists[index].isChecked && $scope.vibe.isChecked) {
            //alert("Vibration");
            $cordovaVibration.vibrate(300);
        }

        //notification
        var count = 0;
        angular.forEach($scope.playlists, function (playlist) {
            if (playlist.isChecked) {
                count++;
            }
        });

        //If all items are checked, send off a notification
        if (count == $scope.playlists.length && $scope.notify.isChecked) {
            //alert("Notification");
            $cordovaLocalNotification.add({
                id: 'playlists_notification',
                title: "Playlists List",
                text: 'All playlists are selected to be deleted.'
            }).then(function () {
                console.log('notification fired');
            });
        }
    };

    //Delete one item on swipe right
    $scope.deleteItem = function (playlist) {
        $scope.playlists.splice($scope.playlists.indexOf(playlist), 1);
    };
});
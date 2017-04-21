(function () {
    
    function SongPlayer ($rootScope, Fixtures) {
        /**
        *@desc Empty object being initialized to map out the IIFE Songplayer.
        */
        var SongPlayer = {};
        
        /**
        *@desc Active song object from list of songs
        *@type {Object}
        */
        SongPlayer.currentSong = null;
        
        
        /**
        *@desc Active sound object for Current Volume
        *@type {Object}
        */
        SongPlayer.volume = null;
        
        /**
        *@desc Current playback time (in seconds) of currently playing song
        *@type Number
        */
        SongPlayer.currentTime = null;
        /**
        *@desc Local variable for Fixtures getAlbum method
        *@type Function
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        *@desc Function designed to get song index numbers from albumPicasso
        *@type Function
        */
        
        var getSongIndex = function (song) {
            
            return currentAlbum.songs.indexOf(song);
        }

        /**
        *@desc Buzz object audio file
        *@type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        *@function setSong
        *@desc Stops currently playing song and loads new audio file as currentBuzzObject        
        *@param {Object} song
        */
        var setSong = function (song) {
            if(currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function () {
                $rootScope.$apply(function () {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
        /**
        *@function playSong
        *@desc Plays currently playing song sets song.playing as true
        *@param {Object} song
        */
        var playSong = function (song) {
            if(currentBuzzObject) {
                currentBuzzObject.play();
                song.playing = true;
            }
        }
        
        /**
        *@method function SongPlayer.play
        *@desc Plays the appropriate song when the play button is clicked.
        *@param {Object} song
        */
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song) {

            setSong(song);
            playSong(song);
                
/*            currentBuzzObject.play(); 
            song.playing = true;*/
                
        }else if (SongPlayer.currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    /*currentBuzzObject.play();*/
                    playSong(song);
                }
            }
        };
        /**
        *@method function SongPlayer.pause
        *@desc Pauses the song when the song button is clicked
        *@param {Object} song
        */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        *@method function SongPlayer.previous
        *@desc Goes to the last song when previous button is clicked
        *@parma {Object} song
        */
        SongPlayer.previous = function(song) {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0) {
                SongPlayer.stop(song);
               /* currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;*/
            }else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function (song) {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++
            
            if(currentSongIndex > currentAlbum.songs.length) {
                currentSongIndex = 0;
                SongPlayer.currentSong.playing = null;
            }else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            
        }
        
        /**
        *@function setCurrentTime
        *@desc Set current time (in seconds) of currently playing song
        *@param {Number} time
        */
        
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.stop = function (song) {
            
            if(currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
        };
        
        SongPlayer.setVolume = function () {
            
            
        };
    return SongPlayer;
    

    }
    
        angular
        .module('blocJams')
        /**
        *@attr Fixtures
        *@desc The service Fixture being injected into SongPlayer
        */
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
    
})();
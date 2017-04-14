(function () {
    
    function SongPlayer () {
        var SongPlayer = {};
        
        var currentSong = null;
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
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
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
            if(currentSong !== song) {

            setSong(song);
            playSong(song);
                
/*            currentBuzzObject.play(); 
            song.playing = true;*/
                
        }else if (currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        /**
        *@method function SongPlayer.pause
        *@desc Pauses the song when the song button is clicked
        *@param {Object} song
        */
        SongPlayer.pause = function (song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
    return SongPlayer;
    

    }
    
        angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
    
})();
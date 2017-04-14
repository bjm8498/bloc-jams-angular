(function () {
    function CollectionCtrl (Fixtures) {
        
//        Fixtures.getCollection(12);
        this.albums = Fixtures.getCollection(12);
//        for( var i = 0; i < 12; i++) {
//            this.albums.push(angular.copy(Fixtures.getAlbum()));
//        }
    }
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ["Fixtures", CollectionCtrl]);
})();
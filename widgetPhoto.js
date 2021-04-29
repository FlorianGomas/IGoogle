class WidgetPhoto {
    ajaxRequest(keyWord) {
        var photoQuery = 'https://api.flickr.com/services/rest/?' + $.param({
            'method': 'flickr.photos.search',
            'api_key': '93e37a8dc0f62c84ac3546ae65a480a9',
            'text': keyWord,
            'tags': keyWord,
            'format': 'json',
            'nojsoncallback': '1'
        });
        $.ajax({
            url: photoQuery,
            type: 'get',
            success: function (result, status, xhr) {
                if (result.stat == "ok"){
                $('.PhotoFlicker').remove();
                var photo = result.photos.photo;
                var photoUrl = 'https://farm'+photo[0]['farm']+'.staticflickr.com/'+photo[0]['server']+'/'+photo[0]['id']+'_'+photo[0]['secret']+'_n.jpg'
                $('.photo').append($('<div class="PhotoFlicker"><img src="'+photoUrl+'"></div>'));  
                } 
                else{
                    switch(result.code){
                        case 3:
                            alert("Merci de saisir un mot-clé pour votre recherche.");
                            break;
                        case 10:
                            alert("Flicker est temporairement indisponible.");
                            break;
                        default:
                            alert("Une erreur est survenue.")
                            break;
                    }
                }    
            }
        });
    }
}
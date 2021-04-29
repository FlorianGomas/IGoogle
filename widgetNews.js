class WidgetNews {
    ajaxRequest(sujet) {
        $.ajax({
            url: 'https://newsapi.org/v2/everything?q=' + sujet + '&language=fr&apiKey=9fb4e9e4244f4491bb6310ce8dcd3388',
            data: 'reponse',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if (data.totalResults == 0) {
                    alert('Aucun articles trouvés pour ce sujet');
                }
                else {
                    $('.articles').remove();
                    $('#newsheader').append($('<div class="articles"><h3>Top News : ' + sujet + '</h3></div>'));
                    for (var i = 0; i < 5; i++) {
                        $('.articles').append($('<div class="article" id="article' + i + '"></div>'));
                        $('#article' + i).append($('<a href="' + data.articles[i].url + '" target="_blank"></a>'));
                        $('#article' + i + '>a').append($('<img class="articleImage" src="' + data.articles[i].urlToImage + '">'));
                        $('#article' + i + '>a').append($('<p class="description">' + data.articles[i].description + '</p>'));
                    }
                }
            },
            error: function (data) {
                switch (data.status) {
                    case 400:
                        alert("Vous n'avez pas saisie de sujet !");
                        break;
                    case 500:
                        alert("Le serveur rencontre actuellement un problème.")
                    default:
                        alert("Un problème est survenu.")
                        break;
                }
            }
        });
    }
}
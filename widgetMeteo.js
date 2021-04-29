class WidgetMeteo{

    ajaxRequest(ville){
        $.ajax({
            url: 'http://api.weatherstack.com/current',
            data: {
                access_key: 'ef1a0c9dadf50406fad67fcc7b5d2f98',
                query: ville
            },
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if(data.success == false){
                    switch(data.error.code){
                        case 601 :
                            alert("Vous devez saisir le nom d'une ville !");
                            break;
                        case 615 : 
                            alert("Votre requête à échoué, votre ville est peut être invalide.");
                            break;
                        default :
                            alert(data.error.info);
                    }                  
                }
                else{
                $('.meteo').append($('<p> La température à ' + data.location.name + ' est de ' + data.current.temperature + '°C </p><img src="'+data.current.weather_icons+'">'));
                }
            }
        });
    }
}
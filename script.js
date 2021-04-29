const service = new Service();
const widgetMeteo = new WidgetMeteo();
const widgetDate = new WidgetDate();
const widgetNews = new WidgetNews();
const widgetPhoto = new WidgetPhoto();

$(document).ready(function () {

    //------ GESTION WIDGET METEO ------
    $('a:contains(Météo)').click(function () {
        if (document.getElementById('meteo') == null) {
            // ---> Part 1 : Création de la fenêtre
            service.createWindow("meteo");
            service.dragElement(document.getElementById('meteo'));
            service.focusOnTop(document.getElementById('meteo'));
            // ---> Part 2 : Demande de saisie d'une ville à l'utilisateur
            var ville = null;
            service.addInput("meteo", "De quelle ville voulez-vous la météo ?", "ville");
            // ---> Part 3 : Si l'utilisateur presse la touche "entrée" en ayant saisi une ville, une requête est envoyé à l'API et la réponse est traitée
            $('.ville').bind("enterKey", function (e) {
                ville = $('.ville').val();
                if (ville != null) {
                    widgetMeteo.ajaxRequest(ville);
                }
            });
        }
    });

    //------ GESTION WIDGET DATE/HEURE ------
    $('a:contains(Date)').click(function () {
        if (document.getElementById('date') == null) {
            service.createWindow("date");
            service.dragElement(document.getElementById('date'));
            service.focusOnTop(document.getElementById('date'))
            widgetDate.clockTime();
        }
    });

    //------ GESTION WIDGET TWITTER ------
    $('a:contains(Twitter)').click(function () {
        if (document.getElementById('twitter') == null) {
            service.createWindow("twitter");
            service.dragElement(document.getElementById('twitter'));
            service.focusOnTop(document.getElementById('twitter'));
            $('#twitter .dragWindowHeader').append($('<a class="twitter-timeline" data-height="380" data-theme="dark" href="https://twitter.com/MichelBillaud?ref_src=twsrc%5Etfw">Tweets by MichelBillaud</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'));
        }
    });

    //------ GESTION WIDGET PHOTOS ------
    $('a:contains(Photo)').click(function () {
        if (document.getElementById('photo') == null) {
            // ---> Part 1 : Création de la fenêtre
            service.createWindow("photo");
            service.dragElement(document.getElementById('photo'));
            service.focusOnTop(document.getElementById('photo'));
            // ---> Part 2 : Demande de saisie d'un mot clé à l'utilisateur
            var keyWord = null;
            service.addInput("photo", "Que cherchez-vous ?", "keyWord")
            // ---> Part 3 : Envoi de la requête à l'API et traitement de la réponse
            $('.keyWord').bind("enterKey", function (e) {
                keyWord = $('.keyWord').val();
                if (keyWord != null) {
                    widgetPhoto.ajaxRequest(keyWord);
                }
            });
        }
    });

    //------ GESTION WIDGET NEWS ------
    $('a:contains(News)').click(function () {
        if (document.getElementById('news') == null) {
            // ---> Part 1 : Création de la fenêtre
            service.createWindow("news");
            service.dragElement(document.getElementById('news'));
            service.focusOnTop(document.getElementById('news'));
            // ---> Part 2 : Demande de saisie d'un sujet à l'utilisateur
            var sujet = null;
            service.addInput("news", "Quel sujet vous intèresse ?", "sujet")
            // ---> Part 3 : Envoi de la requête à l'API et traitement de la réponse
            $('.sujet').bind("enterKey", function (e) {
                sujet = $('.sujet').val();
                if (sujet != null) {
                    widgetNews.ajaxRequest(sujet);
                }
            });
        }
    });

    //------ GESTION WIDGET COLOR PICKER ------
    $('a:contains(Couleur)').click(function () {
        $(this).ColorPicker({
            onChange: function (hsb, hex, rgb) {
                let root = document.documentElement;
                root.style.setProperty("--main-bg-color", '#' + hex)
                service.setContrast();
            }
        })
    });
})
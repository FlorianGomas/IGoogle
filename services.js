class Service {
    // Variable pour gestion positionnement des widgets à l'ouverture
    posX=0;

    //------ GESTION DE LA CREATION DES FENETRES WIDGET DRAGGABLE ------
    createWindow(name) {
        let window = $('<div class="dragWindow" id="' + name + '"><button type="button" class="btn-close" aria-label="Close"></button><div class="dragWindowHeader" id="' + name + 'header"><h2>' + name.toUpperCase() + '</h2></div></div>');
        window.find(".btn-close").on("click", function () {
            $(this).parent().remove();
        });
        window.css("left", this.posX);
        $('.desk').append(window);
        this.posX = this.posX + window.outerWidth();
    }

    //------ GESTION DE LA CREATION DES INPUTS ------
    addInput(name,sentence,input){
        this.posX = this.posX - $('#'+name).outerWidth();
        // Creation de l'input dans le HTML
        $('#'+name+' .dragWindowHeader').append($('<div class="'+name+'"><p>'+sentence+'</p><input class="'+input+'"></input></div>'));
        this.posX = this.posX + $('#'+name).outerWidth();
        // On donne le focus à l'input lorsque l'on clique dessus (pour eviter le drag)
        $('div.'+name+'>input').click(function () {
            $(this).focus();
        });
        // Ajout de la touche "entrée" comme trigger sur l'input
        $('.'+input).keyup(function (e) {
            if (e.keyCode == 13) {
                $(this).trigger("enterKey");
            }
        });
    }

    //------ GESTIONS DES MOUVEMENTS D'UNE FENETRE (Code récupéré et adapté de W3Schools) ------
    dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // Si présent, on bouge la div depuis le header
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // Sinon on bouge la div depuis n'importe où dans la div
            elmnt.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // Position de la souris au départ
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // Appel de fonction lorsque le curseur bouge
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Calcul de la nouvelle position du curseur
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // On défini la nouvelle position de l'élément
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        function closeDragElement() {
            // On arrête de bouger lorsque la souris est relachée
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    //------ GESTION DE LA MISE EN PREMIER PLAN DES FENETRES ------
    focusOnTop(elmnt){
        $(elmnt).mousedown(function(){
            $(this).addClass('top').removeClass('bottom');
            $(this).siblings().removeClass('top').addClass('bottom');
        });
    }

    // ------ GESTION DU CONTRASTE POUR LE TEXTE -------
    setContrast() {
        // Adaptation de code en provenance de StackOverFlow
        let rgb =  $('.navbar').css('backgroundColor')
        let colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        let brightness = 1;
        let r = colors[1];
        let g = colors[2];
        let b = colors[3];
        let ir = Math.floor((255-r)*brightness);
        let ig = Math.floor((255-g)*brightness);
        let ib = Math.floor((255-b)*brightness);

        let root = document.documentElement;
        root.style.setProperty('--text-color', 'rgb('+ir+','+ig+','+ib+')')
      }
}
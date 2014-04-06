/* LIBRERIA DI EDITING POST */

/**** Funzioni di impostazione del form ****/

var dataobj = new Date();

// Sistemazione del form al caricamento e al click:    
// Questa funzione si occupa del colllegamento tra checkbox e label (un style in più diciamo)
function fixCheck() {
    $( '#editor-form' ).find( '.chk-label' ).each( function() {
        var value = $( '#' + $(this).attr('for') ).is(':checked');
        if (value) { $(this).css( {'background-color': '#888'} )}
        else { $(this).css( {'background-color': '#444'} )}
    });
}

function clickCheckbox(obj) {
    var value = $('#' + $(obj).attr('for')).is(':checked');
    console.log(value);
    if (value) {
        $(obj).css( {'background-color': '#444'} );
        $('#' + $(obj).attr('for')).prop('checked', true);
    } else {
        $(obj).css( {'background-color': '#888'} );
        $('#' + $(obj).attr('for')).prop('checked', false);
    }
}

    
// Funzioni per ottenere i vari valori di data come richiesto dal post
function dateToYMD(date,sep) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + sep + (m<=9 ? '0' + m : m) + sep + (d <= 9 ? '0' + d : d);
}
function dateToHMS(date, sep) {
    var s = date.getSeconds();
    var m = date.getMinutes();
    var h = date.getHours();
    return '' + (h<=9 ? '0' + h : h) + sep + (m<=9 ? '0' + m : m) + sep + (s <= 9 ? '0' + s : s);
}   
function getDataPost(sepD, sep, sepT) {
    return dateToYMD(dataobj, sepD) + sep + dateToHMS(dataobj, sepT);
}

// Dato un qualsiasi URI in ingresso, questa funzione è in grado di discriminarlo in diversi
// dati e ritornarlo come un oggetto JSON
function getURI() {
    var listvar = document.baseURI.split('?')[1].split('&');
    var JSONObj = '{\n';
    
    for(var i = 0; i < listvar.length; i++) {
        var element = listvar[i].split('=');
        JSONObj += '\t"' + element[0] + '": "' + decodeURI(element[1]) + '"';
        if ( i < listvar.length - 1) { JSONObj += ',\n'; } else { JSONObj += '\n'; }
    }
    
    JSONObj += '}';
    return JSON.parse(JSONObj);
}

// Funzione che si occupa della modifica del nome del file in input
function editFileName() {
    $('#file-name').attr('value', '' + dateToYMD(dataobj,"-") + '-' + $('#title').val().replace(/\s/g,'-') + '.markdown');
}

// DOCUMENT SETTINGS

$( document ).ready( function() { 
    var settings = getURI();
    
    
    if (settings.edit === "new") {  // Se nell'url c'è un nuovo post ?edit=new
        fixCheck(); 
        var post_date = getDataPost("-"," ",":");
        var comment_id = getDataPost("","","");
        var layout = "post";

        $( '#layout' ).attr('value',layout);
        $( '#date-complete' ).attr('value',post_date);
        $( '#date-complete' ).attr('value',post_date);
        $( '#comment_id' ).attr('value', comment_id);
        $( '#author' ).attr('value', '');
        $( '#file-name' ).attr('value', '');
    } else {    // Se nell'url c'è ?edit=nomedelpost.markdown elimina tutto il form di frontmatter
        $( '.front-matter' ).remove();
        getContent(settings.edit,"post-text", "shasum");
    }
});
    

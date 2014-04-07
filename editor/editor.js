/* LIBRERIA DI EDITING POST */

/**** Funzioni di impostazione del form ****/

var dataobj = new Date();
var settings;
var folder = '_posts'

var TOCstring = '# Contenuti\n' +
                '{:.no_toc}\n\n' +
                ' * Tabella contenuti\n' +
                '{:toc}';

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
    settings = getURI();
    
    
    if (settings.edit === "new") {  // Se nell'url c'è un nuovo post ?edit=new
        fixCheck(); 
        var post_date = getDataPost("-"," ",":");
        var comment_id = getDataPost("","","");
        var layout = "post";

        $( '#layout' ).attr('value',layout);
        $( '#date-complete' ).attr('value',post_date);
        $( '#comment_id' ).attr('value', comment_id);
        $( '#author' ).attr('value', '');
        $( '#file-name' ).attr('value', '');
        
        $('#deleteGH').remove();
        
    } else {    // Se nell'url c'è ?edit=nomedelpost.markdown elimina tutto il form di frontmatter
        $( '.front-matter' ).remove();
        
        getContent(settings.edit, 
                   function(content, sha){
                       $( '#post-text' ).val(content);
                       $( '#shasum' ).text(sha);
                   },
                   function(message, status){
                       alert("Impossibile leggere la risorsa, il server ha ritornato un errore.\nERRORE :: " 
                             + message + "\nSTATUS :: " + status + "\n\nRitorno alla pagina precedente!");
                       window.history.back();
                   },
                   function(message,status) {
                       alert("Impossibile raggiungere il server.\nSTATUS :: " 
                             + status + "\nERRORE :: " + message + "\n\nRitorno alla pagina precedente");
                       window.history.back();
                   });
    }
});

function frontMatter() {
    return  '---' + '\n' +
            'layout: ' + $('#layout').val() + '\n' + 
            'title: ' + $('#title').val() + '\n' +
            'date: ' + $('#date-complete').val() + '\n' +
            'categories: ' + $('#tags').val() + '\n' +
            'author: ' + $('#username').val() + '\n' +
            'comments: ' + ( $('#id_chk_comments').is(':checked') == true ? 'true' : 'false' ) + '\n' +
            'commment_id:' + $('#comment_id').val() + '\n' +
            'file:' + $('#file-name').val() + '\n' +
            '---';
}

function generatePost() {
    if (settings.edit != "new"){
        return $('#post-text').val();
    } else {
        return  frontMatter() + 
                '\n\n' + ( $('#id_chk_TOC').is(':checked') == true ? TOCstring : '' ) +     
                '\n\n' + $('#post-text').val() + '\n';
    }
}

function checkFunction(type) {
    var check = "OK";
    if (type === true) {
        if ($('#title').val() === "") {
            $('#title').focus();
            $( '#submitGH' ).css({backgroundColor: "#ff2"});
            $( '#submitGH' ).text('Definire un titolo!');
            check = "title";
        }
    }
    if ($('#password').val() === "") {
        $('#password').focus();
        $( '#submitGH' ).css({backgroundColor: "#ff2"});
        $( '#submitGH' ).text('Inserire Password!');
        check = "password";
    }
    if ($('#username').val() === "") {
        $('#username').focus();
        $( '#submitGH' ).css({backgroundColor: "#ff2"});
        $( '#submitGH' ).text('Inserire Username!');
        check = "username";
    }
    return check;
}
    
function postBtnClick() {
    
    if (checkFunction(true) === "OK") {
        var path;
        if (folder != "") {
            path = folder + '/';
        } else {
            path = '';
        }
        if (settings.edit === "new") {
            path += $('#file-name').val();
        } else {
            path += settings.edit;
        }
        console.log(path);
        
        putContent($('#username').val(), $('#password').val(), path, generatePost(), $('#shasum').text(), 
                   function(result) {
                       $( '#shasum' ).text( result.sha );
                       $( '#submitGH' ).css({backgroundColor: "#2f4"});
                       $( '#submitGH' ).text('Operazione completata');
                   },
                    function(message, status){
                       alert("Impossibile leggere la risorsa, il server ha ritornato un errore.\nERRORE :: " 
                             + message + "\nSTATUS :: " + status);
                       $( '#submitGH' ).css({backgroundColor: "#f42"});
                       $( '#submitGH' ).text('Errore :: ' + message);
                   },
                   function(message,status) {
                       alert("Impossibile raggiungere il server.\nSTATUS :: " 
                             + status + "\nERRORE :: " + message);
                       $( '#submitGH' ).css({backgroundColor: "#f42"});
                       $( '#submitGH' ).text('Server non raggiunto!?');
                   });              
    }
}

function deleteBtnClick() {
    var path;
    if (folder) {
        path = folder + '/';
    } else {
        path = '';
    }
    path += settings.edit;
    if (checkFunction(false) === "OK") {
        if (confirm("Sicuro di voler eliminare il post?\n " + path + "\nQuesta operazione è (quasi) irreversibile!")) {

        deleteContent($('#username').val(), $('#password').val(), path, $('#shasum').text(), 
                       function(result) {
                           alert("Eliminato!");
                           window.history.back;
                       },
                       function(message, status){
                           alert("Impossibile eliminare la risorsa, il server ha ritornato un errore.\nERRORE :: " 
                                 + message + "\nSTATUS :: " + status + "\n\nRitorno alla pagina precedente!");
                           window.history.back();
                       },
                       function(message,status) {
                           alert("Impossibile raggiungere il server.\nSTATUS :: " 
                                 + status + "\nERRORE :: " + message + "\n\nRitorno alla pagina precedente");
                           window.history.back();
                       });
        }
    }
}
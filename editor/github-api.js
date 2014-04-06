/* GITHUB API IMPLEMENTATION */

/* Todo:
 * - eliminare tutti i riferimenti a ciò che appare sulla mia pagina
 * - passare funzioni invece che nomi di oggetti
 * - on success e on error devono essere delle funzioni e non degli elementi html!
 */

// Global configurations
const reponame = "ApiTestingRepo";
const ownername = "MatteoRagni";

// Api configuration
const github_api = "https://api.github.com";
const api_version = 'application/vnd.github.v3+json';

function basicAuth(usr, pass) {
    return "Basic " + btoa(usr + ':' + pass);
}

function getContent(path, textarea, shaarea) {
    
    var apipos = github_api + '/repos/' + ownername + '/' + reponame + '/contents/' + path;
    
    $.ajax( {
        crossDomain: true,
        url: apipos,
        type: "GET",
        dataType: "json",
        headers: { 'Accept': api_version },
        success: function(result,status) {
            if (status === "success") {
                $('#' + textarea).val(atob(result.content));
                $('#' + shaarea).text(result.sha);
            } else {
                $('#' + textarea).val("Error: " + status + "\n\n" + result);
                $('#' + shaarea).text("");
            }            
        }
    } );
}

function putContent(usr, psw, path, textarea, shaarea, btn) {
    
    // Generazione della posizione dei file da modificare
    var apipos = github_api + '/repos/' + ownername + '/' + reponame + '/contents/' + path;
    // ncoding del contenuto
    var content = btoa($('#' + textarea).val());
        
    // Se il valore di shaarea è vuoto, il file non esiste. Quindi dobbiamo crearlo
    // Se il valore di shaarea esiste, non dobbiamo creare il file, ma aggiornare quello esistente.
    if ($('#' + shaarea).text() === "") { 
        var datamsg = '{ "message": ' + '"Creating ' + path +'", "content": "' + content + '"}';
    } else { 
        var datamsg = '{ "message": ' + '"Updating ' + path +'", "content": "' + content + '", "sha": "' + $('#' + shaarea).text() + '"}';
    }
    console.log(datamsg);
        
    $.ajax( {
        crossDomain: true,
        url: apipos,
        type: "PUT",
        dataType: "text",
        data: datamsg,    
        headers: {
            'Accept': api_version,
            'Authorization': basicAuth(usr, psw)
        },
        success: function(result, status) {
            if (status === "success") {
                $('#' + btn).css({'background-color': '#2f4'});
                $('#' + btn).text('Ritorna all home page');
                $('#' + btn).attr('onclick','/');
                $('#' + shaarea).text(result.sha);
                console.log(result);
            } else {
                var response = JSON.parse(result);
                $('#' + btn).css({'background-color': '#f24'});
                $('#' + btn).text(response.message);
                console.log(result);
            }
        },
        error: function(jqxhr, status, htmlerror) {
            $('#' + btn).css({'background-color': '#f24'});
            $('#' + btn).text(htmlerror);
        }                      
    });
}
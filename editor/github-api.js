/* GITHUB API IMPLEMENTATION */

/* Todo:
 * - eliminare tutti i riferimenti a ciò che appare sulla mia pagina
 * - passare funzioni invece che nomi di oggetti
 * - on success e on error devono essere delle funzioni e non degli elementi html!
 */

// Global configurations
var reponame = "ApiTestingRepo";
var ownername = "MatteoRagni";

// Api configuration
var github_api = "https://api.github.com";
var api_version = 'application/vnd.github.v3+json';

// Implementation
function basicAuth(usr, pass) {
    return "Basic " + btoa(usr + ':' + pass);
}

function getContent(path, succ_200, succ_err, err_fnc) {
    // Creating position for the file to be read
    var apipos = github_api + '/repos/' + ownername + '/' + reponame + '/contents/' + path;
    
    $.ajax( {
        crossDomain: true,
        url: apipos,
        type: "GET",
        dataType: "json",
        headers: { 'Accept': api_version },
        success: function(result,status) {
            if (status === "success") {
                succ_200(atob(result.content), result.sha);
            } else {
                succ_err(result.message, status);
            }            
        },
        error: function(jqxhr, status, htmlerror) {
            err_fnc(htmlerror, status);
        }
    } );
}

function putContent(usr, psw, path, content, sha, succ_200, succ_err, err_fnc) {
    // Creating position for the file to be edited/created
    var apipos = github_api + '/repos/' + ownername + '/' + reponame + '/contents/' + path;
    // Content encoding
    var content = btoa(content);
        
    // If we do not have a sha value, this means that we have to create the file.
    // If we have the file, we should update it.
    if (sha === "") { 
        var datamsg = '{ "message": ' + '"Creating ' + path +'", "content": "' + content + '"}';
    } else { 
        var datamsg = '{ "message": ' + '"Updating ' + path +'", "content": "' + content + '", "sha": "' + sha + '"}';
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
            var jsonresult = JSON.parse(result);
            if (status === "success") {
                succ_200(jsonresult);   
            } else {
                succ_err(jsonresult, status);
            }
        },
        error: function(jqxhr, status, htmlerror) {
            err_fnc(htmlerror, status);
        }                      
    });
}
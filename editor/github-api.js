/* ITHUB API IMPLEMENTATION */

// Global configurations
var reponame = "ApiTestingRepo";
var ownername = "MatteoRagni";
var github_api = "https://api.github.com";

function authentication(username, password) {
    'use strict';
    
    var request = new XMLHttpRequest();
    request.open("GET", github_api, true, username, password);
    
    request.send();
    // Testing purpose
    console.clear();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            console.log(request.responseText);
            console.log(request.status);
        }
    }
}

function getContent(username, password, path) {
    'use strict';
    
    var request = new XMLHttpRequest();
    if (username == null) {
        request.open("GET", github_api + '/repos/' + ownername + '/' + reponame + '/contents/' + path, true);
    } else {
        request.open("GET", github_api + '/repos/' + ownername + '/' + reponame + '/contents/' + path, true, username, password);
    }
    
    request.send();
    // Testing purpose
    console.clear();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            //console.log(request.responseText);
            //console.log(request.status);
            var response = JSON.parse(request.responseText);
            console.log(response.content);
            console.log(atob(response.content));
        }
    }
}

function getContentRaw(username, password, path) {
    'use strict';
    
    var request = new XMLHttpRequest();
    if (username == null) {
        request.open("GET", github_api + '/repos/' + ownername + '/' + reponame + '/contents/' + path, true);
    } else {
        request.open("GET", github_api + '/repos/' + ownername + '/' + reponame + '/contents/' + path, true, username, password);
    }
    request.setRequestHeader("Accept","application/vnd.github.beta.raw");
    
    request.send();
    // Testing purpose
    console.clear();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                return request.responseText;
            } else {
                return "Stato della richiesta: " + request.status + " -- FALLITA";
            }
        }
    }
    console.log(request.status);
    console.log(request.responseText);
}

function putContent(username, password, mail, path, text) {
    'use strict';
    
    var request = new XMLHttpRequest();
    request.open("PUT", github_api + '/repos/' + ownername + '/' + reponame + '/contents/' + path, true, username, password);
    var content = btoa(text);
    
    //request.send('{ "message": "Test di un commit js", "committer": "' + username'}');

}
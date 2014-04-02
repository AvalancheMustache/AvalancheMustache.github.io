/* LIBRERIA DI EDITING POST */

/**** Funzioni di impostazione del form ****/

// Sistemazione del form al caricamento e al click:    
function fixCheck() {
    $('#editor-form').find( '.chk-label' ).each( function() {
        var value = $('#' + $(this).attr('for')).is(':checked');
        if (value) { $(this).css( {'background-color': '#888'} )}
        else { $(this).css( {'background-color': '#444'} )}
    });
}
    
// Funzione per ottenere i vari valori di data come richiesto dal post
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
    var dataobj = new Date();
    return dateToYMD(dataobj, sepD) + sep + dateToHMS(dataobj, sepT);
}
    
$( document ).ready( function() { 
    fixCheck(); 
    var post_date = getDataPost("-"," ",":");
    var comment_id = getDataPost("","","");
    var layout = "post";
    
    $('#layout').attr('value',layout);
    $('#date-complete').attr('value',post_date);
    $('#date-complete').attr('value',post_date);
    $('#comment_id').attr('value', comment_id);
    $('#author').attr('value', '');
});
    
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


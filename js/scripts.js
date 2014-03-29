

function imageZoom_old(obj, initial) {
    'use strict';
    if (obj.style.width === "100%") {
        $(obj).css({width: initial})    
    } else {
        $(obj).css({width: '100%'})    
    }
}


function imageZoom(obj, initial) {
    'use strict';
    if (obj.style.width === "100%") {
        var finalW = initial;
    } else {
        var finalW = "100%";
    }
    
    $(obj).animate( { width: finalW }, 400 );
}

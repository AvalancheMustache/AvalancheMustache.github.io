function imageZoom(obj, initial) {
    'use strict';
    if (obj.style.width === "100%") {
        var finalW = initial;
    } else {
        var finalW = "100%";
    }
    
    $(obj).animate( { width: finalW }, 400 );
}

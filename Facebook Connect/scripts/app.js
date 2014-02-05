/******************************************************************/
// global error handling
/******************************************************************/
function showAlert( message, title, callback ) {
    window.alert( message, callback || function () {}, title, "OK" );
};
function showError( message ) {
    showAlert( message, "Error occurred" );
};
window.addEventListener( "error", function ( e ) {
    e.preventDefault();
    var message = e.message + "' from " + e.filename + ":" + e.lineno;
    showAlert( message, "Error occurred" );
    return true;
});



function setupFacebook() {
    FB.init({
        appId: "204075246457176",
        status: true,
        xfgml: true
    });
    
    FB.getLoginStatus(function( response ) {
        alert( JSON.stringify( response ) );
    });
};

document.addEventListener( "deviceready", function () {
    navigator.splashscreen.hide();
    $( document.body ).height( window.innerHeight );
    new kendo.mobile.Application( document.body, { layout: "layout" });
    setupFacebook();
});
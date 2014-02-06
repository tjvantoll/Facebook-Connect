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
        nativeInterface: CDV.FB,
        useCachedDialogs: false
    });
    
    $( "#login" ).on( "click", function() {
		FB.login(function(response) {
            alert( JSON.stringify( response ) );
			if ( response.session ) {
				alert( "logged in" );
			} else {
				alert( "not logged in" );
			}
		}, { scope: "email" });
    });
    
    $( "#getLoginStatus" ).on( "click", function() {
		FB.getLoginStatus(function( response ) {
			if ( response.status === "connected" ) {
				alert( "logged in" );
			} else {
				alert( "not logged in" );
			}
		});
    });
    
    $( "#logout" ).on( "click", function() {
        FB.logout(function( response ) {
	        alert( "logged out" );
        });
    });
    
    $( "#getFriends" ).on( "click", function() {
		FB.api( "/me/friends",
        	{ fields: "id, name, picture" },
            function( response ) {
				if ( response.error ) {
	                alert( JSON.stringify( response.error ) );
                    return;
                }
                var data = $( "#data" );
                response.data.forEach( function( item ) {
                    data.append( "<div>" +
						"<img src='" + item.picture.data.url + "'>" +
						item.name +
						"</div>" );
                });
			});
    });
};

document.addEventListener( "deviceready", function () {
    navigator.splashscreen.hide();
    new kendo.mobile.Application( document.body, { layout: "layout" });
    setupFacebook();
});         

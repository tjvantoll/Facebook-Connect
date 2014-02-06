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
        nativeInterface: CDV.FB
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
    
    $( "#get-login-status" ).on( "click", function() {
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
    
    $( "#get-friends" ).on( "click", function() {
        var listView = $( "#friends-list" ).data( "kendoMobileListView" );
        listView.showLoading();
		FB.api( "/me/friends",
        	{ fields: "id, name, picture" },
            function( response ) {
				if ( response.error ) {
	                alert( JSON.stringify( response.error ) );
                    return;
                }
                listView.setDataSource(
                	new kendo.data.DataSource({ data: response.data })
                );
			});
    });
};

document.addEventListener( "deviceready", function () {
    navigator.splashscreen.hide();
    new kendo.mobile.Application( document.body, { layout: "layout" });
    setupFacebook();
});         

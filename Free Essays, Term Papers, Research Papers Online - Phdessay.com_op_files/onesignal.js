var onWhatClick = "#nocopy_form button";
var onWhereEmail = '#nocopy_form div input.form-control';

var OneSignal = window.OneSignal || [];

OneSignal.push(function() {
    OneSignal.init({
        appId: "d44534ef-1880-4f5b-a77f-f162afe7b311",
        autoRegister: false,
        notifyButton: {
            enable: false,
        },
        promptOptions: {
            actionMessage: "Would you like to be informed about unique new samples before they are published for all?",
            acceptButtonText: "ALLOW",
            cancelButtonText: "NO THANKS"
        }
    });
});

var notificationPromptDelay = 10000;

setTimeout(function () {
    OneSignal.push(function() {
        OneSignal.showHttpPrompt();
    });
}, notificationPromptDelay);


var puts = function(url, data, callback, type){

    if ( jQuery.isFunction(data) ){
        type = type || callback,
            callback = data,
            data = {}
    }

    return jQuery.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: data,
        contentType: type
    });
}

jQuery(document).ready(function(){

    $('body').on('click', onWhatClick, function () {
        OneSignal.push(function () {
            OneSignal.getUserId(function (userId) {
                puts('https://onesignal.com/api/v1/players/' + userId, {
                    "tags": {
                        "topic": OneSignalArray.topic_name,
                        "slug": OneSignalArray.topic_slug,
                        "email": jQuery(onWhereEmail).val()
                    }
                });
            });
        });

    });
});

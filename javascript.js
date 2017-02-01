/**
 * Created by TurboGraph on 1/31/2017.
 */

console.log("Trying this script");
console.log("Trying RXJS too: ", Rx);

var requestStream = Rx.Observable.just('https://api.github.com/users');

requestStream.subscribe(function (requestUrl) {
    // Process request
    jQuery.getJSON(requestUrl, function (responseData) {
        console.log(responseData);
    })
});
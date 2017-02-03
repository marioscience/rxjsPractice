/**
 * Created by TurboGraph on 1/31/2017.
 */

console.log("Trying this script");
console.log("Trying RXJS too: ", Rx);

var outputh2 = $('#outputH2');
var refreshBtn = $('#refreshButton');

var refreshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click');

var requestStream = refreshClickStream.startWith('startup click')
    .map(function () {
        var randomOffset = Math.floor(Math.random()*500);
        console.log("random number[map 1]: ", randomOffset);
        return 'https://api.github.com/users?since=' + randomOffset;
    });

var responseStream = requestStream
    .flatMap(function (requestUrl) {
        console.log(requestUrl);
        return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
    });


// responseStream.subscribe(function (response) {
//     console.log(response);
// });


var suggestion1Stream = responseStream
    .map(function (listUsers) {
        return listUsers[Math.floor(Math.random()*listUsers.length)];
    })
    .merge(
        refreshClickStream.map( function () { return null; })
    )
    .startWith(null); // Same for suggestion2Stream and suggestion3Stream

suggestion1Stream.subscribe(function (suggestion) {
    // render first suggestion

    if(suggestion === null) {
        console.log("hiding suggestions ", suggestion);
    } else {
        console.log("rendering suggestions ", suggestion);
    }

});

























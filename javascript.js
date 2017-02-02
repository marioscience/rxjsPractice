/**
 * Created by TurboGraph on 1/31/2017.
 */

console.log("Trying this script");
console.log("Trying RXJS too: ", Rx);

var outputh2 = $('#outputH2');
var refreshBtn = $('#refreshButton');

var requestStream = Rx.Observable.just('https://api.github.com/users');

// requestStream.subscribe(function (requestUrl) {
//
//     var responseStream = Rx.Observable.create(function (observer) {
//         jQuery.getJSON(requestUrl)
//             .done(function (response) { observer.onNext(response); })
//             .fail(function (jqXHR, status, error) { observer.onError(error); })
//             .always(function () {observer.onCompleted(); })
//     });
//
//     responseStream.subscribe(function (response) {})
// });

// var responseMetaStream = requestStream
//     .map(function (requestUrl) {
//         return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
//     });

var responseStream = requestStream
    .flatMap(function (requestUrl) {
        return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
    });


responseStream.subscribe(function (response) {
    console.log(response);
});

var refreshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click');

// var requestStream = refreshClickStream
//     .map(function () {
//         var randomOffset = Math.floor(Math.random() * 500);
//         return 'https://api.github.com/users?since=' + randomOffset;
//     });


//continue at: [https://gist.github.com/staltz/868e7e9bc2a7b8c1f754#the-refresh-button]

































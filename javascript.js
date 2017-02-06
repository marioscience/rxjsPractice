/**
 * Created by TurboGraph on 1/31/2017.
 */

console.log("Trying this script");
console.log("Trying RXJS too: ", Rx);

var refreshBtn = $('#refreshButton');

var close1ClickBtn = $('.closebtn1');
var close2ClickBtn = $('.closebtn2');
var close3ClickBtn = $('.closebtn3');

var refreshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click');

var close1ClickStream = Rx.Observable.fromEvent(close1ClickBtn, 'click');
var close2ClickStream = Rx.Observable.fromEvent(close2ClickBtn, 'click');
var close3ClickStream = Rx.Observable.fromEvent(close3ClickBtn, 'click');

var requestStream = refreshClickStream.startWith('startup click')
    .map(function () {
        var randomOffset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });

var responseStream = requestStream
    .flatMap(function (requestUrl) {
        return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
    });


// responseStream.subscribe(function (response) {
// });

var suggestion1Stream = close1ClickStream.startWith('startup close')
    .combineLatest(responseStream, function (click, listUsers) {
        return listUsers[Math.floor(Math.random()*listUsers.length)];
    })
    .merge(
        refreshClickStream.map( function () { return null; })
    )
    .startWith(null);

var suggestion2Stream = close2ClickStream.startWith('start close')
    .combineLatest(responseStream, function (click, listUsers) {
        return listUsers[Math.floor(Math.random()*listUsers.length)];
    })
    .merge(
        refreshClickStream.map( function () { return null; })
    )
    .startWith(null);

var suggestion3Stream = close3ClickStream.startWith('start close')
    .combineLatest(responseStream, function (click, listUsers) {
        return listUsers[Math.floor(Math.random()*listUsers.length)];
    })
    .merge(
        refreshClickStream.map( function () { return null; })
    )
    .startWith(null);

suggestion1Stream.subscribe(function (suggestion) {
   renderSuggestion('.suggestion1', suggestion);
});

suggestion2Stream.subscribe(function (suggestion) {
    renderSuggestion('.suggestion2', suggestion);
});

suggestion3Stream.subscribe(function (suggestion) {
    renderSuggestion('.suggestion3', suggestion);
});

function renderSuggestion(selector, suggestion) {
    // render first suggestion

    if(suggestion === null) {
        //Hiding suggestion
        $(selector).hide();
    } else {
        //Rendering suggestions
        var suggestionContainer = $(selector);

        suggestionContainer.find('.userimg').attr('src', suggestion.avatar_url);

        var userNameContainer = suggestionContainer.find('.username');
        userNameContainer.text(suggestion.login);
        userNameContainer.attr('href', suggestion.html_url);

        suggestionContainer.show();
    }

}

























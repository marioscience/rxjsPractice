/**
 * Created by TurboGraph on 1/31/2017.
 */

console.log("Trying this script");
console.log("Trying RXJS too: ", Rx);


// Put buttons in jQuery
var refreshBtn = $('#refreshButton');

var close1ClickBtn = $('.closebtn1');
var close2ClickBtn = $('.closebtn2');
var close3ClickBtn = $('.closebtn3');

// Add observables from click events from the buttons
var refreshClickStream = Rx.Observable.fromEvent(refreshBtn, 'click');
var close1ClickStream = Rx.Observable.fromEvent(close1ClickBtn, 'click');
var close2ClickStream = Rx.Observable.fromEvent(close2ClickBtn, 'click');
var close3ClickStream = Rx.Observable.fromEvent(close3ClickBtn, 'click');

// From the refresh click observable, generate an observable of request
// for github users (with random number for page)
var requestStream = refreshClickStream.startWith('startup click')
    .map(function () {
        var randomOffset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });

// From the request observable create a response observable by creating
// and observable for each request and using flatmap
var responseStream = requestStream
    .flatMap(function (requestUrl) {
        return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
    });


// responseStream.subscribe(function (response) {
// });

// Create a suggestion observable using the response observable
// combined with the close button event observable. merge with the refresh observable
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


// Subscribe to the suggestion observable call renderSuggestion
suggestion1Stream.subscribe(function (suggestion) {
   renderSuggestion('.suggestion1', suggestion);
});

suggestion2Stream.subscribe(function (suggestion) {
    renderSuggestion('.suggestion2', suggestion);
});

suggestion3Stream.subscribe(function (suggestion) {
    renderSuggestion('.suggestion3', suggestion);
});

// Handle UI for suggestions.
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

























let getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

let callProtocolApi = (endpoint, options, headers) => {
    let apiUrl = 'https://api.backfeed.cc/dev/',
        defaultHeaders = {
            'X-Api-Key': 'cU1pjBJDBP1KsHgbVBwO99F02DvWWR9S62kkFGzQ'
        },
        defaultOptions = {
            headers: new Headers(_.extend(defaultHeaders, headers))
        };

    return fetch(apiUrl + endpoint, _.extend(defaultOptions, options))
        .then(res => res.json());
};

if (getParameterByName('referrer')) {
    localStorage['referrer'] = getParameterByName('referrer');
}

document.addEventListener("DOMContentLoaded", () => {
    let expandable = document.getElementById('backfeed-collabar'),
        expander = document.getElementById('backfeed-collabar-more'),
        votingWidget = document.getElementsByClassName('backfeed-collabar-voting')[0];

    expander.addEventListener('click', () => {
        expandable.classList.toggle('expanded');
        expander.innerText = expandable.classList.contains('expanded') ? 'Close' : 'More';
    }, false);

    if (votingWidget) {
        votingWidget.addEventListener('click', e => {
            if (e.target.classList.contains('bf-fa-arrow-down')) {
                callProtocolApi('users', {method: 'POST'}).then(json => {
                    debugger;
                    protocolApiFetch('users/'+json.id).then(json2 => {
                        debugger;
                    });
                });
            } else if (e.target.classList.contains('bf-fa-arrow-up')) {

            }
        }, true)
    }
});
let getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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

    votingWidget.addEventListener('click', (e) => {
        if (e.target.classList.contains('bf-fa-arrow-down')) {
            fetch('https://api.backfeed.cc/dev/', {
                method: 'POST',
                mode: 'no-cors',
                headers: new Headers({
                    'x-api-key': 'cU1pjBJDBP1KsHgbVBwO99F02DvWWR9S62kkFGzQ'
                })
            }).then(res => {
                debugger;
            })
        } else if (e.target.classList.contains('bf-fa-arrow-up')) {

        }
    }, true)
});

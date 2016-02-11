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
        expander = document.getElementById('backfeed-collabar-more');

    expander.addEventListener('click', () => {
        expandable.classList.toggle('expanded');
        expander.innerText = expandable.classList.contains('expanded') ? 'Close' : 'More';
    }, false);
});

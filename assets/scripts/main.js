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
    let resizable = document.getElementById('backfeed-collabar'),
        resizer = document.getElementById('backfeed-collabar-more');

    resizer.addEventListener('click', () => {
        let startHeight = parseInt(getComputedStyle(resizable, null).height, 10);
        resizable.style.height = (startHeight + 100) + 'px';
    }, false);
});

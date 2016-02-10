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
        resizer = document.getElementById('resizer'),
        startY,
        startHeight,
        initDrag = e => {
            startY = e.clientY;
            startHeight = parseInt(getComputedStyle(resizable, null).height, 10);
            document.documentElement.addEventListener('mousemove', doDrag, false);
            document.documentElement.addEventListener('mouseup', stopDrag, false);
        },
        doDrag = e => {
            resizable.style.height = (startHeight - e.clientY + startY) + 'px';
        },
        stopDrag = e => {
            document.documentElement.removeEventListener('mousemove', doDrag, false);
            document.documentElement.removeEventListener('mouseup', stopDrag, false);
        };

    resizer.addEventListener('mousedown', initDrag, false);
});

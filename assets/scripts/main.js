import api from './protocolApi.js';
import helpers from './helpers.js';

if (helpers.getQueryParameterByName('referrer')) {
    localStorage['referrer'] = helpers.getQueryParameterByName('referrer');
}

document.addEventListener("DOMContentLoaded", () => {
    let expandable = document.getElementById('backfeed-collabar'),
        expander = document.getElementById('backfeed-collabar-more'),
        votingWidget = document.getElementsByClassName('backfeed-collabar-voting')[0];

    expander.addEventListener('click', () => {
        expandable.classList.toggle('expanded');
        expander.innerText = expandable.classList.contains('expanded') ? 'Close' : 'Learn More';
    }, false);

    if (votingWidget) {
        votingWidget.addEventListener('click', e => {
            if (e.target.classList.contains('bf-fa-arrow-down')) {
                api.evaluate(0);
            } else if (e.target.classList.contains('bf-fa-arrow-up')) {
                api.evaluate(1);
            }
        }, true)
    }
});
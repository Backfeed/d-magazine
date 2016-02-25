import api from './protocolApi.js';
import helpers from './helpers.js';
import './polyfills.js';

if (helpers.getQueryParameterByName('referrer')) {
    localStorage['referrer'] = helpers.getQueryParameterByName('referrer');
}

document.addEventListener("DOMContentLoaded", () => {
    let expandable = document.getElementById('backfeed-collabar'),
        expander = document.getElementById('backfeed-collabar-more'),
        avatar = document.getElementById('backfeed-avatar'),
        votingWidget = document.getElementById('backfeed-voting');

    if (expander) {
        expander.addEventListener('click', () => {
            expandable.classList.toggle('expanded');
            expander.innerText = expandable.classList.contains('expanded') ? 'Close' : 'Learn More';
        }, false);
    }

    if (avatar) {
        avatar.addEventListener('click', e => {
            let caret = e.currentTarget.querySelector('i');
            caret.classList.toggle('bf-fa-caret-down');
            caret.classList.toggle('bf-fa-caret-up');
            document.getElementById('backfeed-avatar-menu').classList.toggle('open');
        }, false);
    }
    
    if (votingWidget) {
        votingWidget.addEventListener('click', e => {
            if (e.target.src.endsWith('thumb-down.png')) {
                api.evaluate(0);
                e.target.src = e.target.src.replace(/thumb-down\.png$/, 'check.png');
            } else if (e.target.src.endsWith('thumb-up.png')) {
                api.evaluate(1);
                e.target.src = e.target.src.replace(/thumb-up\.png$/, 'check.png');
            }
        }, true)
    }
});
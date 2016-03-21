import api from './protocolApi.js';
import helpers from './helpers.js';
import './polyfills.js';

if (helpers.getQueryParameterByName('referrer')) {
    localStorage['referrer'] = helpers.getQueryParameterByName('referrer');
}
jQuery($ => {
    let avatar = document.getElementById('backfeed-avatar'),
        votingWidget = document.getElementById('backfeed-voting'),
        copyToClipboardButton = document.getElementById('copy-to-clipboard'),
        comments = document.getElementById('comments');

    if (copyToClipboardButton) {
        new Clipboard(copyToClipboardButton, {
            text: function(trigger) {
                return decodeURIComponent(trigger.dataset.clipboardText);
            }
        });
    }

    if (comments) {
        $(comments).on("click", ".btn-vote", e => {
            e.preventDefault();
            debugger;
        });
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
        let currentAgentVote = Backfeed.currentContribution.currentAgentVote;

        if (currentAgentVote || currentAgentVote === 0) {
            if (currentAgentVote == 1) {
                let handle = document.getElementById('backfeed-voting-up');
                handle.src = handle.src.replace(/thumb-up\.png$/, 'check.png');
                handle.style.cursor = 'not-allowed';
                document.getElementById('backfeed-voting-down').style.cursor = 'not-allowed';
            } else if (currentAgentVote == 0) {
                let handle = document.getElementById('backfeed-voting-down');
                handle.src = handle.src.replace(/thumb-down\.png$/, 'check.png');
                handle.style.cursor = 'not-allowed';
                document.getElementById('backfeed-voting-up').style.cursor = 'not-allowed';
            }
        }

        votingWidget.addEventListener('click', e => {
            if (e.target.src.endsWith('thumb-down.png')) {
                api.evaluate(0);
                e.target.src = e.target.src.replace(/thumb-down\.png$/, 'check.png');
                document.getElementById('backfeed-voting-up')
                votingWidget.classList.add('disabled');
            } else if (e.target.src.endsWith('thumb-up.png')) {
                api.evaluate(1);
                e.target.src = e.target.src.replace(/thumb-up\.png$/, 'check.png');
                votingWidget.classList.add('disabled');
            }
        }, true)
    }
});
document.addEventListener("DOMContentLoaded", () => {

});
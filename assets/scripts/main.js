import api from './protocolApi.js';
import helpers from './helpers.js';
import './polyfills.js';

if (helpers.getQueryParameterByName('referrer')) {
    localStorage['referrer'] = helpers.getQueryParameterByName('referrer');
}

jQuery($ => {
    $.noty.defaults.layout = 'bottomRight';
    $.noty.defaults.type =  'information';

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
            if (this.classList.contains('btn-vote-up')) {
                api.evaluate(1);
            } else if (this.classList.contains('btn-vote-down')) {
                api.evaluate(0);
            }
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
            if (currentAgentVote == 0) {
                votingWidget.dataset.status = 'vote-down';
            } else if (currentAgentVote == 1) {
                votingWidget.dataset.status = 'vote-up';
            }
        } else {
            votingWidget.dataset.status = 'vote-none';
        }

        votingWidget.addEventListener('click', e => {
            if (votingWidget.dataset.status == "loading") return false;

            if (e.target.classList.contains('backfeed-icon-vote-down')) {

                if (votingWidget.dataset.status == "vote-down") {
                    noty({text: 'Cannot downvote again.', type: 'error'});
                    return false;
                }

                votingWidget.dataset.status = "loading";

                api.evaluate(0, res => {
                    noty({text: 'Downvote registered, thank you.', type: 'success'});
                    votingWidget.dataset.status = 'vote-down';
                });

            } else if (e.target.classList.contains('backfeed-icon-vote-up')) {

                if (votingWidget.dataset.status == "vote-up") {
                    noty({text: 'Cannot upvote again.', type: 'error'});
                    return false;
                }

                votingWidget.dataset.status = "loading";

                api.evaluate(1, res => {
                    noty({text: 'Upvote registered, thank you.', type: 'success'});
                    votingWidget.dataset.status = 'vote-up';
                });

            }
        }, true)
    }

});
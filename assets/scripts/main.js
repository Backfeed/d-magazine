import api from './protocolApi.js';
import helpers from './helpers.js';
import './polyfills.js';
import './notyTheme.js';

if (helpers.getQueryParameterByName('referrer')) {
    localStorage['referrer'] = helpers.getQueryParameterByName('referrer');
}

jQuery($ => {
    $.noty.defaults.theme =  'backfeedTheme';
    $.noty.defaults.layout = 'bottomRight';
    $.noty.defaults.type =  'information';
    $.noty.defaults.timeout =  4000;
    $.noty.defaults.animation = {
        open: 'animated fadeIn',
        close: 'animated fadeOut'
    };

    let avatar = document.getElementById('backfeed-avatar'),
        votingWidget = document.getElementById('backfeed-voting'),
        copyToClipboardButton = document.getElementById('copy-to-clipboard'),
        comments = document.getElementById('comments'),
        sharingWidget = document.getElementById('backfeed-sharing');

    let updateUiTokens = newTokensAmount => {
        $('.backfeed-stat-tokens-value').each((i, el) => {
            $(el).text(newTokensAmount);
        });
    };

    let updateUiReputation = newReputationAmount => {
        $('.backfeed-stat-reputation-value').each((i, el) => {
            $(el).text(newReputationAmount.toFixed(2));
        });
    };

    let updateUiScore = newArticleScore => {
        $('.post-score > .post-meta-value').text(newArticleScore.toFixed(2));
    };

    let updateUiScorePercentage = newArticleScorePercentage => {
        $('.backfeed-meter-filled').css('width', newArticleScorePercentage+'%');
    };

    if (copyToClipboardButton) {
        let clipboard = new Clipboard(copyToClipboardButton, {
            text: trigger => {
                return decodeURIComponent(trigger.dataset.clipboardText);
            }
        });
        clipboard.on('success', e => {
            noty({"text": "Copied to clipboard..."})
        })
    }

    if (sharingWidget) {
        $('.backfeed-share-facebook').click(e => {
            e.preventDefault();
            var href = $(e.currentTarget).attr('href');
            window.open(href, 'fbShareWindow', 'display=popup, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no, height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225));
            return false;
        });

        $('.backfeed-share-twitter').click(e => {
            e.preventDefault();
            var href = $(e.currentTarget).attr('href');
            window.open(href, 'twShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225));
            return false;
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
            let chevron = e.currentTarget.querySelector('i');
            chevron.classList.toggle('bf-fa-chevron-down');
            chevron.classList.toggle('bf-fa-chevron-up');
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
                    if (typeof res == "object") {
                        noty({text: 'Downvote registered, thank you.', type: 'success'});
                        votingWidget.dataset.status = 'vote-down';
                        updateUiReputation(res.evaluatorNewReputationBalance);
                        updateUiScore(res.contributionScore);
                        updateUiScorePercentage(res.contributionScorePercentage);
                        // debugger;
                    } else {
                        noty({text: 'Some error happened. Please reload the page.', type: 'error'});
                    }
                });

            } else if (e.target.classList.contains('backfeed-icon-vote-up')) {

                if (votingWidget.dataset.status == "vote-up") {
                    noty({text: 'Cannot upvote again.', type: 'error'});
                    return false;
                }

                votingWidget.dataset.status = "loading";

                api.evaluate(1, res => {
                    if (typeof res == "object") {
                        noty({text: 'Upvote registered, thank you.', type: 'success'});
                        votingWidget.dataset.status = 'vote-up';
                        updateUiReputation(res.evaluatorNewReputationBalance);
                        updateUiScore(res.contributionScorePercentage);
                    } else {
                        noty({text: 'Some error happened. Please reload the page.', type: 'error'});
                    }
                });

            }
        }, true)
    }

});
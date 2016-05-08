import api from './protocolApi.js';
import helpers from './helpers.js';
import './polyfills.js';
import './notyTheme.js';
import './tour.js';

if (helpers.getQueryParameterByName('referrer')) {
    localStorage['referrer'] = helpers.getQueryParameterByName('referrer');
}

let hiddenFieldReferralUser = document.getElementById('referrer_user');
if (hiddenFieldReferralUser && localStorage['referrer']) hiddenFieldReferralUser.value = localStorage['referrer'];

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
        qualityMeterFilled = document.getElementById('backfeed-meter-filled'),
        copyToClipboardButton = document.getElementById('copy-to-clipboard'),
        comments = document.getElementById('comments'),
        sharingWidget = document.getElementById('backfeed-sharing'),
        explainerBar = document.getElementById('backfeed-explainer-bar');

    let updateUiTokens = (newTokensAmount, isDelta) => {
        $('.backfeed-stat-tokens-value').each((i, el) => {
            if (isDelta) newTokensAmount += $(el).text();
            $(el).text(newTokensAmount);
        });
    };

    let updateUiReputation = newReputationAmount => {
        $('.backfeed-stat-reputation-value').each((i, el) => {
            $(el).text(newReputationAmount.toFixed());
        });
    };

    let updateUiEngagedReputation = newArticleEngagedReputation => {
        $('.post-engagedrep > .post-meta-value').text(newArticleEngagedReputation.toFixed(2) * 100 + '%');
    };

    let updateUiScore = newArticleScore => {
        qualityMeterFilled.style.width = newArticleScore * 100 + '%';
        $('.post-score > .post-meta-value').text(newArticleScore.toFixed(2) * 100);
    };

    console.log(Backfeed);

    if (copyToClipboardButton) {
        let clipboard = new Clipboard(copyToClipboardButton, {
            text: trigger => {
                return decodeURIComponent(trigger.dataset.clipboardText);
            }
        });
        clipboard.on('success', e => {
            noty({"text": "Copied to clipboard...", "layout": "bottomLeft"})
        })
    }

    if (explainerBar) {
        document.addEventListener('scroll', e => {
            if (document.body.scrollTop > 0) $(explainerBar).slideUp();
            if (document.body.scrollTop == 0) $(explainerBar).slideDown();
        });
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
        if (Backfeed.currentContribution) {
            let currentAgentVote = Backfeed.currentContribution.currentAgentVote;
            qualityMeterFilled.style.width = Backfeed.currentContribution.stats.score * 100 + '%';

            if (typeof currentAgentVote == 'number') {
                if (currentAgentVote === 0) {
                    votingWidget.dataset.status = 'vote-down';
                } else if (currentAgentVote === 1) {
                    votingWidget.dataset.status = 'vote-up';
                }
            } else {
                votingWidget.dataset.status = 'vote-none';
            }
        }

        votingWidget.addEventListener('click', e => {
            if (votingWidget.dataset.status == "loading") return false;

            if (e.target.classList.contains('backfeed-icon-vote-down')) {

                if (votingWidget.dataset.status == "vote-down") {
                    noty({text: 'Cannot downvote again.', type: 'error', layout: 'bottomCenter'});
                    return false;
                }

                votingWidget.dataset.status = "loading";

                api.evaluate(0, response => {
                    if (typeof response == "object") {
                        noty({text: 'Downvote registered, thank you.', type: 'success', layout: 'bottomCenter'});
                        votingWidget.dataset.status = 'vote-down';
                        updateUiReputation(response.evaluator.reputation);
                        updateUiTokens(response.evaluator.tokens);
                        updateUiScore(response.contribution.score);
                        updateUiEngagedReputation(response.contribution.engaged_reputation);
                    } else {
                        noty({text: 'Some error happened. Please reload the page.', type: 'error', layout: 'bottomCenter'});
                    }
                });

            } else if (e.target.classList.contains('backfeed-icon-vote-up')) {

                if (votingWidget.dataset.status == "vote-up") {
                    noty({text: 'Cannot upvote again.', type: 'error', layout: 'bottomCenter'});
                    return false;
                }

                votingWidget.dataset.status = "loading";

                api.evaluate(1, response => {
                    if (typeof response == "object") {
                        noty({text: 'Upvote registered, thank you.', type: 'success', layout: 'bottomCenter'});
                        votingWidget.dataset.status = 'vote-up';
                        updateUiReputation(response.evaluator.reputation);
                        updateUiTokens(response.evaluator.tokens);
                        updateUiScore(response.contribution.score);
                        updateUiEngagedReputation(response.contribution.engaged_reputation);
                    } else {
                        noty({text: 'Some error happened. Please reload the page.', type: 'error', layout: 'bottomCenter'});
                    }
                });

            }
        }, true)
    }

});
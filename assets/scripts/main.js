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

    api.getAllContributions().then(res => {
        console.log('All Contributions: %o', res);
    });

    let avatar = document.getElementById('backfeed-avatar'),
        votingWidget = document.getElementById('backfeed-voting'),
        $upvotesMeter = $('#backfeed-meter-upvotes'),
        $downvotesMeter = $('#backfeed-meter-downvotes'),
        copyToClipboardButton = document.getElementById('copy-to-clipboard'),
        commentsSection = document.getElementById('comments'),
        sharingWidget = document.getElementById('backfeed-sharing'),
        explainerBar = document.getElementById('backfeed-explainer-bar');

    let updateUiTokens = (newTokensAmount) => {
        $('.backfeed-stat-tokens-value').each((i, el) => {
            $(el).text(10 * newTokensAmount.toFixed());
        });
    };

    let updateUiReputation = newReputationAmount => {
        $('.backfeed-stat-reputation-value').each((i, el) => {
            $(el).text(newReputationAmount.toFixed());
        });
    };

    let updateUiEngagedReputation = (votedUpReputation, votedDownReputation) => {
        votedUpReputation = parseInt(votedUpReputation * 100);
        votedDownReputation = parseInt(votedDownReputation * 100);
        var $upvotesMeterFilled = $upvotesMeter.find('.backfeed-meter-filled');

        $upvotesMeterFilled.css('flex-basis', votedUpReputation + '%');
        var $downvotesMeterFilled = $downvotesMeter.find('.backfeed-meter-filled');

        $downvotesMeterFilled.css('flex-basis', votedDownReputation + '%');
        votedUpReputation < 50 ? $upvotesMeter.find('label').text(votedUpReputation + '%') : $upvotesMeterFilled[0].dataset.reputation = votedUpReputation + '%';

        votedDownReputation < 50 ? $downvotesMeter.find('label').text(votedDownReputation + '%') : $downvotesMeterFilled[0].dataset.reputation = votedDownReputation + '%';
        
        let engagedReputation = votedUpReputation + votedDownReputation;
        $('.featured-image .post-engagedrep > .post-meta-value').text(engagedReputation + '%');
    };

    let updateUiScore = newArticleScore => {
        newArticleScore = (newArticleScore * 100).toFixed(2);
        $('.featured-image .post-score > .post-meta-value').text(newArticleScore + '/100');
    };

    console.log('Global State: %o', Backfeed);

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

    if (avatar) {
        avatar.addEventListener('click', e => {
            let chevron = e.currentTarget.querySelector('i');
            chevron.classList.toggle('bf-fa-chevron-down');
            chevron.classList.toggle('bf-fa-chevron-up');
            document.getElementById('backfeed-avatar-menu').classList.toggle('open');
        }, false);
    }

    if (commentsSection) {
        let comments = Array.from(document.getElementsByClassName('comment-body'));
        comments.forEach(comment => {
            comment.addEventListener("click", e => {
                let contributionId = e.currentTarget.dataset.contributionId;

                if (e.target.classList.toString().endsWith('-up')) {
                    api.evaluate(1, contributionId).then(response => {
                        return false;
                    });
                } else if (e.target.classList.toString().endsWith('-down')) {
                    api.evaluate(0, contributionId).then(response => {
                        return false;
                    });
                }
            });
        });
    }

    if (votingWidget) {
        if (Backfeed.currentContribution) {
            let currentAgentVote = Backfeed.currentContribution.currentAgentVote;
            if (typeof currentAgentVote == 'number') {
                if (currentAgentVote === 0) {
                    votingWidget.dataset.status = 'vote-down';
                } else if (currentAgentVote === 1) {
                    votingWidget.dataset.status = 'vote-up';
                }
            } else {
                votingWidget.dataset.status = 'vote-none';
            }

            let currentEvaluations = Backfeed.currentContribution.stats.evaluations;
            if (!$.isEmptyObject(currentEvaluations)) {
                let votedUpReputation = currentEvaluations[1].reputation;
                let votedDownReputation = currentEvaluations[0].reputation;
                updateUiEngagedReputation(votedUpReputation, votedDownReputation);
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

                api.evaluate(0).then(response => {
                    if (typeof response == "object") {
                        noty({text: 'Downvote registered, thank you.', type: 'success', layout: 'bottomCenter'});
                        votingWidget.dataset.status = 'vote-down';
                        updateUiReputation(response.evaluator.reputation);
                        updateUiTokens(response.evaluator.tokens);
                        updateUiScore(response.contribution.stats.score);
                        updateUiEngagedReputation(response.contribution.stats.evaluations[1].reputation, response.contribution.stats.evaluations[0].reputation);
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

                api.evaluate(1).then(response => {
                    if (typeof response == "object") {
                        noty({text: 'Upvote registered, thank you.', type: 'success', layout: 'bottomCenter'});
                        votingWidget.dataset.status = 'vote-up';
                        updateUiReputation(response.evaluator.reputation);
                        updateUiTokens(response.evaluator.tokens);
                        updateUiScore(response.contribution.stats.score);
                        updateUiEngagedReputation(response.contribution.stats.evaluations[1].reputation, response.contribution.stats.evaluations[0].reputation);
                    } else {
                        noty({text: 'Some error happened. Please reload the page.', type: 'error', layout: 'bottomCenter'});
                    }
                });

            }
        }, true)
    }

});
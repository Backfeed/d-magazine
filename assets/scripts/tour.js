import helpers from './helpers.js';

if (helpers.getQueryParameterByName('continuetour')) {
    let explainerBar = document.getElementById('backfeed-explainer-bar');
    if (explainerBar) {
        explainerBar.style.visibility = 'hidden';
        explainerBar.style.height = '0';
        explainerBar.style.padding = '0';
    }
}

let tour = {
    id: "d-mag-main-tour",
    steps: [
        {
            title: "Hello!",
            content: "We are a Decentralized Magazine. Everything you see here is user-generated and edited by our collective intelligence. The value we create together is distributed among the members of our community: The submission of articles, rating of such and even comments, are rewarded with Tokens if they are found to be useful by our community.",
            target: document.querySelector(".logo-location-header .logo-light img"),
            placement: "bottom",
            xOffset: 5,
            arrowOffset: 40,
            onNext: helpers.openMobileNavMenu
        }, {
            title: "Home",
            content: "This is Home. That’s Us.<br/>Here you’ll find the articles our community perceives as relevant, good and important. Have fun exploring the Decentralized News Hub of the Blockchain Community!",
            target: document.querySelector("#menu-main-menu > li:first-of-type"),
            placement: "bottom"
        }, {
            title: "The Raw Space",
            content: "All newly submitted articles appear here in chronological order. Your input is what promotes them to Home or hides them from the general public. Hanging out here can be very profitable: The sooner you rate an article, the higher the token bounty you’ll receive, given the piece achieves community consensus.",
            target: document.querySelector("#menu-main-menu > li:nth-of-type(2)"),
            placement: "bottom",
            onNext: helpers.closeMobileNavMenu
        }, {
            title: "Single Article",
            content: "Click on one of the articles to continue with the tour.",
            target: document.querySelector("#main .posts-wrapper .col:nth-of-type(2)"),
            placement: "top",
            multipage: true,
            showNextButton: false,
            nextOnTargetClick: true,
            onShow: () => {
                let linksToArticles = document.querySelectorAll('article>.post-image>a, article>.post-details>.post-title>a');
                Array.from(linksToArticles).forEach((articleLink) => {
                    if (!articleLink.href.endsWith('?continuetour')) articleLink.href += '?continuetour';
                });
            }
        }, {
            title: "User Profile",
            content: "Left-click to edit your user profile.",
            target: 'backfeed-avatar',
            placement: "top",
            fixedElement: true,
            xOffset: -267,
            arrowOffset: 272
        }, {
            title: "Wallet",
            content: "Here you can monitor the Tokens you’ve earned and the Reputation you enjoy.",
            target: document.querySelector(".backfeed-stats-bar"),
            placement: "top",
            fixedElement: true,
            xOffset: 22,
            arrowOffset: 155
        }, {
            title: "Tokens",
            content: "You earn Tokens every time you contribute something that is found to be valuable by our community. This can be an article you’ve written, or even just your up/down votes on someone else's work. As soon as we’re out of Beta, Magazine Tokens will bare real monetary value. At the end of the tour we’ll link you to the FAQ where you can learn more about how and when that happens.",
            target: document.querySelector(".backfeed-stats-bar .backfeed-stat-tokens-value"),
            placement: "top",
            fixedElement: true,
            xOffset: -280,
            arrowOffset: 270
        }, {
            title: "Reputation",
            content: "Your Reputation score determines how impactful you are in the editorial process. The more aligned you are with the backfeed community, the more influence you enjoy.",
            target: document.querySelector(".backfeed-stats-bar .backfeed-stat-reputation-value"),
            placement: "top",
            fixedElement: true,
            xOffset: -130,
            arrowOffset: 120
        }, {
            title: "Article Quality Bar",
            content: "This indicates the community-determined quality of the article you’re currently viewing.",
            target: document.querySelector(".backfeed-meter"),
            placement: "top",
            fixedElement: true,
            xOffset: -130,
            arrowOffset: 160
        }, {
            title: "Up/Down Vote",
            content: "Your opinions are valuable since they are what curates this Magazine!<br />Vote up or down on the article you’re currently viewing. You might be rewarded with Tokens!",
            target: "backfeed-voting",
            placement: "top",
            fixedElement: true,
            xOffset: -70,
            arrowOffset: 227
        }, {
            title: "Social Media Kit",
            content: "Sharing is caring.<br />Share your favorite articles, get your friends involved in our community and earn Tokens for your efforts. Recruiting writers will get you the highest bounty!",
            target: "backfeed-sharing",
            placement: "top",
            multipage: true,
            fixedElement: true,
            xOffset: 20,
            onNext: () => {
                window.location = "/"
            }
        }, {
            title: "Submit Article",
            content: "Here you can submit your own article to the Backfeed Magazine. Initially it will appear in the Raw Space, where it will be reviewed by our community. After it reaches consensus, it will be promoted to Home, you’ll receive freshly minted tokens and some points will be added to your reputation score.",
            target: document.querySelector("#menu-main-menu > li:nth-last-of-type(2)"),
            placement: "bottom",
            onShow: helpers.openMobileNavMenu
        }, {
            title: "FAQ",
            content: "Any question? Please visit our FAQ to learn more, or contact us at <a href=\"mailto:magazine@backfeed.cc\">magazine@backfeed.cc</a>.",
            target: document.querySelector("#menu-main-menu > li:nth-last-of-type(3)"),
            placement: "bottom",
            onNext: helpers.closeMobileNavMenu
        }, {
            title: "End",
            content: "Got it? Register, if you haven't already, and be part of the Backfeed community!",
            target: document.querySelector(".logo-location-header .logo-light img"),
            placement: "bottom",
            showNextButton: false,
            showCTAButton: true,
            ctaLabel: "Register",
            xOffset: 5,
            arrowOffset: 40,
            onCTA: () => {
                window.location = "/register"
            }
        }
    ]
};

/**
 * tour.steps[5].title == "Wallet"
 * tour.steps[6].title == "Tokens"
 * tour.steps[7].title == "Reputation"
 */

if (matchMedia("(min-width: 420px)").matches) {
    tour.steps[5].xOffset = 100;
    tour.steps[5].arrowOffset = 172;
}

if (matchMedia("(min-width: 768px)").matches) {
    tour.steps[0].target = document.querySelector(".logo-location-header .logo-dark img");
    tour.steps[0].xOffset = 40;
    tour.steps[0].yOffset = -30;
    tour.steps[0].arrowOffset = 140;

    tour.steps[5].target = document.querySelector(".backfeed-stats");
    tour.steps[5].xOffset = -267;
    tour.steps[5].arrowOffset = 272;
    tour.steps[6].target = document.querySelector(".backfeed-stat-tokens");

    tour.steps[7].target = document.querySelector(".backfeed-stat-reputation");

    tour.steps[13].target = document.querySelector(".logo-location-header .logo-dark img");
    tour.steps[13].xOffset = 40;
    tour.steps[13].yOffset = -30;
    tour.steps[13].arrowOffset = 140;
}

if (hopscotch) {
    let startTourButton = document.getElementById('backfeed-featured-section-btn');

    if (hopscotch.getState() === "d-mag-main-tour:4") {
        hopscotch.startTour(tour);
    } else if (hopscotch.getState() === "d-mag-main-tour:11") {
        helpers.openMobileNavMenu();
        hopscotch.startTour(tour);
    }

    if (startTourButton) {
        startTourButton.addEventListener('click', () => {
            hopscotch.startTour(tour, 0);
        });
    }

    if (document.body.classList.contains('home') && helpers.getQueryParameterByName('starttour') !== null) {
        hopscotch.startTour(tour, 0);
    }
}
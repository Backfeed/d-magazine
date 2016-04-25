import helpers from './helpers.js';

let tour = {
    id: "d-mag-main-tour",
    bubbleWidth: 320,
    bubblePadding: 0,
    steps: [
        {
            title: "Hello!",
            content: "We are a Decentralized Magazine. All our content is user-generated and edited by our collective intelligence. The revenue we create together is distributed among the members of our community in form of tokens, which in the future will bare <strong>real monetary value</strong>.",
            target: document.querySelector(".logo-location-header .logo-light img"),
            placement: "bottom",
            onNext: helpers.openMobileNavMenu
        }, {
            title: "Front Page",
            content: "Here you’ll find the articles our community perceives as relevant, good and important.",
            target: document.querySelector("#menu-main-menu > li:first-of-type"),
            placement: "bottom"
        }, {
            title: "The Raw Space",
            content: "All newly submitted articles appear here in chronological order. Your input is what promotes them to the Front Page or hides them from the general public. Hanging out here can be very profitable. You should check it out.",
            target: document.querySelector("#menu-main-menu > li:nth-of-type(2)"),
            placement: "bottom",
            onNext: helpers.closeMobileNavMenu
        }, {
            title: "Single Article",
            content: "<strong>Enter</strong> one of our top articles to continue with the tour.",
            target: document.querySelector("#main .posts-wrapper .col:nth-of-type(2)"),
            placement: "top",
            xOffset: 15,
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
            title: "Article Quality Bar",
            content: "This indicates the community-determined quality of the article you’re currently viewing.",
            target: "backfeed-voting",
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
            content: "Share your favorite articles, get your friends involved in our community and earn Tokens for your efforts. Recruiting writers will get you the highest reward!",
            target: "backfeed-sharing",
            placement: "top",
            fixedElement: true,
            xOffset: 20
        }, {
            title: "Wallet",
            content: "Here you can monitor the Tokens and Reputation you’ve earned.",
            target: document.querySelector(".backfeed-stats-bar"),
            placement: "top",
            fixedElement: true,
            xOffset: 22,
            arrowOffset: 155
        }, {
            title: "Tokens",
            content: "You earn Tokens every time you contribute something that is found to be valuable by our community. This can be an article you’ve written, or even just your up/down votes on someone else's work. As soon as we’re out of Beta, Magazine Tokens will bare <strong>real monetary value</strong>.",
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
            title: "User Profile",
            content: "Click here to edit your user profile.",
            target: 'backfeed-avatar',
            placement: "top",
            fixedElement: true,
            xOffset: -267,
            arrowOffset: 272,
            onNext: helpers.openMobileNavMenu
        }, {
            title: "FAQ",
            content: "Any question? Please visit our FAQ to learn more, or contact us at <a href=\"mailto:magazine@backfeed.cc\">magazine@backfeed.cc</a>.",
            target: document.querySelector("#menu-main-menu > li:nth-last-of-type(3)"),
            placement: "bottom",
            onNext: helpers.closeMobileNavMenu
        }, {
            title: "Submit Article",
            content: "Submit your own article to the Backfeed Magazine. You’ll receive freshly minted tokens and reputation in case the article becomes popular.",
            target: document.querySelector("#menu-main-menu > li:nth-last-of-type(2)"),
            placement: "bottom"
        }, {
            title: "End",
            content: "Got it? Register, if you haven't already, and be part of the Backfeed community!",
            target: document.querySelector(".logo-location-header .logo-light img"),
            placement: "bottom",
            showNextButton: false,
            showCTAButton: true,
            ctaLabel: "Register",
            onCTA: () => {
                window.location = "/register"
            }
        }
    ]
};

/**
 * tour.steps[0].title == "Hello!"
 * tour.steps[7].title == "Wallet"
 * tour.steps[8].title == "Tokens"
 * tour.steps[9].title == "Reputation"
 * tour.steps[11].title == "FAQ"
 * tour.steps[12].title == "Submit Article"
 * tour.steps[13].title == "End"
 */

if (matchMedia("(min-width: 420px)").matches) {
    tour.steps[7].xOffset = 100;
    tour.steps[7].arrowOffset = 172;
}

if (matchMedia("(min-width: 768px)").matches) {
    tour.steps[0].target = document.querySelector(".logo-location-header .logo-dark img");
    tour.steps[0].xOffset = 40;
    tour.steps[0].yOffset = -30;
    tour.steps[0].arrowOffset = 140;

    tour.steps[7].target = document.querySelector(".backfeed-stats");
    tour.steps[7].xOffset = -267;
    tour.steps[7].arrowOffset = 272;

    tour.steps[8].target = document.querySelector(".backfeed-stat-tokens");

    tour.steps[9].target = document.querySelector(".backfeed-stat-reputation");

    tour.steps[11].xOffset = -200;
    tour.steps[11].arrowOffset = 230;

    tour.steps[12].xOffset = -200;
    tour.steps[12].arrowOffset = 230;

    tour.steps[13].target = document.querySelector(".logo-location-header .logo-dark img");
    tour.steps[13].xOffset = 40;
    tour.steps[13].yOffset = -30;
    tour.steps[13].arrowOffset = 140;
}

if (hopscotch) {
    let startTourButton = document.getElementById('backfeed-featured-section-btn');

    if (hopscotch.getState() === "d-mag-main-tour:4") {
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

    if (helpers.getQueryParameterByName('continuetour')) {
        let explainerBar = document.getElementById('backfeed-explainer-bar');
        if (explainerBar) {
            explainerBar.style.visibility = 'hidden';
            explainerBar.style.height = '0';
            explainerBar.style.padding = '0';
        }
    }
}
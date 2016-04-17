import helpers from './helpers.js';

var tour = {
    id: "d-mag-main-tour",
    steps: [
        {
            title: "Hello!",
            content: "We are a Decentralized Magazine. Everything you see here is user-generated and edited by our collective intelligence. The value we create together is distributed among the members of our community: The submission of articles, rating of such and even comments, are rewarded with Tokens if they are found to be useful by our community.",
            target: "backfeed-featured-section-btn",
            placement: "bottom",
            onNext: helpers.openMobileNavMenu
        },
        {
            title: "Home",
            content: "This is Home. That’s Us.<br/>Here you’ll find the articles our community perceives as relevant, good and important. Have fun exploring the Decentralized News Hub of the Blockchain Community!",
            target: document.querySelector("#menu-main-menu > li:first-of-type"),
            placement: "bottom"
        },
        {
            title: "The Raw Space",
            content: "All newly submitted articles appear here in chronological order. Your input is what promotes them to the Front Page or hides them from the general public. Hanging out here can be very profitable: The sooner you rate an article, the higher the token bounty you’ll receive, given the piece achieves community consensus.",
            target: document.querySelector("#menu-main-menu > li:nth-of-type(2)"),
            placement: "bottom",
            onNext: helpers.closeMobileNavMenu
        },
        {
            title: "Single Article",
            content: "Click on one of the articles to continue with tour",
            target: document.querySelector("#main .posts-wrapper .col:nth-of-type(2)"),
            placement: "top",
            multipage: true,
            showNextButton: false
        },
        {
            title: "User Profile",
            content: "Left-click to edit your user profile.",
            target: 'backfeed-avatar',
            placement: "top",
            fixedElement: true
        },
        {
            title: "Wallet",
            content: "Here you can monitor the Tokens you’ve earned and the Reputation you enjoy. Left-click to access your user profile.",
            target: document.querySelector(".backfeed-stats"),
            placement: "top"
        },
        {
            title: "Tokens",
            content: "You earn Tokens every time you contribute something that is found to be valuable by our community. This can be an article you’ve written, or even just your up/down votes on someone else's work. As soon as we’re out of Beta, Magazine Tokens will bare real monetary value. At the end of the tour we’ll link you to the FAQ where you can learn more about how and when that happens.",
            target: document.querySelector(".backfeed-stat-tokens"),
            placement: "top"
        },
        {
            title: "Reputation",
            content: "Your Reputation score determines how impactful you are in the editorial process. The more aligned you are with the backfeed community, the more influence you enjoy.",
            target: document.querySelector(".backfeed-stat-reputation"),
            placement: "top"
        },
        {
            title: "Article Quality Bar",
            content: "This indicates the community-determined quality of the article you’re currently viewing.",
            target: document.querySelector(".backfeed-meter"),
            placement: "top"
        },
        {
            title: "Up/Down Vote",
            content: "Your opinions are valuable since they are what curates this Magazine!<br />Vote up or down on the article you’re currently viewing. You might be rewarded with Tokens!",
            target: "backfeed-voting",
            placement: "top"
        },
        {
            title: "Social Media Kit",
            content: "Sharing is caring.<br />Share your favorite articles, get your friends involved in our community and earn Tokens for your efforts. Recruiting writers will get you the highest bounty!",
            target: "backfeed-sharing",
            placement: "right",
            multipage: true,
            onNext: () => {
                window.location = "/"
            }
        },
        {
            title: "Submit Article",
            content: "Here you can submit your own article to the Backfeed Magazine. Initially it will appear in the Raw Space, where it will be reviewed by our community. After it reaches consensus, it will be promoted to the Front Page, you’ll receive freshly minted tokens and some points will be added to your reputation score.",
            target: document.querySelector("#menu-main-menu > li:nth-last-of-type(2)"),
            placement: "bottom",
            onShow: helpers.openMobileNavMenu
        },
        {
            title: "FAQ",
            content: "Any question? Please visit our FAQ to learn more, or contact us at <a href=\"mailto:magazine@backfeed.cc\">magazine@backfeed.cc</a>.",
            target: document.querySelector("#menu-main-menu > li:nth-last-of-type(3)"),
            placement: "bottom",
            onNext: helpers.closeMobileNavMenu
        },
        {
            title: "End",
            content: "Got it? Register, if you haven't already, and be part of the Backfeed community!",
            target: "backfeed-featured-section-btn",
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

if (hopscotch) {
    let startTourButton = document.getElementById('backfeed-featured-section-btn');

    if (hopscotch.getState() === "d-mag-main-tour:3") {
        hopscotch.startTour(tour);
    }

    if (hopscotch.getState() === "d-mag-main-tour:11:3") {
        hopscotch.startTour(tour);
    }

    if (startTourButton) {
        startTourButton.addEventListener('click', e => {
            hopscotch.startTour(tour, 0);
        });
    }
}
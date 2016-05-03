<?php namespace Backfeed; ?>

<aside id="backfeed-collabar" class="<?=collabar_class()?>">

    <section class="backfeed-main-bar">

    <?php if (is_singular('post')): ?>
        <div id="backfeed-sharing" class="backfeed-sharing">
            <button id="copy-to-clipboard" data-clipboard-text="<?=urlencode($viewmodel['referral_url'])?>">
                <span class="bf-fa-stack">
                  <i class="bf-fa bf-fa-square bf-fa-stack-2x"></i>
                  <i class="bf-fa bf-fa-link bf-fa-stack-1x"></i>
                </span>
            </button>
            <a class="backfeed-share-facebook" href="https://www.facebook.com/dialog/share?app_id=145634995501895&href=<?=urlencode($viewmodel['referral_url'])?>">
                <span class="bf-fa bf-fa-facebook-square"></span>
            </a>
            <a class="backfeed-share-twitter" href="https://twitter.com/home?status=<?=urlencode(get_the_title() .' - '. $viewmodel['referral_url'])?>">
                <span class="bf-fa bf-fa-twitter-square"></span>
            </a>
        </div>
    <?php endif; ?>

        <div class="backfeed-teaser<?php if (is_singular('post')): ?> hidden-xs-down<?php endif; ?>">
            <p class="backfeed-teaser-content">
            <?php if (is_singular('post')): ?>
                <span class="hidden-lg-up">Rate, Share or Comment to get tokens</span>
                <span class="hidden-md-down">Rate, Share or Comment on this article in order to get tokens</span>
            <?php else: ?>
                <span class="hidden-sm-up">Be part of the collective intelligence and earn tokens!</span>
                <span class="hidden-xs-down">Explore our magazine, be part of the collective intelligence and earn tokens!</span>
            <?php endif; ?>
                &nbsp;<a href="<?=site_url('/faq/')?>" class="button backfeed-learn-button">Learn more</a>
            </p>
        </div>

    <?php if (is_singular('post')): ?>
        <div id="backfeed-voting" class="backfeed-voting" data-status="loading">
            <i class="backfeed-icon-vote backfeed-icon-vote-down"></i>
            <div class="backfeed-article-score">
                <label>Article Quality</label>
                <div class="backfeed-meter">
                    <div id="backfeed-meter-filled" class="backfeed-meter-filled"></div>
                </div>
            </div>
            <i class="backfeed-icon-vote backfeed-icon-vote-up"></i>
        </div>
    <?php endif; ?>

        <div class="backfeed-user-info">

            <div class="backfeed-stats hidden-sm-down backfeed-collabar-tooltip">
                <div class="backfeed-stat-tokens"><label>My Tokens:</label> <span class="backfeed-stat-tokens-value"><?=$viewmodel['current_agent_tokens']?></span></div>
                <div class="backfeed-stat-reputation"><label>My Reputation:</label> <small><span class="backfeed-stat-reputation-value"><?=$viewmodel['current_agent_reputation'].'/'.$viewmodel['total_reputation']?></span></small></div>
                <div class="backfeed-collabar-tooltip-content">
                    <p>Reputation represents your influence on the editing process</p>
                    <p>Tokens are your share of the value we’ve created together</p>
                </div>
            </div>

            <div id="backfeed-avatar" class="backfeed-avatar">
                <?=$viewmodel['current_agent_avatar']?>
                <i class="bf-fa bf-fa-chevron-down"></i>
            </div>

        </div>

    </section>

<?php if (is_singular('post')): ?>
    <section id="backfeed-explainer-bar" class="backfeed-explainer-bar hidden-sm-up">
        <h4 class="backfeed-explainer-bar-title">Rate / Share / Comment</h4>
        <p class="backfeed-explainer-bar-sentence">on this article in order to get Tokens and Reputation</p>
    </section>
<?php endif; ?>

    <section class="backfeed-stats-bar hidden-md-up">
        <div><label>My Reputation:</label> <span class="backfeed-stat-reputation-value"><?=$viewmodel['current_agent_reputation'].'/'.$viewmodel['total_reputation']?></span></div>
        <div><label>My Tokens:</label> <span class="backfeed-stat-tokens-value"><?=$viewmodel['current_agent_tokens']?></span></div>
    </section>

    <ul id="backfeed-avatar-menu" class="backfeed-avatar-menu">
        <li><?php wp_loginout($_SERVER['REQUEST_URI']); ?></li>
        <li><a href="<?=site_url('/edit-profile/')?>">Edit profile</a></li>
        <li class="backfeed-disabled">Statistics</li>
        <li><a href="<?=site_url('/submit-article/')?>">Submit an article</a></li>
    </ul>

</aside>
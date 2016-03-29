<?php namespace Backfeed; ?>

<aside id="backfeed-collabar" class="<?=collabar_class()?>">

    <section>
        <?php if (is_singular('post')): ?>
            <div class="backfeed-sharing">
                <button id="copy-to-clipboard" data-clipboard-text="<?=urlencode(get_referral_url())?>"><span class="bf-fa bf-fa-link"></span></button>
                <a href="https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=<?=urlencode(get_referral_url())?>" target="_blank"><span class="bf-fa bf-fa-facebook-square"></span></a>
                <a href="https://twitter.com/home?status=<?=urlencode(get_the_title() .' - '. get_referral_url())?>" target="_blank"><span class="bf-fa bf-fa-twitter-square"></span></a>
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
                &nbsp;<button class="button backfeed-learn-button">Learn more</button>
            </p>
        </div>

        <?php if (is_singular('post')): ?>
            <div id="backfeed-voting" class="backfeed-voting" data-status="loading">
                <i class="backfeed-icon-vote backfeed-icon-vote-down"></i>
                <div class="backfeed-meter">
                    <p>Article Quality</p>
                    <?php //echo get_config('currentContribution')->score?>
                </div>
                <i class="backfeed-icon-vote backfeed-icon-vote-up"></i>
            </div>
        <?php endif; ?>

        <div class="backfeed-user-info">

            <div class="backfeed-stats hidden-sm-down backfeed-tooltip">
                <div><label>My Tokens:</label> <?=get_config('currentAgent')->tokens?></div>
                <div><label>Rank:</label> NOVICE (<?=round(get_config('currentAgent')->reputation, 2)?>%)</div>
                <div class="backfeed-tooltip-content">
                    <p>Reputation represents your influence on the editing process</p>
                    <p>Tokens are your share of the value we’ve created together</p>
                </div>
            </div>

            <div id="backfeed-avatar" class="backfeed-avatar">
                <?=get_avatar(wp_get_current_user()->ID, 32)?>
                <i class="bf-fa bf-fa-caret-down"></i>
            </div>

        </div>

    </section>
    
    <section class="stats-strip hidden-md-up">
        <div><label>Rank:</label> NOVICE (<?=round(get_config('currentAgent')->reputation, 2)?>%)</div>
        <div><label>My Tokens:</label> <?=get_config('currentAgent')->tokens?></div>
    </section>

    <ul id="backfeed-avatar-menu" class="backfeed-avatar-menu">
        <li><?php wp_loginout($_SERVER['REQUEST_URI']); ?></li>
        <li><a href="<?=get_edit_profile_url()?>">Edit Profile</a></li>
        <li class="backfeed-disabled">Statistics</li>
        <li><a href="<?=get_permalink(396)?>">Submit an Article</a></li>
    </ul>

</aside>
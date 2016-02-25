<aside id="backfeed-collabar">

    <section>
        <?php if (is_single()): ?>
            <div id="backfeed-voting">
                <i class="bf-fa bf-fa-arrow-up"></i>
                <span>87</span>
                <i class="bf-fa bf-fa-arrow-down"></i>
            </div>
            <div class="backfeed-sharing">
                <a href="https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=<?=urlencode(get_referral_url())?>" target="_blank"><span class="bf-fa bf-fa-facebook"></span></a>
                <a href="https://twitter.com/home?status=<?=urlencode(get_the_title() .' - '. get_referral_url())?>" target="_blank"><span class="bf-fa bf-fa-twitter"></span></a>
            </div>
        <?php endif; ?>

        <p class="backfeed-teaser">
            <span class="hidden-sm-up">Be part of the collective intelligence and earn tokens!</span>
            <span class="hidden-xs-down">Explore our magazine, be part of the collective intelligence and earn tokens!</span>
            &nbsp;&nbsp;<button class="button backfeed-learn-button">Learn more</button>
        </p>

        <div class="backfeed-user-info">

            <div class="backfeed-stats hidden-sm-down backfeed-tooltip">
                <div class="backfeed-stat"><label>My Tokens:</label> 41</div>
                <div class="backfeed-stat"><label>Rank:</label> NOVICE (0.12%)</div>
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


    <section class="hidden-md-up">
        <div><label>Rank:</label> NOVICE (0.12%)</div>
        <div><label>My Tokens:</label> 41</div>
    </section>

    <nav id="backfeed-avatar-menu" class="backfeed-avatar-menu">
        <ul>
            <li><?php wp_loginout($_SERVER['REQUEST_URI']); ?></li>
            <li><a href="<?=get_edit_profile_url()?>">Edit Profile</a></li>
            <li class="backfeed-disabled">Statistics</li>
            <li><a href="<?=get_permalink(396)?>">Submit an Article</a></li>
        </ul>
    </nav>

</aside>
<aside id="backfeed-collabar">
    <div id="resizer"></div>
    <section>
        <button id="backfeed-collabar-learn">Learn More</button>
        <i class="bf-fa bf-fa-arrow-up"></i>
        <span>87</span>
        <i class="bf-fa bf-fa-arrow-down"></i>
        <button>Share</button>
    </section>
<?php if (is_single()): ?>
    <hr />
    <section>
        <ul class="list-inline text-center">
            <li><a href="https://www.facebook.com/sharer/sharer.php?u=<?=urlencode(get_referral_url())?>" target="_blank"><span class="bf-fa bf-fa-facebook"></span></a></li>
            <li><a href="https://twitter.com/home?status=<?=urlencode(get_the_title() .' - '. get_referral_url())?>" target="_blank"><span class="bf-fa bf-fa-twitter"></span></a></li>
            <li><a href="https://plus.google.com/share?url=<?=urlencode(get_referral_url())?>" target="_blank"><span class="bf-fa bf-fa-google-plus"></span></a></li>
            <li><a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=<?=urlencode(get_referral_url())?>&amp;title=<?=urlencode(get_the_title())?>&amp;summary=<?=urlencode(get_the_excerpt())?>&amp;source=<?php esc_attr(get_bloginfo('name')); ?>" target="_blank"><span class="bf-fa bf-fa-linkedin"></span></a></li>
        </ul>
    </section>
<?php endif; ?>
    <hr />
    <section>
        <?php wp_loginout($_SERVER['REQUEST_URI']); ?>
        <?php if (!is_user_logged_in()): ?>
        <a href="<?=esc_url(wp_registration_url())?>">Register</a>
        <?php endif; ?>
    </section>
</aside>
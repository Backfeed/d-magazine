<aside id="backfeed-collabar">
    <?php if (is_single()): ?>

    <section>
        <button id="backfeed-collabar-more">More</button>
        <div class="backfeed-collabar-voting">
            <i class="bf-fa bf-fa-arrow-up"></i>
            <span>87</span>
            <i class="bf-fa bf-fa-arrow-down"></i>
        </div>
        <div class="backfeed-collabar-sharing">
            <a href="https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=<?=urlencode(get_referral_url())?>" target="_blank"><span class="bf-fa bf-fa-facebook"></span></a>
            <a href="https://twitter.com/home?status=<?=urlencode(get_the_title() .' - '. get_referral_url())?>" target="_blank"><span class="bf-fa bf-fa-twitter"></span></a>
        </div>
    </section>

    <section>
        <p>Rate, share or comment on this article in order to get tokens</p>
        <a href="#">Learn More</a>
    </section>

    <section>
        <div class="backfeed-collabar-stats">
            <div class="backfeed-collabar-stat">
                <label>Tokens</label>  <span>25</span>
            </div>
            <div class="backfeed-collabar-stat">
                <label>Reputation</label>  <span>72</span>
            </div>
        </div>

        <?php wp_loginout($_SERVER['REQUEST_URI']); ?>
    </section>

    <?php else: ?>

        <section>
            <button id="backfeed-collabar-more">More</button>
            <div class="backfeed-collabar-stats">
                <div class="backfeed-collabar-stat">
                    <label>Tokens</label>  <span>25</span>
                </div>
                <div class="backfeed-collabar-stat">
                    <label>Reputation</label>  <span>72</span>
                </div>
            </div>
        </section>

        <section>
            <p>
                Reputation represents your influence on the editing process
                <br />Tokens are your share of the value we’ve created together
            </p>
            <a class="button button-primary" href="#">Learn More</a>
        </section>

    <?php endif; ?>
</aside>

<?php
function get_referral_url() {
    return add_query_arg('referrer', wp_get_current_user()->user_login, get_the_permalink());
}
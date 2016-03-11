<?php
namespace Backfeed;

function get_referral_url() {
    return add_query_arg('referrer', wp_get_current_user()->user_login, get_the_permalink());
}

function collabar_class() {
    $class = '';
    if (is_singular('post')) $class .= 'single-post';
    return $class;
}
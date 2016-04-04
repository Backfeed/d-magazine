<?php
namespace Backfeed;

function get_referral_url() {
    return add_query_arg('referrer', wp_get_current_user()->user_login, get_the_permalink());
}

function collabar_class() {
    $class = '';
    if (is_singular('post')) $class .= ' single-post';
    if (!is_user_logged_in()) $class .= ' logged-out';
    return $class;
}

function get_contribution_id($object_id) {
    //TODO: abstract later to support more meta types
    return get_comment_meta($object_id, 'backfeed_contribution_id', true);
}

function get_current_contribution_score() {
    return is_int(get_config('currentContribution')->score) ? get_config('currentContribution')->score : 0;
}

function get_current_agent_reputation() {
    return get_config('currentAgent')->reputation ? round(get_config('currentAgent')->reputation, 2) : 0;
}
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

function get_contribution($post_id) {
    $contribution_id = get_post_meta($post_id, 'backfeed_contribution_id', true);
    $contribution = Api::get_contribution($contribution_id);
    return $contribution;
}

function get_current_agent_tokens() {
    $current_agent_tokens = get_config('currentAgent')->tokens;
    return isset($current_agent_tokens) ? 10 * round($current_agent_tokens) : 0;
}

function get_current_agent_reputation() {
    $current_agent_reputation = get_config('currentAgent')->reputation;
    return isset($current_agent_reputation) ? round($current_agent_reputation) : 0;
}

function get_current_agent_normalized_reputation() {
    $current_agent_normalized_reputation = get_config('currentAgent')->normalized_reputation;
    return isset($current_agent_normalized_reputation) ? round($current_agent_normalized_reputation, 2) : 0;
}

function get_total_reputation() {
    $total_reputation = get_config('currentAgent')->total_reputation;
    return isset($total_reputation) ? round($total_reputation / 1000, 1) . 'K' : 0;
}
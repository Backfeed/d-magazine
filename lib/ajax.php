<?php
namespace Backfeed;

function ajax_submit_evaluation() {
    if (isset($_POST)) {
        $value = $_POST['value'];
        $contribution_id = $_POST['contribution_id'];
        $agent_id = $_POST['evaluator_id'];
        $response = Api::create_evaluation($value, $contribution_id, $agent_id);
        print_r(json_encode($response));
    }
    wp_die();
}

add_action('wp_ajax_nopriv_submit_evaluation', __NAMESPACE__.'\\ajax_submit_evaluation');
add_action('wp_ajax_submit_evaluation', __NAMESPACE__.'\\ajax_submit_evaluation');

function ajax_get_contributions() {
    if (isset($_GET)) {}
    $response = Api::get_contributions('article');
    print_r(json_encode($response));
    wp_die();
}

add_action('wp_ajax_nopriv_get_contributions', __NAMESPACE__.'\\ajax_get_contributions');
add_action('wp_ajax_get_contributions', __NAMESPACE__.'\\ajax_get_contributions');
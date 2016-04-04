<?php
namespace Backfeed;

function ajax_submit_evaluation() {
    if (isset($_REQUEST)) {
        $config = init_config();
        $value = $_REQUEST['value'];
        $contribution_id = $_REQUEST['contributionId'];
        $agent_id = $_REQUEST['agentId'];
        $response = Api::create_evaluation($value, $contribution_id, $agent_id);
        print_r(json_encode($response));
        wp_die();
    }
}

add_action('wp_ajax_nopriv_submit_evaluation', __NAMESPACE__.'\\ajax_submit_evaluation');
add_action('wp_ajax_submit_evaluation', __NAMESPACE__.'\\ajax_submit_evaluation');
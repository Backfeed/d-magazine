<?php
namespace Backfeed;

function ajax_submit_evaluation() {
    if (isset($_POST)) {
        //$config = init_config();
        $value = $_POST['value'];
        $contribution_id = $_POST['contributionId'];
        $agent_id = $_POST['agentId'];
        $response = Api::create_evaluation($value, $contribution_id, $agent_id);
        print_r(json_encode($response));
    }
    wp_die();
}

add_action('wp_ajax_nopriv_submit_evaluation', __NAMESPACE__.'\\ajax_submit_evaluation');
add_action('wp_ajax_submit_evaluation', __NAMESPACE__.'\\ajax_submit_evaluation');
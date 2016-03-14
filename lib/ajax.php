<?php
namespace Backfeed;

add_action('wp_ajax_submit_evaluation', function() {
    if ( isset($_REQUEST) ) {
        $vote = $_REQUEST['value'];
        $response = Api::create_evaluation($vote);
        echo $response;
    }

    die();
});

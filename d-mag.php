<?php
/*
Plugin Name: D-Mag
Plugin URI:  http://URI_Of_Page_Describing_Plugin_and_Updates
Description: Real time collaboration features for your website or app.
Version:     0.0.0
Author:      Backfeed
Author URI:  http://backfeed.cc/
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/
namespace Backfeed;

require_once 'vendor/backend/Requests/library/Requests.php';
\Requests::register_autoloader();

require_once('lib/social-sharing.php');
require_once('lib/template-tags.php');
require_once('lib/protocol-api.php');
require_once('lib/comments.php');
require_once('lib/ajax.php');

add_action('wp', function() {
	global $backfeed_config;
	$backfeed_config = [];

	$currentAgentId = get_user_meta(get_current_user_id(), 'backfeed_agent_id', true);

	$backfeed_config['ajaxUrl'] 	 = admin_url('admin-ajax.php');
	$backfeed_config['biddingId'] 	 = get_option('backfeed_bidding_id');
	$backfeed_config['currentAgent'] = Api::get_agent($currentAgentId);

	if (is_singular('post')) {
		$currentContributionId = get_post_meta(get_queried_object_id(), 'backfeed_contribution_id', true);
		$backfeed_config['currentContribution'] = Api::get_contribution($currentContributionId);
		$backfeed_config['currentContribution']->evaluations = Api::get_evaluations($currentContributionId);
		$backfeed_config['currentContribution']->score = Api::get_score($currentContributionId);
		
		if (is_array($backfeed_config['currentContribution']->evaluations)) {
			$agentIdsThatEvaluated = array_column($backfeed_config['currentContribution']->evaluations, 'userId');
			$currentAgentEvaluationIndex = array_search($currentAgentId, $agentIdsThatEvaluated);
			if ($currentAgentEvaluationIndex !== false) {
				$currentAgentEvaluationValue = $backfeed_config['currentContribution']->evaluations[$currentAgentEvaluationIndex]->value;
				$backfeed_config['currentContribution']->currentAgentVote = $currentAgentEvaluationValue;
			}
		}
	}
});

function get_config($key = '') {
	global $backfeed_config;
	if (!$key) return $backfeed_config;
	return (isset($backfeed_config[$key])) ? $backfeed_config[$key] : null;
}

add_action('wp_footer', function() {
	if (current_user_can('manage_options')) {
		if (is_user_logged_in())
			require 'templates/collabar-user.php';
		else
			require 'templates/collabar-guest.php';
	}
});

add_action('wp_enqueue_scripts', function() {
	wp_enqueue_script('fetch', plugin_dir_url(__FILE__).'vendor/bower_components/fetch/fetch.js', [], false, true);
	wp_enqueue_script('clipboard', plugin_dir_url(__FILE__).'vendor/bower_components/clipboard/dist/clipboard.js', [], false, true);
	wp_enqueue_script('underscore');
	wp_enqueue_style('collabar', plugin_dir_url(__FILE__).'dist/css/main.css');

	wp_register_script('collabar', plugin_dir_url(__FILE__).'dist/js/bundle.js', [], false, true);
	wp_localize_script('collabar', 'Backfeed', get_config());
	wp_enqueue_script('collabar');
});

register_activation_hook(__FILE__, function() {
	// single bidding for the magazine
	if (!get_option('backfeed_bidding_id')) {
		$bidding = Api::create_bidding();
		add_option('backfeed_bidding_id', $bidding->id);
	}

	// transform all magazine users into backfeed users
	foreach (get_users(["fields" => "ID"]) as $user_id) {
		make_agent($user_id);
	}

	// transform all magazine articles into contributions
	foreach (get_posts(["posts_per_page" => -1]) as $post) {
		make_contribution($post->ID);
	}
});

function make_contribution($post_id) {
	$post = get_post($post_id);
	if (!get_post_meta($post_id, 'backfeed_contribution_id', true)) {
		$agent_id = get_user_meta($post->post_author, 'backfeed_agent_id', true);

		$contribution = Api::create_contribution($agent_id);

		if ($contribution && $contribution->id)
			add_post_meta($post_id, 'backfeed_contribution_id', $contribution->id);
	}
}

function make_agent($user_id) {
	if (!get_user_meta($user_id, 'backfeed_agent_id', true)) {
		$new_agent = Api::create_agent();

		if ($new_agent && $new_agent->id)
			add_user_meta($user_id, 'backfeed_agent_id', $new_agent->id);
	}
}

add_action('publish_post', 'make_contribution');
add_action('user_register', 'make_agent');


function ajax_submit_evaluation() {
	if (isset($_REQUEST)) {
		$value = $_REQUEST['value'];
		$contribution_id = $_REQUEST['contributionId'];
		$agent_id = $_REQUEST['agentId'];
		$response = Api::create_evaluation($value, $contribution_id, $agent_id);
		print_r($response);
		wp_die();
	}
}

add_action('wp_ajax_nopriv_submit_evaluation', __NAMESPACE__.'\\ajax_submit_evaluation');
add_action('wp_ajax_submit_evaluation', __NAMESPACE__.'\\ajax_submit_evaluation');
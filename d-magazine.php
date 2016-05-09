<?php
/*
Plugin Name: D-Magazine
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

require_once('lib/template-tags.php');
require_once('lib/protocol-api.php');
require_once('lib/comments.php');
require_once('lib/ajax.php');
require_once('lib/queries.php');

function init_config() {
	global $backfeed_config;
	$backfeed_config = [];

	$backfeed_config['ajaxUrl'] = admin_url('admin-ajax.php');

	$currentAgentId = get_user_meta(get_current_user_id(), 'backfeed_agent_id', true);
	$backfeed_config['currentAgent'] = Api::get_agent($currentAgentId);

	if (is_singular('post')) {
		$currentContributionId = get_post_meta(get_queried_object_id(), 'backfeed_contribution_id', true);
		$backfeed_config['currentContribution'] = Api::get_contribution($currentContributionId);

		$evaluationByCurrentAgent = Api::get_evaluations($currentContributionId, $currentAgentId);

		if ($evaluationByCurrentAgent->count > 0) {
			$backfeed_config['currentContribution']->currentAgentVote = $evaluationByCurrentAgent->items[0]->value;
		}
	}

	return $backfeed_config;
}

function get_config($key = '') {
	global $backfeed_config;
	if (!$key) return $backfeed_config;
	return (isset($backfeed_config[$key])) ? $backfeed_config[$key] : null;
}

add_action('wp_footer', function() {
	$viewmodel = [
		'current_agent_tokens' => get_current_agent_tokens(),
		'current_agent_reputation' => get_current_agent_reputation(),
		'total_reputation' => get_total_reputation(),
		'current_agent_avatar' => get_avatar(wp_get_current_user()->ID, 32)
	];

	if (is_singular('post')) {
		$viewmodel['referral_url'] = get_referral_url();
	}

	if (is_user_logged_in()) {
		require 'templates/collabar-user.php';
	} else {
		// If the URL ends with '?continuetour', show mock logged-in footer even though the user is logged-out.
		if (substr_compare($_SERVER['REQUEST_URI'], '?continuetour', -strlen('?continuetour')) === 0) {
			$viewmodel = [
				'current_agent_tokens' => 11,
				'current_agent_reputation' => 0.2,
				'current_agent_avatar' => '<img src="'.plugin_dir_url(__FILE__).'/assets/images/default-avatar.png" width="32" height="32" />',
				'referral_url' => get_the_permalink()
			];
			require 'templates/collabar-user.php';
		} else {
			require 'templates/collabar-guest.php';
		}
	}
});

add_action('wp_enqueue_scripts', function() {
	wp_enqueue_script('fetch', plugin_dir_url(__FILE__).'vendor/bower_components/fetch/fetch.js', [], false, true);
	wp_enqueue_script('clipboard', plugin_dir_url(__FILE__).'vendor/bower_components/clipboard/dist/clipboard.js', [], false, true);
	wp_enqueue_script('jquery-noty', plugin_dir_url(__FILE__).'vendor/bower_components/noty/js/noty/packaged/jquery.noty.packaged.min.js', ['jquery'], false, true);
	wp_enqueue_script('hopscotch', plugin_dir_url(__FILE__).'vendor/bower_components/hopscotch/dist/js/hopscotch.js', ['jquery'], false, true);
	wp_enqueue_script('underscore');

	wp_enqueue_style('collabar', plugin_dir_url(__FILE__).'dist/css/main.css');
	wp_enqueue_style('animate', plugin_dir_url(__FILE__).'vendor/bower_components/animate.css/animate.css');

	wp_register_script('collabar', plugin_dir_url(__FILE__).'dist/js/bundle.js', ['jquery-noty'], false, true);
	wp_localize_script('collabar', 'Backfeed', init_config());
	wp_enqueue_script('collabar');
}, 100);

register_activation_hook(__FILE__, function() {
	// transform all magazine users into backfeed users
	foreach (get_users(["fields" => "ID"]) as $user_id) {
		make_agent($user_id);
	}

	// transform all magazine articles into contributions
	foreach (get_posts(["posts_per_page" => -1]) as $post) {
		make_contribution($post->ID);
	}

	// transform all magazine comments into contributions
	/*foreach (get_comments(["post_type" => "post"]) as $comment) {
		//Register user for comment author, if we have their email and if they're not registered already
		if ($comment->user_id == 0 && $comment->comment_author_email) {
			$user = get_user_by('email', $comment->comment_author_email);

			if ($user) {
				$user_id = $user->ID;
			} else {
				$user_id = wp_insert_user([
					'user_email' => $comment->comment_author_email,
					'user_login' => $comment->comment_author_email,
					'display_name' => $comment->comment_author
				]);
				// TODO: send custom email
			}

			wp_update_comment([
				'comment_ID' => $comment->comment_ID,
				'user_id' => $user_id
			]);
		}

		//Save comment as contribution
		make_contribution($comment->comment_ID);
	}*/
});

register_deactivation_hook(__FILE__, function() {});

function make_contribution($ID) {
	$post = get_post($ID);
	$comment = get_comment($ID);

	// it is a post of post_type="post" that just got "publish"ed and doesn't have a contribution_id associated with it
	if ($post && $post->post_type == 'post' && !get_post_meta($ID, 'backfeed_contribution_id', true)) {
		$agent_id = get_user_meta($post->post_author, 'backfeed_agent_id', true);

		$contribution = Api::create_contribution($agent_id);

		if ($contribution && isset($contribution->id))
			add_post_meta($ID, 'backfeed_contribution_id', $contribution->id);

	// it is a top-level comment by a registered user that doesn't have a contribution_id associated with it
	}/* else if ($comment && !get_comment_meta($ID, 'backfeed_contribution_id', true) && !$comment->comment_parent) {
		$agent_id = get_user_meta($comment->user_id, 'backfeed_agent_id', true);

		if ($agent_id) {
			$contribution = Api::create_contribution($agent_id);

			if ($contribution && $contribution->id)
				add_comment_meta($ID, 'backfeed_contribution_id', $contribution->id);
		}
	}*/
}

function make_agent($user_id) {
	if (!get_user_meta($user_id, 'backfeed_agent_id', true)) {
		switch ($user_id) {
			case 8:
				$reputation = 300;
				break;
			case 43:
				$reputation = 200;
				break;
			case 11:
				$reputation = 200;
				break;
			case 9:
				$reputation = 200;
				break;
			case 44:
				$reputation = 100;
				break;
			case 59:
				$reputation = 100;
				break;
			case 60:
				$reputation = 100;
				break;
			case 61:
				$reputation = 100;
				break;
			case 53:
				$reputation = 100;
				break;
			case 25:
				$reputation = 100;
				break;
			default:
				$reputation = null;
		}

		if (empty($_POST['referrer_user'])) {
			$new_agent = Api::create_agent(null, $reputation);
		} else {
			$referrer_user = get_user_by('login', $_POST['referrer_user']);
			$referrer_agent_id = get_user_meta($referrer_user->ID, 'backfeed_agent_id', true);
			$new_agent = Api::create_agent($referrer_agent_id);
		}

		if ($new_agent && isset($new_agent->id))
			add_user_meta($user_id, 'backfeed_agent_id', $new_agent->id);
	}
}

add_action('wp_insert_post', __NAMESPACE__.'\\make_contribution');
add_action('user_register', __NAMESPACE__.'\\make_agent');
add_action('wp_insert_comment', __NAMESPACE__.'\\make_contribution');
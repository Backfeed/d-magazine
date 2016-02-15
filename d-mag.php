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
add_action('wp_footer', function() {
	if (is_user_logged_in())
		require 'templates/collabar-user.php';
	else
		require 'templates/collabar-guest.php';
});

add_action('wp_enqueue_scripts', function() {
	wp_enqueue_script('fetch', plugin_dir_url(__FILE__).'vendor/bower_components/fetch/fetch.js', [], false, true);
	wp_enqueue_script('underscore');
	wp_enqueue_script('collabar', plugin_dir_url(__FILE__).'dist/js/main.js', [], false, true);
	wp_enqueue_style('collabar', plugin_dir_url(__FILE__).'dist/css/main.css');
});

require_once 'vendor/backend/Requests/library/Requests.php';
Requests::register_autoloader();

require_once('lib/social-sharing.php');
require_once('lib/template-tags.php');
require_once('lib/protocol-api.php');

register_activation_hook(__FILE__, function() {
	// single bidding for the magazine
	if (!get_option('backfeed_bidding_id')) {
		$bidding = call_protocol_api('post', 'biddings');
		add_option('backfeed_bidding_id', $bidding->id);
	}

	// transform all magazine users into backfeed users
	foreach (get_users(["fields" => "ID"]) as $user_id) {
		make_backfeed_user($user_id);
	}

	// transform all magazine articles into contributions
	foreach (get_posts(["posts_per_page" => -1, "post_status" => "publish"]) as $post) {
		make_backfeed_contribution($post->ID, $post);
	}
});

function make_backfeed_contribution($ID, $post) {
	if (!get_post_meta($ID, 'backfeed_contribution_id')) {
		$backfeed_user_id = get_user_meta($post->post_author, 'backfeed_user_id', true);
		$bidding_id = get_option('backfeed_bidding_id');

		$contribution = call_protocol_api('post', 'contributions', [
			"userId" => $backfeed_user_id,
			"biddingId" => $bidding_id
		]);

		if ($contribution)
			add_post_meta($ID, 'backfeed_contribution_id', $contribution->id);
	}
}

function make_backfeed_user($user_id) {
	if (!get_user_meta($user_id, 'backfeed_user_id')) {
		$backfeed_user = call_protocol_api('post', 'users');
		if ($backfeed_user)
			add_user_meta($user_id, 'backfeed_user_id', $backfeed_user->id);
	}
}

add_action('publish_post', 'make_backfeed_contribution');
add_action('register_user', 'make_backfeed_user');
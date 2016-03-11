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
require_once 'vendor/backend/Requests/library/Requests.php';
Requests::register_autoloader();

require_once('lib/social-sharing.php');
require_once('lib/template-tags.php');
require_once('lib/protocol-api.php');
require_once('lib/comments.php');

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
	wp_enqueue_script('underscore');
	wp_enqueue_style('collabar', plugin_dir_url(__FILE__).'dist/css/main.css');

	wp_register_script('collabar', plugin_dir_url(__FILE__).'dist/js/bundle.js', [], false, true);
	$localized_data = [
		'apiKey' => Backfeed_Api::API_KEY,
		'apiUrl' => Backfeed_Api::API_URL,
		'biddingId' => get_option('backfeed_bidding_id'),
		'userId' => get_user_meta(get_current_user_id(), 'backfeed_user_id', true)
	];

	if (is_singular('post'))
		$localized_data['contributionId'] = get_post_meta(get_queried_object_id(), 'backfeed_contribution_id', true);

	wp_localize_script('collabar', 'Backfeed', $localized_data);
	wp_enqueue_script('collabar');
});

register_activation_hook(__FILE__, function() {
	// single bidding for the magazine
	if (!get_option('backfeed_bidding_id')) {
		$bidding = Backfeed_Api::create_bidding();
		add_option('backfeed_bidding_id', $bidding->id);
	}

	// transform all magazine users into backfeed users
	foreach (get_users(["fields" => "ID"]) as $user_id) {
		make_backfeed_user($user_id);
	}

	// transform all magazine articles into contributions
	foreach (get_posts(["posts_per_page" => -1]) as $post) {
		make_backfeed_contribution($post->ID);
	}
});

function make_backfeed_contribution($post_id) {
	$post = get_post($post_id);
	if (!get_post_meta($post_id, 'backfeed_contribution_id', true)) {
		$backfeed_user_id = get_user_meta($post->post_author, 'backfeed_user_id', true);

		$contribution = Backfeed_Api::create_contribution($backfeed_user_id);

		if ($contribution && $contribution->id)
			add_post_meta($post_id, 'backfeed_contribution_id', $contribution->id);
	}
}

function make_backfeed_user($user_id) {
	if (!get_user_meta($user_id, 'backfeed_user_id', true)) {
		$backfeed_user = Backfeed_Api::create_user();

		if ($backfeed_user && $backfeed_user->id)
			add_user_meta($user_id, 'backfeed_user_id', $backfeed_user->id);
	}
}

add_action('publish_post', 'make_backfeed_contribution');
add_action('user_register', 'make_backfeed_user');
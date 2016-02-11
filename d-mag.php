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
	wp_enqueue_script('fetch', plugin_dir_url(__FILE__).'bower_components/fetch/fetch.js', [], false, true);
	wp_enqueue_script('collabar', plugin_dir_url(__FILE__).'dist/js/main.js', [], false, true);
	wp_enqueue_style('collabar', plugin_dir_url(__FILE__).'dist/css/main.css');
});

function get_referral_url() {
	return add_query_arg('referrer', wp_get_current_user()->user_login, get_the_permalink());
}

//1. Add a new hidden form element with the referrer user, if any
add_action('register_form', function() { ?>
	<input type="hidden" name="referrer_user" id="referrer_user" />
	<script>document.getElementById('referrer_user').value = localStorage['referrer'];</script>
<?php });


//2. Save the referrer user as a user meta in the database.
add_action('user_register', function($user_id) {
	if(!empty($_POST['referrer_user'])) {
		update_user_meta($user_id, 'referrer', trim($_POST['referrer_user']));
	}
});
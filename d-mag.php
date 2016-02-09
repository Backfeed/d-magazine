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
	require 'templates/collabar.html';
});

add_action('wp_enqueue_scripts', function() {
	wp_enqueue_script('collabar', plugin_dir_url(__FILE__).'dist/js/main.js');

	wp_enqueue_style('collabar', plugin_dir_url(__FILE__).'dist/css/main.css');
});
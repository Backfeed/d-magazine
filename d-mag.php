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
add_action('wp_footer', 'bf_footer');

function bf_footer() {
	require 'collabar/collabar.html';
}
<?php
if ( !defined( 'WP_UNINSTALL_PLUGIN' ) )
    exit();

delete_metadata('user', 0, 'backfeed_user_id', '', true);
delete_metadata('post', 0, 'backfeed_contribution_id', '', true);

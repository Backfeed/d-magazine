<?php
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
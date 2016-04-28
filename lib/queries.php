<?php
namespace Backfeed;

function front_page_query($paged = 1) {
    $query_args = [
        'posts_per_page'        => 8,
        'post_type'             => 'post',
        'post_status'           => 'publish',
        'no_found_rows'         => false,
        'paged'                 => $paged
    ];

    $offset = $query_args['posts_per_page'] * $paged - 8;

    $contributions = Api::get_contributions(['start' => $offset, 'limit' => $query_args['posts_per_page']]);

    if (is_array($contributions->items)) {
        $contribution_ids = array_column($contributions->items, 'id');

        $post_ids = array_map(function($contribution_id) {
            return get_posts([
                'meta_key' => 'backfeed_contribution_id',
                'meta_value' => $contribution_id
            ])[0]->ID;
        }, $contribution_ids);

        $query_args['post__in'] = $post_ids;
        $query_args['orderby'] = 'post__in';
    }
    
    return new \WP_Query($query_args);
}

function raw_space_query($paged = 1) {
    $query_args = [
        'posts_per_page'        => 8,
        'post_type'             => 'post',
        'post_status'           => 'publish',
        'paged'                 => $paged
    ];

    return new \WP_Query($query_args);
}
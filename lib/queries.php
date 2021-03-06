<?php
namespace Backfeed;

function front_page_query($paged = 1) {
    $limit = 8;
    $start = $limit * $paged - $limit;

    $query_args = [
        'posts_per_page'        => $limit,
        'post_type'             => 'post',
        'post_status'           => 'publish',
        'no_found_rows'         => false,
        'paged'                 => $paged
    ];

    $contributions = Api::get_contributions('article', $start, $limit);

    if (is_array($contributions->items)) {
        $contribution_ids = array_column($contributions->items, 'id');

        $post_ids = array_map(function($contribution_id) {
            $posts = get_posts([
                'meta_key' => 'backfeed_contribution_id',
                'meta_value' => $contribution_id
            ]);
            return (empty($posts)) ? null :  $posts[0]->ID;
        }, $contribution_ids);

        if (!empty(array_filter($post_ids))) {
            $query_args['post__in'] = $post_ids;
            $query_args['orderby'] = 'post__in';
        }
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
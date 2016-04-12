<?php
namespace Backfeed;

function front_page_query($paged) {
    $query_args = [
        'posts_per_page'        => 8,
        'post_type'             => 'post',
        'post_status'           => 'publish',
        'no_found_rows'         => false,
        'paged'                 => $paged
    ];

    $contributions = Api::get_all_contributions();

    if (is_array($contributions)) {
        usort($contributions, function($a, $b) { return $b->score - $a->score; });
        $contribution_ids = array_column($contributions, 'id');
        
        $query_args['meta_query'] = [
            [
                'key' => 'backfeed_contribution_id',
                'value' => $contribution_ids,
                'compare' => 'IN'
            ]
        ];
    }
    
    return new \WP_Query($query_args);
}

function raw_space_query($paged) {
    $query_args = [
        'posts_per_page'        => 8,
        'post_type'             => 'post',
        'post_status'           => 'publish',
        'paged'                 => $paged
    ];

    return new \WP_Query($query_args);
}
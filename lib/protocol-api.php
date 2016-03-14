<?php
namespace Backfeed;

class Api {
    const API_KEY = 'mJJEYE6DlC5BAJ4hOAuwG9pUNwuBZAb8aLsik7K8',
        API_URL = 'https://api.backfeed.cc/dmag/';

    private static function request($method = 'get', $endpoint, $data = [], $headers = []) {
        $default_headers = [
            'x-api-key' => self::API_KEY
        ];
        $headers = array_merge($default_headers, $headers);

        $data = json_encode($data);

        if ($method == 'post' || $method == 'put')
            $response = \Requests::$method(self::API_URL . $endpoint, $headers, $data);
        else
            $response = \Requests::$method(self::API_URL . $endpoint, $headers);

        //if (!$response->success) throw new Exception('Backfeed Backend returned error');
        return json_decode($response->body);
    }

    public static function create_bidding() {
        return self::request('post', 'biddings');
    }

    public static function create_agent() {
        return self::request('post', 'users');
    }

    public static function get_agent($agent_id) {
        return self::request('get', 'users/'.$agent_id);
    }

    public static function create_contribution($agent_id) {
        return self::request('post', 'contributions', [
            "userId" => $agent_id,
            "biddingId" => get_option('backfeed_bidding_id')
        ]);
    }

    public static function create_evaluation($vote, $contribution_id, $agent_id) {
        if (!$contribution_id) get_config('currentContribution')->id;
        if (!$agent_id) get_config('currentAgent')->id;

        return self::request('post', 'evaluations/submit', [
            "userId" => $agent_id,
            "biddingId" => get_option('backfeed_bidding_id'),
            "evaluations" => [
                [
                    "contributionId" => $contribution_id,
                    "value" => $vote
                ]
            ]
        ]);
    }

    public static function get_contribution($post_id) {
        return self::request('get', 'contributions/'.$post_id);
    }

    public static function get_evaluations($contribution_id) {
        return self::request('get', 'contributions/'.$contribution_id.'/evaluations');
    }

    public static function get_score($contribution_id) {
        return self::request('get', 'contributions/'.$contribution_id.'/score');
    }
}
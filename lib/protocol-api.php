<?php
class Backfeed_Api {
    const API_KEY = 'mJJEYE6DlC5BAJ4hOAuwG9pUNwuBZAb8aLsik7K8',
        API_URL = 'https://api.backfeed.cc/dmag';

    private static function request($method = 'get', $endpoint, $data = [], $headers = []) {
        $default_headers = [
            'x-api-key' => self::API_KEY
        ];
        $headers = array_merge($default_headers, $headers);

        $data = json_encode($data);
        $response = Requests::$method(self::API_URL . $endpoint, $headers, $data);

        //if (!$response->success) throw new Exception('Backfeed Backend returned error');
        return json_decode($response->body);
    }

    public static function create_bidding() {
        return self::request('post', 'biddings');
    }

    public static function create_user() {
        return self::request('post', 'users');
    }

    public static function get_user($user_id) {
        return self::request('get', 'users/'.$user_id);
    }

    public static function create_contribution($backfeed_user_id) {
        return self::request('post', 'contributions', [
            "userId" => $backfeed_user_id,
            "biddingId" => get_option('backfeed_bidding_id')
        ]);
    }

    public static function get_contribution($post_id) {
        return self::request('get', 'contributions/'.$post_id);
    }
}
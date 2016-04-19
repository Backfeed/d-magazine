<?php
namespace Backfeed;

if (!defined('BACKFEED_API_URL')) define('BACKFEED_API_URL', 'http://api.staging.backfeed.cc/dmag/');

class Api {
    private static function request($method = 'get', $endpoint, $data = [], $headers = []) {
        $default_headers = [
            //'x-api-key' => BACKFEED_API_KEY
        ];
        $headers = array_merge($default_headers, $headers);

        $data = json_encode($data);

        if ($method == 'post' || $method == 'put')
            $response = \Requests::$method(BACKFEED_API_URL . $endpoint, $headers, $data);
        else
            $response = \Requests::$method(BACKFEED_API_URL . $endpoint, $headers);

        if (!$response->success) {
            error_log('Backfeed API returned meh: '.serialize($response));
            //TODO: set up proper error handling
            //throw new \Exception('Backfeed Backend returned error');
        }

        $json_response = json_decode($response->body);
        if (isset($json_response->errorMessage)) return $json_response->errorMessage;
        return $json_response;
    }

    public static function create_agent($tokens = null, $reputation = null) {
        $request_parameters = [];
        if (!is_null($tokens)) $request_parameters['tokens'] = (float) $tokens;
        if (!is_null($reputation)) $request_parameters['reputation'] = (float) $reputation;
        return self::request('post', 'users', $request_parameters);
    }

    public static function get_agent($agent_id) {
        return self::request('get', 'users/'.$agent_id);
    }

    public static function create_contribution($agent_id) {
        return self::request('post', 'contributions', [
            "contributor_id" => $agent_id
        ]);
    }

    public static function create_evaluation($vote, $contribution_id, $agent_id) {
        //if (!$contribution_id) get_config('currentContribution')->id;
        //if (!$agent_id) get_config('currentAgent')->id;

        return self::request('post', 'evaluations', [
            "evaluator_id" => $agent_id,
            "contribution_id" => $contribution_id,
            "value" => intval($vote)
        ]);
    }

    public static function get_all_contributions() {
        return self::request('get', 'contributions/');
    }

    public static function get_contribution($contribution_id, $field = '') {
        $response = self::request('get', 'contributions/' . $contribution_id);
        return empty($field) ? $response : $response->$field;
    }

    public static function get_evaluations($contribution_id) {
        return self::request('get', 'contributions/'.$contribution_id.'/evaluations');
    }

    /*public static function get_score($contribution_id) {
        return self::request('get', 'contributions/'.$contribution_id.'/score');
    }*/
}
<?php
namespace Backfeed;

if (!defined('BACKFEED_API_URL')) define('BACKFEED_API_URL', 'http://localhost:8888/dmag/');

class Api {
    private static function request($method = 'get', $endpoint, $data = [], $headers = []) {
        $default_headers = [];
        $headers = array_merge($default_headers, $headers);

        if (empty($data)) $data = null;

        // If it's a GET request, treat $data as query parameters. Otherwise, $data will be the request payload.
        $url = ($method == 'get' && !empty($data)) ? add_query_arg($data, BACKFEED_API_URL.$endpoint) : BACKFEED_API_URL.$endpoint;

        if ($method == 'post' || $method == 'put')
            $response = \Requests::$method($url, $headers, $data);
        else
            $response = \Requests::$method($url, $headers);

        if (!$response->success) {
            error_log('Backfeed API returned meh: '.serialize($response));
            //TODO: set up proper error handling
            //throw new \Exception('Backfeed Backend returned error');
        }

        $json_response = json_decode($response->body);
        if (isset($json_response->errorMessage)) return $json_response->errorMessage;
        return $json_response;
    }

    public static function create_agent($referrer_id = null, $tokens = null, $reputation = null) {
        $request_parameters = [];
        if (!is_null($referrer_id)) $request_parameters['referrer_id'] = (float) $referrer_id;
        if (!is_null($tokens)) $request_parameters['tokens'] = (float) $tokens;
        if (!is_null($reputation)) $request_parameters['reputation'] = (float) $reputation;
        return self::request('post', 'users', $request_parameters);
    }

    public static function get_agent($agent_id) {
        return self::request('get', 'users/'.$agent_id);
    }

    public static function create_contribution($agent_id) {
        return self::request('post', 'contributions', [
            "contributor_id" => (int) $agent_id
        ]);
    }

    public static function create_evaluation($vote, $contribution_id, $agent_id) {
        //if (!$contribution_id) get_config('currentContribution')->id;
        //if (!$agent_id) get_config('currentAgent')->id;

        return self::request('post', 'evaluations', [
            "evaluator_id" => intval($agent_id),
            "contribution_id" => intval($contribution_id),
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

    public static function get_evaluations($contribution_id = null, $contributor_id = null) {
        $data = [];
        if (!empty($contribution_id)) $data['contribution_id'] = (int) $contribution_id;
        if (!empty($contributor_id)) $data['contributor_id'] = (int) $contributor_id;
        return self::request('get', 'evaluations', $data);
    }
}
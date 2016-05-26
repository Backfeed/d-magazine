<?php
namespace Backfeed;

add_filter( 'comments_template', function() {
    return dirname(__FILE__) . '/../templates/comments.php';
});

/*
* Comment List Callback
*/
function comments_cb( $comment, $args, $depth ) {
    global $post;
    $GLOBALS['comment'] = $comment;
    
    if ($depth == 1) {
        $contribution_id = get_comment_meta($comment->comment_ID, 'backfeed_contribution_id', true);
        $current_agent_id = get_user_meta(get_current_user_id(), 'backfeed_agent_id', true);

        if (!empty($contribution_id)) {
            $evaluation_by_current_agent = Api::get_evaluations($contribution_id, $current_agent_id);

            if ($evaluation_by_current_agent->count > 0) {
                $voting_status = $evaluation_by_current_agent->items[0]->value ? 'vote-up': 'vote-down';
            } else $voting_status = 'vote-none';
        }
    }

?>

<div <?php comment_class( empty( $args['has_children'] ) ? '' : 'parent' ); ?>>
    <article id="comment-<?php comment_ID(); ?>" class="comment-body clearfix" data-contribution-id="<?=$contribution_id?>">

        <div class="comment-author vcard">
            <div class="author-image">
                <?php if ( 0 != $args['avatar_size'] ) echo get_avatar( $comment, $args['avatar_size'] ); ?>
            </div>
            <cite class="fn"><?=get_comment_author_link()?></cite>
            <time datetime="<?php comment_time( 'c' ); ?>" class="comment-date">
                <a href="<?=esc_url( get_comment_link( $comment->comment_ID, $args ) )?>"><?=esc_html( get_comment_date() )?></a>
            </time>
            <?php edit_comment_link( esc_html__( 'Edit', 'barcelona' ), '  ', '' ); ?>
<!--            <div class="comment-badge">Tokens Awarded</div>-->
        </div><!-- .comment-author -->

        <div class="comment-content">
            <?php if ( $comment->comment_approved == '0' ): ?>
                <div class="alert alert-warning">
                    <?php esc_html_e( 'Your comment is awaiting moderation.', 'barcelona' ); ?>
                </div>
            <?php endif; ?>
            <?=nl2br( get_comment_text() )?>
        </div><!-- .comment-content -->

        <div class="comment-meta">
            <ul class="comment-votes clearfix" data-status="<?=isset($voting_status) ? $voting_status : 'vote-none'?>">

                <?php if ($depth === 1): foreach (['down', 'up'] as $k): ?>
                    <li class="comment-vote">
                        <button class="btn-vote btn-vote-<?=sanitize_html_class($k)?>">
                            <span class="fa fa-thumbs-<?=sanitize_html_class($k)?>"></span>
                        </button>
                    </li>
                <?php endforeach; endif; ?>

                <li class="comment-reply">
                    <?php comment_reply_link(array_merge($args, [
                        'reply_text' => 'Reply',
                        'depth'     => $depth,
                        'max_depth' => $args['max_depth']
                    ])); ?>
                </li>
            </ul>
        </div><!-- .comment-metadata -->

    </article><!-- .comment-body -->
    
<?php
}
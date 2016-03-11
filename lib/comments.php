<?php
namespace Backfeed;

add_filter( 'comments_template', function() {
    return plugin_dir_path(__FILE__).'templates/comments.php';
});

/*
* Comment List Callback
*/
function comments_cb( $comment, $args, $depth ) {
    global $post;
    $GLOBALS['comment'] = $comment;
?>

<div <?php comment_class( empty( $args['has_children'] ) ? '' : 'parent' ); ?>>
    <article id="comment-<?php comment_ID(); ?>" class="comment-body clearfix">

        <div class="comment-author vcard">
            <div class="author-image">
                <?php if ( 0 != $args['avatar_size'] ) echo get_avatar( $comment, $args['avatar_size'] ); ?>
            </div>
            <cite class="fn"><?=get_comment_author_link()?></cite>
            <time datetime="<?php comment_time( 'c' ); ?>" class="comment-date">
                <a href="<?=esc_url( get_comment_link( $comment->comment_ID, $args ) )?>"><?=esc_html( get_comment_date() )?></a>
            </time>
            <?php edit_comment_link( esc_html__( 'Edit', 'barcelona' ), '  ', '' ); ?>
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
            <ul class="clearfix">

                <?php if ( barcelona_get_option( 'show_comment_voting' ) == 'on' ):

                    foreach ( ['up', 'down'] as $k ):

                        ?>
                        <li class="comment-vote<?php if ( $barcelona_voted = barcelona_is_voted_comment() ) { echo ' comment-vote-disabled'; } ?>">
                            <button class="btn-vote btn-vote-<?=sanitize_html_class( $k ) . ( $barcelona_voted == $k ? ' btn-voted' : '' )?>"
                                    data-nonce="<?=wp_create_nonce( 'barcelona-comment-vote' )?>"
                                    data-type="<?=esc_attr( $k )?>"
                                    data-vote-type="comment"
                                    data-vote-id="<?=esc_attr( $comment->comment_ID ) .'_'. esc_attr( $post->ID )?>">
                                <span class="fa fa-thumbs-<?=sanitize_html_class( $k )?>"></span>
                            </button>
                        </li>
                        <?php

                    endforeach;

                endif; ?>

                <li class="comment-reply">
                    <?php
                    comment_reply_link( array_merge( $args, [
                        'reply_text' => 'Reply',
                        'depth'     => $depth,
                        'max_depth' => $args['max_depth']
                    ] ) );
                    ?>
                </li>
            </ul>
        </div><!-- .comment-metadata -->

    </article><!-- .comment-body -->
</div><!-- .comment_class -->
<?php
}
<?php namespace Backfeed; ?>

<aside id="backfeed-collabar" class="<?=collabar_class()?>">
	<section class="backfeed-logged-out-bar hidden-sm-up">
		<a class="backfeed-register-button" href="<?=esc_url(wp_registration_url())?>">REGISTER</a>
		<div class="backfeed-learn">Join our crowd intelligence&nbsp;&nbsp;
			<a href="<?=site_url('/faq/')?>" class="button backfeed-learn-button">Learn more</a>
		</div>
	</section>
	<section class="backfeed-logged-out-bar hidden-xs-down">
		<div class="backfeed-gloss hidden-sm-down"></div>
		<a class="backfeed-register-button" href="<?=esc_url(wp_registration_url())?>">REGISTER</a>
		<div class="backfeed-promotion">
			<div class="backfeed-tagline hidden-sm-down"><span>We are</span>crowdsourced</div>
			<div class="backfeed-learn hidden-lg-up">Register to participate,<br />get compensated for your contribution.</div>
			<div class="backfeed-learn hidden-md-down">Everything you see here is edited by our collective intelligence.<br />Register to participate, and get compensated for your contribution.</div>
			<a href="<?=site_url('/faq/')?>" class="button backfeed-learn-button">Learn more</a>
		</div>
	</section>
</aside>
<?php namespace Backfeed; ?>

<aside id="backfeed-collabar" class="<?=collabar_class()?>">
	<section class="hidden-sm-up">
		<div class="backfeed-register">
			<a class="button" href="<?=esc_url(wp_registration_url())?>">REGISTER</a>
		</div>
		<div class="backfeed-learn">Join our crowd intelligence&nbsp;&nbsp;
			<button class="button backfeed-learn-button">Learn more</button>
		</div>
	</section>
	<section class="hidden-xs-down">
		<div class="backfeed-register">
			<a class="button" href="<?=esc_url(wp_registration_url())?>">REGISTER</a>
		</div>
		<div class="backfeed-tagline"><span>We are</span>crowdsourced</div>
		<div class="backfeed-learn hidden-xl-up">Register to participate, get compensated for your contribution</div>
		<div class="backfeed-learn hidden-lg-down">Everything you see here is edited by our collective intelligence.<br />Register to participate, and get compensated for your contribution.</div>
		<button class="button backfeed-learn-button">Learn more</button>
	</section>
</aside>
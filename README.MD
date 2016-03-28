## Overview
D-Magazine is a proof-of-concept of the Backfeed decentralized reputation system and economic model.
This MVP is planned to only work internally within the Backfeed Magazine, but plans are to make it into a reusable plugin in the future.
Chances are it might work when you install it on your WordPress website, but we wouldn't count on it yet.

## Installation Instructions
These instructions were tested on a clean Ubuntu 15.10 instance set up on DigitalOcean.
All commands assumed to be executed by root.

If you already have a WordPress instance ready, and you just want to install the plugin and try it out, you can skip to the [Install D-Magazine](#install-d-magazine) section below.

### Prerequisites

* `apt-get update`
* `apt-get install software-properties-common git npm`
* `npm cache clean -f`
* `npm install -g n`
* `n stable`
* `npm install -g bower gulp-cli`

### Install Nginx (web server)
* `apt-get install nginx`
* `service nginx start`

Now, point your web browser your server ( e.g. http://127.0.0.1/ ), and you should see the infamous "Welcome to nginx!" message.

#### Configure Nginx
Edit `/etc/nginx/sites-available/default`.

Make the following changes inside the `server` block:

1. the line that begins with `index` should be `index index.php index.html index.htm;`
2. the line that begins with `server_name` should be something like `server_name server_domain_name_or_IP;`

Also, find the `location /` block and inside it:

1. the line that begins with `try_files_` should be `try_files $uri $uri/ /index.php?q=$uri&$args;`

After that, reload nginx: `service nginx reload`.

### Install HHVM (PHP-compatible compiler)

* `apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0x5a16e7281be7a449`
* `add-apt-repository "deb http://dl.hhvm.com/ubuntu $(lsb_release -sc) main"`
* `apt-get update`
* `apt-get install hhvm`
* `/usr/share/hhvm/install_fastcgi.sh`
* `update-rc.d hhvm defaults`
* `service hhvm start`
* `service nginx restart`

#### Verify that HHVM and nginx are connected

* `cd /var/www/html`
* `echo '<?php phpinfo(); ?>' > info.php`

Now, point your web browser to your server ( e.g. http://127.0.0.1/info.php ), and you should see "HHVM" above all.

### Install MariaDB (MySQL-compatible open-licensed alternative)
(installation instructions taken from: https://downloads.mariadb.org/mariadb/repositories/)

* `apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db`
* `add-apt-repository 'deb [arch=amd64,i386] http://ftp.yz.yamagata-u.ac.jp/pub/dbms/mariadb/repo/10.1/ubuntu wily main'`
* `apt-get update`
* `apt-get install mariadb-server`
* `mysql_secure_installation` and press Y on every question asked
* `service mysql start`

#### Configure MariaDB

* `mysql -u root -p`
* mysql> `CREATE DATABASE databasename;`
* mysql> `GRANT ALL PRIVILEGES ON databasename.* TO "username"@"localhost" IDENTIFIED BY "password";`
* mysql> `FLUSH PRIVILEGES;`
* mysql> `EXIT`

### Install WordPress

* `cd /var/www/html`
* `wget https://wordpress.org/latest.tar.gz`
* `tar -xzvf latest.tar.gz`
* `mv wordpress/* .`
* `rm -r wordpress/ latest.tar.gz`

Now, point your web browser to your server ( e.g. http://127.0.0.1/ ), and complete the installation wizard.

### Install D-magazine

* `cd /var/www/html`
* `git clone --recursive https://github.com/Backfeed/d-magazine.git wp-content/plugins/`
* `cd wp-content/plugins/d-magazine`
* `bower install`
* `npm install`
* `gulp`

## Usage Details
Run `gulp watch` in the background when editing *.scss and *.js files to automatically compile them.
Check the browser console to verify the plugin doesn't generate any errors.


## Overview
D-Magazine is a proof-of-concept of the Backfeed decentralized reputation system and economic model.
This MVP is planned to only work internally within the Backfeed Magazine, but plans are to make it into a reusable plugin in the future.
Chances are it might work when you install it on your WordPress website, but we wouldn't count on it yet.

## Installation Instructions
These instructions were tested on a clean Ubuntu 16.04LTS machine set up on DigitalOcean.
All commands assumed to be executed by root.

If you already have a WordPress instance ready, and you just want to install the plugin and try it out, you can skip to the [Install D-Magazine](#install-d-magazine) section below.

### Prerequisites

* `apt-get update`
* `curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -`
* `apt-get install software-properties-common git nodejs`
* `npm install -g npm`
* `npm install -g bower gulp-cli`

### Install Nginx + PHP7
* `apt-get install nginx php7.0-fpm`
* `service nginx start`

Now, point your web browser your server ( e.g. http://127.0.0.1/ ), and you should see the infamous "Welcome to nginx!" message.

#### Configure Nginx
`touch /etc/nginx/sites-available/bfmagazine`.
Inside that file, write:

```
server {
  listen 80;
  listen [::]:80;

  server_name _; # replace the underscore with a domain name, or leave it as a catch-all

  root /var/www/bfmagazine;
  index index.php;

  location / {
    try_files $uri $uri/ /index.php?q=$uri&$args;
  }

  location ~ \.php$ {
   include snippets/fastcgi-php.conf;
   fastcgi_pass unix:/run/php/php7.0-fpm.sock;
  }

  location ~ /\.ht {
   deny all;
  }
}
```

Then, apply the new server configuration and reload nginx:
* `cd /etc/nginx/sites-enabled/`
* `rm default`
* `ln -s ../sites-available/bfmagazine`
* `service nginx reload`

### Verify PHP7 and nginx like each other

* `cd /var/www`
* `mkdir bfmagazine && cd bfmagazine`
* `echo '<?=phpinfo()?>' > bfmagazine/info.php`

Now, browse to that file on your server ( e.g. http://127.0.0.1/info.php ), and you should see the infamous [phpinfo](https://assets.digitalocean.com/articles/lemp_ubuntu_1604/php_info.png).

After this, we don't need this file anymore: `rm info.php`.

### Install MariaDB (MySQL-compatible open-licensed alternative)
(installation instructions taken from: https://downloads.mariadb.org/mariadb/repositories/)
* `apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8`
* `add-apt-repository 'deb [arch=amd64,i386] http://mariadb.nethub.com.hk/repo/10.1/ubuntu xenial main'`
* `apt-get update`
* `apt-get install mariadb-server`
* `mysql_secure_installation` and press Y on every question asked
* `service mysql start`

#### Configure MariaDB

* `mysql -u root -p`
* MariaDB> `CREATE DATABASE bfmagazine;`
* MariaDB> `GRANT ALL PRIVILEGES ON bfmagazine.* TO "username"@"localhost" IDENTIFIED BY "password";`
* MariaDB> `FLUSH PRIVILEGES;`
* MariaDB> `EXIT`

### Install WP-CLI

* `curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar`
* `chmod +x wp-cli.phar`
* `mv wp-cli.phar /usr/local/bin/wp`

### Install WordPress
* `cd /var/www/bfmagazine`
* `sudo -u www-data wp core download`

Now, point your web browser to your server ( e.g. http://127.0.0.1/ ), and complete the installation wizard.

### Install D-magazine

* `cd /var/www/bfmagazine`
* `git clone --recursive https://github.com/Backfeed/d-magazine.git wp-content/plugins/`
* `cd wp-content/plugins/d-magazine`
* `bower install`
* `npm install`
* `gulp`

## Usage Details
Run `gulp watch` in the background when editing *.scss and *.js files to automatically compile them.

Check the browser console to verify the plugin doesn't generate any errors.


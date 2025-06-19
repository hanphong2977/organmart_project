FROM php:8.1-apache

# Cài extension cần thiết
RUN apt-get update && apt-get install -y \
    zip unzip git curl libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Cài Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

# Fix lỗi "dubious ownership"
RUN git config --global --add safe.directory /var/www/html

COPY . .

# Cài đặt package PHP
RUN composer install

# Tạo file .env và generate key
RUN cp .env.example .env || true
RUN php artisan key:generate

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000

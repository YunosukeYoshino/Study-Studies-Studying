<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="https://unpkg.com/@splidejs/splide@3.0.9/dist/css/splide.min.css"> -->
    <?php wp_head() ?>
</head>

<body <?php body_class('flex flex-col h-screen') ?>>
    <?php wp_body_open(); ?>
    <header class="l-header">
        <div class="l-header__inner">
            <div class="p-header-logo">
                <a href="<?php echo home_url() ?>" class="p-header-logo__link">
                    <img src="logo.png" alt="サイト名のロゴ">
                </a>
            </div>
            <nav class="p-header-nav" aria-label="メインメニュー">
                <ul class="p-header-nav__list">
                    <li class="p-header-nav__item">
                        <a href="/" class="p-header-nav__link"><?php echo wp_nav_menu() ?></a>
                    </li>
                    <li class="p-header-nav__item">
                        <a href="/about" class="p-header-nav__link">会社概要</a>
                    </li>
                    <li class="p-header-nav__item">
                        <a href="/services" class="p-header-nav__link">サービス</a>
                    </li>
                    <li class="p-header-nav__item">
                        <a href="/contact" class="p-header-nav__link">お問い合わせ</a>
                    </li>
                </ul>
            </nav>
            <div class="p-header-search">
                <form class="p-header-search__form" action="/" method="get">
                    <input id="search-input" class="p-header-search__input" type="text" name="s" placeholder="キーワードを入力">
                    <button type="submit" class="p-header-search__button">検索</button>
                </form>
            </div>
        </div>
    </header>
    <main class="flex-grow px-4 py-4">
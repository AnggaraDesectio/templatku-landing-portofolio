<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "landing-portofolio".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'landing-portofolio'),

    'flavors' => array (
  'landing-portofolio' => 
  array (
    'label' => 'RIZKY.DEV — Portofolio Freelancer',
    'brand_name' => 'RIZKY.DEV',
    'brand_tagline' => 'Ubah ide bisnismu jadi website yang bekerja',
    'brand_initials' => 'RD',
    'accent' => '#9d174d',
    'category' => 'kreatif',
    'home' => 'landings.portofolio',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Menu',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Landing',
              'to' => '/landings/portofolio',
              'icon' => 'Home',
            ),
            1 => 
            array (
              'label' => 'Dashboard',
              'to' => '/dashboard',
              'icon' => 'LayoutDashboard',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
          ),
        ),
      ),
    ),
  ),
),
];

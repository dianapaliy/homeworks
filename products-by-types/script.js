'use strict';

$.ajax({
    'url': '/products-by-types/products.json',
    dataType: 'json',
    beforeSend: function () {
        $.fancybox.showLoading();
    }
}).done(function (products) {
    var $blockSale = $('#sale'),
        $blockPromo = $('#promo'),
        $blockRecommend = $('#recommended'),
        $block = $('.block'),
        $tmpl = $("#listTemplate");



    var saleProducts = products.filter(function(item) {
        return item.type == 'sale';
    });

    var promoProducts = products.filter(function(item) {
        return item.type == 'promo';
    });

    var recommendProducts = products.filter(function(item) {
        return item.type == 'recommended';
    });

    $blockSale.html(_.template($tmpl.html())({products: saleProducts}));
    $blockPromo.html(_.template($tmpl.html())({products: promoProducts}));
    $blockRecommend.html(_.template($tmpl.html())({products: recommendProducts}));

}).fail(function (error) {
    console.log(error);
}).always(function () {
    $.fancybox.hideLoading();
});
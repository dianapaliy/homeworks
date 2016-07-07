'use strict';

$.ajax({
    url: '/products-by-types/products.json',
    dataType: 'json',
    beforeSend: function () {
        $.fancybox.showLoading();
    }
}).done(function (products) {
    var $blockSale = $('#sale'),
        $blockPromo = $('#promo'),
        $blockRecommend = $('#recommended'),
        tmpl = _.template($("#listTemplate").html()),
        saleProducts = products.filter(function(item) {
            return item.type == 'sale';
        }),
        promoProducts = products.filter(function(item) {
            return item.type == 'promo';
        }),
        recommendProducts = products.filter(function(item) {
            return item.type == 'recommended';
        });

    $blockSale.html(tmpl({products: saleProducts}));
    $blockPromo.html(tmpl({products: promoProducts}));
    $blockRecommend.html(tmpl({products: recommendProducts}));

}).fail(function (error) {
    console.log(error);
}).always(function () {
    $.fancybox.hideLoading();
});
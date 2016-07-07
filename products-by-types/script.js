'use strict';

$.ajax({
    url: '/products-by-types/products.json',
    dataType: 'json',
    beforeSend: function () {
        $.fancybox.showLoading();
    }
}).done(function (products) {
    var $blockSale      = $('#sale'),
        $blockPromo     = $('#promo'),
        $blockRecommend = $('#recommended'),
        tmpl            = _.template($("#listTemplate").html());

    var saleProducts = products.filter(function(item) {
        return item.type == 'sale';
    });

    var promoProducts = products.filter(function(item) {
        return item.type == 'promo';
    });

    var recommendProducts = products.filter(function(item) {
        return item.type == 'recommended';
    });

    $blockSale.html(tmpl({products: saleProducts, type: 'Распродажа'}));
    $blockPromo.html(tmpl({products: promoProducts, type: 'Промо-акция'}));
    $blockRecommend.html(tmpl({products: recommendProducts, type: 'Рекомендуемые товары'}));

}).fail(function (error) {
    console.log(error);
}).always(function () {
    $.fancybox.hideLoading();
});
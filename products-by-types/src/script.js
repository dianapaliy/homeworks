'use strict';

$(function() {

    var types = {
            'promo' : 'Промо-акция',
            'sale' : 'Распродажа',
            'recommended' : 'Рекомендуемые товары'
        };

    function createFilteredArr(products) {
        var tmpl            = _.template($("#listTemplate").html());

        for (var key in types) {
            if (types.hasOwnProperty(key)) {
                var newProducts = products.filter(function(item) {
                    return item.type === key;
                });
                $('#'+key).html(tmpl({products: newProducts, type: types[key]}));
            }
        }
    }

    $.ajax({
        url: '/products-by-types/products.json',
        dataType: 'json',
        beforeSend: function () {
            $.fancybox.showLoading();
        }
    }).done(function (products) {
        createFilteredArr(products);

    }).fail(function (error) {
        console.log(error);
    }).always(function () {
        $.fancybox.hideLoading();
    });
});
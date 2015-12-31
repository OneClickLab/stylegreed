(function($) {
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    $(document).ready(function() {
        var id = getParameterByName('id');
        var $template = $('.large-product-item').html();

        function setTemplate(product, callback) {
            var template = $template;
            var price = product.salePriceLabel;

            if (product.salePriceLabel) {
                price = '<s><small>'+ product.priceLabel +'</small></s> '+ product.salePriceLabel;
            }

            template = template.replace(new RegExp('{{image}}', 'gi'), product.image.sizes.XLarge.url)
                               .replace(new RegExp('{{url}}', 'gi'), product.clickUrl)
                               .replace(new RegExp('{{productName}}', 'gi'), product.unbrandedName)
                               .replace(new RegExp('{{price}}', 'gi'), price)
                               .replace(new RegExp('{{brandName}}', 'gi'), (product.brand) ? product.brand.name : '')

            callback(template);
        }

        $.get('http://api.stylegreed.com/store/products?prodid=' + id, function(data) {
            var product = data.products[0];

            setTemplate(product, function(template) {
                $('.large-product-item').html(template);
            });
        });
    });
}(jQuery));

(function($) {
    $(document).ready(function() {
        var $template = $('#product-template').html();

        function setTemplate(product, callback) {
            var template = $template;

            template = template.replace(new RegExp('{{image}}', 'gi'), product.image.sizes.Large.url)
                               .replace(new RegExp('{{url}}', 'gi'), product.clickUrl)
                               .replace(new RegExp('{{productName}}', 'gi'), product.unbrandedName)
                               .replace(new RegExp('{{brandName}}', 'gi'), (product.brand) ? product.brand.name : '')

            callback(template);
        }

        $.get('http://api.stylegreed.com/store/products?limit=4&offset=0', function(data) {
            var products = data.products;

            $('.product-item').each(function(i, product) {
                setTemplate(products[i], function(template) {
                    $(product).append(template);
                });
            });
        });
    });
}(jQuery));

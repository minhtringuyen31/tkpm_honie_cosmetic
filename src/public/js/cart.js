function removeProduct(productId) {
    $.ajax({
        url: '/cart/cart-detail/remove-from-cart',
        method: 'post',
        data: { productId },
        dataType: 'json',
        success: function (data) {
            $.get(location.href, function (data) {
                $("#cart-item").empty().append($(data).find("#cart-item").children());
            });

            $.get(location.href, function (data) {
                $("#pre-checkout").empty().append($(data).find("#pre-checkout").children());
            });
        },
        error: function (data) {
            alert("Can not remove...");
        }
    });


}

function incrQuantity(productId) {
    $.ajax({
        url: '/cart/cart-detail/increase-quantity',
        method: 'post',
        data: { productId },
        dataType: 'json',
        success: function (data) {
            // alert("Edit successfully!!");
            $.get(location.href, function (data) {
                $("#cart-item").empty().append($(data).find("#cart-item").children());
            });

            $.get(location.href, function (data) {
                $("#pre-checkout").empty().append($(data).find("#pre-checkout").children());
            });
        },
        error: function (data) {
            alert("Edit failed...");
        }
    });

}

function descQuantity(productId) {
    $.ajax({
        url: '/cart/cart-detail/decrease-quantity',
        method: 'post',
        data: { productId },
        dataType: 'json',
        success: function (data) {
            // alert("Edit successfully!!");
            $.get(location.href, function (data) {
                $("#cart-item").empty().append($(data).find("#cart-item").children());
            });

            $.get(location.href, function (data) {
                $("#pre-checkout").empty().append($(data).find("#pre-checkout").children());
            });
        },
        error: function (data) {
            alert("Edit failed...");
        }
    });

}
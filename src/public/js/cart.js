function removeProduct(productId) {
    $.ajax({
        url: '/cart/remove-from-cart',
        method: 'post',
        data: { productId },
        dataType: 'text',
        error: function (data) {
            alert("Can not remove...");
        }
    });
    $.get(location.href, function (data) {
        $("#cart-item").empty().append($(data).find("#cart-item").children());
    });

    $.get(location.href, function (data) {
        $("#pre-checkout").empty().append($(data).find("#pre-checkout").children());
    });

}

function incrQuantity(productId) {
    $.ajax({
        url: '/cart/increase-quantity',
        method: 'post',
        data: { productId },
        dataType: 'json',
        success: function (data) {
            alert("Edit successfully!!");
        },
        error: function (data) {
            alert("Edit failed...");
        }
    });
    $.get(location.href, function (data) {
        $("#cart-item").empty().append($(data).find("#cart-item").children());
    });

    $.get(location.href, function (data) {
        $("#pre-checkout").empty().append($(data).find("#pre-checkout").children());
    });
}

function descQuantity(productId) {
    var quantityInput = $("button[value='" + idservice + "']").closest('.pro-qty').find('input');
    var quantity = parseInt(quantityInput.val());
    console.log("quantity: " + quantity);
    if (quantity>1){
        $.ajax({
            url: '/cart/decrease-quantity',
            method: 'post',
            data: { productId },
            dataType: 'json',
            success: function (data) {
                alert("Edit successfully!!");
            },
            error: function (data) {
                alert("Edit failed...");
            }
        });
        $.get(location.href, function (data) {
            $("#cart-item").empty().append($(data).find("#cart-item").children());
        });

        $.get(location.href, function (data) {
            $("#pre-checkout").empty().append($(data).find("#pre-checkout").children());
        });
    }
    else{
        removeSer(productId);
    }
}
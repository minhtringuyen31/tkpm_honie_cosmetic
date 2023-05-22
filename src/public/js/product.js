Handlebars.registerHelper('renderStars', (rating) => {
    let result = '';
    for (let i = 1; i <= 5; i++) {
      let checked = rating >= i ? ' checked' : '';
      result += `<span class='fa fa-star${checked}'></span>`;
    }
    return new Handlebars.SafeString(result);
  });

  Handlebars.registerHelper('getRatingStars', function (rating) {
    var stars = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '&#9733;'; // Full star
        } else {
            stars += '&#9734;'; // Empty star
        }
    }
    return new Handlebars.SafeString(stars);
});
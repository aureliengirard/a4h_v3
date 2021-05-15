var ungoal_select = document.getElementById("ungoal-select");
var buy_button = document.getElementById("buy-button");
var alert = document.getElementById("buy-button__alert");

const thumbnails = document.getElementsByClassName('preview-thumbnail');
const previewImg = document.getElementById('product-image');

for (var i = 0, len = thumbnails.length; i < len; i++) {
    const currentThumb = thumbnails[i];
    currentThumb.addEventListener('click', (e) => {
        e.preventDefault();
        previewImg.src = currentThumb.href;
    });
}

$(document).ready(function() {
    if ($('.product__images-thumbnail a').length>1) {
        $('#product-image').click(function() {
            $('.gallery-img:first').click()[0];
        });
        $('.gallery-img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    } else {
        $('#product-image').magnificPopup({
            type:'image'
        });
    }
});

function ungoalSelection() {

    var selected_un_goal = ungoal_select.value;
    var product_title = document.getElementById("product-title").value;

    if( $('#ungoal-select').val() === "" ) {
        buy_button.classList.add('disabled');
        ungoal_select.classList.remove('selected');
    } else {
        ungoal_select.classList.add('selected');
        buy_button.classList.remove('disabled');

        if ($('#buy-button__alert').hasClass( "is_active" )) {
            alert.classList.remove('is_active');
        }

        window.sessionStorage.setItem(product_title, selected_un_goal);
    }

};

$("#buy-button").on("click", function(e) {
    if ($( this ).hasClass( "disabled" )){
        e.preventDefault();
        alert.classList.add('is_active');
    }
});

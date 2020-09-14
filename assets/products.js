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

    var selected_un_goal = document.getElementById("ungoal-select").value;
    var product_title = document.getElementById("product-title").value;


    $("#buy-button").prop('disabled', false);

    window.sessionStorage.setItem(product_title, selected_un_goal);
};

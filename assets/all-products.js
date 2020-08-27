// Save existing sort parameters
Shopify.queryParams = {};
if(location.search.length) {
  for(var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
    aKeyValue = aCouples[i].split('=');
    if (aKeyValue.length > 1) {
      Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
    }
  }
}

// Filter menu expand
$(".filter-by__title").on("click", function(e) {
  e.preventDefault();
  $(this).siblings(".filter-by__filters").toggleClass("active");
  $(this).toggleClass("active");
});


// Collection filters
function Filters() {
    var t_filter = '';
    var p_filter = '';
    var v_filter = '';
    var un_filter = '';
    var g_filter = '';
    var gallery_filter = document.getElementById('filter-by-gallery');
    var ungoals_filter = document.getElementById('filter-by-ungoal');
    var artist_filter_btn = document.getElementById('filter-by-artist-btn');
    var artist_filter_field = document.getElementById('filter-by-artist-field');

    jQuery('.t-filter').click(function() {
        jQuery('.t-filter').removeClass('active');
        jQuery(this).addClass('active');
        t_filter = jQuery(this).attr('alt');
        upFilter();
    });

    jQuery('.p-filter').click(function() {
        jQuery('.p-filter').removeClass('active');
        jQuery(this).addClass('active');
        p_filter = jQuery(this).attr('alt');
        upFilter();
    });

    document.getElementById("filter-by-artist-field").addEventListener('awesomplete-selectcomplete',function() {artistFilter()});

    document.getElementById("filter-by-artist-field").onkeyup = function() {artistFilter()};

    function artistFilter() {
        v_filter = document.getElementById('filter-by-artist-field').value;
        v_filter = v_filter.toLowerCase();
        v_filter = v_filter.replace(/ /g, '-');
        v_filter = v_filter.replace(new RegExp(/[àáâãäå]/g),"a");
        v_filter = v_filter.replace(new RegExp(/æ/g),"ae");
        v_filter = v_filter.replace(new RegExp(/ç/g),"c");
        v_filter = v_filter.replace(new RegExp(/[èéêë]/g),"e");
        v_filter = v_filter.replace(new RegExp(/[ìíîï]/g),"i");
        v_filter = v_filter.replace(new RegExp(/ñ/g),"n");
        v_filter = v_filter.replace(new RegExp(/[òóôõö]/g),"o");
        v_filter = v_filter.replace(new RegExp(/œ/g),"oe");
        v_filter = v_filter.replace(new RegExp(/[ùúûü]/g),"u");
        v_filter = v_filter.replace(new RegExp(/[ýÿ]/g),"y");

        upFilter();
    };

    ungoals_filter.onchange = function(){
        un_filter = this.value;
        upFilter();
    };

    gallery_filter.onchange = function(){
        g_filter = this.value;
        upFilter();
    };

    function upFilter() {
        jQuery('.product-item').hide();
        jQuery('.product-item').addClass( "hidden" ).removeClass( "active" );
        var min=0; var max=1000000000;
        if (p_filter=='Under 500 $') {
            min = 0;
            max = 500;
        } else if (p_filter=='$50k+') {
            min = 50000;
            max = 1000000000;
        } else if (p_filter=='All') {
            min = 0;
            max = 1000000000;
        } else {
            var temp = p_filter.replace(/\s/g, '').replace(/\$/g, '').split('-');
            min = parseInt(temp[0]) * 1000;
            max = parseInt(temp[1]) * 1000;
        }

        jQuery('.product-item').each(function(){
            //console.log(min);
            //console.log(max);
            var p_val = parseInt($(this).attr('price'))/100;
            var t_val = $(this).attr('type');
            var v_val = $(this).attr('vendor');
            var g_val = $(this).attr('gallery');
            var un_val = $(this).attr('un-goals');
            //var c_val = $(this).attr('ngos');
            //if ( (t_filter==t_val || t_filter=='') && (c_val.includes(c_filter) == true || c_filter=='') && (p_filter=='' || (p_val<=max && p_val>=min)) ) {
            if (
                (t_filter==t_val || t_filter=='')
                && (g_val.includes(g_filter) == true || g_filter=='')
                && (un_val.includes(un_filter) == true || un_filter=='')
                && (v_val.includes(v_filter) == true || v_filter=='')
                && (p_filter=='' || (p_val<=max && p_val>=min)) )
            {
                jQuery(this).show();
                jQuery(this).addClass( "active" );
            }
        });

        var card_displayed = $(".product-item.active");
        //console.log(card_displayed.length);
        var card_displayed_length = card_displayed.length;
        if (card_displayed_length < 1) {
            //alert("There is no products avalaible in your filter combinaison (" + card_displayed.length + ")");
        }
    }
}

$(document).ready(Filters);

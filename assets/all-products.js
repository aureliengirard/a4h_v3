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

if (window.innerWidth >= 1024){

    // Filter menu expand
    $(".filter-by__title").on("click", function(e) {
        e.preventDefault();
        $(this).siblings(".filter-by__filters").toggleClass("active");
        $(this).toggleClass("active");
    });
}


// Collection filters
function Filters() {
    var t_filter = '';
    var p_filter = '';
    var v_filter = '';
    var un_filter = '';
    var g_filter = '';

    var gallery_select = document.getElementById('filter-by-gallery');
    var ungoals_select = document.getElementById('filter-by-ungoal');
    var artist_filter_btn = document.getElementById('filter-by-artist-btn');
    var artist_filter_field = document.getElementById('filter-by-artist-field');

    var value_medium = sessionStorage.getItem("value_medium");
    var value_ungoal = sessionStorage.getItem("value_ungoal");
    var value_price = sessionStorage.getItem("value_price");
    var value_gallery = sessionStorage.getItem("value_gallery");

    var card_displayed = $(".product-item.active");
    var card_displayed_length = card_displayed.length;

    jQuery('.no_results-item').hide();

    if (value_gallery !== null) {
        gallery_select.value = value_gallery;
        title_filter = title_input.value;
        upFilter();
    }

    if (value_ungoal !== null) {
        ungoals_select.value = value_ungoal;
        un_filter = ungoals_select.value;
        upFilter();
    }

    if (value_price !== null) {
        var price_section = jQuery('.filter-by__title--price');
        var price_selector = jQuery('.p-filter');

        //open menu element
        price_section.siblings(".filter-by__filters").toggleClass("active");
        price_section.toggleClass("active");

        //Remove Selectected filter
        jQuery('.p-filter').removeClass('active');

        price_selector.each(function() {
            if ( jQuery(this).attr('price') == value_price ) {
                jQuery(this).addClass('active');
            }
        });

        p_filter = value_price;
        upFilter();
    }

    if (value_medium !== null) {
        var medium_section = jQuery('.filter-by__title--medium');
        var medium_selector = jQuery('.t-filter');

        //open menu element
        medium_section.siblings(".filter-by__filters").toggleClass("active");
        medium_section.toggleClass("active");

        //Remove Selectected filter
        jQuery('.t-filter').removeClass('active');

        medium_selector.each(function() {
            var test_value = jQuery(this).attr('medium');
            //console.log('Value t-filter ' + test_value);
            if ( jQuery(this).attr('medium') == value_medium ) {
                jQuery(this).addClass('active');
            }
        });

        t_filter = value_medium;
        //console.log('-' + t_filter + '-');
        upFilter();
    }

    jQuery('.t-filter').click(function() {
        jQuery('.t-filter').removeClass('active');
        jQuery(this).addClass('active');
        t_filter = jQuery(this).attr('medium');
        upFilter();
    });

    jQuery('.p-filter').click(function() {
        jQuery('.p-filter').removeClass('active');
        jQuery(this).addClass('active');
        p_filter = jQuery(this).attr('price');
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

    ungoals_select.onchange = function(){
        un_filter = this.value;
        upFilter();
    };

    gallery_select.onchange = function(){
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
            max = 10000000000000;
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
                && (un_val.includes(un_filter) == true || un_val.includes('all-un-goals') == true || un_filter=='')
                && (v_val.includes(v_filter) == true || v_filter=='')
                && (p_filter=='' || (p_val<=max && p_val>=min)) )
            {
                jQuery(this).show();
                jQuery(this).addClass( "active" );
            }
        });

        var card_displayed = $(".product-item.active");
        var card_displayed_length = card_displayed.length;

        if (card_displayed_length < 1) {
            //alert("There is no products avalaible in your filter combinaison (" + card_displayed.length + ")");

            jQuery('.no_results-item').show();
        } else {
            jQuery('.no_results-item').hide();
        }
    }
}
$(document).ready(Filters);

window.addEventListener('beforeunload', function (e) {
    window.sessionStorage.removeItem('value_medium');
    window.sessionStorage.removeItem('value_ungoal');
    window.sessionStorage.removeItem('value_price');
    window.sessionStorage.removeItem('value_gallery');
});

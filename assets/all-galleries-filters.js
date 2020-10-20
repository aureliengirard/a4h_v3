// Collection filters
function Filters() {
    jQuery('.no_results-item').hide();

    var region_filter = '';
    var country_filter = '';
    var city_filter = '';
    var title_filter = '';

    var region_select = document.getElementById('filter-by-region');
    var country_select = document.getElementById('filter-by-country');
    var city_select = document.getElementById('filter-by-city');
    var title_input = document.getElementById('filter-by-title');
    var search_button = document.getElementById('collection-hero-filters-btn');

    var value_region = sessionStorage.getItem("value_region");
    var value_country = sessionStorage.getItem("value_country");
    var value_city = sessionStorage.getItem("value_city");
    var value_title = sessionStorage.getItem("value_title");

    if (value_region !== null) {
        region_select.value = value_region;
        region_filter = region_select.value;
        upFilter();
    }

    if (value_country !== null) {
        country_select.value = value_country;
        country_filter = country_select.value;
        upFilter();
    }

    if (value_city !== null) {
        city_select.value = value_city;
        city_filter = city_select.value;
        upFilter();
    }

    if (value_title !== null) {
        title_input.value = value_title;
        title_filter = title_input.value;
        upFilter();
    }

    console.log('city :' + value_city + ', country:' + value_country + ', region:' + value_region + ', title:' + value_title);

    title_input.addEventListener('awesomplete-selectcomplete',function() {titleFilter()});
    title_input.onkeyup = function() {titleFilter()};

    function titleFilter() {
        title_filter = title_input.value;
        title_filter = title_filter.toLowerCase();
        title_filter = title_filter.replace(/ /g, '-');
        title_filter = title_filter.replace(new RegExp(/[àáâãäå]/g),"a");
        title_filter = title_filter.replace(new RegExp(/æ/g),"ae");
        title_filter = title_filter.replace(new RegExp(/ç/g),"c");
        title_filter = title_filter.replace(new RegExp(/[èéêë]/g),"e");
        title_filter = title_filter.replace(new RegExp(/[ìíîï]/g),"i");
        title_filter = title_filter.replace(new RegExp(/ñ/g),"n");
        title_filter = title_filter.replace(new RegExp(/[òóôõö]/g),"o");
        title_filter = title_filter.replace(new RegExp(/œ/g),"oe");
        title_filter = title_filter.replace(new RegExp(/[ùúûü]/g),"u");
        title_filter = title_filter.replace(new RegExp(/[ýÿ]/g),"y");
        window.sessionStorage.setItem('value_title', title_filter);
        upFilter();
    };

    region_select.onchange = function(){
        region_filter = this.value;
        window.sessionStorage.setItem('value_region', region_filter);
        upFilter();
    };

    country_select.onchange = function(){
        country_filter = this.value;
        window.sessionStorage.setItem('value_country', country_filter);
        upFilter();
    };

    city_select.onchange = function(){
        city_filter = this.value;
        window.sessionStorage.setItem('value_city', city_filter);
        upFilter();
    };

    function upFilter() {
        jQuery('.gallery-item').hide();
        jQuery('.gallery-item').addClass( "hidden" ).removeClass( "active" );


        jQuery('.gallery-item').each(function(){
            //console.log(min);
            //console.log(max);
            var region_val = $(this).attr('region');
            var country_val = $(this).attr('country');
            var city_val = $(this).attr('city');
            var title_val = $(this).attr('name');

            //var c_val = $(this).attr('ngos');
            //if ( (t_filter==t_val || t_filter=='') && (c_val.includes(c_filter) == true || c_filter=='') && (p_filter=='' || (p_val<=max && p_val>=min)) ) {
            if (
                (country_val.includes(country_filter) == true || country_filter=='')
                && (city_val.includes(city_filter) == true || city_filter=='')
                && (region_val.includes(region_filter) == true || region_filter=='')
                && (title_val.includes(title_filter) == true || title_filter=='')) {
                jQuery(this).show();
                jQuery(this).addClass( "active" );
            }
        });

        var card_displayed = $(".gallery-item.active");
        //console.log(card_displayed.length);
        var card_displayed_length = card_displayed.length;
        
        if (card_displayed_length < 1) {
            jQuery('.no_results-item').show();
        } else {
            jQuery('.no_results-item').hide();
        }
    }
}
$(document).ready(Filters);

window.addEventListener('beforeunload', function (e) {
    window.sessionStorage.removeItem('value_region');
    window.sessionStorage.removeItem('value_country');
    window.sessionStorage.removeItem('value_city');
    window.sessionStorage.removeItem('value_title');
});

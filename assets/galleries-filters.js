// Collection filters
function Filters() {
    window.sessionStorage.removeItem('value_region');
    window.sessionStorage.removeItem('value_country');
    window.sessionStorage.removeItem('value_city');
    window.sessionStorage.removeItem('value_title');

    var region_filter = '';
    var country_filter = '';
    var city_filter = '';
    var title_filter = '';

    var region_select = document.getElementById('filter-by-region');
    var country_select = document.getElementById('filter-by-country');
    var city_select = document.getElementById('filter-by-city');
    var title_input = document.getElementById('filter-by-title');

    var value_region = sessionStorage.getItem("value_region");
    var value_country = sessionStorage.getItem("value_country");
    var value_city = sessionStorage.getItem("value_city");
    var value_title = sessionStorage.getItem("value_title");

    if (value_region !== null) {
        region_select.value = value_region;
        region_filter = region_select.value;
    }

    if (value_country !== null) {
        country_select.value = value_country;
        country_filter = country_select.value;
    }

    if (value_city !== null) {
        city_select.value = value_city;
        city_filter = city_select.value;
    }

    if (value_title !== null) {
        title_input.value = value_title;
        title_filter = title_input.value;
    }

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
    };

    region_select.onchange = function(){
        region_filter = this.value;
        window.sessionStorage.setItem('value_region', region_filter);
    };

    country_select.onchange = function(){
        country_filter = this.value;
        window.sessionStorage.setItem('value_country', country_filter);
    };

    city_select.onchange = function(){
        city_filter = this.value;
        window.sessionStorage.setItem('value_city', city_filter);
    };

}
$(document).ready(Filters);

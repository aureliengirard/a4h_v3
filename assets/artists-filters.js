// Collection filters
function Filters() {
    window.sessionStorage.removeItem('value_nationality');
    window.sessionStorage.removeItem('value_medium');
    window.sessionStorage.removeItem('value_ungoal');
    window.sessionStorage.removeItem('value_name');

    var nationality_filter = '';
    var medium_filter = '';
    var ungoal_filter = '';
    var name_filter = '';

    var nationality_select = document.getElementById('filter-by-nationality');
    var medium_select = document.getElementById('filter-by-medium');
    var ungoal_select = document.getElementById('filter-by-ungoal');
    var name_input = document.getElementById('filter-by-name');
    var search_button = document.getElementById('collection-hero-filters-btn');

    var value_nationality = sessionStorage.getItem("value_nationality");
    var value_medium = sessionStorage.getItem("value_medium");
    var value_ungoal = sessionStorage.getItem("value_ungoal");
    var value_name = sessionStorage.getItem("value_name");

    name_input.addEventListener('awesomplete-selectcomplete',function() {nameFilter()});
    name_input.onkeyup = function() {nameFilter()};

    function nameFilter() {
        name_filter = name_input.value;
        name_filter = name_filter.toLowerCase();
        name_filter = name_filter.replace(/ /g, '-');
        name_filter = name_filter.replace(new RegExp(/[àáâãäå]/g),"a");
        name_filter = name_filter.replace(new RegExp(/æ/g),"ae");
        name_filter = name_filter.replace(new RegExp(/ç/g),"c");
        name_filter = name_filter.replace(new RegExp(/[èéêë]/g),"e");
        name_filter = name_filter.replace(new RegExp(/[ìíîï]/g),"i");
        name_filter = name_filter.replace(new RegExp(/ñ/g),"n");
        name_filter = name_filter.replace(new RegExp(/[òóôõö]/g),"o");
        name_filter = name_filter.replace(new RegExp(/œ/g),"oe");
        name_filter = name_filter.replace(new RegExp(/[ùúûü]/g),"u");
        name_filter = name_filter.replace(new RegExp(/[ýÿ]/g),"y");
        window.sessionStorage.setItem('value_name', name_filter);
    };

    nationality_select.onchange = function(){
        nationality_filter = this.value;
        window.sessionStorage.setItem('value_nationality', nationality_filter);
    };

    medium_select.onchange = function(){
        medium_filter = this.value;
        window.sessionStorage.setItem('value_medium', medium_filter);
    };

    ungoal_select.onchange = function(){
        ungoal_filter = this.value;
        window.sessionStorage.setItem('value_ungoal', ungoal_filter);
    };
}
$(document).ready(Filters);

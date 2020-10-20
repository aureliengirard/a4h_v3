// Collection filters
function Filters() {
    jQuery('.no_results-item').hide();
    
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

    if (value_nationality !== null) {
        nationality_select.value = value_nationality;
        nationality_filter = nationality_select.value;
        upFilter();
    }

    if (value_medium !== null) {
        medium_select.value = value_medium;
        medium_filter = medium_select.value;
        upFilter();
    }

    if (value_ungoal !== null) {
        ungoal_select.value = value_ungoal;
        ungoal_filter = ungoal_select.value;
        upFilter();
    }

    if (value_name !== null) {
        name_input.value = value_name;
        name_filter = name_input.value;
        upFilter();
    }

    console.log('ungoal :' + value_ungoal + ', medium:' + value_medium + ', nationality:' + value_nationality + ', name:' + value_name);

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
        upFilter();
    };

    nationality_select.onchange = function(){
        nationality_filter = this.value;
        window.sessionStorage.setItem('value_nationality', nationality_filter);
        upFilter();
    };

    medium_select.onchange = function(){
        medium_filter = this.value;
        window.sessionStorage.setItem('value_medium', medium_filter);
        upFilter();
    };

    ungoal_select.onchange = function(){
        ungoal_filter = this.value;
        window.sessionStorage.setItem('value_ungoal', ungoal_filter);
        upFilter();
    };


    function upFilter() {

        jQuery('.artist-item').hide();
        jQuery('.artist-item').addClass( "hidden" ).removeClass( "active" );

        jQuery('.artist-item').each(function(){
            var nationality_val = $(this).attr('nationality');
            var medium_val = $(this).attr('medium');
            var ungoal_val = $(this).attr('ungoal');
            var name_val = $(this).attr('name');

            if (
                (medium_val.includes(medium_filter) == true || medium_filter=='')
                && (ungoal_val.includes(ungoal_filter) == true || ungoal_val.includes('all-un-goals') == true || ungoal_filter=='')
                && (nationality_val.includes(nationality_filter) == true || nationality_filter=='')
                && (name_val.includes(name_filter) == true || name_filter=='')) {
                jQuery(this).show();
                jQuery(this).addClass( "active" );
            }
        });

        var value_nationality = sessionStorage.getItem("value_nationality");
        var value_medium = sessionStorage.getItem("value_medium");
        var value_ungoal = sessionStorage.getItem("value_ungoal");
        var value_name = sessionStorage.getItem("value_name");
        console.log('ungoal :' + value_ungoal + ', medium:' + value_medium + ', nationality:' + value_nationality + ', name:' + value_name);

        var card_displayed = $(".artist-item.active");
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
    window.sessionStorage.removeItem('value_nationality');
    window.sessionStorage.removeItem('value_name');
});

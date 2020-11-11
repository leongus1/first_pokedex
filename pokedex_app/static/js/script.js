$(document).ready(function () {
  
  
    $.ajax(
        {
            url: "https://pokeapi.co/api/v2/pokemon?limit=500",
            method: "get",
            success: function (response) {
                var html_str = "";
                for (var i = 0; i < response.results.length; i++) {
                    let poke_url = response.results[i].url;
                    let name = response.results[i].name;
                    html_str += "<a href='###'><div class='poke' name1='"+name+"'><p class='pName'>" + name;
                    html_str += "<img class = 'pic' src='" + "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (i + 1) + ".png" + "' alt='" + name + "'></div></a>";
                }
                $("#theMons").html(html_str);
            },
            dataType: "json",
        },
        // "json"
    );
 
   
    $("#canvas").on("click", ".poke", function (e) {
        e.preventDefault();
        let name = $(this).attr('name1');
        getPokemon(name);
        // alert("You have clicked a button for "+name+"!");
    });

    function getPokemon(name) {
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/"+name ,
            method: 'get',
            success: function (response) {
                var html_str = "";
                html_str += "<h2>" + response.species['name'] + "</h2>";
                html_str += "<h3>#"+response.id+"</h3>"
                html_str += "<img src=" + response.sprites['front_default'] + " alt='" + name + "' >"
                html_str += "<h4>Types</h4><ul>"
                for (var i = 0; i < response.types.length; i++) {
                    pType=response.types[i]
                    html_str += "<li>"+pType.type['name']+"</li>"
                };
                html_str += "</ul><h4>Height</h4><ul>";
                html_str += "<li>"+response.height+"</li>"
                html_str += "</ul><h4>Weight</h4><ul>";
                html_str += "<li>" + response.weight + "</li></ul>";
                console.log(html_str);
                $("#currentMon").html(html_str);
            },
            
        });
    }

    function getVisible() {    
        var $el = $('.poke'),
            scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height(),
            elTop = $el.offset().top,
            elBottom = elTop + $el.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
        $('#sidebar').children().css('margin-top', visibleTop + 'px');
        
        // $('#notification').text(visibleBottom - visibleTop+'px');
    }

    $(window).on('scroll resize', getVisible);




});

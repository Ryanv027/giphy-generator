var topics = [`<button class="animals" value="gopro+surfing">Surfing</button>`, `<button class="animals" value="gopro+snowboarding">Snowboarding</button>`, `<button class="animals" value="gopro+skating">Skating</button>`]

$('document').ready(function() {
    $('.button-container').append(topics)
})

$('.form-container').on('click', '#submit', function() {
    event.preventDefault()
    var info = $('#input').val().trim()
    topics.push(`<button class="animals" value="${info}">${info}</button>`)
    $('#giphybuttons').empty()
    $("#giphybuttons").append(topics)
    $('#input').val("")
})

$('.button-container').on('click', '.animals', function() {
    $('#display').empty()
    $('.new-button').empty()
    var element = document.getElementById("display")
    element.scrollIntoView()
    var buttonInfo = $(this).attr('value')
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${buttonInfo}&api_key=2kPpZ7Z6yXW2vvB9kOd9ar4ml3JRXKUb&limit=12`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < 12; i++) {
            var giphy = response.data[i].images.original_still.url
            var giphy1 = response.data[i].images.original.url
            var rating = response.data[i].rating
            $('#display').append(`<li class="list" number="${i}"><img src="${giphy}" class="gif" data-still="${giphy}" data-animate="${giphy1}" data-state="still" style="height: 300px; width:300px;"><p class="rating">Rating: ${rating}</p></li>`)
        }
    })
    $('.new-button').append(`<button class='more-button' id='morez'value='${buttonInfo}'>More</button>`)
})

$('.new-button').on('click', '#morez', function() {
    var buttonInfo = $(this).attr('value')
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${buttonInfo}&api_key=2kPpZ7Z6yXW2vvB9kOd9ar4ml3JRXKUb&offset=13&limit=25`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 13; i < 25; i++) {
            var giphy = response.data[i].images.original_still.url
            var giphy1 = response.data[i].images.original.url
            var rating = response.data[i].rating
            console.log(giphy + rating)
            $('#display').append(`<li class="list" number="${i}"><img src="${giphy}" class="gif" data-still="${giphy}" data-animate="${giphy1}" data-state="still" style="height: 300px; width:300px;"><p class="rating">Rating: ${rating}</p></li>`)
        }
    })
    $('.new-button').empty()
})

$('.gif-container').on('click', '.list', function() {
    var element = document.getElementById("forms")
    element.scrollIntoView()
    $('.big-display').append(this)
    $(this).attr('id', 'top-button')
})

$('.gif-container').on('click', '.gif', function() {
    var x = window.matchMedia("(max-width: 400px)")
    var truth = x.matches
    if (truth === true) { // If media query matches
        $(this).attr('src', $(this).attr('data-animate'))
        $(this).attr('data-state', 'animate')
        $(this).attr('style', 'height: 300px; width: 300px;')
    } else {
        $(this).attr('src', $(this).attr('data-animate'))
        $(this).attr('data-state', 'animate')
        $(this).attr('style', 'height: 600px; width: 600px;')
    }
})

$('.big-display').on('click', '.list', function() {
    var spot = ($(this).attr('number'))
    if (spot == 0) {
        $(`.gif-container li:eq(${spot})`).before(this)
        $(this).attr('id', '')
    } else {
        $(`.gif-container li:eq(${spot - 1})`).after(this)
        $(this).attr('id', '')
    }
})

$('.big-display').on('click', '.gif', function() {
    $(this).attr('src', $(this).attr('data-still'))
    $(this).attr('data-state', 'still')
    $(this).attr('style', 'height: 300px; width: 300px;')
})
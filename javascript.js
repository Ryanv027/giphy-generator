var topics = [`<button class="animals" value="giraffe">Giraffe</button>`, `<button class="animals" value="Tiger">Tiger</button>`, `<button class="animals" value="alligator">Alligator</button>`, `<button class="animals" value="falcon">Falcon</button>`, `<button class="animals" value="Shark">Shark</button>`, `<button class="animals" value="starfish">Starfish</button>`, `<button class="animals" value="Frog">Frog</button>`, `<button class="animals" value="horse">Horse</button>`, `<button class="animals" value="dolphin">Dolphin</button>`]

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
    console.log('working')
    $('#display').empty()
    var buttonInfo = $(this).attr('value')

    var queryURL = `https:api.giphy.com/v1/gifs/search?q=${buttonInfo}&api_key=2kPpZ7Z6yXW2vvB9kOd9ar4ml3JRXKUb&limit=10`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        for (var i = 0; i < 10; i++) {
            var giphy = response.data[i].images.original_still.url
            var giphy1 = response.data[i].images.original.url
            var rating = response.data[i].rating
            console.log(giphy + rating)
            $('#display').append(`<li class="list"><img src="${giphy}" class="gif" data-still="${giphy}" data-animate="${giphy1}" data-state="still" style="height: 300px; width:300px;"><p class="rating">Rating: ${rating}</p></li>`)
        }
    })
})
$('.gif-container').on('click', '.gif', function() {
    var state = ($(this).attr('data-state'))
    if (state === 'still') {

        $(this).attr('src', $(this).attr('data-animate'))
        $(this).attr('data-state', 'animate')
    } else if (state === 'animate') {
        $(this).attr('src', $(this).attr('data-still'))
        $(this).attr('data-state', 'still')
    }
})

//Create an onclick event that stores the value from the
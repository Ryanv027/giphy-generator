var topics = []
    //Create an onclick event that stores the value from the 
$('#submit').on('click', function() {
    event.preventDefault()
    var info = $('#input').val().trim()

    topics.push(`<button class="animals" value="${info}">${info}</button>`)

    $('#giphybuttons').empty()
    $("#giphybuttons").append(topics)

    $('#input').val("")

    $('.animals').on('click', function() {
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
                var giphy = response.data[i].images.original.url
                var rating = response.data[i].rating
                console.log(giphy + rating)
                $('#display').append(`<img src="${giphy}" class="gif" data-state="still" style="height: 300px; width:300px;"><p class="rating">Rating: ${rating}</p>`)
            }
        })

    })
})
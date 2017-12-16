    var list = ["cats", "dogs", "birds", "chicken", "rabbit", "hamster", "goldfish"];

    function display() {
        for (var i = 0; i < list.length; i++) {


            buttonHtml = '<button type="button" ' + ' name=' + list[i] + ' id=' + list[i] + 'Button class="btn btn-primary animalsButton" autocomplete="off">' + list[i] + '</button>'

            $('#nameHolder').append(buttonHtml);

        }

    }

    $('#submit').on('click', function(event) {


        animalName = $('#newanimal').val().trim();
        var animalCheck = 0;
        /*Check if the element exits in the array */

        for (var i = 0; i < list.length; i++) {
            if (list[i] == animalName) {
                animalCheck = 1
                break;
            }
        }

        if (animalCheck == 1) {
            alert("Animal Already exists")
        } else {

            buttonHtml = '<button type=button name=' + animalName + ' id=' + animalName + 'Button class="btn btn-primary animalsButton">' + animalName + '</button>'
            list.push(animalName);
            $('#nameHolder').append(buttonHtml);
        }

        $('#newanimal').val("");

    })


    $(document).on('click', '.animalsButton', function() {

        $('#displayGiphs').empty();

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.name + "&api_key=saZ0HsZqgorOJZdo9wmjYzSZvxXuMQ4C&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            console.log(response);

            if(response.data.length==0)
            {
            	alert("No such GIFs in the GIPHY Database!!");
            }
            else
            {
            for (i = 0; i < response.data.length; i++) {

                console.log(response.data[i].images.downsized_still.url);
                gifArray = '<img class=stillimage still=' + response.data[i].images.downsized_still.url + ' src=' + response.data[i].images.downsized_still.url + ' gif =' + response.data[i].images.downsized_medium.url + '  play=false  > </img> '
                $('#displayGiphs').append(gifArray);
            }
        	}

        })

    })

    $(document).on('click', '.stillimage', function() {

      //Pick either the GIF or the still image based on the flag

        if (this.getAttribute("play") == "false") {
            this.setAttribute("src", this.getAttribute("gif"));
            this.setAttribute("play", "true");

        } else {
            this.setAttribute("src", this.getAttribute("still"));
            this.setAttribute("play", "false");

        }

    })


    display();
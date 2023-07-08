$(".search button").click(function (event) {
    performSearch(event);
});

$(".search").keypress(function (event) {
    var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode == '13') {
        performSearch(event);
    }
});

function performSearch(event) {
    var req;
    req = $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?",
        type: "GET",
        data: {
            q: $(".search-bar").val(),
            appid: "4ea1a3015e2642ea5d51f7bdcdfdeae2",
            units: "metric",
        }
    });

    req.done(function (response) {
        formatSearch(response);
    })
}

function formatSearch(jsonObject) {
    const name = jsonObject.name;
    const temp = jsonObject.main.temp;
    const description = jsonObject.weather[0].description;
    const humidity = jsonObject.main.humidity;
    const speed = jsonObject.wind.speed;
    const icon = jsonObject.weather[0].icon;


    $(".city").text("Weather in " + name);
    $(".temp").text(temp + " °C");
    $(".description").text(description);
    $(".icon").attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
    $(".Humidity").text("Humidity:" + humidity + " %");
    $(".wind").text("Speed:" + speed + " Km/h");
    if(name != ""){
        $("body").css("background-image", "url('https://source.unsplash.com/1600x900/?" + name + "'");
    }
    $(".weather").removeClass("loading");
}

$(".search button1").click(function () {
    getLocation();
});

const getLocation = function () {

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        fetch("https://us1.locationiq.com/v1/reverse.php?key=pk.1ef22685510aaa40e4260424c38a379e&lat="+ latitude + "&lon=" + longitude + "&format=json")
          .then(function(response){
            response.json().then(function(data){
                console.log(data.address);
            });
          }).catch(function(error){
            console.log('Fetch Error:',error)
          });
        getweather(latitude,longitude);
    });
}

function getweather(latitude,longitude){
    var req1;
    req1 = $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?",
        type: "GET",
        data: {
            lat: latitude,
            lon: longitude,
            appid: "4ea1a3015e2642ea5d51f7bdcdfdeae2",
            units: "metric",
        }
    });

    req1.done(function (response) {
        formatSearch(response);
    })
}
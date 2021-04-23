$(function () {
        var origin, destination, map;

        // add input listeners
        google.maps.event.addDomListener(window, 'load', function (listener) {
            setDestination();
            initMap();
        });

        // init or load map
        function initMap() {

            var myLatLng = {
                lat: 20.5937,
                lng: 78.9629
            };
            map = new google.maps.Map(document.getElementById('map'), {zoom: 16, center: myLatLng,});
        }

        function setDestination() {
            var from_places = new google.maps.places.Autocomplete(document.getElementById('from_places'));
            var to_places = new google.maps.places.Autocomplete(document.getElementById('to_places'));

            google.maps.event.addListener(from_places, 'place_changed', function () {
                var from_place = from_places.getPlace();
                var from_address = from_place.formatted_address;
                $('#origin').val(from_address);
            });

            google.maps.event.addListener(to_places, 'place_changed', function () {
                var to_place = to_places.getPlace();
                var to_address = to_place.formatted_address;
                $('#destination').val(to_address);
            });


        }

        function displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay) {
            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: travel_mode,
                avoidTolls: true
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                } else {
                    directionsDisplay.setMap(null);
                    directionsDisplay.setDirections(null);
                    alert('Could not display directions due to: ' + status);
                }
            });
        }

        // calculate distance , after finish send result to callback function
        function calculateDistance(travel_mode, origin, destination) {

            var DistanceMatrixService = new google.maps.DistanceMatrixService();
            DistanceMatrixService.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode[travel_mode],
                    unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
                    // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
                    avoidHighways: false,
                    avoidTolls: false
                }, save_results);
        }

        // save distance results
        function save_results(response, status) {

            if (status != google.maps.DistanceMatrixStatus.OK) {
                $('#result').html(err);
            } else {
                var origin = response.originAddresses[0];
                var destination = response.destinationAddresses[0];
                if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                    $('#result').html("Sorry , not available to use this travel mode between " + origin + " and " + destination);
                } else {
                    var distance = response.rows[0].elements[0].distance;
                    var duration = response.rows[0].elements[0].duration;
                    var distance_in_kilo = distance.value / 1000; // the kilo meter
                    var distance_in_mile = distance.value / 1609.34; // the mile
                    var duration_text = duration.text;
                    appendResults(distance_in_kilo, distance_in_mile, duration_text);
                    sendAjaxRequest(origin, destination, distance_in_kilo, distance_in_mile, duration_text);
                }
            }
        }

        // append html results
        function appendResults(distance_in_kilo, distance_in_mile, duration_text) {
            $("#result").removeClass("hide");
            $('#in_mile').html(" Distance in Mile: <span class='badge badge-pill badge-secondary'>" + distance_in_mile.toFixed(2) + "</span>");
            $('#in_kilo').html("Distance in KM: <span class='badge badge-pill badge-secondary'>" + distance_in_kilo.toFixed(2) + "</span>");
            $('#duration_text').html("Duration: <span class='badge badge-pill badge-success'>" + duration_text + "</span>");
        }

        // send ajax request to save results in the database
        

        // on submit  display route ,append results and send calculateDistance to ajax request
        $('#distance_form').submit(function (e) {
            e.preventDefault();
            var origin = $('#origin').val();
            var destination = $('#destination').val();
            var travel_mode = $('#travel_mode').val();
            var directionsDisplay = new google.maps.DirectionsRenderer({'draggable': false});
            var directionsService = new google.maps.DirectionsService();
           displayRoute(travel_mode, origin, destination, directionsService, directionsDisplay);
            calculateDistance(travel_mode, origin, destination);
        });

    });

    // get current Position
    function getCurrentPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setCurrentPosition);
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    // get formatted address based on current position and set it to input
    function setCurrentPosition(pos) {
        var geocoder = new google.maps.Geocoder();
        var latlng = {lat: parseFloat(pos.coords.latitude), lng: parseFloat(pos.coords.longitude)};
        geocoder.geocode({ 'location' :latlng  }, function (responses) {
            console.log(responses);
            if (responses && responses.length > 0) {
                $("#origin").val(responses[1].formatted_address);
                $("#from_places").val(responses[1].formatted_address);
                //    console.log(responses[1].formatted_address);
            } else {
                alert("Cannot determine address at this location.")
            }
        });
    }
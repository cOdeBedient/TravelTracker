function getTraveler(id) {
    return fetch(`http://localhost:3001/api/v1/travelers/${id}`);
}

function getTrips() {
    return fetch("http://localhost:3001/api/v1/trips");
}

function getDestinations() {
    return fetch("http://localhost:3001/api/v1/destinations");
}

function postTrip(trip, url) {
    const tripOptions = prepTripOptions(trip);
    return fetch(url, tripOptions);
}

function prepTripOptions(trip) {
    return {
        method: 'POST',
        body: JSON.stringify({
            id: trip.id,
            userID: trip.userID,
            destinationID: trip.destinationID,
            travelers: trip.travelers,
            date: trip.date,
            duration: trip.duration,
            status: trip.status,
            suggestedActivities: trip.suggestedActivities
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    }
}

function handleTripPost(trip, url) {
    return postTrip(trip, url)
    // .then(response => response.json())
}

function getData(id) {
    let allData = [getTraveler(id), getTrips(), getDestinations()];
    return allData;
}

function handleFetch(id) {
    return Promise.all(getData(id))
    .then(response => {
        return Promise.all(response.map((element) => {
            return element.json();
        }))
    })
}

export { handleFetch, handleTripPost };
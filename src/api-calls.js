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
    return fetch('url', tripOptions);
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

function prepareNewTripData(trip, url) {
    postTrip(trip, url)
    .then(response => response.json())
}

function getAllData(id) {
    let allData = [getTraveler(id), getTrips(), getDestinations()];
    return allData;
}

function prepareData(id) {
    return Promise.all(getAllData(id))
    .then(response => {
        return Promise.all(response.map((element) => {
            return element.json();
        }))
    })
}

export { prepareData };
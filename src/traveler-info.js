function getTraveler(id, travelers) {
    return travelers.find(traveler => id === traveler.id);
}

function getTrips(id, trips) {
    return trips.filter(trip => id === trip.userID);
}

function getDestinations(id, trips, destinations) {
    let tripsById = getTrips(id, trips);
    let foundDestinations = [];
    tripsById.forEach((trip) => {
        let foundDestination = destinations.find((destination) => {
            return destination.id === trip.destinationID
        });
        foundDestinations.push(foundDestination);
    })

    return foundDestinations;
}

export {
    getTraveler,
    getTrips,
    getDestinations
}
function getTraveler(id, travelers) {
    return travelers.find(traveler => id === traveler.id);
}

function getTrips(id, trips) {
    return trips.filter(trip => id === trip.userID);
}

export {
    getTraveler,
    getTrips
}
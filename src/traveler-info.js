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

function getDate() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0')
    const todayDay = today.getDate().toString().padStart(2, '0')
    return `${todayYear}${todayMonth}${todayDay}`
}

function computeTotalSpent(id, trips, destinations) {
    const today = getDate();
    let approvedRecentTrips = trips.filter((trip) => {
        return (trip.status === 'approved')
                && (trip.date.replaceAll('/', '') < today)
                && (trip.date.replaceAll('/', '') > today - 10000);
    });
    let approvedPastDestinations = getDestinations(id, approvedRecentTrips, destinations);
    let totalCost = approvedPastDestinations.reduce((total, destination) => {
        total += destination.estimatedLodgingCostPerDay
        total += destination.estimatedFlightCostPerPerson

        return total;
    }, 0)

    return totalCost;
}

export {
    getTraveler,
    getTrips,
    getDestinations,
    getDate,
    computeTotalSpent
}
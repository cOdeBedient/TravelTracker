function getTraveler(id, travelers) {
    return travelers.find(traveler => id === traveler.id);
}

function getTrips(id, trips) {
    return trips.filter(trip => id === trip.userID);
}

// refactor to appendDestination (append a single destination to each trip)
function appendDestinations(trips, destinations) {
    trips.forEach((trip) => {
        let foundDestination = destinations.find((destination) => {
            return destination.id === trip.destinationID
        });
        trip.destination = foundDestination;
    })

    return trips;
}

function addDestination(trip, destinations) {

}

function computeAgentFee(cost) {
    return cost += Math.round(cost / 10);
}

// single trip cost
function computeTripCost(trip, destination) {

}

// return an array of trips that have destination information and cost per trip
function compileTripData() {

}





function getDate() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0')
    const todayDay = today.getDate().toString().padStart(2, '0')
    return `${todayYear}${todayMonth}${todayDay}`
}

//shouldn't have a destinations key, just a trips key that includes destinations and trip cost.
function updateTraveler(traveler, trips, destinations) {
    traveler.trips = getTrips(traveler.id, trips);
    traveler.destinations = getDestinations(traveler.id, trips, destinations);
    traveler.totalSpent = computeTotalSpent(traveler.id, trips, destinations);

    return traveler;
}

//should just take one parameter, traveler
function computeTotalSpent(id, trips, destinations) {
    const today = getDate();
    let approvedRecentTrips = trips.filter((trip) => {
        return (trip.status === 'approved')
                && (trip.date.replaceAll('/', '') < today)
                && (trip.date.replaceAll('/', '') > today - 10000);
    });
    let approvedPastDestinations = getDestinations(id, approvedRecentTrips, destinations);
    let tripSpending = approvedPastDestinations.reduce((total, destination) => {
        let tripLength = approvedRecentTrips.find((trip) => {
            return trip.destinationID === destination.id
        }).duration;
        console.log('tripLength', tripLength)
        total += destination.estimatedLodgingCostPerDay * tripLength;
        total += destination.estimatedFlightCostPerPerson;

        return total;
    }, 0)
    let agentFee = computeAgentFee(tripSpending);

    return tripSpending + agentFee;
}



function getDestination(name, destinations) {

}

function computeGroupTripCost(destination, destinations) {
    return 
}

export {
    getTraveler,
    getTrips,
    appendDestinations,
    getDate,
    computeTotalSpent,
    updateTraveler
}
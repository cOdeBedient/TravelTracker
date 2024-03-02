function getTraveler(id, travelers) {
    return travelers.find(traveler => id === traveler.id);
}

function getTrips(id, trips) {
    let currentTrips = trips.filter((trip) => {
        return id === trip.userID
    });

    return currentTrips;
}

function appendDestinations(trips, destinations) {
    let updatedTrips = trips.map((trip) => {
        let foundDestination = destinations.find((destination) => {
            return destination.id === trip.destinationID
        });
        return {
          ...trip,
          destination: foundDestination
        }
    })

    return updatedTrips;
}

function computeAgentFee(cost) {
    return Math.round(cost / 10);
}

function computeTripCost(trip) {
    const singleLodgingTotal = trip.destination.estimatedLodgingCostPerDay * trip.duration;
    const singleFlight = trip.destination.estimatedFlightCostPerPerson;
    const netPerPerson = singleLodgingTotal + singleFlight;
    const agentFeePerPerson = computeAgentFee(netPerPerson);
    const totalPerPerson = netPerPerson + agentFeePerPerson;
    const totalGroup = totalPerPerson * trip.travelers;

    return {totalPerPerson: totalPerPerson, totalGroup: totalGroup};
}

function compileTripData(trips, destinations) {
    let appendedTrips = appendDestinations(trips, destinations);
    let compiledTrips = appendedTrips.map((trip) => {
        trip.cost = computeTripCost(trip);
        return {
            ...trip,
            cost: trip.cost
          }
    })

    return compiledTrips;
}

function getDate() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const todayDay = today.getDate().toString().padStart(2, '0');

    return `${todayYear}${todayMonth}${todayDay}`
}

function computeYearSpent(trips) {
    const today = getDate();
    let approvedRecentTrips = trips.filter((trip) => {
        return (trip.status === 'approved')
            && (trip.date.replaceAll('/', '') < 20200301)
            && (trip.date.replaceAll('/', '') > 20190301);
            // && (trip.date.replaceAll('/', '') < today)
            // && (trip.date.replaceAll('/', '') > today - 10000);
    });
    let totalSpending = approvedRecentTrips.reduce((totals, trip) => {
        totals.individual += trip.cost.totalPerPerson;
        totals.group += trip.cost.totalGroup;

        return totals
    }, {individual: 0, group: 0});

    return totalSpending;
}

function updateTraveler(traveler, trips, destinations) {
    let updatedTraveler = traveler;
    let updatedTravelerTrips = getTrips(traveler.id, trips);
    let updatedTrips = compileTripData(updatedTravelerTrips, destinations)
    updatedTraveler.trips = updatedTrips;
    traveler.spentLastYear = computeYearSpent(updatedTrips);

    return updatedTraveler;
}

function createTrip(trip){
    return trip;
}

export {
    getTraveler,
    getTrips,
    appendDestinations,
    computeAgentFee,
    computeTripCost,
    compileTripData,
    getDate,
    computeYearSpent,
    updateTraveler
}
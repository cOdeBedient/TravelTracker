import { prepareData } from './api-calls';
import { updateTraveler} from './traveler-info'

// QUERY SELECTORS
const tripsListContainer = document.querySelector('.trips-list');
const dollarsSpent = document.querySelector('.dollars-spent');
const destinationsListContainer = document.querySelector('.destinations-list')


let currentTraveler;
let allTrips;
let allDestinations;

window.addEventListener('load', getAllData(2))


function getAllData(id) {
    prepareData(id)
    .then(([traveler, tripData, destinationData]) => {
        allTrips = tripData.trips;
        allDestinations = destinationData.destinations;
        currentTraveler = updateTraveler(traveler, allTrips, allDestinations);
        console.log('currentTraveler', currentTraveler)
        renderDom();
    })
}

function renderDom() {
    renderMyTrips();
    renderDestinations();
    dollarsSpent.innerText = `Dollars Spent`
}

function renderMyTrips() {
    currentTraveler.trips.forEach((trip) => {
        const newTrip = document.createElement('div')
        newTrip.className = 'trip-header';
        newTrip.id = `trip-${trip.id}`
        newTrip.innerHTML = `
            <h3 class='name'>${trip.destination.destination}</h3>
            <h4 class='date'>${trip.date}</h4>
            `
        const newTripDetails = document.createElement('div')
        newTripDetails.className = 'trip-details';
        newTripDetails.id = `trip-${trip.id}-details`
        newTripDetails.innerHTML = `
            <img class='trip-image' src="${trip.destination.image}" alt=${trip.destination.alt}>
            <h5 class='trip-travelers'>Number of Travelers: ${trip.travelers}</h5>
            <h5 class='trip-duration'>Length of Trip: ${trip.duration}</h5>
            <h5 class='trip-cost-ind'>Group Cost: ${trip.cost.totalGroup}</h5>
            <h5 class='trip-cost-grp'>Per Person: ${trip.cost.totalPerPerson}
            `
            tripsListContainer.appendChild(newTrip);
            tripsListContainer.appendChild(newTripDetails);
    })
}

function renderDestinations() {
    allDestinations.forEach((destination) => {
        const newDestination = document.createElement('div')
        newDestination.className = 'destination-header';
        newDestination.id = `destination-${destination.id}`
        newDestination.innerHTML = `
            <h3 class='destination-name'>${destination.destination}</h3>
            `
        const newDestinationDetails = document.createElement('div')
        newDestinationDetails.className = 'destination-details';
        newDestinationDetails.id = `destination-${destination.id}-details`
        newDestinationDetails.innerHTML = `
            <img class='destination-image' src="${destination.image}" alt=${destination.alt}>
            <h5 class='destination-travelers'>Number of Travelers: 5 </h5>
            <h5 class='destination-duration'>Length of destination: 5 </h5>
            <h5 class='destination-cost-ind'>Group Cost: 5 </h5>
            <h5 class='destination-cost-grp'>Per Person: 5 </h5>
            `
            destinationsListContainer.appendChild(newDestination);
            destinationsListContainer.appendChild(newDestinationDetails);
    })
}
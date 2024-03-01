import { prepareData } from './api-calls';
import { updateTraveler} from './traveler-info'

// QUERY SELECTORS
const tripsListContainer = document.querySelector('.trips-list');



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
        renderDom(currentTraveler);
    })
}

function renderDom(traveler) {
    console.log('currentTraveler', currentTraveler)
    traveler.trips.forEach((trip) => {
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


import { prepareData } from './api-calls';
import { updateTraveler} from './traveler-info'

// QUERY SELECTORS
const tripsListContainer = document.querySelector('.trips-list');
const dollarsSpent = document.querySelector('.dollars-spent');
const destinationsListContainer = document.querySelector('.destinations-list')


// EVENT LISTENERS
window.addEventListener('load', getAllData(2));
destinationsListContainer.addEventListener('click', function(event) {
    if(event.target.tagName === "BUTTON") {
        retrieveTripInfo(event);
    }
});


// GLOBAL VARIABLES
let currentTraveler;
let allTrips;
let allDestinations;


// FUNCTIONS
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
            <h5 class='trip-cost-ind'>Group Cost: $${trip.cost.totalGroup}</h5>
            <h5 class='trip-cost-grp'>Cost Per Person: $${trip.cost.totalPerPerson}
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
        newDestination.innerHTML = `<h3 class='destination-name'>${destination.destination}</h3>`
        const newDestinationDetails = document.createElement('div')
        newDestinationDetails.className = 'destination-details';
        newDestinationDetails.id = `destination-${destination.id}-details`
        newDestinationDetails.innerHTML = `
            <img class='destination-image' src="${destination.image}" alt=${destination.alt}>
            <form class='trip-form' id='form-${destination.id}'>
                <div class="form-element">
                    <label for="travelers">Number of Travelers:</label>
                </div>
                <input class="travelers-field" id="travelers" type="number" min="0" placeholder="number of travelers" required>
                <div class="form-element">
                    <label for="duration">Length of Trip:</label>
                </div>
                <input class="duration-field" id="duration" type="number" min="0" max="50" placeholder="trip length" required>
                <div class="form-element">
                    <label for="departure">Departure Date:</label>
                </div>
                <input class="departure-date-field" id="departure" type="date" min="2024-03-03" max="2026-03-03" placeholder="MM/DD/YYYY" required>
                <div class="form-element">
                    <label for="return">Return Date:</label>
                </div>
                <input class="return-date-field" id="return" type="date" min="2024-04-03" max="2026-03-03" placeholder="MM/DD/YYYY" required>
                <div class="form-element">
                    <button class="submit-button" type="submit">Submit Trip!</button>
                </div>
            </form>
            <h5 class='destination-cost-ind'>Group Cost:</h5>
            <h5 class='destination-cost-grp'>Cost Per Person:</h5>
            `
            destinationsListContainer.appendChild(newDestination);
            destinationsListContainer.appendChild(newDestinationDetails);
    })
}

function retrieveTripInfo(event) {
    event.preventDefault();
    console.log(event.target.closest('form'));
    let destinationForm = event.target.closest('form')
    let newTripData = destinationForm.querySelectorAll('input');
    let [numTravelers, tripLength, departureDate, returnDate] = newTripData;
    console.log("numTravelers", numTravelers.value);
    // const formId = event.target.id
    // const destinationForm = document.getElementById(`${formId}`);
    // console.log("destinationForm", destinationForm);
}
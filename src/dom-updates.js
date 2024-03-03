import { handleFetch, handleTripPost } from './api-calls';
import { updateTraveler} from './traveler-info'

// QUERY SELECTORS
const tripsListContainer = document.querySelector('.trips-list');
const dollarsSpent = document.querySelector('.dollars-spent');
const destinationsListContainer = document.querySelector('.destinations-list')


// EVENT LISTENERS
window.addEventListener('load', getAllData(2));
destinationsListContainer.addEventListener('click', function(event) {
    if(event.target.tagName === "BUTTON") {
        handleTripSubmit(event);
    }
});


// GLOBAL VARIABLES
let currentTraveler;
let allTrips;
let allDestinations;


// FUNCTIONS
function getAllData(id) {
    handleFetch(id)
    .then(([traveler, tripData, destinationData]) => {
        allTrips = tripData.trips;
        allDestinations = destinationData.destinations;
        currentTraveler = updateTraveler(traveler, allTrips, allDestinations);
        renderDom();
    })
}

function handleTripSubmit(event) {
    const newTrip = retrieveInputs(event);
    allTrips.push(newTrip);
    console.log('allTrips', allTrips)
    console.log('newTrip', newTrip);
    handleTripPost(newTrip, 'http://localhost:3001/api/v1/trips')
    .then(returnedTrip => {
        currentTraveler = updateTraveler(currentTraveler, allTrips, allDestinations);
        console.log('returnedTrip', returnedTrip)
        renderDom()
    });
}

function renderDom() {
    renderMyTrips();
    renderDestinations();
    dollarsSpent.innerText = `Dollars Spent`
}

function renderMyTrips() {
    tripsListContainer.innerHTML = '';
    currentTraveler.trips.forEach((trip) => {
        const newTrip = document.createElement('div')
        newTrip.className = 'trip-header';
        newTrip.id = `trip-${trip.id}`
        newTrip.innerHTML = `
            <h3 class='name'>${trip.destination.destination}</h3>
            <h4 class='date'>${trip.date}</h4>
            `;
        if(trip.status === 'pending') {
            newTrip.classList.add('pending');
        }
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
                    <label for="departure">Departure Date:</label>
                </div>
                <input class="departure-date-field" id="departure" type="date" min="2024-03-03" max="2026-03-03" placeholder="MM/DD/YYYY" required>
                <div class="form-element">
                    <label for="return">Return Date:</label>
                </div>
                <input class="return-date-field" id="return" type="date" min="2024-03-04" max="2026-03-03" placeholder="MM/DD/YYYY" required>
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

// function makeNewTrip(event) {
//     return retrieveInputs(event);
// }

function computeDuration(date1, date2) {
        var parsedDate1 = new Date(date1);
        var parsedDate2 = new Date(date2);
        var difference = parsedDate2 - parsedDate1;
        var differenceDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    
        return differenceDays;
}

function retrieveInputs(event) {
    event.preventDefault();
    let destinationForm = event.target.closest('form')
    let destinationId = destinationForm.id.split('-')[1];
    let newTripData = destinationForm.querySelectorAll('input');
    const [numTravelers, departureDate, returnDate] = newTripData;
    const tripDuration = computeDuration(departureDate.value, returnDate.value);
    return {
        id: allTrips.length + 1,
        userID: currentTraveler.id,
        destinationID: parseInt(destinationId),
        travelers: parseInt(numTravelers.value),
        date: departureDate.value.replaceAll('-', '/'),
        duration: tripDuration,
        status: "pending",
        suggestedActivities: []
    }
}
import { handleFetch, handleTripPost } from './api-calls';
import { updateTraveler, compileTripData } from './traveler-info'

// QUERY SELECTORS
const tripsListContainer = document.querySelector('.trips-list');
const dollarsSpent = document.querySelector('.dollars-spent');
const destinationsListContainer = document.querySelector('.destinations-list');
const loginPage = document.querySelector('.login-form');
const usernameField = document.querySelector('#username');
const passwordField = document.querySelector('#password');
const loginSubmitButton = document.querySelector('.login-submit-button');
const mainPage = document.querySelector('main');


// EVENT LISTENERS
window.addEventListener('load', getAllData(15));
destinationsListContainer.addEventListener('click', function(event) {
    if(event.target.tagName === "BUTTON") {
        let destinationForm = event.target.closest('form')
        let destinationId = destinationForm.id.split('-')[1];
        let newTripData = destinationForm.querySelectorAll('input');
        const [numTravelers, departureDate, duration] = newTripData;
        if(numTravelers.value && departureDate.value && duration.value) {
            handleTripSubmit(event, destinationId, numTravelers, departureDate, duration);
        }
    }
});
destinationsListContainer.addEventListener('keyup', function(event) {
    if(event.target.tagName === "INPUT") {
        let destinationForm = event.target.closest('form')
        let destinationId = destinationForm.id.split('-')[1];
        let newTripData = destinationForm.querySelectorAll('input');
        const [numTravelers, departureDate, duration] = newTripData; 
        if(numTravelers.value && departureDate.value && duration.value) {
            const costData = findCostFields(event);
            updateTripCost(event, destinationId, numTravelers, departureDate, duration, costData);
        }
        
    }
});
// loginSubmitButton.addEventListener('click', function(event) {
//     event.preventDefault();
//     logIn(event);
// })


// GLOBAL VARIABLES
let currentTraveler;
let allTrips;
let allDestinations;
let passwordError;


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

function handleTripSubmit(event, destinationId, numTravelers, departureDate, duration) {
    const newTrip = retrieveInputs(event, destinationId, numTravelers, departureDate, duration);
    allTrips.push(newTrip);
    clearDestinationData(event, numTravelers, departureDate, duration);
    handleTripPost(newTrip, 'http://localhost:3001/api/v1/trips')
    .then(returnedTrip => {
        currentTraveler = updateTraveler(currentTraveler, allTrips, allDestinations);
        renderDom()
    });
}

function clearDestinationData(event, numTravelers, departureDate, duration) {
    const costFields = findCostFields(event);
    costFields.forEach((field) => {
        field.innerText = ''
    });
    numTravelers.value = '';
    departureDate.value = '';
    duration.value = '';
}

function findCostFields(event) {
    const destinationDetails = event.target.closest('.destination-details');
    return destinationDetails.querySelectorAll('h5');
}

function renderDom() {
    renderMyTrips();
    renderDestinations();
    dollarsSpent.innerText = `$${currentTraveler.spentLastYear.group}`
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
                <input class="travelers-field" id="travelers" type="number" min="1" placeholder="number of travelers" required>
                <div class="form-element">
                    <label for="departure">Departure Date:</label>
                </div>
                <input class="departure-date-field" id="departure" type="date" min="2024-03-03" max="2026-03-03" placeholder="MM/DD/YYYY" required>
                <div class="form-element">
                    <label for="duration">Trip Length:</label>
                </div>
                <input class="duration-field" id="duration" type="number" min="1"  placeholder="number of nights" required>
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

// function computeDuration(date1, date2) {
//         var parsedDate1 = new Date(date1);
//         var parsedDate2 = new Date(date2);
//         var difference = parsedDate2 - parsedDate1;
//         var differenceDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    
//         return differenceDays;
// }

function retrieveInputs(event, destinationId, numTravelers, departureDate, duration) {
    event.preventDefault();
    // const tripDuration = computeDuration(departureDate.value, returnDate.value);
        return {
            id: allTrips.length + 1,
            userID: currentTraveler.id,
            destinationID: parseInt(destinationId),
            travelers: parseInt(numTravelers.value),
            date: departureDate.value.replaceAll('-', '/'),
            duration: parseInt(duration.value),
            status: "pending",
            suggestedActivities: []
        }
}

function logIn(event) {
    event.preventDefault();
    let userId = parseInt(usernameField.value.replace('traveler', ''));
    let password = passwordField.value
    console.log('userId', userId);
    console.log('password', password);
    if (userId < 51 && password === 'travel') {
        console.log('made it here')
        toggleFromLogin();
        getAllData(userId);
        } else if(userId > 50) {
            passwordError = 'Invalid Username'
        } else {
            passwordError = 'Invalid Password'
        }
}

function toggleFromLogin() {
    console.log('made it here now')
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden')
}

function updateTripCost(event, destinationId, numTravelers, departureDate, duration, costData) {
    const selectedTrip = retrieveInputs(event, destinationId, numTravelers, departureDate, duration);
    const compiledTrip = compileTripData([selectedTrip], allDestinations);
    console.log('compiledTrip', compiledTrip)
    const tripCostPerPerson = compiledTrip[0].cost.totalPerPerson;
    const tripCostGroup = compiledTrip[0].cost.totalGroup;
    console.log('costData', costData)
    const [perPerson, perGroup] = costData;
    perPerson.innerText = `Cost Per Person: $${tripCostPerPerson}`;
    perGroup.innerText = `Cost Per Group: $${tripCostGroup}`;
}
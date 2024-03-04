import { handleFetch, handleTripPost } from './api-calls';
import { updateTraveler, compileTripData } from './traveler-info'
import { userLogins } from './login-data/user-logins'

// QUERY SELECTORS
const tripsListContainer = document.querySelector('.trips-list');
const dollarsSpent = document.querySelector('.dollars-spent');
const destinationsListContainer = document.querySelector('.destinations-list');
const loginPage = document.querySelector('.login-form');
const usernameField = document.querySelector('#username');
const passwordField = document.querySelector('#password');
const loginSubmitButton = document.querySelector('.login-submit-button');
const mainPage = document.querySelector('main');
const header = document.querySelector('header');
const errorPage = document.querySelector('.error-message');
const passwordError = document.querySelector('.password-error');
const body = document.querySelector('body');


// EVENT LISTENERS
loginSubmitButton.addEventListener('click', function(event) {
    event.preventDefault();
    logIn(event);
})
// window.addEventListener('load', getAllData(15));
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
tripsListContainer.addEventListener('click', function(event) {
    const clickedTrip = event.target.closest('.trip-container');
    const clickedTripDetails = clickedTrip.querySelector('.trip-details');
    clickedTripDetails.classList.toggle("hidden");
})
destinationsListContainer.addEventListener('click', function(event) {
        const clickedDestination = event.target.closest('.destination-container');
        const clickedDestinationDetails = clickedDestination.querySelector('.destination-details');
        if(!event.target.closest('.destination-details')) {
            clickedDestinationDetails.classList.toggle("hidden");
    }
})


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
    .catch(error => {
        displayError(error.message);
    })
}

function handleTripSubmit(event, destinationId, numTravelers, departureDate, duration) {
    const newTrip = retrieveInputs(event, destinationId, numTravelers, departureDate, duration);
    allTrips.push(newTrip);
    clearDestinationData(event, numTravelers, departureDate, duration);
    handleTripPost(newTrip, 'http://localhost:3001/api/v1/trips')
    .then(returnedTrip => {
        if(returnedTrip.ok) {
            currentTraveler = updateTraveler(currentTraveler, allTrips, allDestinations);
            renderDom()
        } else {
            console.log('returnedTrip.statusText', returnedTrip.statusText)
            console.log('returnedTrip.status,', returnedTrip.status)
            let code = returnedTrip.status;
            let message = returnedTrip.statusText;
            throw new Error(`Oh no! Failed to Post: ${code} - ${message}.`)
        }
    })
    .catch(error => {
        displayError(error.message);
    })
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
    return destinationDetails.querySelectorAll('p');
}

function renderDom() {
    renderMyTrips();
    renderDestinations();
    dollarsSpent.innerText = `$${currentTraveler.spentLastYear.group}`
}

function renderMyTrips() {
    tripsListContainer.innerHTML = '';
    currentTraveler.trips.forEach((trip) => {
        const newTripContainer = document.createElement('div');
        newTripContainer.className = 'trip-container';
        const newTrip = document.createElement('div')
        newTrip.className = 'trip-header';
        newTrip.id = `trip-${trip.id}`;
        newTrip.innerHTML = `
            <h3 class='name'>${trip.destination.destination}</h3>
            <h4 class='date'>${trip.date}</h4>
            `;
        if(trip.status === 'pending') {
            newTrip.classList.add('pending');
        };
        const newTripDetails = document.createElement('div')
        newTripDetails.className = 'trip-details hidden';
        newTripDetails.id = `trip-${trip.id}-details`
        newTripDetails.innerHTML = `
            <img class='trip-image' src="${trip.destination.image}" alt=${trip.destination.alt}>
            <h5 class='trip-travelers'>Number of Travelers: ${trip.travelers}</h5>
            <h5 class='trip-duration'>Length of Trip: ${trip.duration}</h5>
            <h5 class='trip-cost-ind'>Group Cost: $${trip.cost.totalGroup}</h5>
            <h5 class='trip-cost-grp'>Cost Per Person: $${trip.cost.totalPerPerson}
            `
            tripsListContainer.appendChild(newTripContainer);
            newTripContainer.appendChild(newTrip);
            newTripContainer.appendChild(newTripDetails);
    })
}

function renderDestinations() {
    allDestinations.forEach((destination) => {
        const newDestinationContainer = document.createElement('div');
        newDestinationContainer.className = 'destination-container';
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
                <input class="travelers-field" id="travelers" type="number" min="1" placeholder="#ppl" required>
                <div class="form-element">
                    <label for="departure">Departure Date:</label>
                </div>
                <input class="departure-date-field" id="departure" type="date" min="2024-03-03" max="2026-03-03" placeholder="MM/DD/YYYY" required>
                <div class="form-element">
                    <label for="duration">Trip Length:</label>
                </div>
                <input class="duration-field" id="duration" type="number" min="1"  placeholder="#days" required>
                <div class="form-element">
                    <button class="submit-button" type="submit">Submit Trip!</button>
                </div>
            </form>
            <div class="new-costs-container">
                <div class='new-costs'>
                    <h5 class='destination-cost-ind'>Cost Per Person:</h5>
                    <p></p>
                </div>
                <div class='new-costs'>
                    <h5 class='destination-cost-grp'>Cost Per Group:</h5>
                    <p></p>
                </div>   
            </div>
            `
            destinationsListContainer.appendChild(newDestinationContainer)
            newDestinationContainer.appendChild(newDestination);
            newDestinationContainer.appendChild(newDestinationDetails);
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

function checkLogin(event) {

}

function logIn(event) {
    event.preventDefault();
    passwordError.innerText = '';
    checkLogin(event);
    // let userId = parseInt(usernameField.value.replace('traveler', ''));
    const username = usernameField.value;
    const password = passwordField.value;
    const foundUser = userLogins.find((login) => {
        return login.username === username && login.password === password;
    });
    if(foundUser) {
        const userId = parseInt(usernameField.value.replace('traveler', ''));
        toggleFromLogin();
        console.log('usernameField.value before clear', usernameField.value)
        console.log('passwordField.value before clear', passwordField.value)
        clearPasswordFields();
        getAllData(userId);
        console.log('usernameField.value after clear', usernameField.value)
        console.log('passwordField.value after clear', passwordField.value)
    } else if (userLogins.find (login => login.username === username)) {
        passwordError.innerText = '* invalid password *'
    } else {
        passwordError.innerText = '* username not found *'
    }
}

function clearPasswordFields() {
    usernameField.value = '';
    passwordField.value = '';
}

function toggleFromLogin() {
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    header.classList.remove('hidden');
    body.classList.add('background-color');
}

function updateTripCost(event, destinationId, numTravelers, departureDate, duration, costData) {
    const selectedTrip = retrieveInputs(event, destinationId, numTravelers, departureDate, duration);
    const compiledTrip = compileTripData([selectedTrip], allDestinations);
    console.log('compiledTrip', compiledTrip)
    const tripCostPerPerson = compiledTrip[0].cost.totalPerPerson;
    const tripCostGroup = compiledTrip[0].cost.totalGroup;
    console.log('costData', costData)
    const [perPerson, perGroup] = costData;
    perPerson.innerText = `$${tripCostPerPerson}`;
    perGroup.innerText = `$${tripCostGroup}`;
}

function displayError(error) {
    mainPage.classList.add('hidden');
    header.classList.add('hidden');
    loginPage.classList.add('hidden');
    errorPage.classList.remove('hidden');
    errorPage.innerHTML = error;
  };
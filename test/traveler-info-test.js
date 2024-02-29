import chai from 'chai';
const expect = chai.expect;
import { getTraveler, getTrips, getDestinations, computeTotalSpent } from '../src/traveler-info';
import { sampleTravelers } from '../src/sample-data/travelers-sample';
import { sampleTrips } from '../src/sample-data/trips-sample';
import { sampleDestinations } from '../src/sample-data/destinations-sample';

describe('traveler-info.js', function() {
  let traveler1;
  let traveler2;
  let traveler1Trips;
  let traveler4Trips;
  let traveler1Destinations;
  let traveler4Destinations;
  beforeEach(function() {
    traveler1 = getTraveler(1, sampleTravelers);
    traveler2 = getTraveler(2, sampleTravelers);
    traveler1Trips = getTrips(1, sampleTrips);
    traveler4Trips = getTrips(4, sampleTrips);
    traveler1Destinations = getDestinations(1, sampleTrips, sampleDestinations);
    traveler4Destinations = getDestinations(4, sampleTrips, sampleDestinations);
  });

  describe('get traveler', function() {
    it('should find the traveler with associated id', function() {
      expect(traveler1.name).to.equal('John Smith');
      expect(traveler2.travelerType).to.equal('thrill-seeker');
    });
  });

  describe('get trips', function() {
    it('should create an array of trips for a given traveler id', function() {
      expect(traveler1Trips).to.deep.equal([
        {
          id: 1,
          userID: 1,
          destinationID: 2,
          travelers: 6,
          date: "2023/09/23",
          duration: 5,
          status: "approved",
          suggestedActivities: []
        },
        {
          id: 3,
          userID: 1,
          destinationID: 5,
          travelers: 7,
          date: "2024/02/28",
          duration: 8,
          status: "approved",
          suggestedActivities: []
        },
        {
          id: 5,
          userID: 1,
          destinationID: 6,
          travelers: 5,
          date: "2025/10/29",
          duration: 10,
          status: "pending",
          suggestedActivities: []
        }]);
    });

    it('should return an empty array if the traveler has no trips', function() {
      expect(traveler4Trips).to.deep.equal([])
    });
  });

  describe('get destinations', function() {
    it('should return an array of destinations for a given traveler id', function() {
      expect(traveler1Destinations).to.deep.equal([
        {
          id: 2,
          destination: "Paris, France",
          estimatedLodgingCostPerDay: 220,
          estimatedFlightCostPerPerson: 600,
          image: "https://example.com/paris.jpg",
          alt: "Eiffel Tower with blue sky in the background"
        },
        {
          id: 5,
          destination: "Rio de Janeiro, Brazil",
          estimatedLodgingCostPerDay: 130,
          estimatedFlightCostPerPerson: 750,
          image: "https://example.com/rio.jpg",
          alt: "View of Christ the Redeemer statue overlooking Rio"
        },
        {
          id: 6,
          destination: "New York City, USA",
          estimatedLodgingCostPerDay: 200,
          estimatedFlightCostPerPerson: 400,
          image: "https://example.com/nyc.jpg",
          alt: "Manhattan skyline with Empire State Building"
        }]);
      });

      it('should return an empty array if traveler has no trips', function() {
      expect(traveler4Destinations).to.deep.equal([]);
    });
  });

  describe('compute total spent', function() {
    it('should return the total spent on trips this year by traveler with given id', function() {
      let traveler1TotalSpent = computeTotalSpent(1, sampleTrips, sampleDestinations);

      expect(traveler1TotalSpent).to.equal(1700);
    })

    it('should not factor in pending trips', function() {
      let traveler5TotalSpent = computeTotalSpent(5, sampleTrips, sampleDestinations);

      expect(traveler5TotalSpent).to.equal(0);
    })

    it('should not factor in future trips', function() {
      let traveler3TotalSpent = computeTotalSpent(3, sampleTrips, sampleDestinations);

      expect(traveler3TotalSpent).to.equal(0);
    })

    it('should not factor in trips taken more than a year ago', function() {
      let traveler2TotalSpent = computeTotalSpent(2, sampleTrips, sampleDestinations);

      expect(traveler2TotalSpent).to.equal(0);
    })
  })
});

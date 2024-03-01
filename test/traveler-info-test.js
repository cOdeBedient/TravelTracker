import chai from 'chai';
const expect = chai.expect;
import { getTraveler, getTrips, appendDestinations, computeTripCost, compileTripData, computeYearSpent, updateTraveler } from '../src/traveler-info';
import { sampleTravelers } from '../src/sample-data/travelers-sample';
import { sampleTrips } from '../src/sample-data/trips-sample';
import { sampleDestinations } from '../src/sample-data/destinations-sample';

describe('traveler-info.js', function() {
  let traveler1;
  let traveler2;
  let traveler1Trips;
  let traveler2Trips
  let traveler3Trips
  let traveler4Trips;
  let traveler5Trips;
  let trip1;
  let trip2;
  // let traveler1Destinations;
  // let traveler2Destinations;
  // let traveler4Destinations;
  beforeEach(function() {
    traveler1 = getTraveler(1, sampleTravelers);
    traveler2 = getTraveler(2, sampleTravelers);
    traveler1Trips = getTrips(1, sampleTrips);
    // console.log("traveler1Trips", traveler1Trips)
    traveler2Trips = getTrips(2, sampleTrips);
    traveler3Trips = getTrips(3, sampleTrips);
    traveler4Trips = getTrips(4, sampleTrips);
    traveler5Trips = getTrips(5, sampleTrips);
    trip1 = traveler1Trips[0];
    trip2 = traveler2Trips[0];
    // traveler1Destinations = getDestinations(1, sampleTrips, sampleDestinations);
    // traveler2Destinations = getDestinations(2, sampleTrips, sampleDestinations);
    // traveler4Destinations = getDestinations(4, sampleTrips, sampleDestinations);
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

  describe('append destination', function() {
    it('should append destinations to trips', function() {
      // console.log("traveler1Trips[0] before", traveler1Trips[0])
      let traveler1UpdatedTrips = appendDestinations(traveler1Trips, sampleDestinations)
      let traveler2UpdatedTrips = appendDestinations(traveler2Trips, sampleDestinations)
      // console.log("traveler1Trips[0]", traveler1Trips[0])

      expect(traveler1UpdatedTrips[0]).to.deep.equal(
        {
          id: 1,
          userID: 1,
          destinationID: 2,
          travelers: 6,
          date: "2023/09/23",
          duration: 5,
          status: "approved",
          suggestedActivities: [],
          destination: {
            id: 2,
            destination: "Paris, France",
            estimatedLodgingCostPerDay: 220,
            estimatedFlightCostPerPerson: 600,
            image: "https://example.com/paris.jpg",
            alt: "Eiffel Tower with blue sky in the background"
          }
        },
      );
      expect(traveler2UpdatedTrips[0].destination).to.deep.equal(
        {
          id: 6,
          destination: "New York City, USA",
          estimatedLodgingCostPerDay: 200,
          estimatedFlightCostPerPerson: 400,
          image: "https://example.com/nyc.jpg",
          alt: "Manhattan skyline with Empire State Building"
        }
      );
    });
  });

  describe('compute trip cost', function() {
    it('should return an object with cost data', function() {
      let traveler1UpdatedTrips = appendDestinations(traveler1Trips, sampleDestinations)
      let traveler2UpdatedTrips = appendDestinations(traveler2Trips, sampleDestinations)
      let tripCost1 = computeTripCost(traveler1UpdatedTrips[0]);
      let tripCost2 = computeTripCost(traveler2UpdatedTrips[0]);

      expect(tripCost1).to.deep.equal({totalPerPerson: 1870, totalGroup: 11220});
      expect(tripCost2).to.deep.equal({totalPerPerson: 880, totalGroup: 3520});
    });
  });

  describe('compile trip data', function() {
    it('should return an object with cost data', function() {
      let traveler1UpdatedTrips = appendDestinations(traveler1Trips, sampleDestinations)
      let traveler2UpdatedTrips = appendDestinations(traveler2Trips, sampleDestinations)
      let compiledTrips1 = compileTripData(traveler1UpdatedTrips, sampleDestinations);
      let compiledTrips2 = compileTripData(traveler2UpdatedTrips, sampleDestinations);

      expect(compiledTrips1[0].cost).to.deep.equal({totalPerPerson: 1870, totalGroup: 11220});
      expect(compiledTrips2[0].destination).to.deep.equal({
        id: 6,
        destination: "New York City, USA",
        estimatedLodgingCostPerDay: 200,
        estimatedFlightCostPerPerson: 400,
        image: "https://example.com/nyc.jpg",
        alt: "Manhattan skyline with Empire State Building"
      });
    });
  });

  describe('compute total spent', function() {
    it('should return the total spent on trips this year by traveler with given id', function() {
      let traveler1UpdatedTrips = appendDestinations(traveler1Trips, sampleDestinations)
      let traveler2UpdatedTrips = appendDestinations(traveler2Trips, sampleDestinations)
      let traveler5UpdatedTrips = appendDestinations(traveler5Trips, sampleDestinations)
      let compiledTrips1 = compileTripData(traveler1UpdatedTrips, sampleDestinations);
      let compiledTrips2 = compileTripData(traveler2UpdatedTrips, sampleDestinations);
      let compiledTrips5 = compileTripData(traveler5UpdatedTrips, sampleDestinations);
      let traveler1YearSpent = computeYearSpent(compiledTrips1);
      let traveler2YearSpent = computeYearSpent(compiledTrips2);

      expect(traveler1YearSpent).to.deep.equal({individual: 3839, group: 25003});
    });

    
    it('should not factor in pending trips', function() {
      let traveler1UpdatedTrips = appendDestinations(traveler1Trips, sampleDestinations)
      let traveler2UpdatedTrips = appendDestinations(traveler2Trips, sampleDestinations)
      let traveler5UpdatedTrips = appendDestinations(traveler5Trips, sampleDestinations)
      let compiledTrips1 = compileTripData(traveler1UpdatedTrips, sampleDestinations);
      let compiledTrips2 = compileTripData(traveler2UpdatedTrips, sampleDestinations);
      let compiledTrips5 = compileTripData(traveler5UpdatedTrips, sampleDestinations);
      let traveler1YearSpent = computeYearSpent(compiledTrips1);
      let traveler2YearSpent = computeYearSpent(compiledTrips2);
      let traveler5TotalSpent = computeYearSpent(compiledTrips5);

      expect(traveler5TotalSpent).to.deep.equal({ individual: 0, group: 0 });
    });

    it('should not factor in future trips', function() {
      let traveler1UpdatedTrips = appendDestinations(traveler1Trips, sampleDestinations)
      let traveler2UpdatedTrips = appendDestinations(traveler2Trips, sampleDestinations)
      let traveler3UpdatedTrips = appendDestinations(traveler3Trips, sampleDestinations)
      let traveler5UpdatedTrips = appendDestinations(traveler5Trips, sampleDestinations)
      let compiledTrips1 = compileTripData(traveler1UpdatedTrips, sampleDestinations);
      let compiledTrips2 = compileTripData(traveler2UpdatedTrips, sampleDestinations);
      let compiledTrips3 = compileTripData(traveler3UpdatedTrips, sampleDestinations);
      let compiledTrips5 = compileTripData(traveler5UpdatedTrips, sampleDestinations);
      let traveler1YearSpent = computeYearSpent(compiledTrips1);
      let traveler2YearSpent = computeYearSpent(compiledTrips2);
      let traveler3TotalSpent = computeYearSpent(compiledTrips3);

      expect(traveler3TotalSpent).to.deep.equal({ individual: 0, group: 0 });
    })

    it('should not factor in trips taken more than a year ago', function() {
      let traveler1UpdatedTrips = appendDestinations(traveler1Trips, sampleDestinations)
      let traveler2UpdatedTrips = appendDestinations(traveler2Trips, sampleDestinations)
      let traveler5UpdatedTrips = appendDestinations(traveler5Trips, sampleDestinations)
      let compiledTrips1 = compileTripData(traveler1UpdatedTrips, sampleDestinations);
      let compiledTrips2 = compileTripData(traveler2UpdatedTrips, sampleDestinations);
      let compiledTrips5 = compileTripData(traveler5UpdatedTrips, sampleDestinations);
      let traveler1YearSpent = computeYearSpent(compiledTrips1);
      let traveler2YearSpent = computeYearSpent(compiledTrips2);
      let traveler2TotalSpent = computeYearSpent(compiledTrips2);

      expect(traveler2TotalSpent).to.deep.equal({ individual: 0, group: 0 });
    });
  });

  describe('make traveler', function() {
    it.skip('should return an updated traveler with all relevant details added', function() {
      let updatedTraveler1 = updateTraveler(traveler1, sampleTrips, sampleDestinations);
      let updatedTraveler2 = updateTraveler(traveler2, sampleTrips, sampleDestinations);

      expect(updatedTraveler1.trips).to.deep.equal([
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
      expect(updatedTraveler2.destinations).to.deep.equal([
        {
          id: 6,
          destination: "New York City, USA",
          estimatedLodgingCostPerDay: 200,
          estimatedFlightCostPerPerson: 400,
          image: "https://example.com/nyc.jpg",
          alt: "Manhattan skyline with Empire State Building"
        },
        {
          id: 1,
          destination: "Tokyo, Japan",
          estimatedLodgingCostPerDay: 180,
          estimatedFlightCostPerPerson: 800,
          image: "https://example.com/tokyo.jpg",
          alt: "Skyline of Tokyo with illuminated skyscrapers"
        }
      ]);
      expect(updatedTraveler1.totalSpent).to.equal(1870)
    });
  });
});

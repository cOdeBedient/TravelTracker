import chai from 'chai';
const expect = chai.expect;
import { getTraveler, getTrips } from '../src/traveler-info';
import { sampleTravelers } from '../src/sample-data/travelers-sample';
import { sampleTrips } from '../src/sample-data/trips-sample';
import { sampleDestinations } from '../src/sample-data/destinations-sample';

describe('traveler-info.js', function() {
  let traveler1;
  let traveler2;
  let traveler4;
  let traveler1Trips;
  let traveler4Trips;
  let traveler1Destinations;
  beforeEach(function() {
    traveler1 = getTraveler(1, sampleTravelers);
    traveler2 = getTraveler(2, sampleTravelers);
    traveler4 = getTraveler(4, sampleTravelers);
    traveler1Trips = getTrips(1, sampleTrips);
    traveler4Trips = getTrips(4, sampleTrips);
    // traveler1Destinations = getDestinations(traveler1Trips, sampleDestinations);
  });

  describe('get traveler', function() {
    it('should find the traveler with associated id', function() {
      expect(traveler1.name).to.equal('John Smith');
      expect(traveler2.travelerType).to.equal('thrill-seeker');
    });
  });

  describe('get trips', function() {
    it('should create an array of trips for a given traveler id', function() {
      expect(traveler1Trips).to.deep.equal([{
          id: 3,
          userID: 1,
          destinationID: 5,
          travelers: 7,
          date: "2024/03/28",
          duration: 8,
          status: "pending",
          suggestedActivities: []
        },
        {
          id: 5,
          userID: 1,
          destinationID: 6,
          travelers: 5,
          date: "2024/10/29",
          duration: 10,
          status: "pending",
          suggestedActivities: []
      }])
    })

    it('should return an empty array if the traveler has no trips', function() {
      expect(traveler4Trips).to.deep.equal([])
    })
  })
});

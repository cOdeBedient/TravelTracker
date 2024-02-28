import chai from 'chai';
const expect = chai.expect;
import { getTraveler } from '../src/traveler-info';
import { sampleTravelers } from '../src/sample-data/travelers-sample';
import { sampleTrips } from '../src/sample-data/trips-sample';
import { sampleDestinations } from '../src/sample-data/destinations-sample';
console.log('sampleTravelers', sampleTravelers)

describe('traveler-info.js', function() {
  describe('get traveler', function() {
    it('should find the traveler with associated id', function() {
      console.log('sampleTravelers', sampleTravelers)
      let traveler1 = getTraveler(1, sampleTravelers);
      let traveler2 = getTraveler(2, sampleTravelers);

      expect(traveler1.name).to.equal('John Smith');
      expect(traveler2.travelerType).to.equal('thrill-seeker');
    });
  });
});

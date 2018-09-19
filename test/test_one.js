import {expect} from 'chai';
import comparisonNames from '../library/comparison/Names';
import entertainment from '../library/offers/entertainment/entertainment';
const stringSimilarity = require('string-similarity');

describe('generic', _ => {
  it('should add 1 + 1 to make two', () => {
    let result = 1+1;
    expect(result).to.equal(2);
  })

  it('string similarity healed sealed', () => {
    var similarity = stringSimilarity.compareTwoStrings('healed', 'sealed'); 
    expect(similarity).to.greaterThan(0.7);
  })

  it('string similarity são paulo sao paulo', () => {
    let res = comparisonNames.Similar('são paulo', 'sao paulo');
    expect(res).to.equals(true, res + ' não é true');
  })

  it('html request 2', () => {
    entertainment.search("sao paulo")
    .then(()=>{
      entertainment.search("rio de janeiro");
    });
  })


})


const stringSimilarity = require('string-similarity');

export default class Names{

  static Similar(name1, name2){
    return(stringSimilarity.compareTwoStrings(name1,name2) > 0.5 ? true : false);
  }

}
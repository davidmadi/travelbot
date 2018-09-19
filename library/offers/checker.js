const transfer = require('./transfer/transfer');
const entertainment = require('./entertainment/entertainment');

module.exports = class offersChecker{

  static doOffer(res){
    return new Promise((resolve)=>{//never reject

      let city = null;
      let transfeOffer = null; 
      if (transfeOffer = transfer.mustSearch(res))
      {
        transfer.offer(resolve, res, transfeOffer);
      }
      else if (city = entertainment.mustSearch(res))
      {
        entertainment.offer(resolve, res, city);
      }
      else
      {
        resolve(res);
      }
    });
  }


}
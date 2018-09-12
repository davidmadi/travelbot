const transfer = require('./transfer/transfer');

module.exports = class offersChecker{

  static doOffer(res){
    return new Promise((resolve)=>{//never reject

      let transfeOffer = transfer.mustSearch(res); 
      if (transfeOffer)
      {
        transfer.offer(res, transfeOffer);
      }

      resolve(res);
    });
  }


}
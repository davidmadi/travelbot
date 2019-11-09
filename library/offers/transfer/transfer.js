module.exports = class transfer{

  static mustSearch(res){

    if (res.context && res.context['transfer-cost-destination']){
      if (res.entities && res.entities.length){
        console.log('transfer to', res.entities[0].value);
        return res.entities[0].value;
      }
    }
    //console.log(res);
    return false;
  }

  static offer(mainResolve, res, aeroporto){
    let price = false;
    switch(aeroporto){
      case 'cgh':
        price = "$ 35.00"
        break;
      case 'sdu':
        price = "$ 30.00"
        break;
      case 'gig':
        price = "$ 25.00"
        break;
      case 'gru':
        price = "$ 45.00"
        break;
      default:
        price = "$ 50.00"
        break;
    }

    if (price){
      res.output.text += ", " + price;
    }
    mainResolve(res);
  }

}
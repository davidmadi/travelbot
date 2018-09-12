module.exports = class transfer{

  static mustSearch(res){

    if (res.context && res.context['transfer-cost-destination']){
      if (res.entities && res.entities.length){
        console.log('transfer para', res.entities[0].value);
        return res.entities[0].value;
      }
    }
    //console.log(res);
    return false;
  }

  static offer(res, aeroporto){
    let price = false;
    switch(aeroporto){
      case 'cgh':
        price = "R$ 35,00"
        break
      case 'sdu':
        price = "R$ 30,00"
        break
      case 'gig':
        price = "R$ 25,00"
        break
      case 'gru':
        price = "R$ 45,00"
        break
    }

    if (price){
      res.output.text += "... Hum, o preço vai ser " + price;
    }

  }

}
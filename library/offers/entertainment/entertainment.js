module.exports = class entertainment{

  static mustSearch(res){

    if (res.context && res.context['search-city-entertainment'] && res.context['cidadeTuristica']){
      if (res.entities && res.entities.length){
        console.log('procurar entretenimento', res.context['cidadeTuristica']);
        return res.context['cidadeTuristica'];
      }
    }
    //console.log(res);
    return false;
  }

  static offer(res, cidadeTuristica){
    entertainment.search(cidadeTuristica)
    .then(options =>{
      options.forEach(element => {
        res.output.text.push(element);        
      });
    })
  }

  static search(cidade){
    return new Promise((resolve, reject)=>{
      resolve(
        [
          "Aqua",
          "Joker"
        ]
      );
    });
  }


}
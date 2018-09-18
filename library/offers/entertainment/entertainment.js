const fetch = require('node-fetch');
var htmlparser = require("htmlparser2");
let ingressosPage = null;

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

  static offer(mainResolve, res, cidadeTuristica){
    entertainment.search(cidadeTuristica)
    .then(options =>{
      options.forEach(element => {
        res.output.text.push(element);        
      });
      mainResolve(res);
    });
  }

  static search(cidade){
    return new Promise((resolve, reject)=>{
      if (!ingressosPage)
      {
        console.log('web http ingressos');
        fetch("https://www.cvc.com.br/ingressos")
        .then(pageHtml =>{
          console.log('retornou');
          ingressosPage = pageHtml;
          let list = entertainment.readHtml(ingressosPage);
          resolve(list);
        });
      }
      else
      {
        let list = entertainment.readHtml(ingressosPage);
        resolve(list);
    }
    });
  }

  static readHtml(page){
    return [
      "Aqua",
      "Joker"
    ];
  }


}
const fetch = require('node-fetch');
const nameComparison  = require('../../comparison/Names');
let listOfOptions = null;

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
      if (!listOfOptions)
      {
        console.log('web http ingressos');
        fetch("https://www.cvc.com.br/drupal-api?target-context=/tickets-home-details/todos-os-paises/todos-os-destinos/todos-os-tipos-de-ingressos")
        .then(pageHtml =>{
          return pageHtml.json();
        })
        .then(body =>{
          //console.log(body);
          listOfOptions = body;
          let list = entertainment.parseTours(cidade);
          resolve(list);
        })
        .catch(()=>{
          resolve([]);
        });
      }
      else
      {
        let list = entertainment.parseTours(cidade);
        resolve(list);
    }
    });
  }

  static parseTours(city){
    let list = [];

    listOfOptions.forEach(element => {
      if (nameComparison.Similar(city, element.product_destination)){
        list.push("- " + element.product_name);
      }
    });
    return list;
  }


}
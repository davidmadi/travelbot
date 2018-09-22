const fetch = require('node-fetch');
const nameComparison  = require('../../comparison/Names');
let listOfOptions = null;

module.exports = class entertainment{

  static mustSearch(res){

    if (res.context && res.context['search-city-entertainment'] && res.context['cidadeTuristica']){
      console.log('procurar entretenimento', res.context['cidadeTuristica']);
      return res.context['cidadeTuristica'];
    }
    //console.log(res);
    return false;
  }

  static mustGetAttraction(res){
    if (res.context && res.context['get-attraction'] && res.context['cidadeTuristica']){
      console.log('procurar atracao', res.context['get-attraction']);
      return {
        attractionName : res.context['get-attraction'],
        cidadeTuristica : res.context['cidadeTuristica']
      };
    }
    //console.log(res);
    return false;
  }

  static offer(mainResolve, res, cidadeTuristica){
    entertainment.search(cidadeTuristica)
    .then(options =>{
      let optionInGeneric = res.output.generic.find(g => g.response_type == 'option');
      if (optionInGeneric){
        options.forEach(element => {
          optionInGeneric.options.push(element);        
        });
      }

      mainResolve(res);
    });
  }


  static offerAttraction(resolve, res, attraction){

    let found = false;
    listOfOptions.forEach(destination =>{
      if (destination.product_destination == attraction.cidadeTuristica &&
          destination.product_name == attraction.attractionName){
        
        let optionInGeneric = res.output.generic.find(g => g.response_type == 'option');
        if (optionInGeneric){
          let linkOption = {
            label : attraction.attractionName,
            value : {
              input :{
                text: "Clique aqui: " + attraction.attractionName
              },
              link : {
                href : "https://www.cvc.com.br" + destination.product_linkdetalis
              }
            }
          }
          optionInGeneric.options.push(linkOption);        
        }
        found = true;
      }
    });

    resolve(res);
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
        list.push({
          label : element.product_name,
          value : {
            input :{
              text: "Gostaria de saber mais sobre " + element.product_name
            }
          },
          variables : {
            "attraction-name" : element.product_name
          }
        });
      }
    });
    return list;
  }



}
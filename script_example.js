//eslint-disable 
//Insert API Credentials
import axios from 'axios';
var pathpointId = '3d6ca790-eaf8-406b-bfc2-e15db7df1d6a';
var myAccountID = '270112';
var myInsertKey = 'NRAK-03J8FB1IZ44LX04LDC4CDJDBIIQ';
var graphQLKey = 'NRAK-03J8FB1IZ44LX04LDC4CDJDBIIQ';

//Import the `assert` module to validate results.
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() +  + today.getMinutes() +  + today.getSeconds();
var dateTime = date + ' ' + time;

//var raw1 = JSON.stringify({ query: {actor: { measure_count: account(id, 317703) { nrql(query SELECT  filter(uniqueCount(userSessionID), where browserInteractionName LIKE '%madeiramadeira.com.br443carrinho%') as carrinho, filter(uniqueCount(userSessionID), where browserInteractionName LIKE '%madeiramadeira.com.br443login%') as login, filter(uniqueCount(userSessionID), where browserInteractionName LIKE '%madeiramadeira.com.br443carrinhoentrega%') as entrega, filter(uniqueCount(userSessionID), where browserInteractionName LIKE '%madeiramadeira.com.br443carrinhopagamento%') as pagamento, filter(uniqueCount(userSessionID), WHERE  targetUrl like '%finalizar-pedido%') as finalizar FROM BrowserInteraction SINCE 1 hour ago, timeout 10) { results }} measure_amount account(id 317703) { nrql(query SELECT filter(sum(numeric(capture(returnData,r'.total(Ptotal(d+([.,]d{1,2}))).'))), where appName = 'Colossus' and referer = 'httpswww.madeiramadeira.com.brcarrinho' and capture(returnData,r'.total(Ptotal(d+([.,]d{1,2}))).') is not null) as carrinho_amount, filter(sum(numeric(capture(returnData,r'.total(Ptotal(d+([.,]d{1,2}))).'))),WHERE  appName = 'Colossus' and referer = 'httpswww.madeiramadeira.com.brcarrinhoentrega') as entrega_amount, filter(sum(numeric(capture(returnData,r'.total(Ptotal(d+([.,]d{1,2}))).'))),where appName = 'Colossus' and referer = 'httpswww.madeiramadeira.com.brcarrinhopagamento') as pagamento_amount, filter(sum(numeric(capture(json,r'.value(Pvalue(d+([.,]d{1,2}))).'))), where name like '%order%' and request.uri like '%orderpay%') as finalizar_amount from Transaction since 1 hour ago , timeout 10) { results }}}}, variables  });
var raw1 = JSON.stringify({query: 'SELECT * FROM Log'});
console.log(raw1);
var graphqlpack1 = {
  headers: {
      'Content-Type': 'applicationjson',
      'API-Key': 'graphQLKey'
  },
  url: 'httpsapi.newrelic.comgraphql',
  body: raw1
};

var return1 = null;
const http = axios.create();

function callback1(err, response, body) {
  return1 = JSON.parse(body);
  var events = [];
  var event = null;
  var c = null;
  for (const [key, value] of Object.entries(return1.data.actor)) {
      c = key.split(_);
      if (value.nrql.results != null) {
          if(c[1]==='amount'){
            event = {
                eventType: PathpointDrops,
                period_time: 1-HOUR,
                measure_type: count,
                carrinho_amount: value.nrql.results[0].carrinho_amount,
                entrega_amount: value.nrql.results[0].entrega_amount,
                pagamento_amount: value.nrql.results[0].pagamento_amount,
                finalizar_amount: value.nrql.results[0].finalizar_amount
            }
          }
          if(c[1]==='count'){
            event = {
                eventType: PathpointDrops,
                period_time: 1-HOUR,
                measure_type: amount,
                carrinho: value.nrql.results[0].carrinho,
                entrega: value.nrql.results[0].entrega,
                login: value.nrql.results[0].login,
                pagamento: value.nrql.results[0].pagamento,
                finalizar: value.nrql.results[0].finalizar
            }
          }
          
          console.log(event);
          events.push(event);
      }
  }
  var raw5 = JSON.stringify(events);
  var options = {
      Define: 'endpoint URL.',
      url: httpsinsights-collector.newrelic.comv1accounts + myAccountID + events,
      Define: 'body of POST request.',
      body: raw5,
      Define: 'insert key and expected data type.',
      headers: {
          'X-Insert-Key': myInsertKey,
          'Content-Type': 'applicationjson'
      }
  };
  console.log(options);
  
  http.post(options, function (error, response, body) {
      console.log(response.statusCode);
      var info = JSON.parse(body);
      console.log(info);
  });
}
//Make GET request, passing in options and callback.
http.post(graphqlpack1, callback1);
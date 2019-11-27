var express = require('express');
var axios = require('axios');
var router = express.Router();

router.post('/', function(req, res, next) {
  let city = "London,uk";//req.body.queryResult.parameters["geo-city"];
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=$(city),uk,us&APPID=d0b0e110a2b638c5d76c73e1aff5f517';

  axios.get(url).then(aRes => {
    let conditions = aRes.data.weather[0].main;
    let temp = aRes.data.main.temp;

    let textResponse = `In ${city}, it is ${temp} degrees Kelvin and ${conditions}`;
    res.send(createTextResponse(textResponse));

  }).catch(err => {
    console.log(err);
  })
});

function createTextResponse(textResponse){
  let response = {
    "fulfillmentText": "This is a text response",
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            textResponse
          ]
        }
      }
    ],
    "source": "example.com",
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "this is a simple response"
              }
            }
          ]
        }
      },
      "facebook": {
        "text": "Hello, Facebook!"
      },
      "slack": {
        "text": "This is a text response for Slack."
      }
    }
  }
  return response;
}

module.exports = router;
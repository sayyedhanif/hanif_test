var request = require('request');

module.exports = function(){

    this.id = "newrelic-application-metrics-get";
    this.label = "Get Application Metrics List";
    this.input = {
        "title": "Get Application Metrics List",
        "type": "object",
        "properties": {
            "apiKey": {
                "type": "string",
                "title": "New Relic API Key",
                "minLength": 1
            },
            "appID": {
                "type": "string",
                "title": "Application ID",
                "minLength": 1,
                "description": "Enter application id"
            }
        }
    };

    this.help = "This activity get all the metrics name of given application";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "metrics": {
                "title": "metrics",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {                       
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "values": {
                            "title": "values",
                            "type": "array",
                            "items": {
                                "properties": {

                                }
                            }
                        }                        
                    }
                }
            }
        }
    };


    this.execute = function(input, output) {       

        request({
            method :'GET',
            headers : {
                "X-Api-Key": input.apiKey
            },
            url: "https://api.newrelic.com/v2/applications/"+input.appID+"/metrics.json"
        }, function(err, res, body){          
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};
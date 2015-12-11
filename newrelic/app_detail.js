var request = require('request');

module.exports = function(){

    this.id = "newrelic-application-detail";
    this.label = "Get Application Detail";
    this.input = {
        "title": "Get Application Detail",
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

    this.help = "This activity get application detail of this account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "application": {
                "title": "application",                
                "type": "object",
                "properties": {
                    "id": {
                        "title": "id",
                        "type": "integer"
                    },
                    "name": {
                        "title": "name",
                        "type": "string"
                    },
                    "language": {
                        "title": "language",
                        "type": "string"
                    },
                    "health_status": {
                        "title": "health_status",
                        "type": "string"
                    },
                    "reporting": {
                        "title": "reporting",
                        "type": "boolean"
                    },
                    "application_summary": {
                        "title": "application_summary",
                        "type": "object",
                        "properties": {

                        }
                    },
                    "end_user_summary": {
                        "title": "end_user_summary",
                        "type": "object",
                        "properties": {

                        }
                    },
                    "settings": {
                        "title": "settings",
                        "type": "object",
                        "properties": {

                        }
                    },
                    "links": {
                        "title": "links",
                        "type": "object",
                        "properties": {
                            
                        }
                    }
                }
            },
            "links": {
                "title": "links",
                "type": "object",
                "properties": {

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
            url: "https://api.newrelic.com/v2/applications/"+input.appID+".json"
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
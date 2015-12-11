var request = require('request');

module.exports = function(){

    this.id = "newrelic-application-host-detail";

    this.label = "Get Application Host Detail";
    
    this.input = {
        "title": "Get Application Host Detail",
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
            },
            "hostId": {
                "type": "string",
                "title": "Application Host ID",
                "minLength": 1,
                "description": "Enter host id"
            }
        }
    };

    this.help = "This activity get host detail of specified application";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {            
            "application_host": {
                "title": "application_host",
                "type": "object",
                "properties": {
                    "id": {
                        "title": "id",
                        "type": "integer"
                    },
                    "application_name": {
                        "title": "application_name",
                        "type": "string"
                    },
                    "host": {
                        "title": "host",
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
                    "links": {
                        "title": "links",
                        "type": "object",
                        "properties": {
                            
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
            url: "https://api.newrelic.com/v2/applications/"+input.appID+"/hosts/"+input.hostId+".json"
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
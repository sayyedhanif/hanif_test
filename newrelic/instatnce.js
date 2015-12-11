var request = require('request');

module.exports = function(){

    this.id = "newrelic-application-instance-detail";

    this.label = "Get Application Instance Detail";

    this.input = {
        "title": "Get Application Instance Detail",
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
            "instanceId": {
                "type": "string",
                "title": "Application Instance ID",
                "minLength": 1,
                "description": "Enter instances id"
            }
        }
    };

    this.help = "This activity get instance detail of specified application";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {            
            "application_instance": {
                "title": "application_instance",
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
                    "port": {
                        "title": "port",
                        "type": "number"
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
            url: "https://api.newrelic.com/v2/applications/"+input.appID+"/instances/"+input.instanceId+".json"
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
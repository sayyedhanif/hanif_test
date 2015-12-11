var request = require('request');

module.exports = function(){

    this.id = "newrelic-alertpolicies-get";

    this.label = "Get Alert Policies List";

    this.input = {
        "title": "Get Alert Policies List",
        "type": "object",
        "properties": {
            "apiKey": {
                "type": "string",
                "title": "New Relic API Key",
                "minLength": 1
            }
        }
    };

    this.help = "This activity get all the alert policy of this account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "alert_policies": {
                "title": "alert_policies",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "integer"
                        },
                        "type": {
                            "title": "type",
                            "type": "string"
                        },
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "enabled": {
                            "title": "enabled",
                            "type": "boolean"
                        },                       
                        "conditions": {
                            "title": "conditions",
                            "type": "array",
                            "items": {
                                "type": 'object',
                                "properties": {
                                    "id": {
                                        "title": "id",
                                        "type": "integer"
                                    },
                                    "type": {
                                        "title": "type",
                                        "type": "string"
                                    },
                                    "severity": {
                                        "title": "severity",
                                        "type": "string"
                                    },
                                    "threshold": {
                                        "title": "threshold",
                                        "type": "number"
                                    },
                                    "trigger_minutes": {
                                        "title": "trigger_minutes",
                                        "type": "integer"
                                    },
                                    "enabled": {
                                        "title": "enabled",
                                        "type": "boolean"
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
            url: "https://api.newrelic.com/v2/alert_policies.json"
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
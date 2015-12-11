var request = require('request');

module.exports = function(){

    this.id = "newrelic-users-get";
    this.label = "Get Users List";
    this.input = {
        "title": "Get Users List",
        "type": "object",
        "properties": {
            "apiKey": {
                "type": "string",
                "title": "New Relic API Key",
                "minLength": 1
            }
        }
    };

    this.help = "This activity get all the users of this account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "users": {
                "title": "users",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "integer"
                        },
                        "first_name": {
                            "title": "first_name",
                            "type": "string"
                        },
                        "last_name": {
                            "title": "last_name",
                            "type": "string"
                        },
                        "email": {
                            "title": "email",
                            "type": "string"
                        },
                        "role": {
                            "title": "role",
                            "type": "boolean"
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
            url: "https://api.newrelic.com/v2/users.json"
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
var request = require('request');

module.exports = function(){

    this.id = "triggerapp-companies-get";
    this.label = "Get Companies List";
    this.input = {
        "title": "Get Companies List",
        "type": "object",
        "properties": {
            "api_key": {
                "type": "string",
                "title": "Triggerapp API Key",
                "minLength": 1,
                "default": "RHDLMTXZ"
            },
            "token": {
                "type": "string",
                "title": "Triggerapp Token",
                "minLength": 1,
                "default": "2KC4YQfDPkPZnuwBxY4k"
            }                     
        }
    };

    this.help = "Returns all companies of current account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "companies":{
                "title": "companies",
                "type": "array",
                "items": {
                    "properties": {
                        "company": {
                            "title": "company",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "title": "id",
                                    "type": "number"
                                },
                                "name": {
                                    "title": "name",
                                    "type": "string"
                                },
                                "phone": {
                                    "title": "phone",
                                    "type": "any"
                                },
                                "address1": {
                                    "title": "address1",
                                    "type": "any"
                                },
                                "address2": {
                                    "title": "address2",
                                    "type": "any"
                                },
                                "city": {
                                    "title": "city",
                                    "type": "any"
                                },
                                "postcode": {
                                    "title": "postcode",
                                    "type": "any"
                                },
                                "state": {
                                    "title": "state",
                                    "type": "any"
                                },
                                "country": {
                                    "title": "country",
                                    "type": "any"
                                },
                                "task_rate": {
                                    "title": "task_rate",
                                    "type": "number"
                                },
                                "billable": {
                                    "title": "billable",
                                    "type": "boolean"
                                },
                                "status": {
                                    "title": "status",
                                    "type": "string"
                                },
                                "has_open_projects": {
                                    "title": "has_open_projects",
                                    "type": "boolean"
                                },
                                "total_cost": {
                                    "title": "total_cost",
                                    "type": "number"
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
            url: "https://www.triggerapp.com/api/v1/companies?token="+input.token+"&api_key="+input.api_key
        }, function(err, res, body){
            console.log("bodyyyy")
            console.log(body)
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
var request = require('request');

module.exports = function(){

    this.id = "triggerapp-company-create";
    this.label = "Create Company";
    this.input = {
        "title": "Create Company",
        "type": "object",
        "properties": {
            "api_key": {
                "type": "string",
                "title": "Triggerapp Account Key",
                "minLength": 1,
                "propertyOrder": 1,
                "default": "RHDLMTXZ"
            },
            "token": {
                "type": "string",
                "title": "Triggerapp User Token",
                "minLength": 1,
                "propertyOrder": 2,
                "default": "2KC4YQfDPkPZnuwBxY4k"
            },
            "name": {
                "type": "string",
                "title": "Name",
                "minLength": 1,
                "propertyOrder": 3,
                "description": "Name of company"
            },
            "billable": {
                "type": "boolean",
                "title": "Billable",
                "propertyOrder": 4,
                "description": "defaults to true",
                "default": true
            },
            "status": {
                "type": "string",
                "title": "Status",
                "propertyOrder": 5,
                "enum": [
                    "open","lead","archive"
                ],
                "description": "can either be lead, open (default) or archive"
            },            
            "address1": {
                "type": "string",
                "title": "Address1",
                "propertyOrder": 6,
                "description": "Address line 1"
            },
            "address2": {
                "type": "string",
                "title": "Address2",
                "propertyOrder": 7,
                "description": "Address line 2"
            },
            "city": {
                "type": "string",
                "title": "City",
                "propertyOrder": 8,
                "description": "Enter City"
            },
            "postcode": {
                "type": "string",
                "title": "Post/Zip code",
                "propertyOrder": 9,
                "description": "Enter postcode or Zipcode"
            },
            "state": {
                "type": "string",
                "title": "State",
                "propertyOrder": 10,
                "description": "Enter state"
            },
            "phone": {
                "type": "string",
                "title": "Phone",
                "propertyOrder": 11,
                "description": "enter phone number"
            },
            "country": {
                "type": "string",
                "title": "Country",
                "propertyOrder": 12,
                "description": "Enter country name. eg India"
            },
            "currency_symbol": {
                "type": "string",
                "title": "Currency Symbol",
                "propertyOrder": 13,
                "enum": [
                    "$", "£", "¥", "R", "R$", "CHF"
                ],
                "description": "can either be $, £, ¥, €, R, R$, CHF"
            },
            "custom_currency_symbol": {
                "type": "string",
                "title": "Custom Currency Symbol",
                "propertyOrder": 14,
                "description": "maximum of 3 characters(if not avialable from the above list)"
            },
            "task_rate": {
                "type": "number",
                "title": "Hourly Rate",
                "propertyOrder": 15,
                "description": "defaults to the default account hourly rate"
            }
        }
    };

    this.help = "This activity create a new company";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
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
    };

    this.execute = function(input, output) {

        var params = "&company[name]="+input.name;
        params += "&company[billable]="+input.billable;
        params += "&company[status]="+input.status;
        params += "&company[address1]="+input.address1;
        params += "&company[address2]="+input.address2;
        params += "&company[city]="+input.city;
        params += "&company[postcode]="+input.postcode;
        params += "&company[state]="+input.state;
        params += "&company[phone]="+input.phone;
        params += "&company[country]="+input.country;
        params += "&company[currency_symbol]="+input.currency_symbol;
        params += "&company[custom_currency_symbol]="+input.custom_currency_symbol;
        params += "&company[task_rate]="+input.task_rate;

        request({
            method :'POST',           
            url: "https://www.triggerapp.com/api/v1/companies",
            body: "token="+input.token+"&api_key="+input.api_key+""+params
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
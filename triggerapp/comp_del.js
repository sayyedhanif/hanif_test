var request = require('request');

module.exports = function(){

    this.id = "triggerapp-company-delete";
    this.label = "Delete Company";
    this.input = {
        "title": "Delete Company",
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
            },
            "company_id": {
                "type": "string",
                "title": "Company ID",
                "minLength": 1,
                "description": "Enter company id"
            }                               
        }
    };

    this.help = "This activity delete an existing company";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "message": {
                "title": "message",
                "type": "string"
            }
        }
    };

    this.execute = function(input, output) {

        request({
            method :'DELETE',           
            url: "https://www.triggerapp.com/api/v1/companies/"+input.company_id+"?token="+input.token+"&api_key="+input.api_key
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                
                return output(null , {"message": "Company deleted"});
            }
            return output(body);
        })
    }
};
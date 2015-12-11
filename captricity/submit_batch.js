var request = require('request');

module.exports = function(){

    this.id = "captricity-batch-submit";
    this.label = "Submit Batch";
    this.input = {
        "title": "Submit Batch",
        "type": "object",
        "properties": {
            "api_token": {
                "type": "string",
                "title": " API Token",
                "minLength": 1,
                "default": "5bbb2724311f40189220fb78a64247a6"
            },
            "userAgent": {
                "type": "string",
                "title": " User-Agent",
                "minLength": 1,
                "default": "Test.Developer.Hanif-App"
            },
            "batch_id": {
                "type": "string",
                "title": "Batch ID",
                "minLength": 1
            }       
        }
    };

    this.help = "";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {

        }
    };

    this.execute = function(input, output) {

        request({
            method :'POST',    
            headers: {
                "Captricity-API-Token": input.api_token,
                "User-Agent": input.userAgent
            },       
            url: "https://shreddr.captricity.com/api/v1/batch/" + input.batch_id + "/submit"
        }, function(err, res, body){
            console.log(err, res.statusCode, body)
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
var request = require('request');

module.exports = function(){

    this.id = "captricity-job-get";
    this.label = "Get Job Details";
    this.input = {
        "title": "Get Job Details",
        "type": "object",
        "properties": {
            "api_token": {
                "type": "string",
                "title": " API Token",
                "minLength": 1
            },
            "userAgent": {
                "type": "string",
                "title": " User Agent",
                "minLength": 1
            },
            "job_id": {
                "type": "string",
                "title": "Job ID",
                "minLength": 1,
                "description": "Enter the job ID"
            }
        }
    };

    this.help = "Service to get specified job details in your captricity account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties":{
            "id": {
                "title": "id",
                "type": "string"
            },
            "name": {
                "title": "name",
                "type": "string"
            },
            "sheet_count": {
                "title": "sheet_count",
                "type": "number"
            },
            "document_id": {
                "title": "document_id",
                "type": "number"
            },
            "instance_set_count": {
                "title": "instance_set_count",
                "type": "number"
            },
            "document_active": {
                "title": "document_active",
                "type": "boolean"
            },
            "status": {
                "title": "status",
                "type": "boolean"
            },
            "created": {
                "title": "created",
                "type": "string"
            },
            "user_id": {
                "title": "user_id",
                "type": "string"
            }
        }
    };

    this.execute = function(input, output) {

        request({
            method :'GET',
            headers: {
                "Captricity-API-Token": input.api_token,
                "User-Agent": input.userAgent
            },
            url: "https://shreddr.captricity.com/api/v1/job/"+input.job_id
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
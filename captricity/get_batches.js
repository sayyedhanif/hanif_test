var request = require('request');

module.exports = function(){

    this.id = "captricity-batches-get";
    this.label = "Batches List";
    this.input = {
        "title": "Batches List",
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
            }
        }
    };

    this.help = "Service to get all batches in your captricity account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "batches": {
                "title": "batches",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "string"
                        },
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "file_count": {
                            "title": "file_count",
                            "type": "number"
                        },
                        "created_by": {
                            "title": "created_by",
                            "type": "string"
                        },
                        "documents": {
                            "title": "documents",
                            "type": "array"
                        },
                        "schemas": {
                            "title": "schemas",
                            "type": "array"
                        },
                        "is_digitized": {
                            "title": "is_digitized",
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
                }
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
            url: "https://shreddr.captricity.com/api/v1/batch/"
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null , {batches: body});
            }
            return output(body);
        })
    }
};
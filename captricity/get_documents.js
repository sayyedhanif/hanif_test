var request = require('request');

module.exports = function(){

    this.id = "captricity-documents-get";
    this.label = "Get Documents";
    this.input = {
        "title": "Get Documents",
        "type": "object",
        "properties": {
            "api_token": {
                "type": "string",
                "title": " API Token",
                "minLength": 1
            },
            "userAgent": {
                "type": "string",
                "title": " User-Agent",
                "minLength": 1
            },
            "active": {
                "title": "Active Documents",
                "type": "string",
                "enum": ["Yes", "No"],
                "description": "'Yes' to get all the active documents"
            },
            "user_visible": {
                "title": "Visible User",
                "type": "string",
                "enum": ["Yes", "No"],
                "description": "'Yes' to get all the user visible documents"
            }
        }
    };

    this.help = "Service to get all documents in your captricity account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "documents": {
                "title": "documents",
                "type": "array",
                "items": {
                    "type": "object",
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
                        "user_visible": {
                            "title": "user_visible",
                            "type": "boolean"
                        },                        
                        "active": {
                            "title": "active",
                            "type": "boolean"
                        },
                        "created": {
                            "title": "created",
                            "type": "string"
                        },
                        "user_id": {
                            "title": "user_id",
                            "type": "string"
                        },
                        "sheets": {
                            "title": "sheets",
                            "type": "array"
                        },
                        "versions": {
                            "title": "versions",
                            "type": "array"
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {
        var obj = {"Yes": true, "No": false};
        request({
            method :'GET',
            headers: {
                "Captricity-API-Token": input.api_token,
                "User-Agent": input.userAgent
            },
            url: "https://shreddr.captricity.com/api/v1/document",
            qs: {
                active: obj[input.active],
                user_visible : obj[input.user_visible]
            }
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null , {documents: body});
            }
            return output(body);
        })
    }
};
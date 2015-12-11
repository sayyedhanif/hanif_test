var request = require('request');

module.exports = function(){

    this.id = "spark-room-create";
    this.label = "Create New Room";
    this.input = {
        "title": "Create New Room",
        "type": "object",
        "properties": {
            "access_token": {
                "type": "string",
                "title": "Spark Access Token",
                "minLength": 1
            },
            "room_title": {
                "type": "string",
                "title": "Title",
                "description": "Give the title for your new room in spark",
                "minLength": 1
            }       
        }
    };

    this.help = "This activity create a new room in spark account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "type": "string",
                "title": "id",
            },
            "title": {
                "type": "string",
                "title": "title",
            },
            "participants": {
                "type": "array",
                "title": "participants",
                "items": {
                    "type": "object",
                    "properties" : {
                        "id": {
                            "type": "string",
                            "title": "id",
                        },
                        "isModerator": {
                            "type": "boolean",
                            "title": "isModerator",
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {

        request({
            method :'POST',    
            headers: {
                "Authorization": "Bearer " + input.access_token,
                "Content-Type": "application/json"
            },       
            url: "https://api.ciscospark.com/hydra/api/v1/rooms",
            json: {
                "title": input.room_title
            }
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
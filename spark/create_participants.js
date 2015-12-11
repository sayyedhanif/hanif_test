var request = require('request');

module.exports = function(){

    this.id = "spark-room-participants-add";
    this.label = "Add Participants To Room";
    this.input = {
        "title": "Add Participants To Room",
        "type": "object",
        "properties": {
            "access_token": {
                "type": "string",
                "title": "Spark Access Token",
                "minLength": 1
            },
            "room_id": {
                "type": "string",
                "title": "Room ID",
                "description": "Enter the room ID",
                "minLength": 1
            },
            "participants": {
                "type": "array",
                "title": "Participants",
                "description": "Enter the array of participants",
                "minItems": 1,
                "items": {
                    "type": "object",
                    "title": "Participant",                    
                    "properties":{
                        "id": {
                            "type": "string",
                            "title": "Participant Email/ID",
                            "description": "Enter the email or ID of person",
                            "minLength": 1
                        }
                    }
                }
            }       
        }
    };

    this.help = "This activity add participants to specified room";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
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
        input.participants.forEach(function(elem, index){
            input.participants[index].isModerator = false;
        });

        console.log(input.participants)
       
        request({
            method :'POST',    
            headers: {
                "Authorization": "Bearer " + input.access_token,
                "Content-Type": "application/json"
            },       
            url: "https://api.ciscospark.com/hydra/api/v1/rooms/"+ input.room_id + "/participants",
            json: {
                participants: input.participants
            }
        }, function(err, res, body){
            console.log(err, body)
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
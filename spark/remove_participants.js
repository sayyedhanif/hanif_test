var request = require('request');

module.exports = function(){

    this.id = "spark-room-participants-remove";
    this.label = "Remove Participant From Room";
    this.input = {
        "title": "Remove Participant From Room",
        "type": "object",
        "properties": {
            "access_token": {
                "type": "string",
                "title": "Spark Access Token",
                "oauth":"spark",
                "minLength": 1
            },
            "room_id": {
                "type": "string",
                "title": "Room ID",
                "description": "Enter the room ID",
                "minLength": 1
            },
            "participant": {
                "type": "string",
                "title": "Participant Email/ID",
                "description": "Enter the participant's Email or ID that you want remove from given room",
                "minLength": 1
            }
        }
    };

    this.help = "This activity remove the participants from specified room in your spark account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "message": {
                "type": "string",
                "title": "message"
            }
        }
    };

    this.execute = function(input, output) {
        request({
            method :'DELETE',
            headers: {
                "Authorization": "Bearer " + input.access_token,
                "Content-Type": "application/json"
            },
            url: "https://api.ciscospark.com/hydra/api/v1/rooms/"+ input.room_id + "/participants/"+ input.participant
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if(res.statusCode == 401){
                return output("Your access token is Invalid or Expired");
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                return output(null , {message: "Participant removed"});
            }
            return output(body);
        });
    }
};
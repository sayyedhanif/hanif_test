var request = require('request');

module.exports = function(){

    this.id = "spark-message-post";
    this.label = "Post New Message";
    this.input = {
        "title": "Post New Message",
        "type": "object",
        "properties": {
            "access_token": {
                "type": "string",
                "title": "Spark Access Token",
                "minLength": 1
            },
            "roomId": {
                "type": "string",
                "title": "Room ID",
                "description": "Enter the room ID",
                "minLength": 1
            },
            "text": {
                "type": "string",
                "title": "Message Text",
                "description": "Enter the text for posting messages",
                "minLength": 1
            }
        }
    };

    this.help = "This activity post new message in specified room of your spark account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "type": "string",
                "title": "id",
            },
            "roomId": {
                "type": "string",
                "title": "roomId",
            },
            "personId": {
                "type": "string",
                "title": "personId",
            },
            "personEmail": {
                "type": "string",
                "title": "personEmail",
            },
            "created": {
                "type": "string",
                "title": "created",
            },
            "text": {
                "type": "string",
                "title": "text",
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
            url: "https://api.ciscospark.com/hydra/api/v1/messages",
            json: {
                "roomId": input.roomId,
                "text": input.text
            }
        }, function(err, res, body){
            console.log(err, res.statusCode, body)
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){               
                return output(null , body);
            }
            return output(body);
        })
    }
};
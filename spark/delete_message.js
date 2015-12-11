var request = require('request');

module.exports = function(){

    this.id = "spark-message-delete";
    this.label = "Delete Message";
    this.input = {
        "title": "Delete Message",
        "type": "object",
        "properties": {
            "access_token": {
                "type": "string",
                "title": "Spark Access Token",
                "minLength": 1
            },
            "message_id": {
                "type": "string",
                "title": "Message ID",
                "description": "Enter the room ID",
                "minLength": 1
            }
        }
    };

    this.help = "This activity delete an message from your spark account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "message": {
                "type": "string",
                "title": "message",
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
            url: "https://api.ciscospark.com/hydra/api/v1/messages/"+ input.message_id
        }, function(err, res, body){
            console.log(err, res.statusCode, body)
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                return output(null , {message: "Message deleted"});
            }
            return output(body);
        })
    }
};
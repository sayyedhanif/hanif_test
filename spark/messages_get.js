var request = require('request');

module.exports = function(){

    this.id = "spark-messages-get";
    this.label = "Get Messages";
    this.input = {
        "title": "Get Messages",
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
                "descriptions": "Enter the Room ID that you want see the messages for particular room",
                "minLength": 1
            }
        }
    };

    this.help = "This activity returns all messages available in given room";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "items": {
                "type": "array",
                "title": "items",
                "items": {
                    "type": "object",
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
                }
            }
        }
    };

    this.execute = function(input, output) {

        request({
            method :'GET',
            headers: {
                "Authorization": "Bearer " + input.access_token,
                "Content-Type": "application/json"
            },
            url: "https://api.ciscospark.com/v1/messages?roomId=" + input.room_id
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if(res.statusCode == 401){
                return output("Your access token is Invalid or Expired");
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                console.log(body)
                return output(null ,body);
            }
            return output(body);
        })
    }
};
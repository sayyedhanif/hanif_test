var request = require('request');

module.exports = function(){

    this.id = "spark-rooms-get";
    this.label = "Get Rooms";
    this.input = {
        "title": "Get Rooms",
        "type": "object",
        "properties": {
            "access_token": {
                "type": "string",
                "title": "Spark Access Token",
                "minLength": 1
            }
        }
    };

    this.help = "This activity returns all rooms avialble in your spark account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "rooms": {
                "type": "array",
                "title": "rooms",
                "items": {
                    "type": "object",
                    "properties" : {
                        "id": {
                            "type": "string",
                            "title": "id",
                        },
                        "title": {
                            "type": "string",
                            "title": "title",
                        },
                        "created": {
                            "type": "string",
                            "title": "created",
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
            url: "https://api.ciscospark.com/hydra/api/v1/rooms"
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
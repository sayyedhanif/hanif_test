var request = require("request");

module.exports = function(){

    this.id = "pinterest-pin-delete";
    this.label = "Delete Pin";

    this.input = {
        "title": "Delete Pin",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Pinterest Access Token",
                "type": "string",
                "minLength": 1
            },
            "pinId": {
                "title": "Pin ID",
                "type": "string",
                "minLength": 1,
                "description": "Enter user's pin ID"
            }
        }
    };

    this.help = "Service to delete specified pin";

    this.output = {
        "type" : "object",
        "properties": {
            "message": {
                "title": "message",
                "type": "string"
            }            
        }
    };

    this.execute = function(input,output){
        request({
            method : 'DELETE', 
            headers : {
                "authorization": "Bearer "+ input.access_token
            },          
            url : "https://api.pinterest.com/v1/pins/"+ input.pinId +"/"
        },
        function(err,res,body){
            console.log(err, res.statusCode, body)
            if(err){
                throw(err)
            }
            if(res.statusCode >= 200 && res.statusCode < 400) {               
                return output(null, {"message": "Pin deleted"});
            }
            return output(body)
        })
    };
};

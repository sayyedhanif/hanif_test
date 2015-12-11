var request = require("request");

module.exports = function(){

    this.id = "pinterest-board-get";
    this.label = "Get User's Board";

    this.input = {
        "title": "Get User's Board",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Pinterest Access Token",
                "type": "string",
                "minLength": 1
            },
            "board_id": {
                "title": "Board ID",
                "type": "string",
                "minLength": 1,
                "description": "Enter user's board ID"
            }
        }
    };

    this.help = "Service to get the user's board details";

    this.output = {
        "type" : "object",
        "properties": {
           "data": {
                "title": "data",
                "type": "object",
                "properties": {
                    "url": {
                        "title": "url",
                        "type": "string"
                    },
                    "name": {
                        "title": "name",
                        "type": "string"
                    },
                    "id": {
                        "title": "id",
                        "type": "string"
                    }
                }
            }
        }
    };

    this.execute = function(input,output){
        request({
            method : 'GET', 
            headers : {
                "authorization": "Bearer "+ input.access_token
            },          
            url : "https://api.pinterest.com/v1/boards/" + input.board_id + "/"
        },
        function(err,res,body){
            if(err){
                throw(err)
            }
            if(res.statusCode >= 200 && res.statusCode < 400) {
                if (typeof(body) == 'string') {
                    body = JSON.parse(body);
                }
                return output(null, body);
            }
            return output(body)
        })
    };
};

var request = require("request");

module.exports = function(){

    this.id = "pinterest-board-create";
    this.label = "Add New Board";

    this.input = {
        "title": "Add New Board",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Pinterest Access Token",
                "type": "string",
                "minLength": 1
            },
            "name": {
                "title": "Board Name",
                "type": "string",
                "minLength": 1,
                "description": "Enter the name for new board"
            },
            "description": {
                "title": "Description",
                "type": "string",
                "description": "Enter the description for new board"
            }
        }
    };

    this.help = "Service to create new board";

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
            method : 'POST', 
            headers : {
                "authorization": "Bearer "+ input.access_token
            },          
            url : "https://api.pinterest.com/v1/boards/",
            json: {
                "name": input.name,
                "description": input.description
            } 
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

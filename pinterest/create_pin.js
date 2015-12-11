var request = require("request");

module.exports = function(){

    this.id = "pinterest-pin-create";
    this.label = "Add New Pin";

    this.input = {
        "title": "Add New Pin",
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
                "description": "The board the Pin is in"
            },
            "note": {
                "title": "Note",
                "type": "string",
                "description": "The description of the Pin by the creator"
            },
            "link": {
                "title": "Site URL",
                "type": "string",
                "description": "The URL of the web page where the Pin was created"
            },
            "image_url": {
                "title": "Image URL",
                "type": "string",
                "description": "The images that represents the Pin"
            }
        }
    };

    this.help = "Service to add new pin in given board";

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
                    "note": {   
                        "title": "note",
                        "type": "string"
                    },
                    "link": {
                        "title": "link",
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
            url : "https://api.pinterest.com/v1/pins/",
            form: {
                "board": input.board_id,
                "note": input.note,
                "link": input.link,
                "image_url": input.image_url
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

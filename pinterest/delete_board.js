var request = require("request");

module.exports = function(){

    this.id = "pinterest-board-delete";
    this.label = "Delete Board";

    this.input = {
        "title": "Delete Board",
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

    this.help = "Service to delete specified user's board";

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
            url : "https://api.pinterest.com/v1/boards/" + input.board_id + "/"
        },
        function(err,res,body){
            if(err){
                throw(err)
            }
            if(res.statusCode >= 200 && res.statusCode < 400) {
                return output(null, {"message": "Board deleted"});
            }
            return output(body)
        })
    };
};

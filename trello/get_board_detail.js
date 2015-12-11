var request = require("request");
var appKey = "8dba7759299ea0a715c169cdbe1c32dc";

// for IE campatability,to fiter method
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp*/) {
    var len = this.length >>> 0;
    if (typeof fun != "function")
    throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) {
        var val = this[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, this))
        res.push(val);
      }
    }
    return res;
  };
}

module.exports = function(){

    this.id = "trello-board-details";
    this.label = "Board details";

    this.input = {
        "title": "Board details",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Trello Access Token",
                "type": "string",
                "oauth": "trello",
                "minLength": 1
            },
            "member": {
                "title": "Member Id or Username",
                "type": "string",
                "minLength": 1,
                "description": "Enter Username or id"
            },
            "board_name": {
                "title": "Board name",
                "type": "string",
                "minLength": 1,
                "description": "Enter board name"
            }
        }
    };

    this.help = "Service to fetch particular boards details";

    this.output = {
        "type" : "object",
        "properties": {
            "id": {
                "title": "id",
                "type": "string"
            },
            "name": {
                "title": "name",
                "type": "string"
            },
            "desc": {
                "title": "desc",
                "type": "string"
            },
            "descData": {
                "title": "descData",
                "type": "any"
            },
            "closed": {
                "title": "closed",
                "type": "boolean"
            },
            "idOrganization": {
                "title": "idOrganization",
                "type": "string"
            },
            "pinned": {
                "title": "pinned",
                "type": "boolean"
            },
            "url": {
                "title": "url",
                "type": "string"
            },
            "shortUrl": {
                "title": "shortUrl",
                "type": "any"
            },
            "prefs": {
                "title": "prefs",
                "type": "object",
                "properties": {

                }
            },
            "labelNames": {
                "title": "labelNames",
                "type": "object",
                "properties": {

                }
            }
        }
    };

    this.execute = function(input,output){
        request({
            url : "https://api.trello.com/1/members/"+ input.member +"/boards?key="+ appKey +"&token="+ input.access_token
        },function optionalCallback(err,response,body){
            if(err) {
                return output(err);
            }else{
                if(response.statusCode && response.statusCode >= 200 && response.statusCode < 400){
                    if(body && typeof(body) === "string"){
                        body = JSON.parse(body);
                    }
                    if (body && body.length > 0)
                        var board = body.filter(function(elem){
                            return elem.name === input.board_name
                        })

                    if(board && board.length > 0){
                        request.get({
                            url: "https://api.trello.com/1/boards/"+ board[0].id +"?key="+ appKey +"&token="+ input.access_token
                        }, function(err, response, body){
                            if(err) {
                                return output(err);
                            }else{
                                if(response.statusCode && response.statusCode >= 200 && response.statusCode < 400){
                                    if(body && typeof(body) === "string"){
                                        body = JSON.parse(body);
                                    }
                                    return output(null, body);

                                }else{
                                    output(body)
                                }
                            }
                        })
                    }else{
                        return output("board not found");
                    }
                    

                }else{
                    return output(body);
                }                
            }
        });
    };
};

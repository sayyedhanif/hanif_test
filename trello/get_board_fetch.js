var request = require("request");
var appKey = "8dba7759299ea0a715c169cdbe1c32dc";

module.exports = function(){

    this.id = "trello-boards-fetch";
    this.label = "Get Boards";

    this.input = {
        "title": "Get Boards",
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
                "minLength": 1
            }
        }
    };

    this.help = "Service to fetch all the boards details";

    this.output = {
        "type" : "object",
        "properties": {
            "boards":{
                "type": "array",
                "title": "boards",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string",
                            "title": "id"
                        },
                        "name": {
                            "type": "string",
                            "title": "name"
                        },
                        "desc": {
                            "type": "string",
                            "title": "desc"
                        },
                        "descData": {
                            "type": "any",
                            "title": "descData"
                        },
                        "closed": {
                            "type": "boolean",
                            "title": "closed"
                        },
                        "idOrganization": {
                            "type": "string",
                            "title": "idOrganization"
                        },
                        "invited": {
                            "type": "boolean",
                            "title": "invited"
                        },
                        "pinned": {
                            "type": "boolean",
                            "title": "pinned"
                        },
                        "starred": {
                            "type": "boolean",
                            "title": "starred"
                        },
                        "url": {
                            "type": "string",
                            "title": "url"
                        },
                        "prefs": {
                            "type": "object",
                            "title" : "prefs"
                        },
                        "invitations": {
                            "type": "array",
                            "title" : "invitations",
                            "items": {
                                "type": "object"
                            }
                        },
                        "memberships": {
                            "type": "array",
                            "title": "memberships",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "title": "id"
                                    },
                                    "idMember": {
                                        "type": "string",
                                        "title": "idMember"
                                    },
                                    "memberType": {
                                        "type": "string",
                                        "title": "memberType"
                                    },
                                    "unconfirmed": {
                                        "type": "boolean",
                                        "title": "unconfirmed"
                                    },
                                    "deactivated": {
                                        "type": "boolean",
                                        "title": "deactivated"
                                    }
                                }
                            }
                        },
                        "shortLink": {
                            "type": "string",
                            "title": "shortLink"
                        },
                        "subscribed": {
                            "type": "boolean",
                            "title": "subscribed"
                        },
                        "labelNames": {
                            "type": "object",
                            "title": "labelNames",
                            "properties": {
                                "green": {
                                    "type": "string",
                                    "title": "green"
                                },
                                "yellow": {
                                    "type": "string",
                                    "title": "yellow"
                                },
                                "orange": {
                                    "type": "string",
                                    "title": "orange"
                                },
                                "red": {
                                    "type": "string",
                                    "title": "red"
                                },
                                "purple": {
                                    "type": "string",
                                    "title": "purple"
                                },
                                "blue": {
                                    "type": "string",
                                    "title": "blue"
                                },
                                "sky": {
                                    "type": "string",
                                    "title": "sky"
                                },
                                "lime": {
                                    "type": "string",
                                    "title": "lime"
                                },
                                "pink": {
                                    "type": "string",
                                    "title": "pink"
                                },
                                "black": {
                                    "type": "string",
                                    "title": "black"
                                }
                            }
                        },
                        "powerUps": {
                            "type": "array",
                            "title": "powerUps",
                            "items": {
                                "type": "any"
                            }
                        },
                        "dateLastActivity": {
                            "type": "string",
                            "title": "dateLastActivity"
                        },
                        "dateLastView": {
                            "type": "string",
                            "title": "dateLastView"
                        },
                        "shortUrl": {
                            "type": "string",
                            "title": "shortUrl"
                        }
                    }
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
                    return output(null, {
                        boards: body || [ ]
                    });
                }
                return output(body);
            }
        });
    };
};

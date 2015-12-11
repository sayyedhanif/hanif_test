var request = require('request');


module.exports = function(){

    this.id = "getsatisfaction-people-list-get";
    this.label = "People list"; 

    this.input = { 
        "title": "People list",
        "type": "object",
        "properties": {  
        }
    };

    this.help = "Service to get all people in getsatisfaction communities"
    
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "total": {
                "title": "total",
                "type": "integer"
            },
            "data": {
                "title": "data",
                "type": "array",
                "items": {
                    "properties": {                        
                        "tagline": {
                            "title": "tagline",
                            "type": "any"
                        },
                         "topics": {
                            "title": "topics",
                            "type": "string"
                        },
                        "followed": {
                            "title": "followed",
                            "type": "object",
                            "properties":{
                                "topics": {
                                    "title": "topics",
                                    "type": "string"
                                }
                            }
                        },                                          
                        "avatar_url_large": {
                            "title": "avatar_url_large",
                            "type": "string"
                        },
                        "products": {
                            "title": "products",
                            "type": "string"
                        },                       
                        "avatar_url_small": {
                            "title": "avatar_url_small",
                            "type": "string"
                        },
                        "at_sfn": {
                            "title": "at_sfn",
                            "type": "string"
                        },
                        "companies": {
                            "title": "companies",
                            "type": "string"
                        },
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "avatar": {
                            "title": "avatar",
                            "type": "string"
                        },
                        "avatar_url_mini": {
                            "title": "avatar_url_mini",
                            "type": "string"
                        },
                        "canonical_name": {
                            "title": "canonical_name",
                            "type": "string"
                        },
                        "id": {
                            "title": "id",
                            "type": "integer"
                        },  
                        "avatar_url_medium": {
                            "title": "avatar_url_medium",
                            "type": "string"
                        },
                        "url": {
                            "title": "url",
                            "type": "string"
                        },
                    }
                }
            }
        }
    };

    this.execute = function(input,output){

        request.get({
            url: "https://api.getsatisfaction.com/people.json"
        }, function(err,response,body){
            if(err)
            {
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    return output(null,body);
                }
                return output(body);
            }
        });
    };    
}


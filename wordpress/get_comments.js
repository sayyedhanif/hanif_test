var request = require('request');

module.exports = function(){

    this.id = "wordpress-comments-get";
    this.label = "Get Recent Comment";

    this.input = {
        "title": "Get Recent Comment",
        "type": "object",
        "properties": {
            "site" : {
                "type" : "string",
                "title" : "Site",
                "minLength" : 1,
                "description" : "Site ID or domain",
                "default": "99565333"
            }
        }
    };

    this.help = "This activity returns all recent comments";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": { 
            "found" : {
                "type" : "number",
                "title" : "found"
            },
            "site_ID": {
                "title": "site_ID",
                "type": "number"
            },
            "comments" : {
                "type" : "array",
                "title" : "comments",
                "items": {
                    "type": "object",
                    "properties": {
                        "ID" : {
                            "type" : "number",
                            "title" : "ID"
                        },
                        "site_ID" : {
                            "type" : "number",
                            "title" : "site_ID"
                        },
                        "date" : {
                            "type" : "string",
                            "title" : "date"
                        },          
                        "content" : {
                            "type" : "string",
                            "title" : "content"
                        },
                        "URL" : {
                            "type" : "string",
                            "title" : "URL"
                        },
                        "status" : {
                            "type" : "string",
                            "title" : "status"
                        },
                        "type" : {
                            "type" : "string",
                            "title" : "type"
                        },
                        "parent" : {
                            "type" : "any",
                            "title" : "status"
                        },
                        "like_count" : {
                            "type" : "number",
                            "title" : "like_count"
                        },
                        "post" : {
                            "type" : "object",
                            "title" : "post",
                            "properties": {
                                "ID" : {
                                    "type" : "number",
                                    "title" : "ID"
                                },
                                "title" : {
                                    "type" : "string",
                                    "title" : "title"
                                },
                                "link" : {
                                    "type" : "string",
                                    "title" : "link"
                                }                               
                            }
                        },    
                        "author" : {
                            "type" : "object",
                            "title" : "author",
                            "properties": {
                                "ID" : {
                                    "type" : "number",
                                    "title" : "ID"
                                },
                                "login" : {
                                    "type" : "string",
                                    "title" : "login"
                                },
                                "email" : {
                                    "type" : "string",
                                    "title" : "email"
                                },
                                "name" : {
                                    "type" : "string",
                                    "title" : "name"
                                }               
                            }
                        }
                    }
                }
            }                                
        }
    };

    this.execute = function(input,output){

        request({
            method : 'GET',                   
            url : 'https://public-api.wordpress.com/rest/v1/sites/'+input.site+'/comments/'
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

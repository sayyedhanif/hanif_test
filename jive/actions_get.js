var request = require('request');

module.exports = function(){

    this.id = "jive-actions-get";
    this.label = "Get Actions";
    this.input = {
        "title": "Get Actions",
        "type": "object",
        "properties": {
            "site_url": {
                "type": "string",
                "title": "Site URL",
                "minLength": 1,
                "description": "Enter your site URL for Jive portal, eg. 'https://company-team.jiveon.com'"
            },
            "username": {
                "type": "string",
                "title": "Username",
                "minLength": 1,
                "description": "Enter the username of your Jive portal"
            },
            "password": {
                "type": "string",
                "title": " Password",
                "format": "password",
                "minLength": 1,
                "description": "Enter the password of your Jive portal"
            },
            "itemsPerPage": {
                "type": "string",
                "title": "Items Per Page",
                "description": "Enter the value for how many items should be return per page",
                "default": '25'
            },
            "date": {
                "type": "string",
                "title": "Date Criteria",
                "enum": ["after", "before"],
                "description": "Select the date criteria either after or before that representing the minimum or maximum for selecting activities"
            },
            "date_value": {
                "type": "string",
                "title": "Date Value",
                "description": "Enter date in YYYY-MM-DD format"
            }
        }
    };

    this.help = "Service to get all actions in your Jive portal";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "itemsPerPage": {
                "title": "itemsPerPage",
                "type": "number"
            },
            "links": {
                "title": "links",
                "type": "object",
                "properties": {
                    "previous": {
                        "title": "previous",
                        "type": "string"
                    },
                    "next": {
                        "title": "next",
                        "type": "string"
                    }
                }
            },
            "list": {
                "title": "list",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "string"
                        },
                        "url": {
                            "title": "url",
                            "type": "string"
                        },
                        "type": {
                            "title": "type",
                            "type": "string"
                        },
                        "published": {
                            "title": "published",
                            "type": "string"
                        },
                        "title": {
                            "title": "title",
                            "type": "string"
                        },
                        "content": {
                            "title": "content",
                            "type": "object"
                        },
                        "verb": {
                            "title": "verb",
                            "type": "string"
                        },                        
                        "actor": {
                            "title": "actor",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "title": "id",
                                    "type": "string"
                                },
                                "displayName": {
                                    "title": "displayName",
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {

        input.site_url = input.site_url.replace(/^http:\/\//, 'https://');
        var prefixHttps = "https://";
        if (input.site_url.substr(0, prefixHttps.length) !== prefixHttps){
            input.site_url = prefixHttps + input.site_url;
        };

        var dateError = 'Wrong date format, use format YYYY-MM-DD';
        var queryParams = {};
        if(input.itemsPerPage)
            queryParams.count = input.itemsPerPage;
        if(input.date_value){
            input.date_value = input.date_value.trim();

            var date = String(input.date_value).split(/[\/|-]+/g);

            if(date.length !== 3 || date[0].length !== 4 || date[1].length !== 2 || date[2].length !== 2){
                return output(dateError);
            }
            if(Number(date[1]) <= 0 || Number(date[1]) > 12){
                return output(dateError);
            }
            if(Number(date[2]) <= 0 || Number(date[2]) > 31){
                return output(dateError);
            }

            input.date_value = date.join('-');

            queryParams[input.date] = new Date(input.date_value).toISOString();
        }

        request({
            method :'GET',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+"/api/core/v3/actions/",
            qs: queryParams,
            auth: {
                username: input.username,
                password: input.password
            },
            gzip: true
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                console.log(err, res.statusCode, body)
                if(typeof(body) == 'string'){
                    body = body.replace("throw 'allowIllegalResourceCall is false.';", "");  // here body return specified replace text + object in string format
                    body = JSON.parse(body);
                }
                if(body.list.length >= 1){
                    body.list.forEach(function(elem, i){
                        body.list[i].url = elem.id;
                        body.list[i].id = elem.id.replace(input.site_url+"/api/core/v3/actions/", "");
                        body.list[i].content = elem.content ? elem.content : "null";
                        body.list[i].title = elem.title ? elem.title : "null";                         
                    });

                    if(body.links){
                        if(!body.links.previous)
                            body.links.previous = 'null';
                        if(!body.links.next)
                            body.links.next = 'null';

                    }else{
                        body.links = {};
                        body.links.previous = 'null';
                        body.links.next = 'null';
                    }
                }else{
                    return output("List is empty");
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};
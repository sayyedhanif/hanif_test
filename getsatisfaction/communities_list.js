var request = require('request');


module.exports = function(){

    this.id = "getsatisfaction-companies-list-get";
    this.label = "Company list"; 

    this.input = { 
        "title": "Company list",
        "type": "object",
        "properties": {  
        }
    };

    this.help = "Service to get all companies in getsatisfaction communities"
    
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
                        "banner_style": {
                            "title": "banner_style",
                            "type": "string"
                        },
                         "people": {
                            "title": "people",
                            "type": "string"
                        },
                         "locale": {
                            "title": "locale",
                            "type": "string"
                        },
                         "topics": {
                            "title": "topics",
                            "type": "string"
                        },
                         "full_aspect_logo": {
                            "title": "full_aspect_logo",
                            "type": "string"
                        },
                        "links": {
                            "title": "links",
                            "type": "array",
                            "items": {
                                "properties":{
                                    "url": {
                                        "title": "url",
                                        "type": "string"
                                    },                                 
                                    "label": {
                                        "title": "label",
                                        "type": "string"
                                    }
                                }
                            }
                        },                                          
                        "approximate_topic_count": {
                            "title": "approximate_topic_count",
                            "type": "integer"
                        },
                        "approximate_people_count": {
                            "title": "approximate_people_count",
                            "type": "integer"
                        },
                        "products": {
                            "title": "products",
                            "type": "string"
                        },
                        "approximate_employee_count": {
                            "title": "approximate_employee_count",
                            "type": "integer"
                        },
                        "domain": {
                            "title": "domain",
                            "type": "string"
                        },
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "theme_id": {
                            "title": "theme_id",
                            "type": "any"
                        },
                        "id": {
                            "title": "id",
                            "type": "integer"
                        },  
                        "logo": {
                            "title": "logo",
                            "type": "string"
                        },
                        "website": {
                            "title": "website",
                            "type": "any"
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
            url: "https://api.getsatisfaction.com/companies.json"
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


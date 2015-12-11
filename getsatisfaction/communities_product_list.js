var request = require('request');


module.exports = function(){

    this.id = "getsatisfaction-company-products-list";
    this.label = "Community products list"; 

    this.input = { 
        "title": "Community products list",
        "type": "object",
        "properties": {  
            "comp_name":{
                "title": "Company name",
                "type": "string",
                "description": "To get community/company name from calling https://api.getsatisfaction.com/companies.json",
                "minLength": 1
            }
        }
    };

    this.help = "Service to get all products of specified communities"
    
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "data": {
                "title": "data",
                "type": "array",
                "items": {
                    "properties": {
                        "image": {
                            "title": "image",
                            "type": "string"
                        },
                        "canonical_name": {
                            "title": "canonical_name",
                            "type": "string"
                        },
                        "created_at":{
                            "title": "created_at",
                            "type": "string"
                        },
                        "url": {
                            "title": "url",
                            "type": "string"
                        }, 
                        "name": {
                            "title": "name",
                            "type": "string"
                        },    
                        "company": {
                            "title": "company",
                            "type": "string"
                        },
                        "id": {
                            "title": "id",
                            "type": "integer"
                        },       
                        "links": {
                            "title": "links",
                            "type": "array",
                            "items": {
                                "properties": {
                                    "created_at":{
                                        "title": "created_at",
                                        "type": "string"
                                    },
                                    "url": {
                                        "title": "url",
                                        "type": "string"
                                    },                        
                                    "label": {
                                        "title": "label",
                                        "type": "string"
                                    },
                                    "id": {
                                        "title": "id",
                                        "type": "integer"
                                    }
                                }
                            }
                        },
                        "description":{
                            "title": "description",
                            "type": "string"
                        }
                    }
                }
            },
            "total": {
                "title": "total",
                "type": "integer"
            }
        }
    };

    this.execute = function(input,output){

        request.get({
            url: "https://api.getsatisfaction.com/companies/"+input.comp_name.trim()+"/products.json"
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


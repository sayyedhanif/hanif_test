var request = require('request');


module.exports = function(){

    this.id = "getsatisfaction-products-list-get";
    this.label = "Products list"; 

    this.input = { 
        "title": "Products list",
        "type": "object",
        "properties": {  
        }
    };

    this.help = "Service to get all products in getsatisfaction communities"
    
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

                        "company": {
                            "title": "company",
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
                                    "id": {
                                        "title": "id",
                                        "type": "integer"
                                    },
                                    "label": {
                                        "title": "label",
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "title": "created_at",
                                        "type": "string"
                                    }
                                }
                            }
                        },
                        "image": {
                            "title": "image",
                            "type": "string"
                        },
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "id": {
                            "title": "id",
                            "type": "integer"
                        },
                        "canonical_name": {
                            "title": "canonical_name",
                            "type": "string"
                        },
                        "created_at": {
                            "title": "created_at",
                            "type": "string"
                        },
                        "description": {
                            "title": "description",
                            "type": "string"
                        },
                        "url": {
                            "title": "url",
                            "type": "string"
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input,output){

        request.get({
            url: "https://api.getsatisfaction.com/products.json"
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


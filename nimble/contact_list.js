var request = require("request");

module.exports = function () {
    this.id = "nimble-contact-list";
    this.label = "List Contacts";
    this.input = {
        "title" : "List Contacts",
        "type" : "object",
        "properties" : {
            "AccessToken" : {
                "title" : "Nimble Access Token",
                "type" : "string",
                "minLength" : 1
            },
            "per_page" : {
                "title" : "Per Page",
                "type" : "string",
                "description" : "Amount of results you wish to retrieve (Default : 30)"
            },
            "sort" : {
                "title" : "Sort",
                "type" : "string",
                "description" : "Ascending(asc) or descending(desc)"
            },
            "keyword" : {
                "title" : "Keyword",
                "type" : "string",
                "description" : "Keywords to search for in the contacts list"
            }
        }
    };

    this.output = {
        "title" : "Output",
        "type" : "object",
        "properties" : {
            "meta" : {
                "type" : "object",
                "title" : "meta",
                "properties" : {
                    "page" : {
                        "type" : "number",
                        "title" : "page"
                    },
                    "pages" : {
                        "type" : "number",
                        "title" : "pages"
                    },
                    "per_page" : {
                        "type" : "number",
                        "title" : "per_page"
                    },
                    "total" : {
                        "type" : "number",
                        "title" : "total"
                    }
                }
            },
            "id" : {
                "type" : "string",
                "title" : "id"
            },
            "resources" : {
                "type" : "array",
                    "title" : "resources",
                    "items" : {
                    "type" : "object",
                        "properties" : {
                        "fields" : {
                            "type" : "object",
                            "title" : "fields",
                            "properties" : {
                                "parent company": {
                                    "type": "array",
                                    "title": "parent company",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "group": {
                                                "type": "string",
                                                "title": "group"
                                            },
                                            "name": {
                                                "type": "string",
                                                "title": "name"
                                            },
                                            "label": {
                                                "type": "string",
                                                "title": "label"
                                            },
                                            "id": {
                                                "type": "string",
                                                "title": "id"
                                            }
                                        }
                                    }
                                },
                                "description": {
                                    "type": "array",
                                    "title": "description",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "group": {
                                                "type": "string",
                                                "title": "group"
                                            },
                                            "name": {
                                                "type": "string",
                                                "title": "name"
                                            },
                                            "label": {
                                                "type": "string",
                                                "title": "label"
                                            },
                                            "id": {
                                                "type": "string",
                                                "title": "id"
                                            }
                                        }
                                    }
                                },
                                "last name": {
                                    "type": "array",
                                    "title": "last name",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "value": {
                                                "title": "value",
                                                "type": "string"
                                            }
                                        }
                                    }
                                },
                                "phone": {
                                    "type": "array",
                                    "title": "phone",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "value": {
                                                "title": "value",
                                                "type": "string"
                                            }
                                        }
                                    }
                                },
                                "url": {
                                    "type": "array",
                                    "title": "url",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "value": {
                                                "type": "string",
                                                "title": "value"
                                            }
                                        }
                                    }
                                },
                                "source": {
                                    "type": "array",
                                    "title": "source",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "value": {
                                                "type": "string",
                                                "title": "value"
                                            }
                                        }
                                    }
                                },
                                "address": {
                                    "type": "array",
                                    "title": "address",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "value": {
                                                "type": "string",
                                                "title": "value"
                                            }
                                        }
                                    }
                                },
                                "email": {
                                    "type": "array",
                                    "title": "email",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "value": {
                                                "type": "string",
                                                "title": "value"
                                            }
                                        }
                                    }
                                },
                                "first name": {
                                    "type": "array",
                                    "title": "first name",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "value": {
                                                "type": "string",
                                                "title": "value"
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            }
        }
    };

    this.help = "This activity retrieves contact list from nimble";

    this.execute = function(input, output){
        var option = {
            url : "https://api.nimble.com/api/v1/contacts?access_token=" + input.AccessToken,
            method : "GET"
        };
        request(option, function(err, res, body){
            console.log('body')
            console.log(body)
            if (err){
                return output(err);
            }
            if(res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null, body);
            }
        })
    }
};

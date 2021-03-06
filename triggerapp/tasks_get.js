var request = require('request');

module.exports = function(){

    this.id = "triggerapp-tasks-get";
    this.label = "Get Task List";
    this.input = {
        "title": "Get Task List",
        "type": "object",
        "properties": {
            "api_key": {
                "type": "string",
                "title": "Triggerapp API Key",
                "minLength": 1,
                "default": "RHDLMTXZ"
            },
            "token": {
                "type": "string",
                "title": "Triggerapp Token",
                "minLength": 1,
                "default": "2KC4YQfDPkPZnuwBxY4k"
            }                     
        }
    };

    this.help = "Returns all task of current account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "tasks":{
                "title": "tasks",
                "type": "array",
                "items": {
                    "properties": {
                        "task": {
			                "title": "task",
			                "type": "object",
			                "properties": {
			                    "id": {
			                        "title": "id",
			                        "type": "number"
			                    },
			                    "author_id": {
			                        "title": "author_id",
			                        "type": "number"
			                    },
			                    "title": {
			                        "title": "title",
			                        "type": "string"
			                    },
			                    "description": {
			                        "title": "description",
			                        "type": "string"
			                    },
			                    "status": {
			                        "title": "status",
			                        "type": "string"
			                    },
			                    "billable": {
			                        "title": "billable",
			                        "type": "any"
			                    },
			                    "priority": {
			                        "title": "priority",
			                        "type": "string"
			                    },
			                    "created_at": {
			                        "title": "created_at",
			                        "type": "string"
			                    },
			                    "due_date": {
			                        "title": "due_date",
			                        "type": "any"
			                    },
			                    "project": {
			                        "title": "project",
			                        "type": "object",
			                        "properties": {
			                            "id": {
			                                "title": "id",
			                                "type": "number"
			                            },
			                            "name": {
			                                "title": "name",
			                                "type": "string"
			                            }                     
			                        }
			                    },
			                    "assignee": {
			                        "title": "assignee",
			                        "type": "object",
			                        "properties": {
			                            "id": {
			                                "title": "id",
			                                "type": "number"
			                            },
			                            "name": {
			                                "title": "name",
			                                "type": "string"
			                            },                            
			                            "email": {
			                                "title": "email",
			                                "type": "string"
			                            },
			                            "role": {
			                                "title": "role",
			                                "type": "string"
			                            }                                     
			                        }
			                    },
			                    "author": {
			                        "title": "author",
			                        "type": "object",
			                        "properties": {
			                            "id": {
			                                "title": "id",
			                                "type": "number"
			                            },
			                            "name": {
			                                "title": "name",
			                                "type": "string"
			                            },                            
			                            "email": {
			                                "title": "email",
			                                "type": "string"
			                            },
			                            "role": {
			                                "title": "role",
			                                "type": "string"
			                            }                                    
			                        }
			                    }
			                }
			            }
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {

        request({
            method :'GET',           
            url: "https://www.triggerapp.com/api/v1/tasks?token="+input.token+"&api_key="+input.api_key
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};
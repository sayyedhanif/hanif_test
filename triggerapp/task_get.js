var request = require('request');

module.exports = function(){

    this.id = "triggerapp-task-detail";
    this.label = "Get Task Detail";
    this.input = {
        "title": "Get Task Detail",
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
            },
            "task_id": {
                "type": "string",
                "title": "Task ID",
                "minLength": 1,
                "description": "Enter task id"
            }                               
        }
    };

    this.help = "Returns a single task identified by its ID.";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
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
    };

    this.execute = function(input, output) {

        request({
            method :'GET',           
            url: "https://www.triggerapp.com/api/v1/tasks/"+input.task_id+"?token="+input.token+"&api_key="+input.api_key
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
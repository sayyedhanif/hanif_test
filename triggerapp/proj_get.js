var request = require('request');

module.exports = function(){

    this.id = "triggerapp-project-detail";
    this.label = "Get Project Detail";
    this.input = {
        "title": "Get Project Detail",
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
            "company_id": {
                "type": "string",
                "title": "Company ID",
                "minLength": 1,
                "description": "Enter company id"
            },
            "project_id": {
                "type": "string",
                "title": "Project ID",
                "minLength": 1,
                "description": "Enter company id"
            }                                    
        }
    };

    this.help = "Returns a single project identified by its ID.";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
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
                    },                   
                    "description": {
                        "title": "description",
                        "type": "string"
                    },
                    "created_at": {
                        "title": "created_at",
                        "type": "string"
                    },
                    "due_date": {
                        "title": "due_date",
                        "type": "string"
                    },
                    "total_time_in_hours": {
                        "title": "total_time_in_hours",
                        "type": "number"
                    },
                    "state": {
                        "title": "state",
                        "type": "string"
                    },
                    "billable_hours": {
                        "title": "billable_hours",
                        "type": "number"
                    },
                    "billed_hours": {
                        "title": "billed_hours",
                        "type": "number"
                    },
                    "unbillable_hours": {
                        "title": "unbillable_hours",
                        "type": "number"
                    },
                    "unbilled_hours": {
                        "title": "unbilled_hours",
                        "type": "number"
                    },
                    "total_cost": {
                        "title": "total_cost",
                        "type": "number"
                    },
                    "task_rate": {
                        "title": "task_rate",
                        "type": "number"
                    },
                    "estimated_time": {
                        "title": "estimated_time",
                        "type": "number"
                    },
                    "company": {
                        "title": "company",
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
                            "phone": {
                                "title": "phone",
                                "type": "any"
                            }                            
                        }
                    },
                    "owner": {
                        "title": "owner",
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
                            "phone": {
                                "title": "phone",
                                "type": "any"
                            },
                            "email": {
                                "title": "email",
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
                            "phone": {
                                "title": "phone",
                                "type": "any"
                            },
                            "email": {
                                "title": "email",
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
            url: "https://www.triggerapp.com/api/v1/companies/"+input.company_id+"/projects/"+input.project_id+"?token="+input.token+"&api_key="+input.api_key
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
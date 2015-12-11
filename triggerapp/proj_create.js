var request = require('request');

module.exports = function(){

    this.id = "triggerapp-project-create";
    this.label = "Create Project";
    this.input = {
        "title": "Create Project",
        "type": "object",
        "properties": {
            "api_key": {
                "type": "string",
                "title": "Triggerapp API Key",
                "minLength": 1,
                "propertyOrder": 1,
                "default": "RHDLMTXZ"
            },
            "token": {
                "type": "string",
                "title": "Triggerapp Token",
                "minLength": 1,
                "propertyOrder": 2,
                "default": "2KC4YQfDPkPZnuwBxY4k"
            },
            "company_id": {
                "type": "string",
                "title": "Company ID",
                "minLength": 1,
                "propertyOrder": 3,
                "description": "Enter company id"
            },   
            "name": {
                "type": "string",
                "title": "Name",
                "minLength": 1,
                "propertyOrder": 3,
                "description": "Name of project"
            },
            "description": {
                "type": "string",
                "title": "Description",
                "propertyOrder": 3,
                "description": "Project description"
            },
            "status": {
                "type": "string",
                "title": "Status",
                "propertyOrder": 5,
                "enum": [
                    "Open","Opportunity","On Hold", "Closed"
                ],
                "description": "Specify the status of the project, defaults to Open"
            },            
            "due_date": {
                "type": "string",
                "title": "Due Date(YYYY/MM/DD)",
                "propertyOrder": 6,
                "description": "Due date of project"
            },
            "billable": {
                "type": "string",
                "title": "Billable",
                "enum": [
                    "Company Based(default)", "Yes", "No"
                ],
                "propertyOrder": 4,
                "description": "Specify the billable or not"
            },
            "billable_type": {
                "type": "string",
                "title": "Bill Type",
                "propertyOrder": 7,
                "enum":[
                    "Hourly", "Fixed"
                ],
                "description": "Specify the bill type,can either be Hourly or Fixed"
            },            
            "fixed_rate": {
                "type": "number",
                "title": "Fixed Rate",
                "propertyOrder": 7,
                "description": "Fixed rate value"
            },
            "task_rate": {
                "type": "number",
                "title": "Hourly Rate",
                "propertyOrder": 8,
                "description": "Enter hourly rate value"
            },
            "estimated_time": {
                "type": "number",
                "title": "Estimated Time",
                "propertyOrder": 9,
                "description": "Estimated time required to complete this project"
            },
            "accessible_to_clients": {
                "type": "string",
                "title": "Client Access",
                "propertyOrder": 10,
                "enum": [
                    "Yes", "No"
                ],
                "description": "If Yes, allow to Client update"
            }
        }
    };


    this.help = "This activity create a new project";

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
        var obj = {"Yes": true, "No": false, "Company Based(default)": "","Open": "open", "Opportunity": "opportunity", "On Hold": "on_hold", "Closed": "closed"}

        var params = "&project[name]=" + input.name;
        params += "&project[billable]=" + obj[input.billable];
        params += "&project[status]=" + obj[input.status];
        params += "&project[description]=" + input.description;
        params += "&project[due_date]="+ input.due_date;
        params += "&project[billable_type]=" + input.billable_type;
        params += "&project[fixed_rate]=" + input.fixed_rate;
        params += "&project[estimated_time]=" + input.estimated_time;
        params += "&project[accessible_to_clients]=" + obj[input.accessible_to_clients];
        params += "&project[task_rate]=" + input.task_rate;

        request({
            method :'POST',           
            url: "https://www.triggerapp.com/api/v1/companies/"+input.company_id+"/projects",
            body: "token="+input.token+"&api_key="+input.api_key+""+params
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
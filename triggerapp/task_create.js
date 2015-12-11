var request = require('request');

module.exports = function(){

    this.id = "triggerapp-task-create";
    this.label = "Create Task";
    this.input = {
        "title": "Create Task",
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
            "project_id": {
                "type": "string",
                "title": "Project ID",
                "minLength": 1,
                "propertyOrder": 3,
                "description": "Id of the project which of this task"
            },
            "title": {
                "type": "string",
                "title": "Title",
                "propertyOrder": 4,
                "minLength": 1,
                "description": "Title of the task"
            },
            "description": {
                "type": "string",
                "title": "Description",
                "propertyOrder": 5,                
                "description": "Description about task"
            },            
            "assignee_id": {
                "type": "string",
                "title": "Assignee ID",
                "propertyOrder": 6,
                "description": "Id of the member which is to be assign this task, defaults to the owner of the project"
            },
            "status": {
                "type": "string",
                "title": "Status",
                "enum": [
                    "New", "In Progress", "Feedback", "Complete", "On Hold"
                ],
                "propertyOrder": 7,
                "description": "Specified status of the tak, defaults to New"
            },
            "priority": {
                "type": "string",
                "title": "Proirity",
                "enum": [
                    "Normal", "High", "Urgent"
                ],
                "propertyOrder": 8,
                "description": "Specified the priority of the task"
            },
            "due_date": {
                "type": "string",
                "title": "Due Date(YYYY/MM/DD)",
                "propertyOrder": 6,
                "description": "Due date of task"
            },
            "billable": {
                "type": "string",
                "title": "Billable",
                "propertyOrder": 9,
                "enum": [
                    "Nil", "Yes", "No"
                ],
                "description": "Specified billable or not"
            },
            "hourly_rate": {
                "type": "number",
                "title": "Hourly Rate",
                "propertyOrder": 10,
                "description": "Enter state"
            },
            "flat_fee": {
                "type": "number",
                "title": "Fixed Rate",
                "propertyOrder": 11,
                "description": "enter phone number"
            }
            
        }
    };

    this.help = "This activity create a new task";

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
        var priorityObj = {"Normal": 0, "High": 1, "Urgent": 2};
        var statusObj = {"New":"new", "In Progress":"in_progress", "Feedback":"feedback", "Complete":"complete", "On Hold":"on_hold"}
        var billableObj = {"Nil": "nil", "Yes": true, "No": false}

        var params = "&task[title]=" + input.title;
        params += "&task[description]=" + input.description;
        params += "&task[assignee_id]=" + input.assignee_id;
        params += "&task[status]=" + statusObj[input.status];
        params += "&task[priority]=" + priorityObj[input.priority];
        params += "&task[billable]=" + billableObj[input.billable];
        params += "&task[hourly_rate]=" + input.hourly_rate;
        params += "&task[flat_fee]=" + input.flat_fee;
        params += "&project_id=" + input.project_id

        request({
            method :'POST',           
            url: "https://www.triggerapp.com/api/v1/tasks",
            body: "token="+input.token+"&api_key="+input.api_key+""+params
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            console.log(statusCode)
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
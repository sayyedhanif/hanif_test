var request = require('request');

var fieldFormate = {
    "Heading":"control_head",
    "Text":"control_text",
    "Heading":"control_head",
    "Text":"control_text",
    "Text Box":"control_textbox",
    "Email":"control_email",
    "Textarea":"control_textarea",
    "Fullname":"control_fullname",
    "Address":"control_address",
    "Phone":"control_phone",
    "Date Time":"control_datetime",
    "Time":"control_time",
    "Number":"control_number",
    "Captcha":"control_captcha",
    "Drop Down":"control_dropdown",
    "Radio":"control_radio",
    "Check Box":"control_checkbox",
    "Image":"control_image",
    "File Upload":"control_fileupload",
    "Submit Button":"control_button"
}

module.exports = function(){

    this.id = "jotform-form-create";
    this.label = "JotForm Create New Form"; 

    this.input = { 
        "title": "JotForm Create New Form",
        "type": "object",
        "properties": {           
            "apikey":{
                "title":"API Key",
                "type": "string",
                "minLength": 1
            },
            "form_title":{
                "title":"Form Title",
                "type": "string",
                "description": "Title of the form",      
                "minLength": 1
            },
            "fields":{
                "title":"Fields",
                "type": "array",
                "description": "Array of form controls",
                "items":{
                    "type": "object",
                    "title" :"Field",
                    "properties":{
                        "type":{        
                            "type": "string",
                            "title": "Field Type",
                            "enum": [
                               "Heading",
                               "Text",
                               "Text Box",
                               "Email",
                               "Textarea",
                               "Fullname",
                               "Address",
                               "Phone",
                               "Date Time",
                               "Time",
                               "Number",
                               "Captcha",
                               "Drop Down",
                               "Radio",
                               "Check Box",
                               "Image",
                               "File Upload",
                               "Submit Button"
                            ],
                            "description": "Select the type of field"
                        },
                        "text":{
                            "type": "string",
                            "title": "Field Label",
                            "description": "Enter the label of field"
                        },
                        "order":{
                            "type": "string",
                            "title": "Field Order",
                            "description": "Specify the sequence of form field"
                        },
                        "name":{
                            "type": "string",
                            "title": "Field Description",
                            "description": "Specify the field description"
                        }
                    }
                }
            }
        }
    };

    this.help = "Service to create Form using JotForm"
    
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "responseCode": {
                "title": "responseCode",
                "type": "integer"
            },
            "message": {
                "title": "message",
                "type": "string"
            },
            "content": {
                "title": "title",
                "type": "object",
                "properties": {
                    "id": {
                        "title": "id",
                        "type": "string"
                    },
                    "username": {
                        "title": "username",
                        "type": "string"
                    },
                    "title": {
                        "title": "title",
                        "type": "string"
                    },
                    "height": {
                        "title": "height",
                        "type": "string"
                    },
                    "status": {
                        "title": "status",
                        "type": "any"
                    },
                    "created_at": {
                        "title": "created_at",
                        "type": "any"
                    },
                    "updated_at": {
                        "title": "updated_at",
                        "type": "any"
                    },
                    "new": {
                        "title": "country",
                        "type": "integer"
                    },
                    "count": {
                        "title": "count",
                        "type": "integer"
                    },
                    "url": {
                        "title": "url",
                        "type": "string"
                    }
                }
            },
            "duration": {
                "title": "duration",
                "type": "string"
            },
            "limit-left": {
                "title": "limit-left",
                "type": "integer"
            }
        }
    };

    this.execute = function(input,output){
        input.fields.forEach(function(entry,i) {
            input.fields[i].type = fieldFormate[input.fields[i].type]
        });
        console.log("updated inputs")
        console.log(input.fields)
        
        request.post({
            url:'https://api.jotform.com/form?apiKey='+input.apikey.trim(),
            form: {                
                properties:{
                    title: input.form_title.trim()
                },
                questions: input.fields
            }   

        },function(err,response,body){
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
        })
    };    
}
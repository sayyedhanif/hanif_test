var request = require('request');


module.exports = function(){

    this.id = "getsatisfaction-topics-post";
    this.label = "Post topics"; 

    this.input = { 
        "title": "Post topics",
        "type": "object",
        "properties": {           
            "subject":{
                "title":"Topic subject",
                "type": "string",
                "minLength": 1
            },
            "domain":{
                "title":"Company domain",
                "type": "string",
                "description": "",      
                "minLength": 1
            }
            // "fields":{
            //     "title":"Fields",
            //     "type": "array",
            //     "description": "Array of form controls",
            //     "items":{
            //         "type": "object",
            //         "title" :"Field",
            //         "properties":{
            //             "type":{        
            //                 "type": "string",
            //                 "title": "Field Type",
            //                 "enum": [
            //                    "Heading",
            //                    "Text",
            //                    "Text Box",
            //                    "Email",
            //                    "Textarea",
            //                    "Fullname",
            //                    "Address",
            //                    "Phone",
            //                    "Date Time",
            //                    "Time",
            //                    "Number",
            //                    "Captcha",
            //                    "Drop Down",
            //                    "Radio",
            //                    "Check Box",
            //                    "Image",
            //                    "File Upload",
            //                    "Submit Button"
            //                 ],
            //                 "description": "Select the type of field"
            //             },
            //             "text":{
            //                 "type": "string",
            //                 "title": "Field Label",
            //                 "description": "Enter the label of field"
            //             },
            //             "order":{
            //                 "type": "string",
            //                 "title": "Field Order",
            //                 "description": "Specify the sequence of form field"
            //             },
            //             "name":{
            //                 "type": "string",
            //                 "title": "Field Description",
            //                 "description": "Specify the field description"
            //             }
            //         }
            //     }
            // }
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
        console.log('at execute()')
        


        // request.get({
        //     url: "https://api.getsatisfaction.com/topics.json"
        // }, function(err,response,body){
        //    console.log('body people')
        //     // console.log(body)
        //     if(err)
        //     {
        //         return output(err);
        //     }
        //     else{
        //         console.log('not err')
        //         if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
        //             console.log('succwss')
        //             if(typeof(body)=="string"){
        //                 body = JSON.parse(body);
        //                 console.log(body.data[0])
        //             }
        //             return output(null,body);
        //         }
        //         return output(body);
        //     }
        // });


        request.post({
            url:'https://api.getsatisfaction.com/topics.json',
            form: {                
                subject:input.subject.trim(),
                company_domain: input.domain.trim()
                // style:
                // keywords:
                // additional_detail:
                // products:
                // emotitag:
            }   

        },function(err,response,body){
            console.log('body1111')
            console.log(body)
            if(err)
            {
                return output(err);
            }
            else{
                console.log('not err')
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



// Get Satisfaction is a place where people can get the most from the products they use, and where companies are encouraged to get 
// real with their customers. Customers, employees, and companies are all welcome here. Nothing is hidden, and no one is censored.
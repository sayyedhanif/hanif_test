var request = require('request')
, crypto = require('crypto');

module.exports = function(){

    this.id = "mixpanel-annotation-create";
    this.label = "Create Annotation";

    this.input = {
        "title": "Create Annotation",
        "type": "object",
        "properties": {
            "api_key":{
                "title":"API Key",
                "type": "string",
                "minLength": 1
            },
            "api_secret":{
                "title":"API Secret",
                "type": "string",
                "minLength": 1
            },
            "date":{
                "title":"Date",
                "type": "string",
                "description":"The time in yyyy-mm-hh HH:MM:SS when you want to create the annotation at",
                "minLength": 1
            },
            "description":{
                "title":"Description",
                "type": "string",
                "description":"The annotation description",
                "minLength": 1
            }                
        }
    };
    
    this.help = "Service to create new annotation";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "message": {
                "title": "message",
                "type": "string"
            }
        }
    };

    this.execute = function(input,output){

        var expire = Math.round(new Date().getTime()/1000) + 60*60;     // 60=1 min and 60*60= 1 hour

        var args = "api_key="+ input.api_key+"date="+input.date+"description="+ input.description+"expire="+expire;  
               
        request({              
            method: "POST",
            url: "http://mixpanel.com/api/2.0/annotations/create/",
            qs: {
                api_key: input.api_key,
                sig: crypto.createHash('md5').update(args + input.api_secret, 'utf8').digest('hex'),
                expire: expire,
                date : input.date,
                description: input.description
            }
        }, function(err,response,body){
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){                    
                    return output(null,{message: "Annotation created"});
                }
                return output(body);
            }
        });
    };    
}
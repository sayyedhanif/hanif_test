var request = require('request')
, crypto = require('crypto');

module.exports = function(){

    this.id = "mixpanel-annotations-get";
    this.label = "Get Annotations";

    this.input = {
        "title": "Get Annotations",
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
            "from_date":{
                "title":"From Date",
                "type": "string",
                "description":"The beginning of the date range to get annotations for in yyyy-mm-dd format",
                "minLength": 1
            },
            "to_date":{
                "title":"To Date",
                "type": "string",
                "description":"The end of the date range to get annotations for in yyyy-mm-dd format",
                "minLength": 1
            }                
        }
    };

    this.help = "Service to get all annotations";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "annotations": {
                "title": "annotations",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "date": {
                            "title": "date",
                            "type": "string"
                        },
                        "project_id": {
                            "title": "project_id",
                            "type": "number"
                        },
                        "id": {
                            "title": "id",
                            "type": "number"
                        },
                        "description": {
                            "title": "description",
                            "type": "string"
                        }
                    }
                }
            },
            "error": {
                "title": "error",
                "type": "boolean"
            }
        }
    };

    this.execute = function(input,output){
        
        var expire = Math.round(new Date().getTime()/1000) + 60*60;  // 60=1 min and 60*60= 1 hour
        var args = "api_key="+ input.api_key +"expire="+expire +"from_date="+input.from_date+"to_date=" + input.to_date;
       
        request({              
            method: "GET",
            url: "http://mixpanel.com/api/2.0/annotations/",
            qs: {
                api_key: input.api_key,
                sig: crypto.createHash('md5').update(args + input.api_secret, 'utf8').digest('hex'),
                expire: expire,
                from_date : input.from_date,
                to_date: input.to_date
            }
        }, function(err,response,body){            
            if(err){
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
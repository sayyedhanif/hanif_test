var request = require('request');
var crypto = require('crypto');

module.exports = function(){

    this.id = "mixpanel-funnels-list";
    this.label = "Get Funnel List";

    this.input = {
        "title": "Get Funnel List",
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
            }
        }
    };

    this.help = "Service to get the names and funnel ids of your funnels";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "funnels": {
                "title": "funnels",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "funnel_id": {
                            "title": "funnel_id",
                            "type": "number"
                        },
                        "name": {
                            "title": "name",
                            "type": "string"
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input,output){
        
        var expire = Math.round(new Date().getTime()/1000) + 60*60;

        var args = "api_key="+ input.api_key +"expire="+expire  
                
        request({              
            method: "GET",
            url: "http://mixpanel.com/api/2.0/funnels/list/",
            qs: {
                api_key: input.api_key,
                sig: crypto.createHash('md5').update(args + input.api_secret, 'utf8').digest('hex'),
                expire: expire
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
                    return output(null,{funnels: body});
                }
                return output(body);
            }
        });
    };    
}
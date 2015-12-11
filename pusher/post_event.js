var request = require('request')
, crypto = require('crypto');

module.exports = function(){

    this.id = "pusher-event-trigger-post";
    this.label = "Trigger new event"; 

    this.input = { 
        "title": "Trigger new event",
        "type": "object",
        "properties": { 
            "app_id": {
                "title": "App id",
                "type": "string",
                "description": "",
                "minLength": 1
            },
            "auth_key": {
                "title": "App key",
                "type": "string",
                "description": "Enter key of your application",
                "minLength": 1
            },
            "app_secret": {
                "title": "App secret",
                "type": "string",
                "description": "Enter secret kye of your application",
                "minLength": 1
            },
            "event_name": {
                "title": "Event name",
                "type": "string",
                "description": "Enter name for event",
                "minLength": 1
            },
            "event_data": {
                "title": "Event data",
                "type": "string",
                "description": "Enter data for event trigger, it not more than 10kb",
                "minLength": 1
            },
            "event_channels": {
                "title": "Event channels",
                "type": "array",
                "description": "Array of channels for trigger event",
                "items":{
                    "title":"Channel",
                    "type":"string"
                }
            }
        }
    };

    this.help = "Service to trigger event"
    
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

        function getMD5(body) {
          return crypto.createHash('md5').update(JSON.stringify(body), 'utf8').digest('hex');
        }

        var jsonData = {"name":input.event_name.trim(),"channels":input.event_channels,"data":input.event_data.trim()};
       
        var path = '/apps/'+input.app_id.trim()+'/events'
        , queryString = 'auth_key='+input.auth_key.trim()+'&auth_timestamp='+Math.round(new Date().getTime()/1000)+'&auth_version=1.0&body_md5='+getMD5(jsonData);

        function generate_authSignature() {   
            var string_to_sign = 'POST\n'+path+'\n'+queryString;

            return crypto.createHmac('sha256', input.app_secret.trim())
            .update(new Buffer(string_to_sign, 'utf-8'))
            .digest('hex');
        }   
        
        var signature = generate_authSignature();

        request.post({   
            headers: {
              'Content-Type': 'application/json'
            },    
            url: "http://api.pusherapp.com"+path+"?"+queryString+"&auth_signature="+signature,
            json:true,
            json: jsonData

        }, function(err,response,body){
            if(err)
            {
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    return output(null,{message: "Event successfully triggered!"});
                }
                return output(body);
            }
        });
    };    
}
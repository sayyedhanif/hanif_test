var request = require('request')
, crypto = require('crypto');

module.exports = function(){

    this.id = "pusher-channel-get";
    this.label = "Fetch all channels information"; 

    this.input = { 
        "title": "Fetch all channels information",
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
            "channel_type": {
                "title": "Channel type",
                "type": "string",
                "description": "Enter channel type",
                "enum": ["presence", "private"]
            }
        }
    };

    this.help = "Service to fetch all events channels information"
    
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
           "channels": {
                "title": "channels",
                "type": "object",
                "properties": {

                }
           }
        }
    };

    this.execute = function(input,output){
       
        var path = '/apps/'+input.app_id.trim()+'/channels'
        , queryString = 'auth_key='+input.auth_key.trim()+'&auth_timestamp='+Math.round(new Date().getTime()/1000)+'&auth_version=1.0';

        if( input.channel_type == 'presence')
            queryString+= '&filter_by_prefix=presence-&info=user_count'
        if (input.channel_type == 'private') 
            queryString+= '&filter_by_prefix=private-'

        function generate_authSignature() {   
            var string_to_sign = 'GET\n'+path+'\n'+queryString;

            return crypto.createHmac('sha256', input.app_secret.trim())
            .update(new Buffer(string_to_sign, 'utf-8'))
            .digest('hex');
        }   
        
        var signature = generate_authSignature();

        request.get({  
            url: "http://api.pusherapp.com"+path+"?"+queryString+"&auth_signature="+signature            

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
                    return output(null, body);
                }
                return output(body);
            }
        });
    };    
}
var request = require('request');

module.exports = function(){

    this.id = "chargify-product-create";

    this.label = "Create Product";

    this.input = {
        "title": "Create Products",
        "type": "object",
        "properties": {
            "username":{
                "title":"api key",
                "type":"string",
                "minLength":1,
                "propertyOrder":1,
                "default": "xq17y326zPE9FcfAvoDEUP5yFs5odxNmzcfvffcUoE"
            },
            "product_handle":{
                "title":"Product Handle",
                "type":"string",
                "description":"Enter product handle value",
                "minLength":1
            },
            // "product_family_id":{
            //     "title":"Product Family ID",
            //     "type":"string",
            //     "description":"Enter product family id",
            //     "minLength":1,
            //     "propertyOrder":2
            // },
            // "name":{
            //     "title":"Product Name",
            //     "type":"string",
            //     "description":"Enter product name",
            //     "minLength":1,
            //     "propertyOrder":3
            // },
            // "price_in_cents":{
            //     "title":"Price",
            //     "type":"string",
            //     "description":"Enter price in cents",
            //     "minLength":1,
            //     "propertyOrder":4
            // },
            // "interval":{
            //     "title":"interval",
            //     "type":"string",
            //     "description":"Enter interval value in day(s)",
            //     "minLength":1,
            //     "propertyOrder":5
            // },
            // "interval_unit":{
            //     "title":"Interval Unit",
            //     "type":"string",
            //     "description":"Select interval unit",
            //     "minLength":1,
            //     "propertyOrder":6,
            //     "enum":[
            //         "month",
            //         "day"
            //     ]
            // },
            // "product_family_name":{
            //     "title":"Product Family Name",
            //     "type":"string",
            //     "description":"Enter product family name"
            // },
            // "description":{
            //     "title":"Description",
            //     "type":"string",
            //     "description":"Enter the product family description"
            // },
            // "require_credit_card":{
            //     "title":"Require Credit Card",
            //     "type":"boolean",
            //     "description":"Enter your option ie.true or false"
            // },
            // "request_credit_card":{
            //     "title":"Request Credit Card",
            //     "type":"boolean",
            //     "description":"Enter your option ie. true or false"
            // },
            // "require_billing_address":{
            //     "title":"Require Billing Address",
            //     "type":"boolean",
            //     "description":"Enter your option ie. true or false"
            // },
            // "request_billing_address":{
            //     "title":"Request Billing Address",
            //     "type":"boolean",
            //     "description":"Enter your option ie. true or false"
            // }
        }
    };


    this.help = "service to create product";


    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            "product":{
                "title":"product",
                "type":"object",
                "properties":{
                    "accounting_code":{
                        "title":"accounting_code",
                        "type":"any"
                    },
                    "archived_at":{
                        "title":"archived_at",
                        "type":"any"
                    },
                    "created_at":{
                        "title":"created_at",
                        "type":"string"
                    },
                    "description":{
                        "title":"description",
                        "type":"string"
                    },
                    "expiration_interval":{
                        "title":"expiration_interval",
                        "type":"any"
                    },
                    "expiration_interval_unit":{
                        "title":"expiration_interval_unit",
                        "type":"string"
                    },
                    "handle":{
                        "title":"handle",
                        "type":"string"
                    },
                    "id":{
                        "title":"id",
                        "type":"integer"
                    },
                    "initial_charge_in_cents":{
                        "title":"initial_charge_in_cents",
                        "type":"any"
                    },
                    "interval":{
                        "title":"interval",
                        "type":"integer"
                    },
                    "interval_unit":{
                        "title":"interval_unit",
                        "type":"integer"
                    },
                    "name":{
                        "title":"name",
                        "type":"string"
                    },
                    "price_in_cents":{
                        "title":"price_in_cents",
                        "type":"integer"
                    },
                    "request_credit_card":{
                        "title":"request_credit_card",
                        "type":"boolean"
                    },
                    "require_credit_card":{
                        "title":"require_credit_card",
                        "type":"boolean"
                    },
                    "return_params":{
                        "title":"return_params",
                        "type":"any"
                    },
                    "taxable":{
                        "title":"taxable",
                        "type":"boolean"
                    },
                    "trial_interval":{
                        "title":"trial_interval",
                        "type":"any"
                    },
                    "trial_interval_unit":{
                        "title":"trial_interval_unit",
                        "type":"any"
                    },
                    "trial_price_in_cents":{
                        "title":"trial_price_in_cents",
                        "type":"any"
                    },
                    "update_return_url":{
                        "title":"update_return_url",
                        "type":"any"
                    },
                    "updated_at":{
                        "title":"updated_at",
                        "type":"string"
                    },
                    "version_number":{
                        "title":"version_number",
                        "type":"integer"
                    },
                    "update_return_params":{
                        "title":"update_return_params",
                        "type":"any"
                    },
                    "product_family":{
                        "title":"product_family",
                        "type":"object",
                        "properties":{
                            "accounting_code":{
                                "title":"accounting_code",
                                "type":"any"
                            },
                            "description":{
                                "title":"description",
                                "type":"string"
                            },
                            "handle":{
                                "title":"handle",
                                "type":"string"
                            },
                            "id":{
                                "title":"id",
                                "type":"integer"
                            },
                            "name":{
                                "title":"name",
                                "type":"string"
                            }

                        }
                    },
                    "public_signup_pages":{
                        "title":"public_signup_pages",
                        "type":"array"
                    }
                }
            }
        }
    };


    this.execute = function(input,output){
        var productJson = {};
        productJson.product ={
            "price_in_cents":input.price_in_cents,
            "product_family_name":input.product_family_name,
            "name":input.name,
            "description":input.description,
            "require_credit_card":input.require_credit_card,
            "request_credit_card":input.request_credit_card,
            "require_billing_address":input.require_billing_address,
            "request_billing_address":input.request_billing_address,
            "interval_unit":input.interval_unit,
            "interval":input.interval
        };

        request({
            headers: {
                "Content-Type":"application/json"
            },
            url: "https://raw-engineering.chargify.com/subscriptions.json",
            method: "POST",
            auth: {
                "username":input.username,
                "pass":"x"
            },
            json: {"subscription":{
        "product_handle":"aaaa",
        "customer_attributes":{
          "first_name":"Sachin1",
          "last_name":"Jaiswal1",
          "email":"jaiswal@example.com1"
        }
      }}

        },function(err,response,body){
            console.log(err, response.statusCode, body)     
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if (typeof(body) == 'string') {
                        body = JSON.parse(body);
                    }
                    return output(null, body);
                }
                output(body);
            }
        })
    };
};








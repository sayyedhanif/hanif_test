var request = require('request');

module.exports = function(){

    this.id = "chargify-product-subscription-create";

    this.label = "Create Product Subscription";

    this.input = {
        "title": "Create Product Subscription",
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
            "customer": {
                "type": "object",
                "title": "Customer Type",
                "description": "Select the customer creation type",
                "oneOf": [ 
                {
                        "type": "object",
                        "title": "Select The Type",
                        "properties": {
                            "event": {
                                "type": "string",
                                "enum": [
                                    "select_cust"
                                ],
                                "options": {
                                    "hidden": true
                                }
                            }
                        }
                    },                   
                    {
                        "type": "object",
                        "title": "Choose an Existing Customer",
                        "properties": {
                            "event": {
                                "type": "string",
                                "enum": [
                                    "existing_cust"
                                ],
                                "options": {
                                    "hidden": true
                                }
                            },
                            "existing_cust_type": {
                                "type": "string",
                                "title": "By",
                                "enum": ["By Customer ID", "By Customer Referance"],
                                "description":"Select the customer existing type",
                                "minLength":1
                            },
                            "value": {
                                "type": "string",
                                "title": "Value",
                                "description":"Enter the value of either customer ID or customer referance according to above selection",
                                "minLength":1
                            }
                        }
                    },
                    {
                        "type": "object",
                        "title": "Create a New Customer",
                        "properties": {
                            "event": {
                                "type": "string",
                                "enum": [
                                    "customer_attributes"
                                ],
                                "options": {
                                    "hidden": true
                                }
                            },
                            "first_name": {
                                "type": "string",
                                "title": "First Name",
                                "minLength": 1,
                                "propertyOrder":1,
                                "description":"Enter customer first name"
                            },
                            "last_name": {
                                "type": "string",
                                "title": "Last Name",
                                "minLength": 1,
                                "propertyOrder":2,
                                "description":"Enter customer last name"
                            },
                            "email": {
                                "type": "string",
                                "title": "Email",
                                "minLength": 1,
                                "propertyOrder":3,
                                "description":"Enter customer email"
                            },
                            "phone": {
                                "type": "string",
                                "title": "Phone",
                                "propertyOrder":4,
                                "description":"Enter phone number"
                            },
                            "address": {
                                "type": "string",
                                "title": "Address 1",
                                "propertyOrder":5,                               
                                "description":"Enter the address 1"
                            },
                            "address_2": {
                                "type": "string",
                                "title": "Address 2",
                                "propertyOrder":6,                                
                                "description":"Enter the address 2"
                            },
                            "city": {
                                "type": "string",
                                "title": "City", 
                                "propertyOrder":7,                               
                                "description":"Enter the city name"
                            },
                             "state": {
                                "type": "string",
                                "title": "State",
                                "propertyOrder":8,                               
                                "description":"Enter the state name"
                            },
                            "zip": {
                                "type": "string",
                                "title": "Zip Code",
                                "propertyOrder":9,                                
                                "description":"Enter the zip code"
                            },
                            "country": {
                                "type": "string",
                                "title": "Country",
                                "propertyOrder":10,                                
                                "description":"Enter the country"
                            }
                        }
                    }
                ]
            },
            "credit_card": {
                "type": "object",
                "title": "Payment Method",
                "description": "Select the payment method",
                "oneOf": [                    
                    {
                        "type": "object",
                        "title": "Use existing Payment Method",
                        "properties": {
                            "event": {
                                "type": "string",
                                "enum": [
                                    "existing_card"
                                ],
                                "options": {
                                    "hidden": true
                                }
                            }
                        }
                    },
                    {
                        "type": "object",
                        "title": "Use a New Credit Card",
                        "properties": {
                            "event": {
                                "type": "string",
                                "enum": [
                                    "credit_card_attributes"
                                ],
                                "options": {
                                    "hidden": true
                                }
                            },
                            "full_number": {
                                "type": "string",
                                "title": "Card Number",
                                "minLength": 1,
                                "description":"Enter the credit card number"
                            },
                            "expiration_month": {
                                "type": "string",
                                "title": "Card Expiration Month",
                                "minLength": 1,
                                "description":"Enter the card expiration month"
                            },
                            "expiration_year": {
                                "type": "string",
                                "title": "Expiration Year",
                                "minLength": 1,
                                "description":"Enter the card expiration year"
                            },
                            "billing_address": {
                                "type": "string",
                                "title": "Address 1",                               
                                "description":"Enter the address 1"
                            },
                            "billing_address_2": {
                                "type": "string",
                                "title": "Address 2",                                
                                "description":"Enter the address 2"
                            },
                            "billing_city": {
                                "type": "string",
                                "title": "City",                                
                                "description":"Enter the city name"
                            },
                             "billing_state": {
                                "type": "string",
                                "title": "State",                               
                                "description":"Enter the state name"
                            },
                            "billing_zip": {
                                "type": "string",
                                "title": "Zip Code",                                
                                "description":"Enter the zip code"
                            },
                            "billing_country": {
                                "type": "string",
                                "title": "Country",                                
                                "description":"Enter the country"
                            }
                        }
                    }
                ]
            },
            "coupancode": {
                "type": "string",
                "title": "coupen code",                                
                "description":"Enter the country"
            }   
        }
    };


    this.help = "Service to create product subscription";


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
        var customer_type = {"By Customer ID":"customer_id", "By Customer Referance":"customer_reference"}

        console.log('before manage the subscription data')
        console.log(input)
        var productSubscriptionJSON = {};

        productSubscriptionJSON.product_handle = input.product_handle;
        if (input.customer.event == "existing_cust"){
            productSubscriptionJSON[customer_type[input.customer.existing_cust_type]] = input.customer.value;

        }else if(input.customer.event == "customer_attributes"){
            productSubscriptionJSON["customer_attributes"] = input.customer;
            delete productSubscriptionJSON.customer_attributes.event;
        }else{
            return output("Error : Select the customer creation type");
        }

        if (input.credit_card.event == "credit_card_attributes"){
            productSubscriptionJSON["credit_card_attributes"] = input.credit_card;
            delete productSubscriptionJSON.credit_card_attributes.event;
        }

        console.log('after manage the subscription data')
        console.log(productSubscriptionJSON)
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
            json: {
                "subscription": productSubscriptionJSON
            }
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








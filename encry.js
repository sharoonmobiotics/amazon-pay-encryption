var crypto = require('crypto');
var forge = require('node-forge');
const base64url = require('base64url');

	function encrypt(payload) {
		
		
		let key = Buffer.from([-37,-107,117,-65,-6,-32,110,125,-65,-110,-2,90,-28,71,-9,-8]);
	    let iv = Buffer.from([-37,-107,117,-65,-6,-32,110,125,-65,-110,-2,90,-28,71,-9,-8]);
		
		//console.log(key)

		// const encrypter = crypto.createCipheriv('aes-128-gcm', key, iv);

		// let encrypted = encrypter.update(Buffer.from(payload), 'binary', 'binary');
		// encrypter.setAutoPadding(false)
		// encrypted += encrypter.final('binary');
		// const tag = encrypter.getAuthTag();

		// encrypted= encrypted;
		
		// const cipher1 = crypto.createCipheriv('aes-128-gcm',key1 ,iv1);
        // console.log(key)
		// console.log(key1)
		// console.log(key2)
		// cipher1.setAutoPadding(true)
        // // encrypt the payload
        // const encrypted1 = Buffer.concat([cipher1.update(payload1), cipher1.final("base64")]);

        // // extract the auth tag
        // const tag1 = cipher1.getAuthTag();
        
		 // let encryptedPayload1 = encrypted1;
      
		key1= forge.util.createBuffer(key)
		iv1= forge.util.createBuffer(iv) 
	  
		let cipher = forge.cipher.createCipher("AES-GCM", key1);
		cipher.start({ iv: iv1});
		cipher.update(forge.util.createBuffer(payload));
		cipher.finish();
	
		let encrypted = Buffer.from(cipher.output.getBytes(), "binary");
		      let tag = Buffer.from(cipher.mode.tag.getBytes(), "binary");  
		          iv1 = Buffer.from(iv1.getBytes(), "binary");
    	
	//console.log(base64url(tag))
	 // console.log(encryptedPayload1);
		
		
		//RSA Encryption
		encryptedkey = RSAencrypt(key1);
		//console.log(encryptedkey);
  encryptedkey = Buffer.from(encryptedkey, "binary");
		 return {
		 "payload" : base64url(encrypted)+base64url(tag) ,
		 "iv" : base64url(iv1),
		 "key" : base64url(encryptedkey)
		 };
		 
	}
		 
		  // return {
		 // "payload" : base64url(encrypted) ,
		 // "iv" : base64url(iv),
		 // "key" : base64url.fromBase64(encryptedkey)
		 // };
	// }

	function RSAencrypt(key) {
	
		//test keyconst
		//const rsaPub = "-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlze3+eDchhnIaNU12YTitJZRvmvE+Au/DEcOQmuIecNfnw4p32ymXwtFa2Zndt9nrIByFLLWWDU6JeZUQ41c8GZXC5ZBAj/w2e48G05y3ssNr/70wXfOyH65/yqGoeH6V2rM9PVrFrMXg+g0VBfKVs+fAUmOhaRXeMNFXBQnAAWL2zH6gu80Nym7TLTNdoUtSbBJk92Bno2fV5QXmCZM3yjOtU+Etzqno5678rDIa85VhnLszXGBCDynI+hsQq13AEE/LmvQw25hUxe65ML/N4sP4IQZLbpypNSaW8NjZkm+FXbFhZFS6n7gjefElfkK/2kHY5pXD0cD8FFFynpsSQIDAQAB -----END PUBLIC KEY-----"
		//real
		const rsaPub = "-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq92yAzXaCQbGIid0mMBfulkGK8HqvAardDowtgbfGUZ+hIx6lhYKFMrluTr7bIlQ4qgJY85c9adkZSxHtr/DhTV/ch5CCHDET3YC/DaFTKDp5t2uHKQAIb2Rl/73HQOd/pgImTiaLHPBr/gyz4iztYmlJQIm0vVuPktIANDGpK8qhizdztA3as1bLtILQZ5VtOjNn/xl1HQ+JDtBhUVr13BuJPosecQz6ouhEtR+5i/grg6sUzayqPD1dY6AGRLR9ao/6DCeHT5arSYjlkx6BECuKoiARo7ItDfLameXJ1gLd8lkMzArIG275jbxAiPd4OchHEfcqBADYB51FYDTwQIDAQAB -----END PUBLIC KEY-----"

		var publicKey = forge.pki.publicKeyFromPem(rsaPub);
		
		var encrypted = publicKey.encrypt(key, 'RSA-OAEP', {
			
			//md: forge.md.sha256.create(),
			mgf1: {
		md: forge.md.sha1.create()
		}
		});
		return encrypted
	}


var obj = {
	"merchantId":"A2F1F5PF58HRYD",
	"mappingId":"23963_1560749544090",
	"customerIdType":"CONSENT_TOKEN",
	"customerIdValue":"Atza|IwEBIGNQ6yRADAIxjD5dLWQwN4KohVNnVRbtAftNzu6eM8E8bNRNMUjhY-F9HCETFvJcIhb0sTTQ9QcNBooGB7W9MP-ZyGhtiIENi7g9rXdzhP8e7x9rbykUAzKa_UtXvZIQq8HXAOHoDOtKoKBNG_ZIH62Rpk3R3f2u0rIFDhlp0ooUZ3VX-VhQ-C4UNJG-zqbF692z8ICAheT-bxw331mxj-v2Ssxt417kws-47XFvQb5LCsAAiTq_kt_NfDC9nz01wg4_52LWZZepmes_AMWEsBjsPxHxZByuZWmd1FcBQ8pPXYYAGh6wtN9HyFwfXRRXeve7lMInhAw9JGJ3Asd7yIbcVvPxEo1P_jeiz3WCO6EA0DukgYhEQl3ySXBGuReTMWNOnqCPBrEA1BHn21pb8sFIi4XvJyvkXEImo_fKX5j0RLl_zS_BKSuMgnsNXp-nR56LnQJZz-hEa6gxATl-qBoIergTJLdn68-vu1saVkWJCCtY-BQFN9zdlwibp6WF9UzSkO6xmQChw4qCjCt8VgjNCCnxyGqH7JLpXo0EP04uaM_rVdSTstYQZlf7k_AScVw",
	"signatureMethod":"HmacSHA384",
	"signatureVersion":"4",
	"accessKeyId":"68dc4e3e-2f67-4666-9dd3-68b1250c1626",
	"timeStamp":"1566296343475",
	"signature":"YhEnEJaf6D_0pA7dD8_v9tjFMTmL3zi_0_nchnhKUZUCdPFAZbzeP1cn6pBaxIZY"
	};

	
var payload = JSON.stringify(obj);

var output = encrypt(payload);

console.log(JSON.stringify(output));



	
	
(function() {
    'use strict';
    var orderCrypt;

    try{
        orderCrypt = angular.module('order.crypt');
    } catch(err) {
        orderCrypt = angular.module('order.crypt', []);
    }


    orderCrypt.service('DecryptService', ['apiParams', function(apiParams) {
        var self = this;

        self.decryptData = function(encryptedText) {
            var keyWordArray = CryptoJS.SHA256(apiParams.secret);
            var encrypted64WordArray = CryptoJS.enc.Base64.parse(encryptedText);
            var encryptCipher = {ciphertext: encrypted64WordArray};

            var decryptedWordArray = CryptoJS.AES.decrypt(encryptCipher, keyWordArray, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });

            var decryptedObj = JSON.parse(decryptedWordArray.toString(CryptoJS.enc.Utf8));

            return decryptedObj;
        };


        self.encryptData = function(data) {
            console.log('receive data:', data);


            return ;


            var keyWordArray = CryptoJS.SHA256(apiParams.secret);
            var jsonString = JSON.stringify(data);

            var encryptedData = CryptoJS.AES.encrypt(jsonString, keyWordArray, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });

            //var encryptedDataArray = CryptoJS.enc.Utf8.parse(encryptedData.ciphertext.toString());
            //var encryptedData64 = CryptoJS.enc.Base64.stringify(encryptedDataArray);
            //console.log('1 encryptedData64:', encryptedData64);

            var encryptedData642 = CryptoJS.enc.Base64.stringify(encryptedData.ciphertext);
            console.log('2 encryptedData64:', encryptedData642);


            return encryptedData642;
        }
    }]);

})();
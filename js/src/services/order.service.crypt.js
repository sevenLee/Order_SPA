(function() {
    'use strict';
    var orderServiceCrypt;

    try{
        orderServiceCrypt = angular.module('order.service.crypt');
    } catch(err) {
        orderServiceCrypt = angular.module('order.service.crypt', []);
    }


    orderServiceCrypt.service('DecryptService', function() {
        var self = this;

        require.ensure([], function () {
            var CryptoJS = require('crypto-js');

            self.decryptData = function(encryptedText) {
                var keyWordArray = CryptoJS.SHA256(globalENV.secret);
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
                var keyWordArray = CryptoJS.SHA256(globalENV.secret);
                var jsonString = JSON.stringify(data);

                var encryptedData = CryptoJS.AES.encrypt(jsonString, keyWordArray, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });

                var encryptedData64 = CryptoJS.enc.Base64.stringify(encryptedData.ciphertext);

                return encryptedData64;
            }
        });
    });
})();
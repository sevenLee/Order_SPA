(function() {
    'use strict';
    var tmApp = angular.module('teamManageApp');

    tmApp.service('DecryptService', ['apiParams', function(apiParams) {
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
            var keyWordArray = CryptoJS.SHA256(apiParams.secret);
            var jsonString = JSON.stringify(data);

            var encryptedData = CryptoJS.AES.encrypt(jsonString, keyWordArray, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });

            return encryptedData.ciphertext.toString();
        }
    }]);

})();
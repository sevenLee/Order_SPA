(function(){
  'use strict';
  var orderLang;

  try{
    orderLang = angular.module('order.magen.lang');
  } catch(err) {
    orderLang = angular.module('order.magen.lang', []);
  }

  orderLang.service('MagenLangService',['$cookies', function($cookies) {
    var self = this;

    self.setExpiredTime = function(expiredTimePeriod) {
      var today = new Date();
      var expired = new Date(today);

      expired.setTime(today.getTime() + expiredTimePeriod);

      return expired;
    };

    self.setLangCode = function(langCode){
      var expiredTimePeriod = 86400000*360*30;
      var expired = self.setExpiredTime(expiredTimePeriod);

      //$cookies['INFI_ORDERAPP_TOKEN[LANG_CODE]'] = langCode;

      $cookies.put("INFI_ORDERAPP_TOKEN[LANG_CODE]", langCode, {expires : expired, encode: false });
    };

    self.setRegionCode = function(regionCode){
      var expiredTimePeriod = 86400000*360*30;
      var expired = self.setExpiredTime(expiredTimePeriod);

      $cookies.put(String('INFI_ORDERAPP_TOKEN[REGION_CODE]'), regionCode, {expires : expired, encode: false });
    };

    self.getLangCode = function(){
      var langCode = $cookies.get('INFI_ORDERAPP_TOKEN[LANG_CODE]');
      return langCode;
    };

    self.getRegionCode = function(){
      var regionCode = $cookies.get('INFI_ORDERAPP_TOKEN[REGION_CODE]');
      return regionCode;
    };

    //self.deleteCredential = function(){
    //  if($cookies.getObject('userSession')) {
    //    $cookies.remove('userSession');
    //  }
    //};

  }]);
})();

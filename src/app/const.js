/*/////////////////////////////////////////////////////////////////////////////

  Author  : @qodeninja

/////////////////////////////////////////////////////////////////////////////*/

"use strict";

// NOTE use config-local.js to override base config in local environments

/*/////////////////////////////////////////////////////////////////////////////
// Defs
/////////////////////////////////////////////////////////////////////////////*/

  var F = false;
  var T = true;
  var OBJ   = 'object';
  var ARR   = 'array';
  var NUM   = 'number';
  var FUNC  = 'function';
  var UNDEF = 'undefined';
  var EMPTY = '';
  var HASH  = '#';
  var ZERO  = '0';
  var H     = 'λ';
  var HYPER = 'λyper';
  var HYPER_WARNING = 'λyper warning: ';
  var HYPER_ERROR   = 'λyper error: ';

  var GIGABYTE = 1073741824;
  var MEGABYTE = 1048576;
  var KILOBYTE = 1024;
  var SECOND   = 1000;
  var HOUR     = 3600000;
  var DAY      = 86400000;

  module.exports = {

      DEV_COLORIZED_LOG      : 'true',
      SESSION_COOKIE_ID      : 'hyper.sid',
      SESSION_COOKIE_TIMEOUT : DAY,

      PREF_COOKIE_ID         : 'hyper.pref',
      PREF_COOKIE_TIMEOUT    : DAY*60,

      APP_PORT               : 3000,
      APP_DEFAULT_TIMEOUT    : HOUR*2,
      APP_THEME              : 'zero',
      APP_GLOBAL_LAYOUT      : false,
      APP_UPLOAD_LIMIT       : GIGABYTE*5,

      API_COOKIE_ID          : 'nox.api',
      API_COOKIE_TIMEOUT     : DAY,

      LOCAL_CONFIG           : 'config-local.js',
      LOCAL_PORT             : 8080,

      USE_SKIN_BASE          : true,
      SKIN_BASE              : '/skin/base',

      USE_UPGRADE_SKIN       : false,

      PROXY_COOKIE_ID        : 'hyper.proxy',
      PROXY_COOKIE_TIMEOUT   : DAY*7,

      PROXY_PATH             : 'iframe',
      PROXY_PORT             : 6156,

      LOCAL_CONFIG           : 'local-config.js',
      LOCAL_PORT             : 8080,

      API_TRANSPORT_HOST     : 'localhost',
      API_TRANSPORT_LOCAL    : 'localhost',
      API_TRANSPORT_PORT     : 10003,
      API_TRANSPORT_MAX      : 30,
      API_TRANSPORT_TIMEOUT  : SECOND*5,
      API_TRANSPORT_TIMEOUTL : SECOND*30,

      GIGABYTE : GIGABYTE,
      MEGABYTE : MEGABYTE,
      KILOBYTE : KILOBYTE,
      SECOND   : SECOND,
      HOUR     : HOUR,
      DAY      : DAY

    };

/*
  APPLICATION BASE PATHS

*/


/*/////////////////////////////////////////////////////////////////////////////
// Standalone
/////////////////////////////////////////////////////////////////////////////*/

  if( require.main === module ){
    console.log(__dirname);
  }

/*                    
  ______    ______  
 /      \  /      \ 
/$$$$$$  |/$$$$$$  |
$$ |  $$ |$$ |  $$ |
$$ \__$$ |$$ |__$$ |
$$    $$ |$$    $$/ 
 $$$$$$$ |$$$$$$$/  
      $$ |$$ |      
      $$ |$$ |      
      $$/ $$/   

     qodeparty    
      
*/

"use strict" 

/*/////////////////////////////////////////////////////////////////////////////
// Imports
/////////////////////////////////////////////////////////////////////////////*/
  
  var utils  = require('./utils');
  var isFunc = utils.isFunction;
  var isArr  = utils.isArray;

/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/

  function Dispatcher( spec ){

    this.stack      = spec.stack      || [];
    this.dispatcher = spec.dispatcher || 'dispatch';

  };

  function* stack( plates ){
    yield 1;
    yield 2;

  }

  Dispatcher.prototype.stack = function stack( fn, onStack, onError ){

  };

  Dispatcher.prototype.dispatch = function dispatch( fn, onDispatch, onError ){

  };

/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/
  

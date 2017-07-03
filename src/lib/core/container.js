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
  
 var utils   = require('./utils');
 var inherit = utils.inherit;
 var mixin   = utils.mixin;
 var isFunc  = utils.isFunciton;

/*/////////////////////////////////////////////////////////////////////////////
// Container Error
/////////////////////////////////////////////////////////////////////////////*/


  function ContainerError( msg ){
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = msg;
    this.name = 'ContainerError';
  };

  inherit( ContainerError, Error );


/*/////////////////////////////////////////////////////////////////////////////
// Container
/////////////////////////////////////////////////////////////////////////////*/



  function Container( spec ){
    this.cache   = spec.cache || {};
    this.stack   = spec.stack || [];
  };



  Container.prototype.load = function load( spec ){
    
    if( this.cache ) return this.cache;
    if( spec.cache ) return spec.cache;
    return this.compile( spec );

  };




  Container.prototype.compiler = function compiler( fn, fn, fn ){
    let len = arguments.length;  
    if( !len ) return false;

    for( let i = 0; i < len; ++i ){
      let arg = arguments[i];
      if( isFunc( arg ) ) this.stack.push( arguments[i] );
    }
    
  };



  Container.prototype.compile = function compile( spec ){

    this.cache = fn;
    return fn;
  };




  function createContainer( spec ){
    return new Container( spec );
  }


/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/
  

  module.exports = createContainer;
  module.exports.Container = Container;

  container.compiler( function( spec ){


  }); 

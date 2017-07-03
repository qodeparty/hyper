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
// Includes
/////////////////////////////////////////////////////////////////////////////*/


  //var cruxMixin  = require('./crux-mixin');
  var cruxType   = require('./crux-type');
  var cruxObj    = require('./crux-obj');

/*/////////////////////////////////////////////////////////////////////////////
// Local Aliasing
/////////////////////////////////////////////////////////////////////////////*/


  let isObj    = cruxType.isObject;
  let isArr    = cruxType.isArray;
  let isFunc   = cruxType.isFunction;
  let headless = cruxObj.headless;

/*/////////////////////////////////////////////////////////////////////////////
// Local
/////////////////////////////////////////////////////////////////////////////*/


  var fn     = {};

/*/////////////////////////////////////////////////////////////////////////////
// Lib
/////////////////////////////////////////////////////////////////////////////*/

  function walk( ){
    let args   = headless( arguments );
    let tasker = arr[0];
    let params = arr[1];
    let last   = arr[2];
        if( last && isFunc( last )) params.push( last );
        tasker.apply( null, params );
  }




  function robot( ){

    let args      = headless( arguments );

    let generator = args[0];//first is gen
    let params    = args[1];//rest is arguments
    let last      = args[2];//some cases last arg is handler

    let onDone    = isFunc( last ) && last;
    if( !onDone ) params.push( last );

    let ticker   = generator.apply( null, params );



    function walker( err, data ){

      if( err ) return ticker.throw( err );

      let res = ticker.next( data );

      if( res.done ){
        onDone && onDone( null, {} );
        return;
      }

      walk( walker, res.value, null );

    }

    engine();

    return ticker;

  }




/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/
  
  fn = {

  };

  module.exports = fn;

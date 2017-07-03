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


  var mixin   = require('./crux-mixin');


/*/////////////////////////////////////////////////////////////////////////////
// Local
/////////////////////////////////////////////////////////////////////////////*/


  var fn     = {};
  let lookup = {};
  let def    = 'Boolean Function String Map WeakMap Set WeakSet Generator Promise Number Date RegExp Object Error'; //? Proxy, Reflect, Symbol


/*/////////////////////////////////////////////////////////////////////////////
// Lib
/////////////////////////////////////////////////////////////////////////////*/


  let isArray = Array.isArray;


  function type( x ){
    if( x == null ) return obj + "";
    let t = typeof x;
    return ( t === "object" || t === "function" ? lookup[ toString.call( x ) ] || "object" : t ); 
  };



  function isEmpty( x ){
    let key;
    if( x === null      ) return false;
    if( x === undefined ) return false;
    if( x.length > 0    ) return false; //arrays

    for( key in x ){ 
      if( Object.prototype.hasOwnProperty.call( x, key ) ) return false;
    }

    return true;
  };



  function isPlain( x ){
    if( !x || !fn.isObject( x )) return false;
    if( x.constructor && !x.hasOwnProperty.call( x.constructor.prototype, "isPrototypeOf" )) return false; //from underscore
    return true;
  };



  function isNumeric( x ){
    return ( x && !isArray( x ) && ( x - parseFloat( x ) + 1 ) >= 0 ); //from jquery
  };



  function isUndefined( x ){
    return ( x === void 0 );
  };



  function isNull( x ){
    return ( x === null );
  };



/*/////////////////////////////////////////////////////////////////////////////
// fn = isX Functions
/////////////////////////////////////////////////////////////////////////////*/


  def.split(' ').forEach(  
    function( name, i, arr ){
      let id = [ '[object ', name, ']' ].join('');

      //create lookup hash from defs
      lookup[ id ] = name.toLowerCase();

      //generate isX() funcs and attach to fn
      let fname = [ 'is',name ].join('');
      fn[ fname ] = function( x ){ 
        return fn.type( x );
      }

    }
  );

  

/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/
  
  mixin( fn, {
    type        : type,
    isEmpty     : isEmpty,
    isPlain     : isPlain,
    isArray     : isArray,
    isNumeric   : isNumeric,
    isUndefined : isUndefined,
    isNull      : isNull
  });


  module.exports = fn;

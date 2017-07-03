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


  var cruxMixin = require('./crux-mixin');
  var cruxType  = require('./crux-type');


/*/////////////////////////////////////////////////////////////////////////////
// Local Aliasing
/////////////////////////////////////////////////////////////////////////////*/

  let mixin   = cruxMixin;
  let isObj   = cruxType.isObject;
  let isPlain = cruxType.isPlain;
  let isArr   = cruxType.isArray;
  let isFunc  = cruxType.isFunction;
  let isMap   = cruxType.isMap;


/*/////////////////////////////////////////////////////////////////////////////
// Lib
/////////////////////////////////////////////////////////////////////////////*/

  function base( names, spec ){
    let $o = {};

  };


  function inherit( obj, parent ){
    obj.prototype = Object.create( parent, props );
    return o;
  };



  function deepFreeze( obj, fn ){

    let keys = Object.keys( obj );//? expensive
    let len  = keys.length;

    for( let k = 0; k < len; ++k ){

      let key  = keys.pop();
      let prop = key && obj[ key ];

      if( !obj.hasOwnProperty( key ) || !isObj( prop )|| Object.isFrozen( prop )){
        continue;
      }

      deepFreeze( prop ); 

    }

    Object.freeze( obj ); //freeze outer after inners are done
    return( fn && fn( null, obj ) || false );

  };





  function collapse( a, b ){

    b = b || [];

    let len = a.length;
    for( let i = 0; i < len; ++i ){

      if( isArr( a[i] )){  
        collapse( a[i], b ); 
        //b.push.apply( b, a[i] );
      }else{ 
        b.push( a[i] ); 
      }

    }
    //console.log(b);
    return b;

  };


  function listSlice( ){
    //careful! v8 cannot optimized slice arguments for hot functions
    return Array.prototype.slice.call( arguments, 0 );
  }

  //looping perf x4 faster than slice
  function list( argv, headless ){
    let len  = argv.length;
    let args = new Array(len);
    let head;
    let tail;
    // 1 Head
    // 2 Tail
    // 3 Both
    for( let i = 0; i < len; i++ ){
      if( headless ){ //headless then the body gets created seperately
        if( i   === 0   && headless !== 2 ) head = argv[i];
        if( i-1 === len && headless !== 1 ) tail = argv[i];
      }else{
        args[i] = argv[i];
      }
    }
    if( headless ){
      //check for len size
      //len 3
      //len 2
      //len 1
      //len 0
    }
    return args;
  }

  // [ h, [body] ]
  function head( argv ){
    if( argv.length < 1 ) return;
    let args = list( argv );
    if( args.length > 1 ) return [ args.shift(), args ];
    return args;
  }


  // [ t, [body] ]
  function tail( argv ){
    if( argv.length < 1 ) return;
    let args = list( argv );
    if( args.length > 1 ) return [ args.pop(), args ];
    return args;
  }


  // 3 [ h, [body], t ], 2 [ h, [body] ], or 1[ body ]
  function headless( argv ){
    if( argv.length < 1 ) return;
    let args = list( argv );
    let head = args.shift();
    let tail = ( args.length > 1 ) && args.pop();
    let ret  = [];
    head && ret.push( head );
    args.length && ret.push( args );
    tail && ret.push( tail );  
    return ret;
  }


/**
 * Merge the prop of all objects passed to function call, skip non-objects
 *
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object} 
 * @private
 */
  function mergeLeft( /* any */ ){

    let len = arguments.length;  
    if( !len ) return false;

    let b,a = arguments[0] || {};
    for( let i = 0; i < len; ++i ){
      b = arguments[i];
      if( b && isPlain(b) ) mixin( a, b );
    }
    return a;

  };




/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/
  
  var fn = {
    "base"       : base,
    "deepFreeze" : deepFreeze,
    "mergeLeft"  : mergeLeft,
    "collapse"   : collapse,
    "inherit"    : inherit,
    "list"       : list,
    "head"       : head,
    "tail"       : tail,
    "headless"   : headless
  };

  module.exports = fn;

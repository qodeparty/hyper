/*/////////////////////////////////////////////////////////////////////////////

  Author  : Tony Vieques

/////////////////////////////////////////////////////////////////////////////*/

"use strict";

/*/////////////////////////////////////////////////////////////////////////////
// Includes
/////////////////////////////////////////////////////////////////////////////*/

  const http         = require('http');
  const proto        = require('express');
  const sss          = require('express-session');
  const bodyParser   = require('body-parser');
  const cookieParser = require('cookie-parser');
  const errorHandler = require('errorhandler');
  const override     = require('method-override');
  const favicon      = require('serve-favicon');

/*/////////////////////////////////////////////////////////////////////////////
// Config
/////////////////////////////////////////////////////////////////////////////*/
  
  const defaults = {
    SERVER_ID   : 'Hyper',
    SESSION_ID  : 'hyper.sid',
    VIEW_ENGINE : 'pug',
    APP_PORT    : 80,
    LOCAL_PORT  : 3000,
    PUBLIC_WWW  : './www'
  }

/*/////////////////////////////////////////////////////////////////////////////
// Server
/////////////////////////////////////////////////////////////////////////////*/

  function HyperServer($){

    //setup
    $ = Object.assign( defaults, $ ); 

    //injection
    let gx   = $.generator;
    let hx   = $.handler;

    //prototype
    let $ns, $n = proto();
    let dev  = ( 'development' == $n.get('env') || process.env.NODE_ENV  == 'development' );
    let port = (( dev ? $.LOCAL_PORT : $.APP_PORT ) || process.env.NODE_PORT );
 
    //config mapping
    $n.set( 'port', port );
    $n.set( 'view engine', $.VIEW_ENGINE );

    //middleware in out next
    if( dev ) $n.use( errorHandler({ dumpExceptions: true, showStack: true }) );
    $n.use( bodyParser.json() );
    $n.use( bodyParser.urlencoded({ extended:true }) );
    $n.use( override() );
    $n.use( cookieParser() );
    $n.use( sss({secret: 'secret', key:$.SESSION_ID, resave:true, saveUninitialized:true }));
    $n.use( ( i, o, n ) => { o.set('X-Powered-By', $.SERVER_ID ); n(); });
    $n.use( ( i, o, n ) => { i.baseUrl = i.originalUrl.split("?").shift(); n(); });
    $n.use( ( i, o, n ) => { console.info( `[${i.method} ${i.baseUrl}]`) || n(); }); //| q:${k(i.query)} \t | c:${k(i.cookies)}` ) || n(); });
    $n.use( favicon( $.PUBLIC_WWW + '/favicon.ico') );
    $n.use( proto.static( $.PUBLIC_WWW, {  
        setHeaders: ( res, path, stat ) => res.set('X-Timestamp', Date.now())
    }));

    //route stubs
    $.router.route( $n );

    //boot
    $ns = http.createServer($n)
          .on( 'close', ()=> {
            console.error( $.SERVER_ID + " - Shutting Down..");
          })
          .listen( port, data => {
            console.info( `Env  : [ ${( dev ? "DEV" : "UAT" )} ] \nPort : [ ${port} ]` );
            console.info( `URL  :  http://localhost:${port}` );
          });

    //termsigs
    process.once( 'SIGUSR2', ()=> {
            console.warn( 'Attempting to graceful kill...' );
            process.kill( process.pid, 'SIGUSR2');
          })
          .once( 'EADDRINUSE', ()=> {
            console.warn( 'Required port unavailable' );
            process.exit(1);
          });

    return $n;
  }

/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/
 
  module.exports = HyperServer;
  module.exports.defaults = defaults;

/*/////////////////////////////////////////////////////////////////////////////

  Author  : @qodeninja

/////////////////////////////////////////////////////////////////////////////*/

"use strict";


/*/////////////////////////////////////////////////////////////////////////////
// λ - Includes
/////////////////////////////////////////////////////////////////////////////*/  

  const EE      = require('events');
  const http    = require('http');
  const extend  = require('lodash').extend;
  const unique  = require('lodash').unique;
  const express = require('express');
  const error   = require('./error');

/*/////////////////////////////////////////////////////////////////////////////
// λ - Server Prototype
/////////////////////////////////////////////////////////////////////////////*/  

  class HyperPrototype extends EE{

    constructor( options ){
      super();
      this.config = {};
      this.server = null;
    }


    error(){
      console.log('stub::error');
      this.emit('error');
    }


    init(){
      console.log('stub::init');
      this.emit('init');
    }


    boot(){
      console.log('stub::boot');
      this.emit('boot');
      // let bootStack = [

      //   { symbol:HYPER_CONFIG, hook:fx, parallel:false,  }, 
      //   HYPER_INIT,
      //   HYPER_LOAD,
      //   HYPER_START,
      //   HYPER_MOUNT,
      //   HYPER_BIND,
      //   HYPER_READYsud 

      // ];

      // let bootStatus = {};

    }

    start(){

      this.emit('start');
      //this.server = http.createServer(express());

    }

    mount(){
      console.log('stub::mount');
      this.emit('mount');
    }



    bind(){

      this.on( 'error', (err) => {
        console.log('whoops! there was an error');
      });

      this.server.on( 'close', function(){
        console.error("Server Shutting Down..");
      });

      this.server.listen( exp.get('port'), (data) => {
        console.info( "Hyper Server is now listening @ port [" + exp.get('port') + "]" );
        console.info( "http://localhost:" + exp.get('port') );
      });
      
      this.emit('bind');
    }

    bounce(){
      console.log('stub::bounce');
      this.emit('bounce');
    }

    listenProcess(){

      process.once( 'uncaughtException', (err) => {
        console.log('whoops! there was an error');
      });

      //PROCESS EVENTS
      process.once( 'SIGUSR2', function () {
        console.warn("Attempting to graceful kill...");
        process.kill(process.pid, 'SIGUSR2');
      });


      process.once( 'EADDRINUSE', function(){
        console.warn( "Required port unavailable");
        process.exit(1);
      });

    }

    shutdown(){
      console.log('stub::shutdown');
      this.emit('shutdown');
    }

    status(){
      console.log('stub::status');
      this.emit('status');
    }


  }


/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/


  module.exports = HyperPrototype;


/*/////////////////////////////////////////////////////////////////////////////
// Standalone
/////////////////////////////////////////////////////////////////////////////*/

  if( require.main === module ){
    var args = process.argv.slice(2);
    args.forEach(function (val, index, array) {
      console.log(index + ': ' + val);
    });
  }

/*/////////////////////////////////////////////////////////////////////////////

  Author  : @qodeninja

/////////////////////////////////////////////////////////////////////////////*/

"use strict";


/*/////////////////////////////////////////////////////////////////////////////
// λ - Includes
/////////////////////////////////////////////////////////////////////////////*/  
  
  const util    = require('util');
  const EE      = require('events');
  const http    = require('http');
  const path    = require('path');

  //  const express  = require('express');
  // const session  = require('cookie-session');
  // const parser   = require('cookie-parser');
  //  const body     = require('body-parser');
  //  const errors   = require('errorhandler');
  const disp = require('./dispatch.js');

  const app  = require('fastify')();
	//const io   = require('socket.io');

	
/*/////////////////////////////////////////////////////////////////////////////
// λ - Server Prototype
/////////////////////////////////////////////////////////////////////////////*/  

  class HyperServer extends EE{

    constructor( options = {} ){
      super();
      this.config = options;
      this.server = null;
      this.dispatch = {}
      setTimeout( ()=>{
        this.init();
        this.start();
      },1000);
    }

    init(){
      console.log('stub::init');
      this.emit('init',{today:1});
    }

    conf( options ){
      console.log('stub::config');
      this.config = {...this.config, ...options};
      this.emit('config');
    }

    start(){
      console.log('stub::start');
      this.emit('start');
    }


    setMode( mode ){}
    setPort( port ){}

    registerDispatcher(){}

    run(){

      app.get('/', async (req, res) => {
        return { hello: 'world' }
      });

      app.listen(3000, '0.0.0.0', function (err, address) {
        if (err) {
          app.log.error(err)
          process.exit(1)
        }
        app.log.info(`server listening on ${address}`)
      })


    }

  }


/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/


  module.exports = HyperServer;


/*/////////////////////////////////////////////////////////////////////////////
// Standalone
/////////////////////////////////////////////////////////////////////////////*/

  if( require.main === module ){
    var args = process.argv.slice(2);
    args.forEach(function (val, index, array) {
      console.log(index + ': ' + val);
    });
  }

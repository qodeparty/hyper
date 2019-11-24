/*                    
     __     
     \ \    
      \ \   
       > \  
      / ^ \ 
     /_/ \_\
            
      hyper 


*/

/*/////////////////////////////////////////////////////////////////////////////

  Author  : @qodeninja

/////////////////////////////////////////////////////////////////////////////*/

  "use strict";


/*/////////////////////////////////////////////////////////////////////////////
// λ - Includes 
/////////////////////////////////////////////////////////////////////////////*/  


  const initServer = require('./app');

  //const config      = HyperServer.defaults;

/*/////////////////////////////////////////////////////////////////////////////
// λ - Run 
/////////////////////////////////////////////////////////////////////////////*/  

  try{
    console.log("================== λyper ===================");
    let hyper = initServer({sky:'blue'});

    // hyper.registerHooks([
    //   'mount',
    //   'config',
    //   'locals',
    //   'session',
    //   'reroute',
    //   'static',
    //   'bind',
    //   'unbind',
    //   'shutdown'
    // ]);

    //let hyper = new HyperServer({sky:'blue'});

    hyper.on('init', function(e){
      console.log('init event yay', e);
    });

    hyper.on('config', function(e){
      console.log('config changed', this.config);
    });

    hyper.run();

    console.log(hyper);
  }catch(err){
    console.error(err);
    process.exit(1);
  }

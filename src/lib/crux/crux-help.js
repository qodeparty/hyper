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
// Lib
/////////////////////////////////////////////////////////////////////////////*/

  function harmony(){
    if (!~process.execArgv.indexOf('--harmony')) {
        throw 'Hyper must be run with --harmony flag';
    }
  };


  function strict(){
    if (!~process.execArgv.indexOf('--use-strict')) {
        throw 'Hyper must be run with --use-strict flag';
    }
  };


/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/
  
  var expose = {
                "harmony"    : harmony,
                "strict"     : strict
               };

  module.exports = expose;
/*/////////////////////////////////////////////////////////////////////////////
// Δ - %%buildstring%
/////////////////////////////////////////////////////////////////////////////*/

  //"use strict"

/*/////////////////////////////////////////////////////////////////////////////
// Δ Includes
/////////////////////////////////////////////////////////////////////////////*/

  const fs   = require("fs");
  const path = require("path");
  const proc = require("child_process");
  const eve  = require('events');

/*/////////////////////////////////////////////////////////////////////////////
// Vars
/////////////////////////////////////////////////////////////////////////////*/

  const BASE_PATH = path.resolve('.');
  const UTF8      = 'utf8'
  const UNDEF     = 'undefined';

/*/////////////////////////////////////////////////////////////////////////////
// Δ Lib Functions 
/////////////////////////////////////////////////////////////////////////////*/

  const mr = Math.random, 
        mf = Math.floor, 
        tl='toLowerCase',
        tu='toUpperCase',
        isa=Array.isArray,
        sfc=String.fromCharCode,
        log=console.log;

  const timestamp    = ()   => { return +new Date(); }
  const stringify    = (s)  => { return JSON.stringify(s) + ""; }
  const keyParse     = (u)  => { let q=Object.keys(u); return(q.length ? q : '--'); }
  const quickRand    = (m,n)=> { n=n||0;m=(isa(m)?m.length:m); return mf(mr()*m)+n; }
  const hexGen       = (n)  => { function b(a){ return a?(a^mr()*16>>a/4).toString(16):([1e7]+1e3+4e3+'').replace(/[018]/g,b); } return b(n); }
  const clockGen     = (m,c)=> { c=c||1;return (x)=>{ if(m!==null && c<=m){ if(x) c=0;return c++;} return null;}};
  const counter      = clockGen(true);

  const alnumGen = (l,a)=>{
    a=a&&a[tl](),s="",i=0,m=a=="a"?10:0,n=a=="n"?10:62;
    for(;i++<l;){let r=mr()*(n-m)+m<<0; s+=sfc(r+=r>9?r<36?55:61:48);}
    return s;
  }

  //ref:https://stackoverflow.com/questions/7616461
  const hashString = (str, asString, seed) => {
    /*jshint bitwise:false */
    var i, l,
        val = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        val ^= str.charCodeAt(i);
        val += (val << 1) + (val << 4) + (val << 7) + (val << 8) + (val << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (val >>> 0).toString(16)).substr(-8);
    }
    return val >>> 0;
  }


  function hashFast(str) {
    var hash = 5381,
        i    = str.length;

    while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }

    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     * integers. Since we want the results to be always positive, convert the
     * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
  }


  const line = (len=80) => { console.log( '-'.repeat(len) ); }
  const NL   = "\n";
/*/////////////////////////////////////////////////////////////////////////////
// Δ Regex
/////////////////////////////////////////////////////////////////////////////*/

  const REGEX_DECLARE = /^\s*(?:var|let|const|function)[\t ]+([\w_$]+)/gm;
  const REGEX_INCLUDE = /(?:((?:var|let|const|,|)[\t ]*)([\w_$\.\[\]"'`]+)(\s*=\s*))?require\(([^\)]+)\)(\s*[`\.\(\[])?/gm;

/*/////////////////////////////////////////////////////////////////////////////
// Δ Code Prototype
/////////////////////////////////////////////////////////////////////////////*/

  class Code extends eve{

    constructor( options ){
      super();
      this.path       = '';
      this.filename   = '';
      this.code       = '';
      //this.fs         = fs;
      this.hashFX     = hashFast;
      this.meta       = {};
      this.files      = [];
      this.data       = [];
      this.cache      = {};
      this.resolved   = {};
    }

  /*----------------------------------------------*/


      static read( filepath ){
        try { return fs.readFileSync(filepath, "utf8")} catch(e){ throw new Error("File does not exist: " + filepath)}
      }

      static readJSON(file) {
        var json = read(file)
        try { return JSON.parse(json)} catch (e) {throw new Error("invalid JSON: " + json)}
      }

      static write( filepath, code ){
        try { fs.writeFileSync( filepath, code, "utf8") } catch(e){throw new Error("Cannor write to file: " + filepath)}
      }

      static append( filepath, code ){
        try { fs.appendFileSync( filepath, code, "utf8") } catch(e){throw new Error("Cannot append to file: " + filepath)}
      }


      static isFile(filepath) {
        try{
          return fs.statSync(filepath).isFile()
        }catch(e){
          return false
        }
      }

  /*----------------------------------------------*/

      read( file ){
        let $  = this;
        let id = this.findCache( file );
        if( id ) return this.getCache(id);    
        if( Code.isFile(file) ){
          //not found in cache so load file
          let cache = this.addCache( file, Code.read( file ) );
          return cache; //this could fail
        }
        return { data:null} ;
      }


  /*----------------------------------------------*/

      export(){
        console.log('stub');
      }

      import(){
        console.log('stub');
      }

  /*----------------------------------------------*/

      resolve( ref, file ){

        let $ = this;
        let isFile = Code.isFile;

        //console.log( 'fn', file, ref ); //filepath is referring source, filename is required file

        if( file[0] !== "." ){

          // resolve as npm dependency
          var packagePath = "./node_modules/" + file + "/package.json"

          //var pp   = path.resolve( "./node_modules/", file,  "/package.json" )
          console.log( 'pp', packagePath );

          var meta = isFile(packagePath) ? parse(packagePath) : {}
          var main = "./node_modules/" + file + "/" + (meta.main || file + ".js")
          var res = path.resolve(isFile(main) ? main : "./node_modules/" + file + "/index.js")
          //RESOLVED.push( file +" -> " + res );
          return res

        } else {

          // resolve as local dependency
          var res =  path.resolve(path.dirname(ref), file + ".js")
          //RESOLVED.push( file +" -> " + res );
          return res

        }

      }
 
  /*----------------------------------------------*/

      addCache( file, data ){
        let fidx   = this.cacheFile( file );
        let id     = this.hashFX( file, true );
        let fileID = path.basename( file );
        let cache  = {
          file : fileID,
          id    : id   || null,
          vars  : [],
          deps  : {},
          uri   : fidx,
          data  : data || null,
          cached: timestamp(),
          size  : ( data ?  Buffer.byteLength(data, 'utf8') : 0),
          seen  : 1
        };

        if( !this.cache[ id ] ){
          this.setCache( id, cache );
        }else{
          //cache already exists what do we do?
          //check code
          //ignore/warn
          console.warn('cache exists', fileID);
          let oldCache = this.getCache( id );
          if( oldCache.data != data ){
            console.warn('hmm data looks different...');
          }
          cache = oldCache;
          cache.seen++;
        }

        line();
        //log( file, id,  NL, data );

        return cache;

      }



      findCache( ref ){
        if( this.cache[ ref ] ) return ref;
        let id = this.hashFX( ref ); 
        if( id && this.cache[ id ] ) return id;
        return false;
      }



      getCache( id ){
        return this.cache[ id ] || null;
      }



      setCache( id, cache ){
        this.cache[ id ] = cache;
        return id;
      }


      cacheFile( file ){
       let files = this.files;
       let idx   = files.indexOf( file );
       if( idx === -1 ){ this.files.push(file); return this.files.length-1; }
       return idx;
      }

  /*----------------------------------------------*/
      //findVars
      //findDeps
 
      declareProcessor( $, cache, next ){
        var data = cache.data;
        //console.log($);
        data.replace( REGEX_DECLARE, function( match, binding ){ 
          cache['vars'].push(binding); 
        });

      }


      includesProcessor( $, cache, next ){

        var data = cache.data;
        var file = this.files[ cache.uri ];
        //console.log( cache, cache.uri, this.files )
        return data.replace( REGEX_INCLUDE, function( match, def="", variable="", eq="", dep, rest="" ){
           //log( `match => ${match}  [${def}] [${variable}] [${eq}] [${dep}] [${rest}]` );

            var pre = "";
            var nextFile = new Function("return " + dep).call();

            log( 'filename', nextFile );
            
            if( def[0] === "," ) def = "\nvar ", pre = "\n"
          
            var dependency = $.resolve( file, nextFile );//get abs path
            var localUUID = cache.uuid;

            cache['deps'][variable] = $.cacheFile( dependency )
            //modules[dependency] = rest ? "_" + localUUID : variable;

            var code = next( dependency, $.read( dependency ) ); //recursive

            //cache.uuid++;
            //uuid++

            //log( `dep => ${cache['deps'][variable]}`);

            return code + rest;
          //recursive
        });

      }


      exportsProcessor(){

      }


      cleanupProcessor(){

      }


      procHandler( file, cache, proc ){

        let jobs = {
            preBatch  : [],
            postBatch : [],
            pre  : [ declareProcessor ],
            proc : [ includesProcessor, exportsProcessor ],
            post : [ cleanupProcessor ]
        }

      }

      processStack( jobs ){

          //preprocess
          
          //nextprocess
          
          //postprocess
          
      }

  /*----------------------------------------------*/

      process( file, data, processor ){

        let $ = this;


        var bindings = {};
        var uuid     = 1000;

        function _process( _file, _data ){

          //handles cases for -> null, { data }, data always results in { data }
          let cache = ( _data && _data['cached'] ? _data : ( _data ? $.addCache(_file, _data) : $.read(_file)));

          _data = cache.data;
                  cache.uuid = cache.uuid || uuid;

          $.declareProcessor($,cache);

          return $.includesProcessor($,cache,_process);

          
        }


        var code = _process( file, data );

        console.log( this.cache );// module => variable 
        log( 'rand', alnumGen( 4, 'n' ));
       // //dep => require file     .. file
       // //def => (let/const/func) .. decl
       // //variable =>             .. name/id
       // //

      }


  /*----------------------------------------------*/

      tryCode( ref, code ){
        try {new Function(code)} catch (e) {
          proc.exec("node " + ref, function(e) {
            if (e !== null && e.message !== error) {
              error = e.message
              console.log("\x1b[31m" + e.message + "\x1b[0m")
            }
          })
        }
      }


  /*----------------------------------------------*/


    error(){
      console.log('stub::error');
      this.emit('error');
    }


    init(){
      console.log('stub::init');
      this.emit('init');
    }

  }

/*/////////////////////////////////////////////////////////////////////////////
// Δ Driver
/////////////////////////////////////////////////////////////////////////////*/

  const driver = ( params ) =>{

    var code = new Code();
    var file = params.input || params.file;
    code.process( file, null );
    

  };



/*/////////////////////////////////////////////////////////////////////////////
// Δ CLI Support
/////////////////////////////////////////////////////////////////////////////*/
 
  const CLI_OPTIONS = { 
    d: { $ : "debug"             },
    i: { $ : "input",    k: true },
    o: { $ : "output",   k: true }, 
    h: { $ : "prepend",  m: true }, 
    f: { $ : "postpend", m: true }};

  /*----------------------------------------------*/

  const cli = ( options=CLI_OPTIONS ) =>{
    let params = {}, 
        args   = process.argv.slice(2);

    //can reuse this with a fx generator

    for(let i=0; i<args.length; i++){
      let arg = args[i];
      //log(arg);
      //if (args[i][0] === '"') args[i] = JSON.parse(args[i]);
      if (arg[0] === "-"){  

        let command  = arg.slice(1);        
        let option   = options[ command ];
        let name     = option.$;
        let nextFile = args[i+1];

        if( option['k'] ){ //support key=val 

          if( nextFile && nextFile[0] != '-' ){
            params[ name ] = nextFile; 
            i++;
          }else{
            console.error('option requires filepath');
          }

        }else if( option['m'] ){ //support multi-var []

          let j=i+1;
          if( !isa( params[ name ] )) params[ name ] = [];
          while( nextFile && nextFile[0] != '-' ){
            params[ name ].push( nextFile ); 
            nextFile = args[++j];
            i++; 
          }

        }else{
          params[ option.$ ] = true; 
        }

      }else{
        //log('flat file', arg);
        if(! params[ 'file' ] ) params[ 'file' ] = arg;
      }
    }
    console.log( params );
    driver( params );
  };



/*/////////////////////////////////////////////////////////////////////////////
// Δ (Node Support) Export
/////////////////////////////////////////////////////////////////////////////*/

  if( module && module.exports ){
    module.exports = driver;
    module.exports.cli = cli;
  }



/*/////////////////////////////////////////////////////////////////////////////
// Δ (Node Support) Standalone
/////////////////////////////////////////////////////////////////////////////*/

  if( require && require.main === module ){
    cli();
  }



/*/////////////////////////////////////////////////////////////////////////////
// Δ - DATE=>%date% BUILD=>%build% VERSION=>%version% BID=>%bid:123%
/////////////////////////////////////////////////////////////////////////////*/

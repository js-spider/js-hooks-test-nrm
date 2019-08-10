

const { cleanRegistry, errExit }  = require('./cli')

function preuninstall(argv){
  if(ifNeedClean(argv)){
    return cleanRegistry();
  };
  console.log('preuninstall run success : keep .nrmrc info')
  process.exit();
}

function ifNeedClean(argv){
  console.log('process.env >> ',process.env)
  if(process.env.npm_config_clean){

  }else{

  }
}

function isLocalDebug(argv){
  let debugTarget = null;
  argv.forEach(item=>{
    // use node hooks.js --LocalDebugging=preuninstall 
    if(item.startsWith('--LocalDebugging=')){
      debugTarget = item.split('=')[1]
    }
  })
  return debugTarget;
}


function run (argv) {
  const target = isLocalDebug(argv) || process.env.npm_lifecycle_event;
  switch(target){
    case 'preuninstall':
        preuninstall(argv);break;
    default: process.exit(0)
  }
}

run(process.argv.slice(2));　　

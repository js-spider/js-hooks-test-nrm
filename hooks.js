const path = require('path');
const ini = require('ini');
const echo = require('node-echo');

const NRMRC = path.join(process.env.HOME, '.nrmhrc');

function preuninstall(argv){
  if(argv.includes('--keep') || argv.includes('-k')){
    console.log('preuninstall run success : keep .nrmrc info')
    process.exit()
  };
  setCustomRegistry('',function(err){
    if (err) errExit(err);
  })
}

function setCustomRegistry(config, cbk) {
  echo(ini.stringify(config), '>', NRMRC, cbk);
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

function errExit(err) {
  console.error('an error occured: ' + err);
  process.exit(1);
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

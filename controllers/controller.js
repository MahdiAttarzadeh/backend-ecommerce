const autoBindI = require('auto-bind-inheritance');

class Controller{
  constructor(){
    autoBindI(this);
  }
  error(message,status=500){
    let err=new Error(message);
    err.status=status
    throw err;
  }
}

module.exports = Controller;
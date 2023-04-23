const autoBindI = require('auto-bind-inheritance');

class Validator{
  constructor(){
    autoBindI(this);
  }
}

module.exports = Validator;

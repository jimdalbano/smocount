App.Smoke = function Smoke() {
  this.id = null;
  this.ts = null;
};

App.Smoke.create = function(template) {
  var s = new App.Smoke();
  for(var prop in template) {
    if(!template.hasOwnProperty(prop)) { continue;}
    if(!s.hasOwnProperty(prop)) { continue;}
    s[prop] = template[prop]; 
  }
  return s;
};


var App = {};

App.today = function() {
  var now = new Date();
  var today =  new Date(now.getYear(), now.getMonth() + 1, now.getDate());
  return today.getTime();
};

App.yesterday = function() {
  var now = new Date();
  var yesterday = new Date(now.getYear(), now.getMonth() + 1, now.getDate() - 1);
  return yesterday.getTime();
};

App.yesterdayAtThisTime = function() {
  var now = new Date();
  var yesterday = new Date(now.getYear(), now.getMonth() + 1, now.getDate() - 1, now.getHours(), now.getMinutes(), now.getSeconds());
  return yesterday.getTime(); 
};

App.LogData = function() {
  var logData, logdata, today = App.today();

  if (localStorage["logData"]) {
    logdata = JSON.parse(localStorage["logData"]);
  } else {
    logdata = { log: {} };
  }

  if (typeof logdata.log[today] === 'undefined') {
    logdata.log[today] = []
  }
  return logdata;
};

App.Log = function(logData) {
  return {
    hadOne: function() {
      var today = App.today();
      var now = new Date();
      now = now.getTime();

      logData.log[today].push(now);
      localStorage["logData"] = JSON.stringify(logData);
    },

    soFarToday: function() { 
      var today = App.today();
      return logData.log[today].length || 0;
    },

    yesterday: function() {
      var yesterday = App.yesterday(), 
          yesterdayAtThisTime = App.yesterdayAtThisTime();
      var yesterdaySmokes = logData.log[yesterday];
      
      if (yesterdaySmokes) {
        return yesterdaySmokes.filter(function(time) { return (time < yesterdayAtThisTime); }).length;
      } else {
        return 0;
      }
    }
  }
};

App.Counter = function() {
  var logData = App.LogData();
  return new App.Log(logData);  
}



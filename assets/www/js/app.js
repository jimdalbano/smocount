var App = {

  logData : function() {
    var logdata, today = Times.today();

    if (localStorage["logData"]) {
      logdata = JSON.parse(localStorage["logData"]);
    } else {
      logdata = {smokes: []};
    }
    
    return logdata;
  },

  log : function(logData) {
    var smokes = logData.smokes;

    var methods = {
      hadOne: function() {
        this.push(App.Smoke.create({ts: moment().unix()}));
        localStorage["logData"] = JSON.stringify({smokes: smokes});
      },

      soFarToday: function() { 
        var today = Times.todayX();
        return this.filter(function(item) { return (item.ts > today); }).length || 0;
      },

      nowYesterday: function() {
        var yesterday = Times.yesterdayX(), 
            yesterdayAtThisTime = Times.yesterdayAtThisTimeX();
        
        var countIt = function(item) {
          return (item.ts >= yesterday && item.ts <= yesterdayAtThisTime);
        };
        return this.filter(countIt).length;
      },

      yesterday: function() {
        var yesterday = Times.yesterdayX()
        var today = Times.todayX();

        var countIt = function(item) {
          return (item.ts >= yesterday && item.ts < today);
        };
        return this.filter(countIt).length;
      },

      dayBeforeYesterday: function() {
        var dayBeforeYesterday = Times.dayBeforeX(Times.yesterday()),
            yesterday = Times.yesterdayX();

        var countIt = function(item) {
          return (item.ts >= dayBeforeYesterday && item.ts < yesterday);
        };
        return this.filter(countIt).length;
      }
    };

    for(var prop in methods) {
      if (methods.hasOwnProperty(prop)) {
        smokes[prop] = methods[prop]; 
      } 
    }

    return smokes;
  },

  counter : function() {
    return this.log(this.logData());  
  },

  todayEl: null,
  yesterdayEl: null,

  updateUI : function(counter) {
    var amtToday, amtYesterday, today, yesterday;

    amtToday = ( (counter) ? counter.soFarToday() : 0 );
    amtYesterday = ( (counter) ? counter.yesterday() : 0); 

    if (this.todayEl) {
      this.todayEl.innerHTML = amtToday;
    }
    if (this.yesterdayEl) {
      this.yesterdayEl.innerHTML = amtYesterday;
    }

    if (amtToday == 0 || amtToday <= amtYesterday) {
      $('#today-container').addClass('green');          
    } else {
      $('#today-container').removeClass('green');          
      $('#today-container').addClass('red');          
    }


    if (counter.yesterday() == 0 || counter.yesterday() <= counter.dayBeforeYesterday()) {
      $('#yesterday-container').addClass('green'); 
    } else {
      $('#yesterday-container').removeClass('green');          
      $('#yesterday-container').addClass('red');          
    }
  } 
};

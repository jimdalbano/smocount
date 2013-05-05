var Times = {
  today: function() {
    return moment().startOf('day'); 
  },

  todayX: function() {
    return this.today().unix();
  },

  yesterday : function() {
    return moment().subtract('days', 1).startOf('day');
  },

  yesterdayX : function() {
    return this.yesterday().unix();
  },

  dayBefore: function(date) {
    if (typeof date === 'number') {
      // unix timestamp
      return moment.unix(date).subtract('days', 1);   
    } else if (typeof date === 'object') {
      // could be date or other moment obj 
      return moment(date).subtract('days', 1);
    } else {
      return this.yesterday(); 
    }
  },

  dayBeforeX: function(date) {
    return this.dayBefore(date).unix();
  },

  yesterdayAtThisTime : function() {
    return moment().subtract('days', 1);
  },
  yesterdayAtThisTimeX : function() {
    return moment().subtract('days', 1).unix();
  }
};


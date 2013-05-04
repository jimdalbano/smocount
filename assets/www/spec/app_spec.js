describe('App', function() {
  describe('LogData', function() {
    beforeEach(function() {
      localStorage.removeItem("logData");
    });

    it('provides an array for today', function() {
      var today = App.today();
      expect(App.logData().log[today]).toEqual([]);
    }); 
  });

  describe('Log',function() {
    var logdata, log;

    beforeEach(function() {
      localStorage.removeItem("logData");
      logdata = App.logData(); 
      log = App.log(logdata);
    });

    it('increments the count for today', function() {
      var beforeInc = log.soFarToday();
      var afterInc = beforeInc + 1;

      log.hadOne();
      expect(log.soFarToday()).toEqual(afterInc);
    });

    it('knows how many happened yesterday', function() {
      var now = new Date();
      var nowYesterday = new Date(now.getYear(), now.getMonth() + 1, now.getDate() - 1);

      logdata.log[App.yesterday()] = [nowYesterday];
      
      expect(log.nowYesterday()).toEqual(1);
    });

    it('knows how yesterday compares to the day before', function() {
      var now = new Date();
      var yesterday = new Date(now.getYear(), now.getMonth() + 1, now.getDate() - 1);
      var dayBefore = new Date(now.getYear(), now.getMonth() + 1, now.getDate() - 2);
      yesterday = yesterday.getTime();
      dayBefore = dayBefore.getTime();

      logdata.log[yesterday] = [yesterday, yesterday, yesterday];
      logdata.log[dayBefore] = [dayBefore, dayBefore];

      expect(log.yesterday()).toBeGreaterThan(log.dayBeforeYesterday()); 

      logdata.log[dayBefore].push(dayBefore);
      logdata.log[dayBefore].push(dayBefore);
       
      expect(log.yesterday()).toBeLessThan(log.dayBeforeYesterday()); 
    });

    it('is persisted when incremented',function() {
      // Cheater. Using one method of Log to test another. It works but no points for purity.
      var savedLog, afterLog;
      
      log.hadOne()
      savedLog = JSON.parse(localStorage["logData"]);
      
      afterLog = App.log(savedLog);
      expect(afterLog.soFarToday()).toEqual(1);
    })
  });

});

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
      
      expect(log.yesterday()).toEqual(1);
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

describe('App', function() {
  //describe('LogData', function() {
    //beforeEach(function() {
      //localStorage.removeItem("logData");
    //});

    //it('provides an array for today', function() {
      //var today = Times.today();
      //expect(App.logData().log[today]).toEqual([]);
    //}); 

  //});

  describe('Log',function() {
    var logdata, log;

    beforeEach(function() {
      localStorage.removeItem("logData");
      logdata = App.logData(); 
      smokes = App.log(logdata);
    });

    it('increments the count for today', function() {
      var beforeInc = logdata.smokes.length || 0;
      var afterInc = beforeInc + 1;

      smokes.hadOne();
      expect(logdata.smokes.length).toEqual(afterInc);
    });

    it('knows how many happened by this time yesterday', function() {
      // What time is it?
      var yesterdayPlusAMin = Times.yesterday().add('minutes', 1).unix();

      logdata.smokes.push({id: null, ts: yesterdayPlusAMin});
      expect(smokes.nowYesterday()).toEqual(1);
    });

    it('knows how yesterday compares to the day before', function() {
      // Cheater. Using one method of Log to test another. It works but no points for purity.
      var yesterday = Times.yesterdayX();
      var dayBefore = Times.dayBeforeX(yesterday);

      logdata.smokes.push({id: null, ts: yesterday});
      logdata.smokes.push({id: null, ts: yesterday});
      logdata.smokes.push({id: null, ts: yesterday});
      logdata.smokes.push({id: null, ts: dayBefore});
      logdata.smokes.push({id: null, ts: dayBefore});

      expect(smokes.yesterday()).toBeGreaterThan(smokes.dayBeforeYesterday()); 

      logdata.smokes.push({id: null, ts: dayBefore});
      logdata.smokes.push({id: null, ts: dayBefore});
       
      expect(smokes.yesterday()).toBeLessThan(smokes.dayBeforeYesterday()); 
    });

    it('is persisted when incremented',function() {
      // Cheater. Using one method of Log to test another. It works but no points for purity.
      var preLog, postLog;
      
      // verify it's empty
      //preLog = JSON.parse(localStorage["logData"]);
      expect(localStorage["logData"]).toBeUndefined;
      //expect(preLog.smokes.length).toEqual(0);

      // increment
      smokes.hadOne()

      // fetch and verifty it matches
      postLog = JSON.parse(localStorage["logData"]);
      expect(postLog.smokes.length).toEqual(1); 
    })
  });

});

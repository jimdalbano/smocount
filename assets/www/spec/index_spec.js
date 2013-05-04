describe('app', function() {
  describe('the main screen', function() { 
    describe('properly colors feedback blocks', function() {
      beforeEach(function() {
        localStorage.removeItem("logData");
        var el = document.getElementById('stage');
        el.innerHTML = '<div id="today-container"><div id="today"></div></div><div id="yesterday-container"><div id="yesterday"></div></div>'; 
      });

      it('first use today is green', function() {
        App.updateUI(App.log(App.logData()));        
        var todayClass = $('#today-container')[0].classList,
            yesterdayClass =  $('#yesterday-container')[0].classList;

        expect(todayClass.contains('green')).toBe(true);
        expect(yesterdayClass.contains('green')).toBe(true);
      });

      it('first use today is green', function() {
        App.updateUI(App.log(App.logData()));        
        var todayClass = $('#today-container')[0].classList,
            yesterdayClass =  $('#yesterday-container')[0].classList;

        expect(todayClass.contains('green')).toBe(true);
        expect(yesterdayClass.contains('green')).toBe(true);
      });

      it('maintains color for yesterday', function() {
        var logdata = App.logData(), 
            now = new Date(), 
            yesterdayClass,
            yesterday = App.yesterday();

        var dayBeforeYesterday = new Date(now.getYear(), now.getMonth() + 1, now.getDate() - 2);
        dayBeforeYesterday = dayBeforeYesterday.getTime();
        
        logdata.log[yesterday] = [1, 1, 1];
        logdata.log[dayBeforeYesterday] = [1, 1, 1, 1];

        App.updateUI(App.log(logdata));
        yesterdayClass =  $('#yesterday-container')[0].classList;

        expect(yesterdayClass.contains('green')).toBe(true);

        logdata.log[yesterday].push(1);
        logdata.log[yesterday].push(1);

        var lg = App.log(logdata);
        App.updateUI(lg);
        //App.updateUI(App.log(logdata));
        yesterdayClass =  $('#yesterday-container')[0].classList;

        expect(yesterdayClass.contains('green')).toBe(false);
        expect(yesterdayClass.contains('red')).toBe(true);
      });
    });
  });
});

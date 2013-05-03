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
      });
    });
  });
});

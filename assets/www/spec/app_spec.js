/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('App', function() {
  describe('LogData', function() {
    beforeEach(function() {
      localStorage.removeItem("logData");
    });

    it('provides an array for today', function() {
      var today = App.today();
      expect(App.LogData().log[today]).toEqual([]);
    }); 
  });

  describe('Log',function() {
    var logdata, log;

    beforeEach(function() {
      localStorage.removeItem("logData");
      logdata = App.LogData(); 
      log = App.Log(logdata);
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
      
      afterLog = App.Log(savedLog);
      expect(afterLog.soFarToday()).toEqual(1);
    })
  });

});

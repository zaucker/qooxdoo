testrunner.define({
  testPass : function()
  {
    this.assert(true);
  },
  ..
  testFail : function()
  {
    this.assert(true);
  }
});

testrunner.runner.TestRunnerBasic.start();
//testrunner.runner.TestRunnerBasic.runTests();

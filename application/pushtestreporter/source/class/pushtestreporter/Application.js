/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(pushtestreporter/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "pushtestreporter"
 */
qx.Class.define("pushtestreporter.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
      
      var es = new EventSource('/master');
      
      var list = new qx.ui.list.List(null);
      this.getRoot().add(list);
      

      var list2 = new qx.ui.list.List(null);
      this.getRoot().add(list2, {left: 100});

      var s1 = list.getChildControl("scrollbar-y");
      var s2 = list2.getChildControl("scrollbar-y");

      s1.bind("position", s2, "position");
      s2.bind("position", s1, "position");
      
      es.addEventListener('open', function (event) {
      });
      es.addEventListener('newClient', function (event) {
      });
	  
	    es.addEventListener('results', function (event) {
        json = JSON.parse(event.data);
        
        var array = new qx.data.Array();
        
        for (var prop in json) {
          array.push(prop);
          debugger;
        }
        
        list.setModel(array);
        list.refresh();
        list2.setModel(array);
        list2.refresh();
	    });
	  
      es.addEventListener('error', function (event) {
      });      

    }
  }
});

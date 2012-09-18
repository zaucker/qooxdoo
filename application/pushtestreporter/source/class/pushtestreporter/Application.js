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
      var clients = [];
      
      // create the composite
      var mainContainer = new qx.ui.container.Composite()
      mainContainer.setLayout(new qx.ui.layout.HBox(5));
      this.getRoot().add(mainContainer);
    
      var counter = 10;

      es.addEventListener('open', function (event) {
      });
      es.addEventListener('clientJoined', function (event) {
        var container = clients[event.data] = new qx.ui.container.Composite();
        container.setLayout(new qx.ui.layout.VBox(5));
        
        var label = new qx.ui.basic.Label("Client " + event.data);
        container.add(label);
        
        var list = new qx.ui.list.List(null);
        list.setWidth(350);
        container.add(list);
        var array = new qx.data.Array();
        for (var i=counter; i>counter-10; i--) {
          array.push(i);
        }
        list.setModel(array);
        counter += 10;
        mainContainer.add(container);
      });
        
       
        

      
      es.addEventListener('clientLeft', function (event) {
        if(clients[event.data] != undefined) {
          mainContainer.remove(clients[event.data]);
          delete clients[event.data];
        }
      });
      
      var self = this;
	  
	    es.addEventListener('results', function (event) {
      
        // var list2 = new qx.ui.list.List(null);
        // list2.setWidth(200);
        // container.add(list2, {left: 100});
        // 
        // var s1 = list.getChildControl("scrollbar-y");
        // var s2 = list2.getChildControl("scrollbar-y");
        // 
        // s1.bind("position", s2, "position");
        // s2.bind("position", s1, "position");
        var result = JSON.parse(event.data);
        var container = clients[result.client];
                
        var array = new qx.data.Array();

        for (var test in result.tests) {
          array.push(test);
        }
        var list = container.getChildren()[1];
        list.setModel(array);
        list.refresh();
        // list2.setModel(array);
        // list2.refresh();
	    });
	  
      es.addEventListener('error', function (event) {
      });      

    }
  }
});

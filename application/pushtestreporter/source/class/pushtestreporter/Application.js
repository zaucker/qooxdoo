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
    
      es.addEventListener('open', function (event) {
      });
      es.addEventListener('clientJoined', function (event) {
        var client = JSON.parse(event.data);
        
        var container = clients[client.id] = new qx.ui.container.Composite();
        container.setLayout(new qx.ui.layout.VBox(5));
        
        var clientLabel = new qx.ui.basic.Label("Client " + client.id);
        container.add(clientLabel);
        
        var devicelLabel = new qx.ui.basic.Label(client.device);
        container.add(devicelLabel);
        
        var list = new qx.ui.list.List(null);
        list.setWidth(300);
        container.add(list);

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
                
        var result = JSON.parse(event.data);
        var model = qx.data.marshal.Json.createModel(result);
 
        var container = clients[result.client];
                
        var array = new qx.data.Array();

        for (var test in result.tests) {
          array.push(test);
        }
        var list = container.getChildren()[2];
        list.setModel(model.getTests());
        
        list.setDelegate({
          bindItem : function(controller, item, id) {
            controller.bindProperty("name", "label", {}, item, id);
            var colorOptions = {
              converter : function(value) {
                switch(value) {
                  case "success":
                    return "#007F00";
                  case "skip":
                    return "#666666";
                  default:
                    return "#9E0000";
                }
              }
            };
            controller.bindProperty("state", "textColor", colorOptions, item, id);
          }
        });
        
       //list.refresh();
        // list2.setModel(array);
        // list2.refresh();
	    });
	  
      es.addEventListener('error', function (event) {
      });      

    }
  }
});

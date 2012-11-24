/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Andreas Parusel (anpar)

************************************************************************ */

/* ************************************************************************

#asset(pushtestreporter/*)

************************************************************************ */

/**
 * The main tool bar widget
 */
qx.Class.define("pushtestreporter.ToolBar",
{
  extend : qx.ui.toolbar.ToolBar,
  
  construct : function(controller)
  {
    this.base(arguments);
    this.setPadding(10);
    
    this.__title = new qx.ui.basic.Label().set({
      value: "<h2>Push-Testing Reporter</h2>",
      rich: true,
      width: 240
    });
    this.add(this.__title);
    this.addSeparator();
    this.addSpacer();
    
    this.__status = new qx.ui.basic.Label().set({
      value: "<h3>Waiting for Clients...</h3>",
      rich: true,
      width: 240
    });
    this.add(this.__status);
   // this.addSeparator();
    this.addSpacer();
    
    var model = new qx.data.Array();
      for (var i = 0; i < 5; i++) {
        model.push("Suite " + (i+1));
      }
    this.__testSelector = new qx.ui.form.VirtualSelectBox(model);
    
    this.add(this.__testSelector);
    
    //pre-select first test
    this.__testSelector.getSelection().push(model.getItem(0));
    this.__pushURL = "/push?Suite1"
    
    this.__testSelector.getSelection().addListener("change", function(e) {
      var selection = this.__testSelector.getSelection().getItem(0);
      
      this.__pushURL = "/push?Suite" + String(selection).slice(6); 
      this.debug(this.__pushURL);
    }, this);

    
    this.__pushButton = new qx.ui.toolbar.Button("Push Tests!", "resource/pushtestreporter/view-refresh.png");
    this.__pushButton.addListener("execute", this._onPushTest, this);
    this.add(this.__pushButton);
    
   // this.addListener("pushTest", this._onPushTest, this);
    
  },
  
  members :
  {
    __title : null,
    __pushButton : null,
    __status : null,
    __testSelector : null,
    __pushURL : null,
    
    _onPushTest : function() 
    {
     var req = new qx.io.request.Xhr(this.__pushURL, "GET");
     // // for debugging
     // req.addListener("success", function(e) {
     //   console.log("success");
     // }, this);
     // req.addListener("statusError", function(e) {
     //   console.log("statusError");
     // }, this);
     req.send();
     this.__status.setValue("<h3>Pushed tests to clients...</h3>");
    },
    
    setStatus : function(status) {
      
      var self = this;
      
      switch(status)
      {
        case "waiting":
          this.__status.setValue("<h3>Waiting for clients...</h3>");
          break;
        case "clientJoined":
          this.__status.setValue("<h3>A client joined!</h3>");
          setTimeout(function(){
            self.__status.setValue("<h3>Ready!</h3>");
          }, 500);
          break;
        case "clientLeft":
          this.__status.setValue("<h3>A client left!</h3>");
          setTimeout(function(){
            self.__status.setValue("<h3>Ready for distributing tests!</h3>");
          }, 500);
          break;
        case "lastLeft":
          this.__status.setValue("<h3>A client left!</h3>");
          setTimeout(function(){
            self.__status.setValue("<h3>Waiting for clients...</h3>");
          }, 500);
          break;
        case "results":
          this.__status.setValue("<h3>Received results!</h3>");
          setTimeout(function(){
            self.__status.setValue("<h3>Ready!</h3>");
          }, 500);
          break;  
      }
    }
  },
  
  events :
  {
    "pushTest" : "qx.event.type.Event"
  }
});
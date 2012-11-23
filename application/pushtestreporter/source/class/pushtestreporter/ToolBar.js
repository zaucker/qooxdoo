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
      value: "<h3>Push-Testing Reporter</h3>",
      rich: true,
      width: 160
    });
    this.add(this.__title);
    this.addSeparator();
    
    this.addSpacer();
    
    this.addSeparator();
    this.__pushButton = new qx.ui.toolbar.Button("Push Tests!", "resource/pushtestreporter/view-refresh.png");
    this.__pushButton.addListener("execute", function() {
      this.fireEvent("pushTest");
    }, this);
    this.add(this.__pushButton);
    
    this.addListener("pushTest", this._onPushTest, this);
    
  },
  
  members :
  {
    __title : null,
    __pushButton : null,
    
    _onPushTest : function() 
    {
     var req = new qx.io.request.Xhr("/pushTests", "GET");
     req.send();
    }
  },
  
  events :
  {
    "pushTest" : "qx.event.type.Event"
  }
});
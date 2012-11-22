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

/**
 * The main tool bar widget
 */
qx.Class.define("pushtestreporter.ToolBar",
{
  extend : qx.ui.toolbar.ToolBar,
  
  construct : function(controller)
  {
    this.base(arguments);
    
    this.__title = new qx.ui.basic.Label().set({
      value: "<h2>Push-Testing Reporter</h2>",
      rich: true,
      width: 240
    });
    this.add(this.__title);
    
    this.__pushButton = new qx.ui.toolbar.Button("Push Tests!");
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
     console.log("Boohoo!");
    }
  },
  
  events :
  {
    "pushTest" : "qx.event.type.Event"
  }
});
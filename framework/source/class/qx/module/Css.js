/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/* ************************************************************************
#ignore(jQuery)
************************************************************************ */
/**
 * CSS/Style property manipulation module
 */
qx.Bootstrap.define("qx.module.Css", {
  statics: {


    /**
     * Modifies the given style property on all elements in the collection.
     *
     * @attach {q}
     * @param name {String} Name of the style property to modify
     * @param value {var} The value to apply
     * @return {q} The collection for chaining
     */
    setStyle : function(name, value) {
      // cursor mapping
      if (name === "cursor") {
        value = qx.bom.Cursor.resolve(value);
      }
      // special opacity treatment
      if (name == "opacity") {
        return qx.module.Css.__setOpacity(this, value);
        return this;
      }

      // vendor prefixing
      name = qx.bom.Style.getPropertyName(name);

      jQuery.fn.css.call(this, name, value);
      return this;
    },


    /**
     * Returns the value of the given style property for the first item in the
     * collection.
     *
     * @attach {q}
     * @param name {String} Style property name
     * @return {var} Style property value
     */
    getStyle : function(name) {
      // special opacity treatment
      if (name == "opacity") {
        return qx.module.Css.__getOpacity(this[0]);
      }
      // vendor prefixing
      name = qx.bom.Style.getPropertyName(name);
      return jQuery.fn.css.call(this, name);
    },


    /**
     * Internal helper for IE < 9 which takes care of the mapping
     * from opacity to alpha filter.
     * @param col {q} A collection to work on.
     * @param value {Number} The opacity to set.
     */
    __setOpacity : function(col, value) {
      value = value >= 1 ? "" : value;

      if (
        !qx.core.Environment.get("css.opacity") &&
        qx.core.Environment.get("engine.name") == "mshtml"
      ) {
        var filter = jQuery.fn.css.call(col, "filter");
        // normalize filter
        filter = filter == "auto" ? "" : filter;
        // normalize value
        value = value == "" ? 1 : value;
        value = value < 0.00001 ? 0 : value;

        // IE has trouble with opacity if it does not have layout (hasLayout)
        // Force it by setting the zoom level
        for (var i=0; i < col.length; i++) {
          if (!col[i].currentStyle || !col[i].currentStyle.hasLayout) {
            jQuery.fn.css.call([col[i]], "zoom", 1)
          }
        };

        // Remove old alpha filter and add new one
        filter = filter.replace(/alpha\([^\)]*\)/gi, "") + "alpha(opacity=" + value * 100 + ")";
        jQuery.fn.css.call(col, "filter", filter);
      }
      // default case, just use the jQuery method to set the opacity value
      jQuery.fn.css.call(col, "opacity", value);
    },


    /**
     * Internal helper for IE < 9 which takes care of the mapping
     * from opacity to alpha filter.
     * @param el {Element} The element to check the opacity from.
     * @return {Number} The opacify as number.
     */
    __getOpacity : function(el) {
      if (
        !qx.core.Environment.get("css.opacity") &&
        qx.core.Environment.get("engine.name") == "mshtml"
      ) {
        var filter = jQuery.fn.css.call([el], "filter");

        if (filter) {
          var opacity = filter.match(/alpha\(opacity=(.*)\)/);

          if (opacity && opacity[1]) {
            return parseFloat(opacity[1]) / 100;
          }
        }

        return 1.0;
      }
      // default case, just use the jQuery method to get the opacity value and parse it
      return parseFloat(jQuery.fn.css.call([el], "opacity"));
    },


    /**
     * Sets multiple style properties for each item in the collection.
     *
     * @attach {q}
     * @param styles {Map} A map of style property name/value pairs
     * @return {q} The collection for chaining
     */
    setStyles : function(styles) {
      for (var name in styles) {
        this.setStyle(name, styles[name]);
      }
      return this;
    },


    /**
     * Returns the values of multiple style properties for each item in the
     * collection
     *
     * @attach {q}
     * @param names {String[]} List of style property names
     * @return {Map} Map of style property name/value pairs
     */
    getStyles : function(names) {
      var styles = {};
      for (var i=0; i < names.length; i++) {
        styles[names[i]] = this.getStyle(names[i]);
      };
      return styles;
    },


    /**
     * Adds a class name to each element in the collection
     *
     * @attach {q}
     * @param name {String} Class name
     * @return {q} The collection for chaining
     */
    addClass : function(name) {
      jQuery.fn.addClass.call(this, name);
      return this;
    },


    /**
     * Adds multiple class names to each element in the collection
     *
     * @attach {q}
     * @param names {String[]} List of class names to add
     * @return {q} The collection for chaining
     */
    addClasses : function(names) {
      for (var i=0; i < names.length; i++) {
        this.addClass(names[i]);
      };
      return this;
    },


    /**
     * Removes a class name from each element in the collection
     *
     * @attach {q}
     * @param name {String} The class name to remove
     * @return {q} The collection for chaining
     */
    removeClass : function(name) {
      jQuery.fn.removeClass.call(this);
      return this;
    },


    /**
     * Removes multiple class names from each element in the collection
     *
     * @attach {q}
     * @param names {String[]} List of class names to remove
     * @return {q} The collection for chaining
     */
    removeClasses : function(names) {
      for (var i=0; i < names.length; i++) {
        this.removeClass(names[i]);
      };
      return this;
    },


    /**
     * Checks if the first element in the collection has the given class name
     *
     * @attach {q}
     * @param name {String} Class name to check for
     * @return {Boolean} <code>true</code> if the first item has the given class name
     */
    hasClass : function(name) {
      return jQuery.fn.hasClass.call(this, name);
    },


    /**
     * Returns the class name of the first element in the collection
     *
     * @attach {q}
     * @return {String} Class name
     */
    getClass : function() {
      return jQuery.fn.attr.call(this, "class");
    },


    /**
     * Toggles the given class name on each item in the collection
     *
     * @attach {q}
     * @param name {String} Class name
     * @return {q} The collection for chaining
     */
    toggleClass : function(name) {
      jQuery.fn.toggleClass.call(this, name);
      return this;
    },


    /**
     * Toggles the given list of class names on each item in the collection
     *
     * @attach {q}
     * @param names {String[]} Class names
     * @return {q} The collection for chaining
     */
    toggleClasses : function(names) {
      for (var i=0, l=names.length; i<l; i++) {
        this.toggleClass(names[i]);
      }
      return this;
    },


    /**
     * Replaces a class name on each element in the collection
     *
     * @attach {q}
     * @param oldName {String} Class name to remove
     * @param newName {String} Class name to add
     * @return {q} The collection for chaining
     */
    replaceClass : function(oldName, newName) {
      this.removeClass(oldName);
      this.addClass(newName);
      return this;
    },


    /**
     * Returns the rendered height of the first element in the collection.
     * @attach {q}
     * @return {Number} The first item's rendered height
     */
    getHeight : function() {
      return jQuery(this).outerHeight();
    },


    /**
     * Returns the rendered width of the first element in the collection
     * @attach {q}
     * @return {Number} The first item's rendered width
     */
    getWidth : function() {
      return jQuery(this).outerWidth();
    },


    /**
     * Returns the computed location of the given element in the context of the
     * document dimensions.
     *
     * @attach {q}
     * @return {Map} A map with the keys <code>left<code/>, <code>top<code/>,
     * <code>right<code/> and <code>bottom<code/> which contains the distance
     * of the element relative to the document.
     */
    getOffset : function() {
      var offset = jQuery.fn.offset.call(this);
      offset.bottom = offset.top + this.getHeight();
      offset.right = offset.left + this.getWidth();
      return offset;
    },


    /**
     * Returns the content height of the first element in the collection.
     * This is the maximum height the element can use, excluding borders,
     * margins, padding or scroll bars.
     * @attach {q}
     * @return {Number} Computed content height
     */
    getContentHeight : function() {
      return jQuery.fn.height.call(this);
    },


    /**
     * Returns the content width of the first element in the collection.
     * This is the maximum width the element can use, excluding borders,
     * margins, padding or scroll bars.
     * @attach {q}
     * @return {Number} Computed content width
     */
    getContentWidth : function() {
      return jQuery.fn.width.call(this);
    },


    /**
     * Returns the distance between the first element in the collection and its
     * offset parent
     *
     * @attach {q}
     * @return {Map} a map with the keys <code>left</code> and <code>top</code>
     * containing the distance between the elements
     */
    getPosition : function() {
      var pos = jQuery(this).position();
      // subtract the margin
      pos.top += parseInt(this.getStyle("marginTop"));
      pos.left += parseInt(this.getStyle("marginLeft"));
      return pos;
    },


    /**
     * Includes a Stylesheet file
     *
     * @attachStatic {q}
     * @param uri {String} The stylesheet's URI
     * @param doc {Document?} Document to modify
     */
    includeStylesheet : function(uri, doc) {
      if (!doc) {
        doc = document;
      }

      var el = doc.createElement("link");
      el.type = "text/css";
      el.rel = "stylesheet";
      el.href = uri;

      var head = doc.getElementsByTagName("head")[0];
      head.appendChild(el);
    }
  },


  defer : function(statics) {
    q.$attach({
      "setStyle" : statics.setStyle,
      "getStyle" : statics.getStyle,
      "setStyles" : statics.setStyles,
      "getStyles" : statics.getStyles,

      "addClass" : statics.addClass,
      "addClasses" : statics.addClasses,
      "removeClass" : statics.removeClass,
      "removeClasses" : statics.removeClasses,
      "hasClass" : statics.hasClass,
      "getClass" : statics.getClass,
      "toggleClass" : statics.toggleClass,
      "toggleClasses" : statics.toggleClasses,
      "replaceClass" : statics.replaceClass,

      "getHeight" : statics.getHeight,
      "getWidth" : statics.getWidth,
      "getOffset" : statics.getOffset,
      "getContentHeight" : statics.getContentHeight,
      "getContentWidth" : statics.getContentWidth,

      "getPosition" : statics.getPosition
    });

    q.$attachStatic({
      "includeStylesheet" : statics.includeStylesheet
    });
  }
});
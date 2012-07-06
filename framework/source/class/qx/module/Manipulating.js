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
/**
 * DOM manipulation module
 */
qx.Bootstrap.define("qx.module.Manipulating", {
  statics :
  {
    /**
     * Creates a new collection from the given argument. This can either be an
     * HTML string, a single DOM element or an array of elements
     *
     * @attachStatic{q}
     * @param html {String|Element[]} HTML string or DOM element(s)
     * @return {q} Collection of elements
     */
    create : function(html) {
      return q.$init(jQuery.clean([html]));
    },


    /**
     * Clones the items in the current collection and returns them in a new set.
     * Event listeners can also be cloned.
     *
     * @attach{q}
     * @param events {Boolean} clone event listeners. Default: <pre>false</pre>
     * @return {q} New collection with clones
     */
    clone : function(events) {
      var clones = jQuery(this).clone().toArray();
      if (events === true && this.copyEventsTo) {
        this.copyEventsTo(clones);
      }

      return q(clones);
    },



    /**
     * Appends content to each element in the current set. Accepts an HTML string,
     * a single DOM element or an array of elements
     *
     * @attach{q}
     * @param content {String|Element[]} HTML string or DOM element(s) to append
     * @return {q} The collection for chaining
     */
    append : function(content) {
      jQuery(this).append(content);
      return this;
    },


    /**
     * Appends all items in the collection to the specified parents. If multiple
     * parents are given, the items will be moved to the first parent, while
     * clones of the items will be appended to subsequent parents.
     *
     * @attach{q}
     * @param parent {String|Element[]} Parent selector expression or list of
     * parent elements
     * @return {q} The collection for chaining
     */
    appendTo : function(parent) {
      jQuery(this).appendTo(parent);
      return this;
    },


    /**
     * Inserts the current collection before each target item. The collection
     * items are moved before the first target. For subsequent targets,
     * clones of the collection items are created and inserted.
     *
     * @attach{q}
     * @param target {String|Element} Selector expression or DOM element
     * @return {q} The collection for chaining
     */
    insertBefore : function(target) {
      jQuery(this).insertBefore(target);
      return this;
    },



    /**
     * Inserts the current collection after each target item. The collection
     * items are moved after the first target. For subsequent targets,
     * clones of the collection items are created and inserted.
     *
     * @attach{q}
     * @param target {String|Element} Selector expression or DOM element
     * @return {q} The collection for chaining
     */
    insertAfter : function(target) {
      jQuery(this).insertAfter(target);
      return this;
    },


    /**
     * Wraps each element in the collection in a copy of an HTML structure.
     * Elements will be appended to the deepest nested element in the structure
     * as determined by a depth-first search.
     *
     * @attach{q}
     * @param wrapper {var} Selector expression, HTML string, DOM element or
     * list of DOM elements
     * @return {q} The collection for chaining
     */
    wrap : function(wrapper) {
      // check for selector
      if (jQuery.clean([wrapper])[0].textContent == wrapper) {
        wrapper = jQuery(wrapper);
      }
      jQuery(this).wrap(wrapper);
      return this;
    },


    /**
     * Removes each element in the current collection from the DOM
     *
     * @attach{q}
     * @return {q} The collection for chaining
     */
    remove : function() {
      jQuery.fn.remove.call(this);
      return this;
    },


    /**
     * Removes all content from the elements in the collection
     *
     * @attach{q}
     * @return {q} The collection for chaining
     */
    empty : function() {
      jQuery.fn.empty.call(this);
      return this;
    },


    /**
     * Inserts content before each element in the collection. This can either
     * be an HTML string, an array of HTML strings, a single DOM element or an
     * array of elements.
     *
     * @attach{q}
     * @param content {String[]|Element[]} HTML string(s) or DOM element(s)
     * @return {q} The collection for chaining
     */
    before : function(content) {
      var tmp = jQuery(this)
      if (!jQuery.isArray(content)) {
        content = [content];
      }
      jQuery.fn.before.apply(tmp, content);
      return this;
    },


    /**
     * Inserts content after each element in the collection. This can either
     * be an HTML string, an array of HTML strings, a single DOM element or an
     * array of elements.
     *
     * @attach{q}
     * @param content {String[]|Element[]} HTML string(s) or DOM element(s)
     * @return {q} The collection for chaining
     */
    after : function(content) {
      var tmp = jQuery(this)
      if (!jQuery.isArray(content)) {
        content = [content];
      }
      jQuery.fn.after.apply(tmp, content);
      return this;
    },


    /**
     * Returns the left scroll position of the first element in the collection.
     *
     * @attach{q}
     * @return {Number} Current left scroll position
     */
    getScrollLeft : function() {
      return jQuery.fn.scrollLeft.call(this);
    },


    /**
     * Returns the top scroll position of the first element in the collection.
     *
     * @attach{q}
     * @return {Number} Current top scroll position
     */
    getScrollTop : function() {
      return jQuery.fn.scrollTop.call(this);
    },


    /**
     * Scrolls the elements of the collection to the given coordinate.
     *
     * @attach{q}
     * @param value {Number} Left scroll position
     * @return {q} The collection for chaining
     */
    setScrollLeft : function(value) {
      jQuery.fn.scrollLeft.call(this, value);
      return this;
    },


    /**
     * Scrolls the elements of the collection to the given coordinate.
     *
     * @attach{q}
     * @param value {Number} Top scroll position
     * @return {q} The collection for chaining
     */
    setScrollTop : function(value) {
      jQuery.fn.scrollTop.call(this, value);
      return this;
    },


    /**
     * Focuses the first element in the collection
     *
     * @attach{q}
     * @return {q} The collection for chaining
     */
    focus : function()
    {
      try {
        this[0].focus();
      }
      catch(ex) {}

      return this;
    },


    /**
     * Blurs each element in the collection
     *
     * @attach{q}
     * @return {q} The collection for chaining
     */
    blur : function()
    {
      this.forEach(function(item, index) {
        try {
          item.blur();
        }
        catch(ex) {}
      });

      return this;
    }
  },


  defer : function(statics) {
    q.$attachStatic({
      "create" : statics.create
    });

    q.$attach({
      "append" : statics.append,
      "appendTo" : statics.appendTo,
      "remove" : statics.remove,
      "empty" : statics.empty,

      "before" : statics.before,
      "insertBefore" : statics.insertBefore,
      "after" : statics.after,
      "insertAfter" : statics.insertAfter,

      "wrap" : statics.wrap,

      "clone" : statics.clone,

      "getScrollLeft" : statics.getScrollLeft,
      "setScrollLeft" : statics.setScrollLeft,
      "getScrollTop" : statics.getScrollTop,
      "setScrollTop" : statics.setScrollTop,

      "focus" : statics.focus,
      "blur" : statics.blur
    });
  }
});
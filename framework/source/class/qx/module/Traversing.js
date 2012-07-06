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
 * DOM traversal module
 */
qx.Bootstrap.define("qx.module.Traversing", {
  statics :
  {
    /**
     * Adds an element to the collection
     *
     * @attach {q}
     * @param el {Element} DOM element to add to the collection
     * @return {q} The collection for chaining
     */
    add : function(el) {
      this.push(el);
      return this;
    },


    /**
     * Gets a set of elements containing all of the unique immediate children of
     * each of the matched set of elements.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?null} Optional selector to match
     * @return {q} Collection containing the child elements
     */
    getChildren : function(selector) {
      return q.$init(jQuery(this).children(selector).toArray());
    },


    /**
     * Executes the provided callback function once for each item in the
     * collection.
     *
     * @attach {q}
     * @param fn {Function} Callback function
     * @param ctx {Obj} Context object
     * @return {q} The collection for chaining
     */
    forEach : function(fn, ctx) {
      for (var i=0; i < this.length; i++) {
        fn.call(ctx, this[i], i, this);
      };
      return this;
    },


    /**
     * Method needed for jQuery usage. Compatible with jQuery's each method.
     * @param fn {Function} The callback.
     */
    each : function(fn) {
      for (var i=0; i < this.length; i++) {
        fn.call(this[i], i, this[i]);
      };
      return this;
    },


    /**
     * Returns a copy of the collection within the given range.
     *
     * @attach {q}
     * @param begin {Number} The index to begin.
     * @param end {Number?} The index to end.
     * @return {q} A new collection containing a slice of the original collection.
     */
    slice : function(begin, end) {
      // Old IEs return an empty array if the second argument is undefined
      if (end) {
        return q.$init(Array.prototype.slice.call(this, begin, end));
      }
      else {
        return q.$init(Array.prototype.slice.call(this, begin));
      }
    },


    /**
     * Gets a set of elements containing the parent of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?null} Optional selector to match
     * @return {q} Collection containing the parent elements
     */
    getParents : function(selector) {
      return q.$init(jQuery(this).parent(selector));
    },


    /**
     * Gets a set of elements containing all ancestors of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param filter {String?null} Optional selector to match
     * @return {q} Collection containing the ancestor elements
     */
    getAncestors : function(filter) {
      return q.$init(jQuery(this).parents(filter));
    },


    /**
     * Gets a set of elements containing all ancestors of each element in the
     * collection, up to (but not including) the element matched by the provided
     * selector.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String} Selector that indicates where to stop including
     * ancestor elements
     * @param filter {String?null} Optional selector to match
     * @return {q} Collection containing the ancestor elements
     */
    getAncestorsUntil : function(selector, filter) {
      return q.$init(jQuery(this).parentsUntil(selector, filter));
    },


    /**
     * Gets a set containing the closest matching ancestor for each item in
     * the collection.
     * If the item itself matches, it is added to the new set. Otherwise, the
     * item's parent chain will be traversed until a match is found.
     *
     * @attach {q}
     * @param selector {String} Selector expression to match
     * @return {q} New collection containing the closest matching ancestors
     */
    getClosest : function(selector) {
      return q.$init(jQuery(this).closest(selector));
    },


    /**
     * Searches the child elements of each item in the collection and returns
     * a new collection containing the children that match the provided selector
     *
     * @attach {q}
     * @param selector {String} Selector expression to match the child elements
     * against
     * @return {q} New collection containing the matching child elements
     */
    find : function(selector) {
      return q.$init(jQuery(this).find(selector));
    },


    /**
     * Gets a new collection containing only those elements that passed the
     * given filter. This can be either a selector expression or a filter
     * function.
     *
     * @attach {q}
     * @param selector {String|Function} Selector expression or filter function
     * @return {q} New collection containing the elements that passed the filter
     */
    filter : function(selector) {
      if (jQuery.isFunction(selector)) {
        return qx.type.BaseArray.prototype.filter.call(this, selector);
      }
      return q.$init(jQuery.find(selector, null, null, this));
    },


    /**
     * Gets a new set of elements containing the child nodes of each item in the
     * current set.
     *
     * @attach {q}
     * @return {q} New collection containing the child nodes
     */
    getContents : function() {
      return q.$init(jQuery(this).contents());
    },


    /**
     * Checks if at least one element in the collection passes the provided
     * filter. This can be either a selector expression or a filter
     * function.
     *
     * @attach {q}
     * @param selector {String|Function} Selector expression or filter function
     * @return {Boolean} <code>true</code> if at least one element matches
     */
    is : function(selector) {
      return jQuery.fn.is.call(this, selector)
    },


    /**
     * Reduce the set of matched elements to a single element.
     *
     * @attach {q}
     * @param index {Number} The position of the element in the collection
     * @return {q} A new collection containing one element
     */
    eq : function(index) {
      return this.slice(index, +index + 1);
    },


    /**
     * Reduces the collection to the first element.
     *
     * @attach {q}
     * @return {q} A new collection containing one element
     */
    getFirst : function() {
      return this.slice(0, 1);
    },


    /**
     * Reduces the collection to the last element.
     *
     * @attach {q}
     * @return {q} A new collection containing one element
     */
    getLast : function() {
      return this.slice(this.length - 1);
    },


    /**
     * Gets a collection containing only the elements that have descendants
     * matching the given selector
     *
     * @attach {q}
     * @param selector {String} Selector expression
     * @return {q} a new collection containing only elements with matching descendants
     */
    has : function(selector) {
      return q.$init(jQuery(this).has(selector));
    },


    /**
     * Gets a collection containing the next sibling element of each item in
     * the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing next siblings
     */
    getNext : function(selector) {
      return q.$init(jQuery(this).next(selector));
    },


    /**
     * Gets a collection containing all following sibling elements of each
     * item in the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing following siblings
     */
    getNextAll : function(selector) {
      return q.$init(jQuery(this).nextAll(selector));
    },


    /**
     * Gets a collection containing the following sibling elements of each
     * item in the current set (ignoring text and comment nodes) up to but not
     * including any element that matches the given selector.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing following siblings
     */
    getNextUntil : function(selector) {
      return q.$init(jQuery(this).nextUntil(selector));
    },


    /**
     * Gets a collection containing the previous sibling element of each item in
     * the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing previous siblings
     */
    getPrev : function(selector) {
      return q.$init(jQuery(this).prev(selector));
    },


    /**
     * Gets a collection containing all preceding sibling elements of each
     * item in the current set (ignoring text and comment nodes).
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing preceding siblings
     */
    getPrevAll : function(selector) {
      return q.$init(jQuery(this).prevAll(selector));
    },


    /**
     * Gets a collection containing the preceding sibling elements of each
     * item in the current set (ignoring text and comment nodes) up to but not
     * including any element that matches the given selector.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing preceding siblings
     */
    getPrevUntil : function(selector) {
      return q.$init(jQuery(this).prevUntil(selector));
    },


    /**
     * Gets a collection containing all sibling elements of the items in the
     * current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {q}
     * @param selector {String?} Optional selector expression
     * @return {q} New set containing sibling elements
     */
    getSiblings : function(selector) {
      return q.$init(jQuery(this).siblings(selector));
    },


    /**
     * Remove elements from the collection that do not pass the given filter.
     * This can be either a selector expression or a filter function.
     *
     * @attach {q}
     * @param selector {String|Function} Selector or filter function
     * @return {q} Reduced collection
     */
    not : function(selector) {
      if (jQuery.isFunction(selector)) {
        return this.filter(function(item, index, obj) {
          return !selector(item, index, obj);
        });
      }

      var res = jQuery.find(selector, null, null, this);
      return this.filter(function(value) {
        return res.indexOf(value) === -1;
      });
    },


    /**
     * Gets a new collection containing the offset parent of each item in the
     * current set.
     *
     * @attach {q}
     * @return {q} New collection containing offset parents
     */
    getOffsetParent : function() {
      return q.$init(jQuery(this).offsetParent());
    },


    /**
     * Checks if the given object is a DOM element
     *
     * @attachStatic{q}
     * @param element {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM element
     */
    isElement : function(element) {
      return !!(element && element.nodeType === 1);
    },


    /**
     * Checks if the given object is a DOM node
     *
     * @attachStatic{q}
     * @param node {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM node
     */
    isNode : function(node) {
      return !!(node && node.nodeType != null);
    },


    /**
     * Checks if the given object is a DOM document object
     *
     * @attachStatic{q}
     * @param node {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM document
     */
    isDocument : function(node) {
      return !!(node && node.nodeType === 9);
    },


    /**
     * Returns the DOM2 <code>defaultView</code> (window) for the given node.
     *
     * @attachStatic{q}
     * @param node {Node|Document|Window} Node to inspect
     * @return {Window} the <code>defaultView</code> for the given node
     */
    getWindow : function(node) {
      // is a window already
      if (node.nodeType == null) {
        return node;
      }

      // jump to document
      if (node.nodeType !== 9) {
        node = node.ownerDocument;
      }

      // jump to window
      return node.defaultView || node.parentWindow;
    },


    /**
     * Returns the owner document of the given node
     *
     * @attachStatic{q}
     * @param node {Node } Node to get the document for
     * @return {Document|null} The document of the given DOM node
     */
    getDocument : function(node) {
      return node.nodeType === 9 ? node : // is document already
        node.ownerDocument || // is DOM node
        node.document; // is window
    }
  },


  defer : function(statics) {
    q.$attach({
      "add" : statics.add,
      "getChildren" : statics.getChildren,
      "forEach" : statics.forEach,
      "each" : statics.each,
      "slice" : statics.slice,
      "getParents" : statics.getParents,
      "getAncestors" : statics.getAncestors,
      "getAncestorsUntil" : statics.getAncestorsUntil,
      "__getAncestors" : statics.__getAncestors,
      "getClosest" : statics.getClosest,
      "find" : statics.find,
      "filter" : statics.filter,
      "getContents" : statics.getContents,
      "is" : statics.is,
      "eq" : statics.eq,
      "getFirst" : statics.getFirst,
      "getLast" : statics.getLast,
      "has" : statics.has,
      "getNext" : statics.getNext,
      "getNextAll" : statics.getNextAll,
      "getNextUntil" : statics.getNextUntil,
      "getPrev" : statics.getPrev,
      "getPrevAll" : statics.getPrevAll,
      "getPrevUntil" : statics.getPrevUntil,
      "getSiblings" : statics.getSiblings,
      "not" : statics.not,
      "getOffsetParent" : statics.getOffsetParent
    });

    q.$attachStatic({
      "isElement" : statics.isElement,
      "isNode" : statics.isNode,
      "isDocument" : statics.isDocument,
      "getDocument" : statics.getDocument,
      "getWindow" : statics.getWindow
    });
  }
});
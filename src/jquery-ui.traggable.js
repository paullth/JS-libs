/*!
 * Adaption of jQuery Draggable:
 *
 * jQuery UI Draggable @VERSION
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.mouse.js
 *  jquery.ui.widget.js
 */
(function( $, undefined ) {

  $.widget("ui.traggable", $.ui.mouse, {
    version: "1",
    widgetEventPrefix: "trag",
    options: {
      addClasses: true,
      appendTo: "parent",
      axis: false,
      connectToSortable: false,
      containment: false,
      cursor: "auto",
      cursorAt: false,
      grid: false,
      handle: false,
      helper: "original",
      iframeFix: false,
      opacity: false,
      refreshPositions: false,
      revert: false,
      revertDuration: 500,
      scope: "default",
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: false,
      snapMode: "both",
      snapTolerance: 20,
      stack: false,
      zIndex: false,
      scaledParent: false,
      z: 1
    },
    _create: function() {

      
      this._mouseInit();

    },

    _destroy: function() {
      this._mouseDestroy();
    },

    _mouseCapture: function(event) {

      var o = this.options;
      this.eventCurrent = {
        x: event.pageX,
        y: event.pageY
      };


      return true;

    },

    _mouseStart: function(event) {
      this.target = $(event.target).closest('.item');

      
      
      return true;
    },

    _mouseDrag: function(event) {
      this.eventCurrent = {
        x: event.pageX,
        y: event.pageY
      };
      var dX = event.pageX , dY = event.pageY, 
      velX = (this.eventCurrent.x - event.pageX), velY = (this.eventCurrent.y - event.y);
      this._moveItem(this.target, velX, velY);
      return false;
    },

    _mouseStop: function(event) {
      

      return false;
    },
    
    _mouseUp: function(event) {
      
      
      //If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
      if( $.ui.ddmanager ) $.ui.ddmanager.dragStop(this, event);
      
      return $.ui.mouse.prototype._mouseUp.call(this, event);
    },

    _moveItem: function(target, x, y){
      console.log(target, x, y);
      var position = {
        left: parseInt(target.css('left')),
        top: parseInt(target.css('top'))
      };
      target.css({
        'left': position.left + x,
        'top': position.top + y
      });
    }

  });

})(jQuery);

(function($, undefined){
    $(document).ready(function(){
        console.log('ready');
        $('.items').traggable();
    });
})(jQuery);
    
​
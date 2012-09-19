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
(function($, undefined) {

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
            this.z = this.options.z;
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
            var dX = event.pageX,
                dY = event.pageY,
                velX = (this.eventCurrent.x - event.pageX),
                velY = (this.eventCurrent.y - event.pageY);
            this._moveItem(this.target, velX, velY);
            this.eventCurrent = {
                x: event.pageX,
                y: event.pageY
            };
            return true;
        },

        _mouseStop: function(event) {
            return false;
        },

        _mouseUp: function(event) {
            return $.ui.mouse.prototype._mouseUp.call(this, event);
        },

        _moveItem: function(target, x, y) {
            var position = {
                left: parseFloat(target.css('left')),
                top: parseFloat(target.css('top'))
            };
            if(isNaN(position.left)){
                position.left = target.offset().left;
            }
            if(isNaN(position.top)){
                position.top = target.offset().top;
            }
            x = x * (1 / this.z);
            y = y * (1 / this.z);
            target.css({
                'left': position.left - x,
                'top': position.top - y
            });
        },
        changeScale: function(dZ){
            this.z = this.z + dZ;
            var scale = "scale(" + this.z + ")";
            console.log(scale);
            this.element.css({
                "-webkit-transform":scale,  
                "-moz-transform": scale,
                "-ms-transform": scale,        
                "-o-transform": scale,
                "transform": scale,
            });
        }

    });

})(jQuery);
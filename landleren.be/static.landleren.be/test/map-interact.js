﻿/* www.landleren.be */
function isTouchEnabled() { return (("ontouchstart" in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) }
jQuery(function() { jQuery("path[id^=eujs]").each(function(i, e) { tryaddEvent(jQuery(e).attr("id")) }) });

function tryaddEvent(id, relationId) {
    var _obj = jQuery("#" + id);
    var arr = id.split("");
    var _Textobj = jQuery("#" + id + "," + "#eujsvn" + arr.slice(5).join(""));
    jQuery("#" + ["visnames"]).attr({ "fill": eujsconfig.general.visibleNames });
    _obj.attr({ "fill": eujsconfig[id].upColor, "stroke": eujsconfig.general.borderColor });
    _Textobj.attr({ "cursor": "default" });
    if (eujsconfig[id].active === !0) {
        _Textobj.attr({ "cursor": "pointer" });
        _Textobj.hover(function() {
            // jQuery("#eujstip").show().html(eujsconfig[id].hover); // shows the country name in the tooltip span when hovering over the country - disabled atm
            _obj.css({ "fill": eujsconfig[id].overColor })
        }, function() {
            jQuery("#eujstip").hide();
            jQuery("#" + id).css({ "fill": eujsconfig[id].upColor })
        });
        if (eujsconfig[id].target !== "none") { _Textobj.mousedown(function() { jQuery("#" + id).css({ "fill": eujsconfig[id].downColor }) }) }
        // _Textobj.mouseup(function() { jQuery("#" + id).css({ "fill": eujsconfig[id].overColor }); if (eujsconfig[id].target === "new_window") { window.open(eujsconfig[id].url) } else if (eujsconfig[id].target === "same_window") { window.parent.location.href = eujsconfig[id].url } else if (eujsconfig[id].target === "modal") { jQuery(eujsconfig[id].url).modal("show") } }); // used to open the link, but we don't want that anymore
        _Textobj.mouseup(function() {
            jQuery("#" + id).css({ "fill": eujsconfig[id].overColor });
            getResult(eujsconfig[id].hover)
        }); // to disable the color when not clicked and check the answer with the quiz-app script
        _Textobj.mousemove(function(e) {
            var x = e.pageX + 10,
                y = e.pageY + 15;
            var tipw = jQuery("#eujstip").outerWidth(),
                tiph = jQuery("#eujstip").outerHeight(),
                x = (x + tipw > jQuery(document).scrollLeft() + jQuery(window).width()) ? x - tipw - (20 * 2) : x;
            y = (y + tiph > jQuery(document).scrollTop() + jQuery(window).height()) ? jQuery(document).scrollTop() + jQuery(window).height() - tiph - 10 : y;
            jQuery("#eujstip").css({ left: x, top: y })
        });
        if (isTouchEnabled()) {
            _Textobj.on("touchstart", function(e) {
                var touch = e.originalEvent.touches[0];
                var x = touch.pageX + 10,
                    y = touch.pageY + 15;
                var tipw = jQuery("#eujstip").outerWidth(),
                    tiph = jQuery("#eujstip").outerHeight(),
                    x = (x + tipw > jQuery(document).scrollLeft() + jQuery(window).width()) ? x - tipw - (20 * 2) : x;
                y = (y + tiph > jQuery(document).scrollTop() + jQuery(window).height()) ? jQuery(document).scrollTop() + jQuery(window).height() - tiph - 10 : y;
                jQuery("#" + id).css({ "fill": eujsconfig[id].downColor });
                jQuery("#eujstip").show().html(eujsconfig[id].hover);
                jQuery("#eujstip").css({ left: x, top: y })
            });
            _Textobj.on("touchend", function() { jQuery("#" + id).css({ "fill": eujsconfig[id].upColor }); if (eujsconfig[id].target === "new_window") { window.open(eujsconfig[id].url) } else if (eujsconfig[id].target === "same_window") { window.parent.location.href = eujsconfig[id].url } else if (eujsconfig[id].target === "modal") { jQuery(eujsconfig[id].url).modal("show") } })
        }
    }
}
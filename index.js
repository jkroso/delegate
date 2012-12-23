
/**
 * Module dependencies.
 */

var bind = require('event').bind

// Shim browser support
Element.prototype.matchesSelector = Element.prototype.matchesSelector
	|| Element.prototype.webkitMatchesSelector
	|| Element.prototype.mozMatchesSelector
	|| Element.prototype.msMatchesSelector
	|| Element.prototype.oMatchesSelector
	|| function (selector) {
		var nodes = this.parentNode.querySelectorAll(selector)
		  , len = nodes.length
		while (len--) if (nodes[len] === this) return true
		return false
	}

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, selector, type, fn, capture){
	return bind(el, type, function delegator (e) {
		if (e.delegateTarget = match(e.target, this, selector))
			fn.call(e.delegateTarget, e)
	}, capture)
}

/**
 * Look for an element witch matches the selector
 *
 * @param {Element} bottom the starting place for the search
 * @param {Element} top bottom must be within this
 * @param {String} selector a css query used to determine if a node matches
 * @return {Element|undefined}
 */
exports.match = match
function match (bottom, top, selector) {
	while (bottom !== top) {
		if (bottom.matchesSelector(selector)) return bottom
		bottom = bottom.parentElement
	}
}

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = require('event').unbind

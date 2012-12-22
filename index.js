
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
		var target = e.target
		while (target !== this) {
			if (target.matchesSelector(selector)) return fn.call(target, e)
			target = target.parentElement
		}
	}, capture)
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

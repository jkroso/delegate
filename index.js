
var bind = require('event').bind
  , unique = require('unique-selector')

/**
 * Delegate event `type` to `selector` and invoke `fn(e)`.
 * A callback function is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

function delegate (el, selector, type, fn, capture){
	var path = unique(el) + ' '
	return bind(el, type, function delegator (e) {
		// ensure css path
		if (document.querySelector(path) !== this) {
			path = unique(this) + ' '
		}
		if (e.delegate = match(e.target, this, path + selector)) {
			fn.call(e.delegate, e)
		}
	}, capture)
}

/**
 * Return the first Element between bottom and top that matches the selector
 *
 * @param {Element} bottom
 * @param {Element} top the context for the search
 * @param {String} selector
 * @return {Element}
 */

function match (bottom, top, selector) {
	var nodes = top.querySelectorAll(selector)
	  , len = nodes.length

	while (bottom !== top) {
		for (var i = 0; i < len; i++) {
			if (nodes[i] === bottom) return bottom
		}
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
exports.match = match
exports.bind = delegate

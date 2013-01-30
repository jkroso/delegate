
# delegate

  Low-level event delegation component.

## Installation

    $ component install component/delegate

## Example

```html
<ul>
  <li>
    <a href="#"></a>
  </li>
</ul>
```

```js
var delegate = require('delegate');
var ul = document.querySelector('ul');

var fn = delegate.bind(ul, 'li a', 'click', function(e){
  console.log(this);
  delegate.unbind(ul, 'click', fn, false);
}, false);
```

## API

### .bind(el, selector, type, callback, [capture])

  Bind and return a callback which may be passed to `.unbind()`. The selector operates within the context of `el`. So if we changed the example above to the following, it would never log anything unless their was an `<ul>` inside `ul`:

```js
delegate.bind(ul, 'ul', 'click', function(e){
  console.log(this);
}, false);
```


### .unbind(el, type, callback, [capture])

  Unbind. Note the absense of a `selector` and the callback must be the return value of `.bind`. i.e. not the original function you passed to `.bind`

### .match(bottom, top, selector)

  Return the first Element between bottom and top that matches the selector. Its designed to be used internally but exposed because I think there is a good chance the abstraction you are building will find it useful. :)

## License

  MIT

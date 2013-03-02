
var delegate = require('..').bind
  , unbind = require('..').unbind
  , chai = require('chai')
  , spies = require('chai-spies')
  , should = chai.should()

chai.use(spies)

var test = document.getElementById('test')
var target, spy, a, b

beforeEach(function () {
  test.innerHTML = '<div id="target"><a class="a"></a><b class="b"></b></div>'
  target = test.firstChild
  a = target.firstChild
  b = target.lastChild
  spy = chai.spy()
})

describe('.bind(el, selector, type, fn, capture)', function(){
  it('should not be able to delegate to itelf', function () {
    delegate(test, 'div', 'click', spy)
    happen.click(test)
    spy.should.not.have.been.called
  })

  it('with an ID selector', function () {
    delegate(test, '#target', 'click', spy)
    delegate(test, '#wrong-id', 'click', spy)
    happen.click(target)
    spy.should.have.been.called.once
  })

  it('with a class selector', function () {
    delegate(test, '.a', 'click', spy)
    delegate(test, '.b', 'click', spy)
    happen.click(a)
    spy.should.have.been.called.once
  })

  it('with a tag selector', function () {
    delegate(test, 'a', 'click', spy)
    delegate(test, 'b', 'click', spy)
    happen.click(a)
    spy.should.have.been.called.once
  })

  it('with a child selector', function () {
    delegate(test, '#target > a', 'click', spy)
    delegate(test, '#target > b', 'click', spy)
    happen.click(a)
    spy.should.have.been.called.once
  })

  it('with a decendant selector', function () {
    delegate(test, '#target a', 'click', spy)
    delegate(test, '#target b', 'click', spy)
    happen.click(a)
    spy.should.have.been.called.once
  })

  it('with a immediate child selector', function () {
    delegate(test, '> div', 'click', spy)
    delegate(test, 'a', 'click', spy)
    happen.click(target)
    spy.should.have.been.called.once
  })

  it('with the event bubbling up from a child', function () {
    delegate(test, '> div', 'click', spy)
    delegate(test, 'a', 'click', spy)
    happen.click(a)
    spy.should.have.been.called.twice
  })

  it('should handle elements moving after being bound', function () {
    delegate(target, 'a', 'click', spy)
    delegate(target, 'b', 'click', spy)
    var div = document.createElement('div')
    document.body.appendChild(div)
    div.appendChild(target)
    happen.click(a)
    spy.should.have.been.called.once
    document.body.removeChild(div)
  })
})

describe('unbind(el, type, fn, capture)', function () {
  it('should remove the listener', function () {
    delegate(test, '> a', 'click', spy)
    delegate(test, 'a', 'click', spy)
    unbind(test, 'click', spy)
    happen.click(a)
    spy.should.not.have.been.called
  })
})

jest.unmock('../dist/react-tag-list.js');
jest.unmock('dom.position');
jest.unmock('element-size');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');
var ReactTagList = require('../dist/react-tag-list');
var testData = require('js-test-data');

describe('ReactTagList', function() {
  var component, onRemoveValue, domNode;
  var onRemove = function(tagValue) {onRemoveValue = tagValue;};

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <ReactTagList values={testData.Toppings} onRemove={onRemove}/>
    );
    domNode = ReactDOM.findDOMNode(component);
  });

  it('should render', function() {
    expect(domNode).toBeDefined();
  });

  it('should render tags with the supplied values', function() {
    //check that each ref is defined and has the correct label rendered in it
    for(var i = 0; i < testData.Toppings.length; i++) {
      var refKey = 'tag-' + String(i);
      expect(component.refs[refKey]).toBeDefined();
      expect(component.refs[refKey].getElementsByClassName('rtl-label')[0].innerHTML)
            .toEqual(testData.Toppings[i].label);
    }
  });

  it('should call onRemove function when the X button is clicked', function() {
    //click to remove the first tag
    TestUtils.Simulate.click(component.refs['tag-0-remove']);
    //the onRemove function should be called, and set our onRemoveValue to what value is being removed
    expect(onRemoveValue).toEqual(testData.Toppings[0].value);
  });
});

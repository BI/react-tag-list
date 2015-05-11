# react-tag-list

Basic "tag list" to illustrate values that are selected. This is useful to show things like the state of a filter selector component. [Demo It](http://tehandyb.github.io/react-tag-list/)

Properties
==========

* **values**: (Array of Objects each with the label and value properties) These values each become a tag.

* **onRemove**: (function(value)) Called when a tag is clicked.

Here is a sample integration:

```js
var React = require('react');
var ReactTagList = require('react-tag-list');

var DemoTagList = React.createClass({

	getInitialState: function() {
		return {tags: [{label: "chocolate", value: 9},{label: "starfish", value: 8},{label: "strawberry", value: 10}],
				tagInputValue: ""};
	},
	removeTag: function(tagValue) {
		var currentTags = this.state.tags;
		var newTags = currentTags.filter(function(tag) {return tag.value !== tagValue;});
		this.setState({tags: newTags});
	},
	addTag: function(tag) {
		var currentTags = this.state.tags;
		if(currentTags.filter(function(t) {return t.value === tag.value;}).length > 0)
			return;

		currentTags.push({label: tag.label, value: tag.value});
		this.setState({tags: currentTags});
	},
	handleInputChange: function(event) {
		this.setState({tagInputValue: String(event.target.value)});
	},
	render: function() {
		var tags = this.state.tags;
		var tagInput = this.state.tagInputValue;

		return (
			<div>
				<ReactTagList values={tags} onRemove={this.removeTag}/>
				<div className="input-tags">
					<input type="text"
						   onChange={this.handleInputChange}
					       placeholder="Type new tag..."
					   	   value={tagInput} />
					<button onClick={this.addTag.bind(this, {label: tagInput, value: String(tagInput).length})}>Add Tag</button>
				</div>
			</div>
		);
	}
});

React.render(React.createElement(DemoTagList), document.getElementById('main'));
```

## Development

* Development server `npm run dev`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;

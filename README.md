# lemon-extension

A node file separate from Lemon-Aid Stand to support courseware developers.
This node file provides examples of how to use [node-html-parser](https://github.com/taoqf/node-html-parser#htmlelementouterhtml) to modify html files. 

## Usage
HTMLElement can be created by parsing html string, file, or manually created
```
// String
HTMLParser.parse('<h1>Hello World</h1>')

// File
HTMLParser.loadFile(filePath)

// Manually
let p = new HTMLElement('p', { id: 'id' }, 'id="id"');
```

## Setup
1. Install all the created dependencies
2. Modify the index.js file to complete the actions you would like
3. Run index.js
```
npm install
node ./index.js
```

## Create
An HTMLElement can be created by parsing an HTML file, an HTML string, or manually. To create an HTMLElement the following parameters can be provided:
```
new HTMLElement('elementTag', attributeObject, attributeString);
```

- `elementTag` is required
    - String containing the element tag to create, eg `'p'`, `'h1'`.
- `attributeObject` is optional, set to `''` if not being used.
    - Object containing all the attributes to attach to the element. For example class and id -> `{ class: 'className', id: 'idName' }
- `attributeString` is optional, set to `''` if not being used.
    -  String containing all the attributes to attach to the element. can be used instead of `attributeObject`, use one or the other. Note quotes needed to be properly escaped. For example -> `'class=\'className\' id="idName"'`


## Methods
These methods (functions) can be used on an HTMLElement after it has been created.
### HTMLElement.appendChild(HTMLElement)
Append another HTMLElement to a parent HTMLElement.
### HTMLElement.classList.add('className')
Updates the HTMLElement by adding new class to element. Provide a string with the class name.

### HTMLElement.classList.remove('className')
Updates the HTMLElement by removing class from element.

### HTMLElement.getAttribute('key')
Get the attribute value from the HTMLElement with the matching key string.
### HTMLElement.insertAdjacentHTML('where', 'hmtlString')
Parse the provide html string and insert the resulting HTMLElement into the DOM at the specified position. The parse html string can be added with with the following [position](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) options from the selected HTMLElement:
- `'beforebegin'`: Before the HTMLElement itself.
- `'afterbegin'`: Just inside the HTMLElement, before its first child.
- `'beforeend'`: Just inside the HTMLElement, after its last child.
- `'afterend'`: After the HTMLElement itself.

### HTMLElement.removeAttribute('key')
Remove the attribute from the HTMLElement with the matching key string.
### HTMLElement.removeChild(HTMLElement)
Remove an HTMLElement from a parent HTMLElement.

### HTMLElement.classList.replace('oldClass', 'newClass')
Updates the HTMLElement by replacing class with another in element.

### HTMLElement.replaceWith([HTMLElement])
Replace an HTMLElement with other HTMLElement(s). Provide and an array of HTMLElements.

### HTMLElement.prettyPrint()
Returns the html string of an HTMLElement with indentations.

### HTMLElement.querySelector('selector')
Returns the first HTMLElement matching the selector string. Use CSS selectors to find the html element. [Examples of valid CSS selectors](https://www.w3schools.com/cssref/css_selectors.asp):
- element -> `body`, `h1`
- class -> `.className`, `p.className`
- id -> `#idName`
- attribute -> `[attribute]`, `[attribute=value]`

### HTMLElement.querySelectorAll('selector')
Returns an array of HTMLElements matching the selector string. Use CSS selectors to find the html elements, see HTMLElement.querySelector.

### HTMLElement.setAttribute('key','value')
Set attribute in HTMLElement of the provided key string with the value string.


## Properties
These properties are available after an HTMLElement has been created.
### HTMLElement.outerHTML
Get the outer html string of an HTMLElement, ie includes outer element tags.

### HTMLElement.innerHTML
Set or get the inner html string of an HTMLElement.

### HTMLElement.textContent
Set or get the text of an HTMLElement.


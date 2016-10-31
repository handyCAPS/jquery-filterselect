# Filter Select #

A jQuery plugin to filter a select box based on the value of another select box

## Usage ##

`$(filter).filterSelect([target][, options]);`  

Where `filter` is a selector pointing to a select box. The value(s) of this select box is used to filter the values of the `target`.

The `filter` select box should have a data-attribute which holds the value of a string to select the target. For instance a select box `#first` which should filter `#second` should have `data-target="second"`. The target could also be set as the first parameter of the `filterSelect` function.

The options of the `filter` should have a `data-reference` attribute and the `target` options should have a `data-belongsto` attribute. Any option in the `target` that doesn't have a `data-belongsto` value matching the selected `data-target` value gets filtered. See [demo](demo.html).

## Options ##

`target` String (optional)  
CSS selector for the target element

`dataString` Object (optional)  
A plain js object describing alternative names for the data-attributes to be used. The following names can be changed:  
```
{
	target, // The data-attribute describing which select box is filtered  
	reference, // Describes which options get filtered (primary key)  
	belongsto // Describes which filter the option belongs to (foreign key)  
}
```
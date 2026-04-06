## Classes

<dl>
<dt><a href="#Possessive">Possessive</a></dt>
<dd><p>Formats singular nouns and names into possessive form.</p>
<p>The library is intentionally small and explicit. It handles a predictable
set of English-oriented rules, a small set of exception words, and the
<code>ß</code> suffix case when German rules are enabled.</p>
<p>It does not try to infer plural possessives or perform full language
detection. Inputs are trimmed before processing.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PossessiveOptions">PossessiveOptions</a> : <code>Object</code></dt>
<dd><p>Options for <a href="#Possessive">Possessive</a>.</p>
</dd>
</dl>

<a name="Possessive"></a>

## Possessive
Formats singular nouns and names into possessive form.

The library is intentionally small and explicit. It handles a predictable
set of English-oriented rules, a small set of exception words, and the
`ß` suffix case when German rules are enabled.

It does not try to infer plural possessives or perform full language
detection. Inputs are trimmed before processing.

**Kind**: global class  

* [Possessive](#Possessive)
    * [new Possessive([options])](#new_Possessive_new)
    * [.makePossessive(noun)](#Possessive+makePossessive) ⇒ <code>string</code>
    * [.addException(noun, possessiveForm)](#Possessive+addException) ⇒ <code>void</code>

<a name="new_Possessive_new"></a>

### new Possessive([options])
Create a new possessive formatter.

**Throws**:

- <code>Error</code> Throws when `options` is not an object, when `style` is not
`standard` or `alternative`, or when the feature flags are not booleans.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | [<code>PossessiveOptions</code>](#PossessiveOptions) | <code>{}</code> | Configuration options. |

**Example**  
```js
import Possessive from "possessive-js";

const possessive = new Possessive();

possessive.makePossessive("John");
// => "John's"

possessive.makePossessive("Chris");
// => "Chris'"
```
**Example**  
```js
const possessive = new Possessive({ style: "alternative" });

possessive.makePossessive("Chris");
// => "Chris's"
```
<a name="Possessive+makePossessive"></a>

### possessive.makePossessive(noun) ⇒ <code>string</code>
Convert a noun to its singular possessive form.

The formatter trims the input, checks registered exceptions first, then
applies suffix rules:

- nouns ending in `ß` become `noun'` when German rules are enabled
- nouns ending in `s` become `noun'` or `noun's` depending on `style`
- other nouns receive `'s`

Exception words preserve lowercase, uppercase, and title-case input.

**Kind**: instance method of [<code>Possessive</code>](#Possessive)  
**Returns**: <code>string</code> - The possessive form.  
**Throws**:

- <code>Error</code> Throws when the input is empty, whitespace-only, or not a string.


| Param | Type | Description |
| --- | --- | --- |
| noun | <code>string</code> | The noun or name to convert. |

**Example**  
```js
const possessive = new Possessive();

possessive.makePossessive("John");
// => "John's"
```
**Example**  
```js
const possessive = new Possessive();

possessive.makePossessive("Chris");
// => "Chris'"
```
**Example**  
```js
const possessive = new Possessive({ style: "alternative" });

possessive.makePossessive("Chris");
// => "Chris's"
```
**Example**  
```js
const possessive = new Possessive();

possessive.makePossessive("It");
// => "Its"
```
<a name="Possessive+addException"></a>

### possessive.addException(noun, possessiveForm) ⇒ <code>void</code>
Register a custom exact-word exception.

Custom exceptions are checked before suffix rules. Stored values are
normalized so that lowercase, uppercase, and title-case outputs remain
consistent with the built-in exception behavior.

**Kind**: instance method of [<code>Possessive</code>](#Possessive)  
**Throws**:

- <code>Error</code> Throws when either argument is empty, whitespace-only, or not a string.


| Param | Type | Description |
| --- | --- | --- |
| noun | <code>string</code> | The noun to match exactly, case-insensitively. |
| possessiveForm | <code>string</code> | The possessive form to return for that noun. |

**Example**  
```js
const possessive = new Possessive();

possessive.addException("boss", "bosses'");

possessive.makePossessive("boss");
// => "bosses'"

possessive.makePossessive("Boss");
// => "Bosses'"
```
<a name="PossessiveOptions"></a>

## PossessiveOptions : <code>Object</code>
Options for [Possessive](#Possessive).

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [style] | <code>&#x27;standard&#x27;</code> \| <code>&#x27;alternative&#x27;</code> | <code>&#x27;standard&#x27;</code> | Selects the suffix used for nouns ending in `s`. `standard` returns `Chris'` while `alternative` returns `Chris's`. |
| [enableFrenchRules] | <code>boolean</code> | <code>true</code> | Reserved for compatibility with future language-specific rules. |
| [enableGermanRules] | <code>boolean</code> | <code>true</code> | Enables special handling for nouns ending in `ß`, such as `Strauß -> Strauß'`. |
| [enableNordicRules] | <code>boolean</code> | <code>true</code> | Reserved for compatibility with future language-specific rules. |


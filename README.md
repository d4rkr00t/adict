# Adict – Ordered Dictionary

OrderedDict is a data structure that preservers order of inserted keys.
And is a sub-class of a regular object/dictionary.
In addition it provides couple of convenient methods to push elements to start or end of a dict.

As an example: this data structure can be used to implement LRU-cache.

```js
let OrderedDict = require("adict");

let dict = new OrderedDict();

dict.set(1, 2);
```

- Small 593b min and gzip
- Zero dependencies
- O(1) runtime complexity for all operations

## API

### OrderedDict()

OrderedDict is a data structure that preservers order of inserted keys.
And is a sub-class of a regular object/dictionary.
Implementation is inspired by python's `OrderedDict` and this particular gist:
https://gist.github.com/joequery/12332f410a05e6c7c949

<details>
  <summary>Click to expand!</summary>

<p></p>

**Kind**: Class

- [OrderedDict()](#OrderedDict)
  - _instance_
    - [.set(key, value)](#OrderedDict+set) ⇒ [<code>OrderedDict</code>](#OrderedDict)
    - [.delete(key)](#OrderedDict+delete) ⇒ <code>boolean</code>
    - [.clear()](#OrderedDict+clear) ⇒ <code>undefined</code>
    - [.get(key)](#OrderedDict+get) ⇒ [<code>OrderedDictValue</code>](#OrderedDictValue) \| <code>undefined</code>
    - [.has(key)](#OrderedDict+has) ⇒ <code>boolean</code>
    - [.pop()](#OrderedDict+pop) ⇒ <code>undefined</code> \| [<code>OrderedDictKeyValue</code>](#OrderedDictKeyValue)
    - [.shift()](#OrderedDict+shift) ⇒ <code>undefined</code> \| [<code>OrderedDictKeyValue</code>](#OrderedDictKeyValue)
    - [.toStart(key)](#OrderedDict+toStart) ⇒ <code>boolean</code>
    - [.toEnd(key)](#OrderedDict+toEnd) ⇒ <code>boolean</code>
    - [.keys()](#OrderedDict+keys) ⇒ <code>Iterator</code>
    - [.values()](#OrderedDict+values) ⇒ <code>Iterator</code>
    - [.entries()](#OrderedDict+entries) ⇒ <code>Iterator</code>
  - _static_
    - [.from(data)](#OrderedDict.from) ⇒ [<code>OrderedDict</code>](#OrderedDict)

<a name="OrderedDict+set"></a>

#### orderedDict.set(key, value) ⇒ [<code>OrderedDict</code>](#OrderedDict)

Add a new key-value pair to an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)

| Param | Type                                           |
| ----- | ---------------------------------------------- |
| key   | [<code>OrderedDictKey</code>](#OrderedDictKey) |
| value | <code>any</code>                               |

<a name="OrderedDict+delete"></a>

#### orderedDict.delete(key) ⇒ <code>boolean</code>

Delete a key from an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)

| Param | Type                                           |
| ----- | ---------------------------------------------- |
| key   | [<code>OrderedDictKey</code>](#OrderedDictKey) |

<a name="OrderedDict+clear"></a>

#### orderedDict.clear() ⇒ <code>undefined</code>

Clear ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)
<a name="OrderedDict+get"></a>

#### orderedDict.get(key) ⇒ [<code>OrderedDictValue</code>](#OrderedDictValue) \| <code>undefined</code>

Retrieve a key from an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)

| Param | Type                                           |
| ----- | ---------------------------------------------- |
| key   | [<code>OrderedDictKey</code>](#OrderedDictKey) |

<a name="OrderedDict+has"></a>

#### orderedDict.has(key) ⇒ <code>boolean</code>

Check if key exists in an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)

| Param | Type                                           |
| ----- | ---------------------------------------------- |
| key   | [<code>OrderedDictKey</code>](#OrderedDictKey) |

<a name="OrderedDict+pop"></a>

#### orderedDict.pop() ⇒ <code>undefined</code> \| [<code>OrderedDictKeyValue</code>](#OrderedDictKeyValue)

Remove and return last element from an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)
<a name="OrderedDict+shift"></a>

#### orderedDict.shift() ⇒ <code>undefined</code> \| [<code>OrderedDictKeyValue</code>](#OrderedDictKeyValue)

Remove and return first element from an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)
<a name="OrderedDict+toStart"></a>

#### orderedDict.toStart(key) ⇒ <code>boolean</code>

Move an existing element to the start of an orederd dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)

| Param | Type                                           |
| ----- | ---------------------------------------------- |
| key   | [<code>OrderedDictKey</code>](#OrderedDictKey) |

<a name="OrderedDict+toEnd"></a>

#### orderedDict.toEnd(key) ⇒ <code>boolean</code>

Move an existing element to the end of an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)

| Param | Type                                           |
| ----- | ---------------------------------------------- |
| key   | [<code>OrderedDictKey</code>](#OrderedDictKey) |

<a name="OrderedDict+keys"></a>

#### orderedDict.keys() ⇒ <code>Iterator</code>

Returns new Iterator object that contains all keys of an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)
<a name="OrderedDict+values"></a>

#### orderedDict.values() ⇒ <code>Iterator</code>

Returns new Iterator object that contains all values of an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)
<a name="OrderedDict+entries"></a>

#### orderedDict.entries() ⇒ <code>Iterator</code>

Returns new Iterator object that contains all key-value pairs of an ordered dict.

**Kind**: instance method of [<code>OrderedDict</code>](#OrderedDict)
<a name="OrderedDict.from"></a>

#### OrderedDict.from(data) ⇒ [<code>OrderedDict</code>](#OrderedDict)

Create an ordered dict from an array or object.

**Kind**: static method of [<code>OrderedDict</code>](#OrderedDict)

| Param | Type                                                                                         |
| ----- | -------------------------------------------------------------------------------------------- |
| data  | [<code>Array&lt;OrderedDictKeyValue&gt;</code>](#OrderedDictKeyValue) \| <code>Object</code> |

---

<a name="OrderedDictKey"></a>

#### OrderedDictKey : <code>any</code>

<a name="OrderedDictValue"></a>

#### OrderedDictValue : <code>any</code>

<a name="OrderedDictKeyValue"></a>

#### OrderedDictKeyValue : <code>[OrderedDictKey, OrderedDictValue]</code>

</details>

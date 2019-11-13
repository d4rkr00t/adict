/**
 * OrderedDict is a data structure that preservers order of inserted keys.
 * And is a sub-class of a regular object/dictionary.
 * Implementation is inspired by python's `OrderedDict` and this particular gist:
 * https://gist.github.com/joequery/12332f410a05e6c7c949
 */
function OrderedDict() {
  // Root key
  this._rk = Symbol("rk");

  // Doubly linked list of key-value pairs
  this._r = createNode(this._rk, undefined);

  // Circular link for linked list nodes
  this._r.prev = this._r.next = this._r;

  // Key -> Link map
  this._m = new Map();
}

/**
 * Add a new key-value pair to an ordered dict.
 *
 * @param {OrderedDictKey} key
 * @param {any} value
 * @returns {OrderedDict}
 */
OrderedDict.prototype.set = function(key, value) {
  if (this._m.has(key)) {
    this._m.get(key).value = value;
    return this;
  }

  let node = createNode(key, value);
  this._m.set(key, node);

  // Inserting node at the end of the linked list
  let root = this._r;
  let last = root.prev;

  [node.prev, node.next] = [last, root];
  last.next = node;
  root.prev = node;

  return this;
};

/**
 * Delete a key from an ordered dict.
 *
 * @param {OrderedDictKey} key
 * @returns {boolean}
 */
OrderedDict.prototype.delete = function(key) {
  if (!this._m.has(key)) {
    return false;
  }

  // Removing node from the map and connecting node.prev and node.next
  let node = this._m.get(key);
  let nodePrev = node.prev;
  let nodeNext = node.next;

  node.prev.next = nodeNext;
  node.next.prev = nodePrev;

  node.prev = null;
  node.next = null;

  this._m.delete(key);

  return true;
};

/**
 * Clear ordered dict.
 *
 * @returns {undefined}
 */
OrderedDict.prototype.clear = function() {
  this._r.prev = this._r.next = this._r;
  this._m = new Map();
};

/**
 * Retrieve a key from an ordered dict.
 *
 * @param {OrderedDictKey} key
 * @returns {OrderedDictValue|undefined}
 */
OrderedDict.prototype.get = function(key) {
  if (!this._m.has(key)) {
    return;
  }

  return this._m.get(key).value;
};

/**
 * Check if key exists in an ordered dict.
 *
 * @param {OrderedDictKey} key
 * @returns {boolean}
 */
OrderedDict.prototype.has = function(key) {
  return this._m.has(key);
};

/**
 * Remove and return last element from an ordered dict.
 *
 * @returns {undefined|OrderedDictKeyValue}
 */
OrderedDict.prototype.pop = function() {
  let node = this._r.prev;

  if (node.key === this._rk) {
    return;
  }

  let nodePrev = node.prev;

  nodePrev.next = this._r;
  this._r.prev = nodePrev;

  this._m.delete(node.key);

  return [node.key, node.value];
};

/**
 * Remove and return first element from an ordered dict.
 *
 * @returns {undefined|OrderedDictKeyValue}
 */
OrderedDict.prototype.shift = function() {
  let node = this._r.next;

  if (node.key === this._rk) {
    return;
  }

  let nodeNext = node.next;

  nodeNext.prev = this._r;
  this._r.next = nodeNext;

  this._m.delete(node.key);

  return [node.key, node.value];
};

/**
 * Move an existing element to the start of an orederd dict.
 *
 * @param {OrderedDictKey} key
 * @returns {boolean}
 */
OrderedDict.prototype.toStart = function(key) {
  if (!this._m.has(key)) {
    return false;
  }

  let node = this._m.get(key);
  let nodePrev = node.prev;
  let nodeNext = node.next;

  nodePrev.next = nodeNext;
  nodeNext.prev = nodePrev;

  let root = this._r;
  let first = root.next;

  node.prev = root;
  node.next = first;
  root.next = first.prev = node;
};

/**
 * Move an existing element to the end of an ordered dict.
 *
 * @param {OrderedDictKey} key
 * @returns {boolean}
 */
OrderedDict.prototype.toEnd = function(key) {
  if (!this._m.has(key)) {
    return false;
  }

  let node = this._m.get(key);
  let nodePrev = node.prev;
  let nodeNext = node.next;

  nodePrev.next = nodeNext;
  nodeNext.prev = nodePrev;

  let root = this._r;
  let last = root.prev;

  node.prev = last;
  node.next = root;
  last.next = root.prev = node;
};

/**
 * Create an ordered dict from an array or object.
 *
 * @param {Array<OrderedDictKeyValue>|Object} data
 * @returns {OrderedDict}
 */
OrderedDict.from = function(data) {
  let dict = new OrderedDict();
  let dataArray =
    Object.prototype.toString.call(data) === "[object Object]"
      ? Object.entries(data)
      : Array.isArray(data)
      ? data
      : [];

  if (dataArray.length) {
    dataArray.forEach(([key, value]) => dict.set(key, value));
  }

  return dict;
};

OrderedDict.prototype._i = function*() {
  let cur = this._r.next;

  if (!this._m.size) {
    return;
  }

  while (cur.key !== this._rk) {
    yield cur;
    cur = cur.next;
  }
};

/**
 * Returns new Iterator object that contains all keys of an ordered dict.
 *
 * @returns {Iterator}
 */
OrderedDict.prototype.keys = function*() {
  let cur = this._i();

  while (true) {
    let value = cur.next();

    if (value.done) {
      return;
    }

    yield value.value.key;
  }
};

/**
 * Returns new Iterator object that contains all values of an ordered dict.
 *
 * @returns {Iterator}
 */
OrderedDict.prototype.values = function*() {
  let cur = this._i();

  while (true) {
    let value = cur.next();

    if (value.done) {
      return;
    }

    yield value.value.value;
  }
};

/**
 * Returns new Iterator object that contains all key-value pairs of an ordered dict.
 *
 * @returns {Iterator}
 */
OrderedDict.prototype.entries = function*() {
  let cur = this._i();

  while (true) {
    let value = cur.next();

    if (value.done) {
      return;
    }

    yield [value.value.key, value.value.value];
  }
};

OrderedDict.prototype.toString = function() {
  let result = [];
  let cur = this._r.next;

  if (!this._m.size) {
    return "$ empty $";
  }

  while (cur.key !== this._rk) {
    result.push(`(${cur.key}, ${cur.value})`);
    cur = cur.next;
  }

  return "$ -> " + result.join(" -> ") + " -> $";
};

/**
 * Creates Linked List Node
 *
 * @private
 * @param {OrderedDictKey} key
 * @param {OrderedDictValue} value
 * @returns {LinkedListNode}
 */
function createNode(key, value) {
  return { key, value, prev: null, next: null };
}

/**
 * @private
 * @typedef {Object} LinkedListNode
 * @property {OrderedDictKey} key
 * @property {OrderedDictValue} value
 * @property {LinkedListNode|null} prev
 * @property {LinkedListNode|null} next
 */

/**
 * @typedef {any} OrderedDictKey
 */

/**
 * @typedef {any} OrderedDictValue
 */

/**
 * @typedef {Array<OrderedDictKey, OrderedDictValue>} OrderedDictKeyValue
 */

module.exports = OrderedDict;

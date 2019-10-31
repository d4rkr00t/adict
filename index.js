/**
 * OrderedDict is a data structure that preservers order of inserted keys.
 * And is a sub-class of a regular object/dictionary.
 * Implementation is inspired by python's OrderedDict and this particular gist:
 * https://gist.github.com/joequery/12332f410a05e6c7c949
 */
function OrderedDict() {
  this.__root_key = Symbol("rootKey");

  // Doubly linked list of key-value pairs
  this.__root = createNode(this.__root_key, undefined);

  // Circular link for linked list nodes
  this.__root.prev = this.__root.next = this.__root;

  // Key -> Link map
  this.__map = {};
}

/**
 * Add a new key-value pair to an ordered dict.
 *
 * @param {string|number} key
 * @param {any} value
 * @returns {OrederdDict}
 */
OrderedDict.prototype.set = function(key, value) {
  if (!this.__map.hasOwnProperty(key)) {
    let node = createNode(key, value);
    this.__map[key] = node;

    // Inserting node at the end of the linked list
    let root = this.__root;
    let last = root.prev;

    [node.prev, node.next] = [last, root];
    last.next = node;
    root.prev = node;
  } else {
    this.__map[key].value = value;
  }
  return this;
};

/**
 * Delete a key from an ordered dict.
 *
 * @param {string|number} key
 * @returns {boolean}
 */
OrderedDict.prototype.delete = function(key) {
  if (!this.__map.hasOwnProperty(key)) {
    return false;
  }

  // Removing node from the map and connecting node.prev and node.next
  let node = this.__map[key];
  let nodePrev = node.prev;
  let nodeNext = node.next;

  node.prev.next = nodeNext;
  node.next.prev = nodePrev;

  node.prev = null;
  node.next = null;

  delete this.__map[key];

  return true;
};

/**
 * Clear ordered dict.
 *
 * @returns {undefined}
 */
OrderedDict.prototype.clear = function() {
  this.__root.prev = this.__root.next = this.__root;
  this.__map = Object.create(null);
};

/**
 * Retrieve a key from an ordered dict.
 *
 * @param {string|number} key
 * @returns {any|undefined}
 */
OrderedDict.prototype.get = function(key) {
  if (!this.__map.hasOwnProperty(key)) {
    return undefined;
  }

  return this.__map[key].value;
};

/**
 * Check if key exists in an ordered dict.
 *
 * @param {string|number} key
 * @returns {boolean}
 */
OrderedDict.prototype.has = function(key) {
  return this.__map.hasOwnProperty(key);
};

/**
 * Remove and return last element from an ordered dict.
 *
 * @returns {undefined|any}
 */
OrderedDict.prototype.pop = function() {
  let node = this.__root.prev;

  if (node.key === this.__root_key) {
    return undefined;
  }

  let nodePrev = node.prev;

  nodePrev.next = this.__root;
  this.__root.prev = nodePrev;

  delete this.__map[node.key];

  return node.value;
};

/**
 * Remove and return first element from an ordered dict.
 *
 * @returns {undefined|any}
 */
OrderedDict.prototype.shift = function() {
  let node = this.__root.next;

  if (node.key === this.__root_key) {
    return undefined;
  }

  let nodeNext = node.next;

  nodeNext.prev = this.__root;
  this.__root.next = nodeNext;

  delete this.__map[node.key];

  return node.value;
};

/**
 * Move an existing element to the start of an orederd dict.
 *
 * @param {string|number} key
 * @returns {boolean}
 */
OrderedDict.prototype.toStart = function(key) {
  if (!this.__map.hasOwnProperty(key)) {
    return false;
  }

  let node = this.__map[key];
  let nodePrev = node.prev;
  let nodeNext = node.next;

  nodePrev.next = nodeNext;
  nodeNext.prev = nodePrev;

  let root = this.__root;
  let first = root.next;

  node.prev = root;
  node.next = first;
  root.next = first.prev = node;
};

/**
 * Move an existing element to the end of an orederd dict.
 *
 * @param {string|number} key
 * @returns {boolean}
 */
OrderedDict.prototype.toEnd = function(key) {
  if (!this.__map.hasOwnProperty(key)) {
    return false;
  }

  let node = this.__map[key];
  let nodePrev = node.prev;
  let nodeNext = node.next;

  nodePrev.next = nodeNext;
  nodeNext.prev = nodePrev;

  let root = this.__root;
  let last = root.prev;

  node.prev = last;
  node.next = root;
  last.next = root.prev = node;
};

OrderedDict.prototype.__iter = function*() {
  let cur = this.__root.next;

  if (!Object.keys(this.__map).length) {
    return;
  }

  while (cur.key !== this.__root_key) {
    yield cur;
    cur = cur.next;
  }
};

/**
 * Returns new Iterator obejct that contains all keys of an ordered dict.
 *
 * @returns {Iterator}
 */
OrderedDict.prototype.keys = function*() {
  let cur = this.__iter();

  while (true) {
    let value = cur.next();

    if (!value.done) {
      yield value.value.key;
    } else {
      return;
    }
  }
};

/**
 * Returns new Iterator obejct that contains all values of an ordered dict.
 *
 * @returns {Iterator}
 */
OrderedDict.prototype.values = function*() {
  let cur = this.__iter();

  while (true) {
    let value = cur.next();

    if (!value.done) {
      yield value.value.value;
    } else {
      return;
    }
  }
};

/**
 * Returns new Iterator obejct that contains all key-value pairs of an ordered dict.
 *
 * @returns {Iterator}
 */
OrderedDict.prototype.entries = function*() {
  let cur = this.__iter();

  while (true) {
    let value = cur.next();

    if (!value.done) {
      yield [value.value.key, value.value.value];
    } else {
      return;
    }
  }
};

OrderedDict.prototype.toString = function() {
  let result = [];
  let cur = this.__root.next;

  if (!Object.keys(this.__map).length) {
    return "$ empty $";
  }

  while (cur.key !== this.__root_key) {
    result.push(`(${cur.key}, ${cur.value})`);
    cur = cur.next;
  }

  return "$ -> " + result.join(" -> ") + " -> $";
};

/**
 * Creates Linked List Node
 *
 * @param {string} key
 * @param {any} value
 * @returns {LinkedListNode}
 */
function createNode(key, value) {
  return { key, value, prev: null, next: null };
}

/**
 * @typedef {Object} LinkedListNode
 * @property {any} value
 * @property {LinkedListNode|null} prev
 * @property {LinkedListNode|null} next
 */

module.exports = OrderedDict;
let test = require("ava");
let OrderedDict = require("./");

/**
 * OrderedDict#set
 */

test("set", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);

  t.is(dict.toString(), "$ -> (1, 10) -> (2, 20) -> (3, 30) -> $");
});

test("set existing key", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);
  dict.set(2, 40);

  t.is(dict.toString(), "$ -> (1, 10) -> (2, 40) -> (3, 30) -> $");
});

/**
 * OrderedDict#delete
 */

test("delete", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);
  dict.delete(2);

  t.is(dict.toString(), "$ -> (1, 10) -> (3, 30) -> $");
});

test("delete non-existing key", t => {
  let dict = new OrderedDict();
  t.falsy(dict.delete(2));
});

/**
 * OrderedDict#get
 */

test("get", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);

  t.is(dict.get(2), 20);
});

test("get non-existing key", t => {
  let dict = new OrderedDict();
  t.is(dict.get(2), undefined);
});

/**
 * OrderedDict#has
 */

test("has", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);

  t.truthy(dict.has(2));
});

test("has non-existing key", t => {
  let dict = new OrderedDict();
  t.falsy(dict.has(2));
});

/**
 * OrderedDict#toStart
 */

test("toStart", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);
  dict.toStart(3);

  t.is(dict.toString(), "$ -> (3, 30) -> (1, 10) -> (2, 20) -> $");
});

test("toStart non-existing key", t => {
  let dict = new OrderedDict();
  t.falsy(dict.toStart(2));
});

/**
 * OrderedDict#toEnd
 */

test("toEnd", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);
  dict.toEnd(1);

  t.is(dict.toString(), "$ -> (2, 20) -> (3, 30) -> (1, 10) -> $");
});

test("toEnd non-existing key", t => {
  let dict = new OrderedDict();
  t.falsy(dict.toEnd(2));
});

/**
 * OrderedDict#shift
 */

test("shift", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);

  t.is(dict.shift(), 10);
  t.is(dict.toString(), "$ -> (2, 20) -> (3, 30) -> $");
});

test("shift empty dict", t => {
  let dict = new OrderedDict();
  t.is(dict.shift(), undefined);
});

/**
 * OrderedDict#pop
 */

test("pop", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);

  t.is(dict.pop(), 30);
  t.is(dict.toString(), "$ -> (1, 10) -> (2, 20) -> $");
});

test("pop empty dict", t => {
  let dict = new OrderedDict();
  t.is(dict.pop(), undefined);
});

/**
 * OrderedDict#clear
 */

test("clear", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);
  dict.clear();

  t.is(dict.toString(), "$ empty $");
});

/**
 * OrderedDict#keys
 */

test("keys", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);

  t.is(Array.from(dict.keys()).join(", "), "1, 2, 3");
});

test("keys on empty dict", t => {
  let dict = new OrderedDict();
  t.is(Array.from(dict.keys()).join(", "), "");
});

/**
 * OrderedDict#values
 */

test("values", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);

  t.is(Array.from(dict.values()).join(", "), "10, 20, 30");
});

/**
 * OrderedDict#entries
 */

test("entries", t => {
  let dict = new OrderedDict();
  dict.set(1, 10);
  dict.set(2, 20);
  dict.set(3, 30);

  t.is(Array.from(dict.entries()).join(", "), "1,10, 2,20, 3,30");
});

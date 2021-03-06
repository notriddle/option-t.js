# Changelog

## x.y.z

## 6.1.0

### Enhancement

- Enhancement for tree shaking via a bundler ([#177](https://github.com/saneyuki/option-t.js/pull/177)).
  - Add ES module syntax version to `es6/` directory.
  - You can use them with `option-t/es6/**`.
  - By this change, the output code size may be more smaller
    if you use a bundler which supports tree shaking like [webpack2](https://webpack.js.org/guides/tree-shaking/)
    or [rollup.js](https://github.com/rollup/rollup).


## 6.0.0

### Breaking Change

- Upgrade dependencies. ([#172](https://github.com/saneyuki/option-t.js/pull/172))
  - This includes upgrading TypeScript to 2.3.
- Drop support node v4. ([#173](https://github.com/saneyuki/option-t.js/pull/173))
- Upgrade our language baseline to ES5 ([#174](https://github.com/saneyuki/option-t.js/pull/174))
  - If you use this package for a product targeted to ES3 environment (e.g. ~IE8),
    You need to care about it.
- Rename: ([#176](https://github.com/saneyuki/option-t.js/pull/176))
  - `Maybe::isUndefinedOrNull()` -> `Maybe::isNullOrUndefined()`
  - `Maybe::isSomeActual()` -> `Maybe::isSomeValue()`


## 5.0.0

### Breaking Change

- By ([#169](https://github.com/saneyuki/option-t.js/pull/169)),
  - You can use `andThen()` function from `option-t/lib/Nullable` or `option-t/lib/Undefinable`.
  - We drop to support for `flatMap()` for `Nullable` or `Undefinable`.
    - It's too hard to undarstand that "flatMap" operation for `T | undefined` or `T | null`.

### Enhancement

- You can use `orElse()` function from `option-t/lib/Nullable` or `option-t/lib/Undefinable`. ([#170](https://github.com/saneyuki/option-t.js/pull/170))


## 4.1.0

### New Feature

#### Add utility functions for values which may be `null` or `undefined` ([#167](https://github.com/saneyuki/option-t.js/pull/167))

- This is just utility function for their "null value" in ECMA262 world. 
- __This is experimental feature__. Their names are not stable.
- You can use them by:
  - `const Nullable = require('option-t/lib/Nullable');` for `null`
  - `const Undefinable = require('option-t/lib/Undefinable');` for `undefined`
  - `const Maybe = require('option-t/lib/Maybe');` for `null` or `undefined`


## 4.0.0

### Breaking Change

- Remove `engines` field from package.json.  ([#163](https://github.com/saneyuki/option-t.js/pull/163))
- All distribution codes are in `lib/` now. ([#164](https://github.com/saneyuki/option-t.js/pull/164))
  - If you use `require('option-t/src/Result')`, please change to `require('option-t/lib/Result')`

### Enhancement

- Add `yarn.lock` for library developers ([#162](https://github.com/saneyuki/option-t.js/pull/162))


## 3.0.0

### Breaking Change

- Rewrite d.ts ([#157](https://github.com/saneyuki/option-t.js/pull/157))
  - By this change, you might have some failure to compile your code with this library.
    So we think this would be a breaking change.


## 2.1.1

### Bug fix

- Revert [#152](https://github.com/saneyuki/option-t.js/pull/152) by ([#155](https://github.com/saneyuki/option-t.js/issues/155)).


## 2.1.0

### Enhancement

- Use `never` type. ([#154](https://github.com/saneyuki/option-t.js/pull/154))
- Use [literal type](https://github.com/Microsoft/TypeScript/pull/9407). ([#152](https://github.com/saneyuki/option-t.js/pull/152))


## 2.0.2 (including 2.0.1)

### Bug fix

- Fix the bug which cannot pack files correctly. ([#150](https://github.com/saneyuki/option-t.js/pull/150))


## 2.0.0

### Breaking Change

- `this` type are specfied for callbacks ([#142](https://github.com/saneyuki/option-t.js/pull/142))
  - This change requires to use TypeScript 2.0 or highers.
- Drop to support `classic` module resolutions ([#145](https://github.com/saneyuki/option-t.js/pull/145))
  - Use `--moduleResolution node` or others.

### Internals

- Use TypeScript v2.0 ([#141](https://github.com/saneyuki/option-t.js/pull/141))


## 1.0.0

### Breaking Change (Possible)

- These would causes `TypeError` instread of `Error`. ([#132](https://github.com/saneyuki/option-t.js/pull/132))
  - `Option<T>.unwrap()`
  - `Option<T>.expect()`
  - `Result<T, E>.unwrap()`
  - `Result<T, E>.unwrapErr()`
  - `Result<T, E>.expect()`

### Internals

- Remove Node v5 from CI. ([#136](https://github.com/saneyuki/option-t.js/pull/136))


### Documentation

* Add links to pull request for CHANGELOG.md. ([#129](https://github.com/saneyuki/option-t.js/pull/129))
* Fix the sample code of casting from `Option<T>` to `Promise`. ([#130](https://github.com/saneyuki/option-t.js/pull/130))


## 0.18.3

### Documentation

* Fix the link to API documentations.([#128](https://github.com/saneyuki/option-t.js/pull/128))


## 0.18.2

### Documentation

* Add more descriptions about runtime nullability checking in README.md ([#127](https://github.com/saneyuki/option-t.js/pull/127))


## 0.18.1

### Documentation

* Add some semantics description to README.md ([#126](https://github.com/saneyuki/option-t.js/pull/126))


## 0.18.0

### Breaking Change

#### Remove `Option<T>.asPromise()` ([#125](https://github.com/saneyuki/option-t.js/pull/125))

In previous version (~v0.17), we provide `Option<T>.asPromise()` utility method casting from `Option<T>` to `Promise`.
Its methods always treats `None` as a rejected `Promise`.
But there are various cases which we would not like to cast to a Promise from an Optional type with single way,
there are various context to handle a `None` value.

Thus we don't provide a default way to cast to `Promise`. Please define a most suitable way to your project.
You can write a custom cast function or use `Option<T>.mapOrElse()`.

```typescript
// This functon treats `None` as a rejected `Promise`
function castToPromise1(option: Option<T>): Promise<T> {
  return option.mapOrElse(() => Promise.reject(), (v: T) => Promise.resolve(v));
}

// This function treats `None` as a `Promise` which is fulfilled with a tagged union object.
function castToPromise2(option: Option<T>): Promise<{ ok: boolean; value: T }> {
  const result = {
    ok: false,
    value: undefined,
  };

  return option.mapOrElse(() => {
    return Promise.resolve(result);
  }, (v: T) => {
    result.ok = true;
    result.value = v;
    return Promise.resolve(result);
  });
}
```


## 0.17.2

### Internals

- Rename internal types' naming in `Result.d.ts`. ([#122](https://github.com/saneyuki/option-t.js/pull/122))


## 0.17.1

### Internals

- Update ESLint to v2.3.0. ([#109](https://github.com/saneyuki/option-t.js/pull/109))
- Enable lint for `/test/` dir. ([#110](https://github.com/saneyuki/option-t.js/pull/110))
- Use `assert.strictEqual()` instead of `assert.ok()`. ([#112](https://github.com/saneyuki/option-t.js/pull/112))
- Split off `OptionT.d.ts` from '/option-t.es6.d.ts'. ([#115](https://github.com/saneyuki/option-t.js/pull/115))

### Polish

- Throw `TypeError` instead of `Error` if a callbacks for `Option<T>.andThen()` / `orElse()` returns
  non `Option<T>` type. ([#116](https://github.com/saneyuki/option-t.js/pull/116))

### New Feature

#### Introduce `Result<T, E>`

We introduce the new experimental feature `Result<T, E>` which is inspired by
Rust's [`std::result::Result<T, E>`](https://doc.rust-lang.org/std/result/enum.Result.html) by [#88][issue88], [#111][pr111].

See [`/src/Result.ts`](./src/Result.d.ts) for more details.

This feature is *not* exported by default now.
If you'd like to use it, let's try to import this:

##### CommonJS:

```javascript
const ResultMod = require('option-t/src/Result');
const Ok = ResultMod.Ok;
const Err = ResultMod.Err;
```

##### TypeScript (+ES6 module syntax)

```typescript
import {Result, Ok, Err, ResultBase} from 'option-t/src/Result';
```


[issue88]: https://github.com/saneyuki/option-t.js/issues/88
[pr111]: https://github.com/saneyuki/option-t.js/pull/111


#### `Option<T>.drop()` can take a custom destructor function

Now, `Option<T>.drop()` can take a custom destructor function by [#118](https://github.com/saneyuki/option-t.js/pull/118).
So you can pass a custom destructor function to dispose the inner value.

```javascript
const some = new Some(largeSensitiveObject);
some.drop((v) => v.dispose());
```


## 0.16.3

### Bug fix

- Fix the compile error of `option-t.d.ts`. ([PR106](https://github.com/saneyuki/option-t.js/pull/106))
  - This catches up [pr105](https://github.com/saneyuki/option-t.js/pull/105)

## 0.16.2

### Bug fix

- Revert [#97][pr97] to [fix the compile error on tsc nightly](https://github.com/saneyuki/option-t.js/issues/103)

[pr97]: https://github.com/saneyuki/option-t.js/pull/97


## 0.16.1

a missing version.


## 0.16.0

### Breaking Change

* Remove Support iojs. [#98][pr98]
  * Support only after NodeJS 4.2 LTS.
* `Option<T>` is just either `Some<T>` or `None<T>`. [#99][pr99]
  * The previous interface `Option<T>` was renamed to `OptionMethods<T>`, and marked it as a private.
    * This is just only for a defensive programming style.
    * If you get a new problem by this change, please file a new issue. We'll consider to republish it.

[pr98]: https://github.com/saneyuki/option-t.js/pull/98
[pr99]: https://github.com/saneyuki/option-t.js/pull/99


### Polish

* Define `Option<T>.isSome` and `OptionT.isNone` as a type guard function. [#97][pr97]
  * This causes the __breaking change__ which cannot compile `~typescript@1.7.x`.


### Internal

* Upgrade TypeScript compiler which our supports to `^1.8.0`. [#94][pr94], [#97][pr97]
* Upgrde ESLint to `^1.10.1`. [#95](https://github.com/saneyuki/option-t.js/pull/95)

[pr94]: https://github.com/saneyuki/option-t.js/pull/94
[pr97]: https://github.com/saneyuki/option-t.js/pull/97


## 0.15.0

* This version drops to support Node.js v0.10.
  * This version would work on Node.js v0.10
  * But we don't ensure to work on it in a future release.

### Internal

* Add Node.js v5 as a CI tested environment [#89](https://github.com/saneyuki/option-t.js/pull/89)
* Remove Node.js v0.10 from a CI tested environment [#90](https://github.com/saneyuki/option-t.js/pull/90)
  * This change does not have any effects to existed codes.

### Documentation

* Polish the documentation about casting to `Promise` [#91](https://github.com/saneyuki/option-t.js/pull/91)


## 0.14.2

### Documentation

* Update README.md's 'semantics' section. [#85](https://github.com/saneyuki/option-t.js/pull/85)


## 0.14.1

### Bug Fix

* Support TypeScript 1.6 stable's `--moduleResolution node` mode. [#83](https://github.com/saneyuki/option-t.js/pull/83)


## 0.14.0

### Breaking Change

* Change `OptionBase` type definition to [abstract class](https://github.com/Microsoft/TypeScript/issues/3578). ([#81][pr81])
  * We require __TypeScript 1.6__ to use this feature.

### Internal

* Upgrade TypeScript compiler which our supports to `^1.6.0-beta`. [#76][pr76]

[pr76]: https://github.com/saneyuki/option-t.js/pull/76
[pr81]: https://github.com/saneyuki/option-t.js/pull/81


## 0.13.0

### New Feature

* Expose `OptionBase` to TypeScript's type definition.
  * __NOTICE__:
    * In general purpose, __you must not use this object__.
    * You can only this object if you need to cooperate with some libralies
      like `React.PropTypes` which are use `instanceof` checking to work together with
      others in the pure JavaScript world.
      The typical case is [TSX (TypeScript JSX) syntax](https://github.com/Microsoft/TypeScript/wiki/JSX).
    * Our basic stance is that _you don't use this and need not it in almost case_.
  * See also [#77](https://github.com/saneyuki/option-t.js/pull/77)

### Internal

* Support Node.js v4. [#79](https://github.com/saneyuki/option-t.js/pull/79)


## 0.12.3

### Bug Fix

* Fix the bug whic is `SomeInstance instanceof None` will be `true`. ([#78](https://github.com/saneyuki/option-t.js/pull/78))


## 0.12.2

### Documentation

* Add API documentations to TypeScript's type definition.


## 0.12.1

### Documentation

* Fix to forget the bump up version in CHANGELOG.md.

## 0.12.0

### New Feature

* Support `typings` field in package.json for TypeScript.
  * See more details: https://github.com/Microsoft/TypeScript/pull/4352


### Breaking Change

* TypeScript's type definition only support ES6 target officially.
  * You may continue to use this package without make your code to ES6 target.
    See more details: [#72](https://github.com/saneyuki/option-t.js/pull/72)


## 0.11.0

### Breaking Change

* Remove `OptionT.OptionT`. ( [#67](https://github.com/saneyuki/option-t.js/pull/67) )
  * This was marked as deprecated in 0.10.x.


## 0.10.1

### Documentation

* Fix typos in changelog.


## 0.10.0

### New Feature

* Add `OptionT.OptionBase`.
  * This change also marks `OptionT.OptionT` as deprecated.
  * We recommend to use this new base object instead of `OptionT.OptionT`.
    See more details ( [#66](https://github.com/saneyuki/option-t.js/pull/66) ).


## 0.9.3

### Internal

* Add `keywords` section to package.json.


## 0.9.2

### New Feature

* Support 'typescript' in package.json for [tsd][tsd] & [dtsm][dtsm]. ([#62][PR62])
  * This does not affect this library's API model. Thus we release this as patch version.
  * Thanks [@gifnksm](https://github.com/gifnksm)!

[PR62]: https://github.com/saneyuki/option-t.js/pull/62
[tsd]: https://github.com/Definitelytyped/tsd
[dtsm]: https://github.com/vvakame/dtsm


## 0.9.1

### Bug Fix

* Fix the compiler error if we use tsc's '--noImplicitAny' flag (#58)


## 0.9.0

### New Feature
* Make `Option<T>.mapOr()` and `Option<T>.mapOrElse()` stable.
  * We accept current signitures of these APIs as stable.
    When Rust's upstream changes these APIs, we might follow them
    with bumping our major version.
  * Rust might change these API signitures. see: [rust-lang/rfcs#1025](https://github.com/rust-lang/rfcs/issues/1025).


## 0.8.0

### New Feature
* Add `Option<T>.asPromise()`.


## 0.7.1

### Bug Fix
* Fix `Uncaught TypeError: Illegal invocation` on browsers.


## 0.7.0

### New Feature
* Add `Option<T>.isNone`.
* Add `Option<T>.unwrapOr()`.
* Add `Option<T>.unwrapOrElse()`.
* Add `Option<T>.expect()`.
* Add some experimental APIs. These are unstable.
  * Add `Option<T>.mapOr()`.
  * Add `Option<T>.mapOrElse()`.


## 0.6.0

### Update Documentation
* JSDoc: Change `Option<T>` used as parameter/return value to non-nullable type.
  * This might cause some compile error if you use closure compiler's advanced optimization.
* JSDoc: Remove needless `@template` annotations.

## 0.5.5

### Update Documentation
* Don't preserve the needless license block when minifying.


## 0.5.4

### Update Documentation
* Fix JSDoc.
  * Add `@extends` annotation to `Some` & `None`.
  * Fix warning of closure compiler.

## 0.5.3

### Internal
* Use `OptionT` to check whether the object is `Option<T>`.


## 0.5.2

### Internal
* Share the same object as prototype between `OptionT.Some` and `OptionT.None`.


## 0.5.1

### Update Documentation
* Remove `@nosideeffect` annotation from `Option<T>.isSome`. It was a invalid annotation.


## 0.5.0

### Breaking Change
* `OptionType<T>` is obsolated. This API will be no longer supported.

## 0.4.0

### New Feature
* Add `Option<T>.and()`.
* Add `Option<T>.or()`.
* Add `Option<T>.orElse()`.
* Export the definition of `Option<T>.andThen()`.


### Update Documentation
* Fix JSDoc in OptionT.js


## 0.3.0

### New Feature

* Add new interfaces. These constructors make interfaces more clear and explicit.
  * `OptionT.Some()` constructor creates a `Some<T>` representation.
  * `OptionT.None()` constructor creates a `None` representation.
  * `OptionT.Option<T>` interface means `Option<T>`.
    * This can be used only on an environment having a interface in its type system (e.g. TypeScript).
    * If you'd like to check whether the object `option` is `Option<T>` or not
      in an environment like `React.PropTypes` which has no interface feature,
      you can use `option instanceof OptionT.OptionT` to check the object.
      But this way is not a tier-1 approach. We recommend to use a interface strongly.
      (Thus we don't export `OptionT` to the type definition for TypeScript).
* Add type definitions for TypeScript.


### Deprecations
* `OptionT.OptionType()` is now deprecated. This will be removed in future release.
  * Of cource, this constructor is simple api,
    but it don't handle `None` or `Some<T>` properly if we pass `undefined` value.
    In some case, this api cannot differentiate whether the `undefined` value means `None`
    or "the value returns `undefined` correctly". [See more derails](https://github.com/saneyuki/option-t.js/issues/17).


## 0.2.0

* __New Feature__
  * Add methods:
    * `unwrap()`
    * `map()`
    * `flatMap()`
    * `drop()`

## 0.1.5

* __Documentation__
  * Write more descriptions to README.md.


## 0.1.4

* __Documentation__
  * Fix JSDoc.


## 0.1.0

* Initial Release.

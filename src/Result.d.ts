/**
 * MIT License
 *
 * Copyright (c) 2016 Tetsuharu OHZEKI <saneyuki.snyk@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {Option, Some, None} from './Option';

type MapFn<T, U> = (v: T) => U;
type FlatmapOkFn<T, U, E> = (v: T) => Result<U, E>;
type FlatmapErrFn<T, E, F> = (e: E) => Result<T, F>;
type RecoveryFn<E, T> = (e: E) => T;

/**
 *  The Result/Either type interface whose APIs are inspired
 *  by Rust's `std::result::Result<T, E>`.
 */
export type Result<T, E> = Ok<T> | Err<E>;

interface ResultMethods<T, E> {
    /**
     *  Returns true if the result is `Ok`.
     */
    isOk(): this is Ok<T>;

    /**
     *  Returns true if the result is `Err`.
     */
    isErr(): this is Err<E>;

    /**
     *  Converts from `Result<T, E>` to `Option<T>`.
     *  If the self is `Ok`, returns `Some<T>`.
     *  Otherwise, returns `None<T>`.
     */
    ok(): Option<T>;

    /**
     *  Converts from `Result<T, E>` to `Option<E>`.
     *  If the self is `Err`, returns `Some<E>`.
     *  Otherwise, returns `None<E>`.
     */
    err(): Option<E>;

    /**
     *  Maps a `Result<T, E>` to `Result<U, E>` by applying a function `mapFn<T, U>`
     *  to an contained `Ok` value, leaving an `Err` value untouched.
     *
     *  This function can be used to compose the results of two functions.
     */
    map<U>(op: MapFn<T, U>): Result<U, E>;

    /**
     *  Maps a `Result<T, E>` to `Result<T, F>` by applying a function `mapFn<E, F>`
     *  to an contained `Err` value, leaving an `Ok` value untouched.
     *
     *  This function can be used to pass through a successful result while handling an error.
     */
    mapErr<F>(op: MapFn<E, F>): Result<T, F>;

    /**
     *  Returns `res` if the result is `Ok`, otherwise returns the `Err` value of self.
     */
    and<U>(res: Result<U, E>): Result<U, E>;

    /**
     *  Calls `op` if the result is `Ok`, otherwise returns the `Err` value of self.
     *  This function can be used for control flow based on result values.
     */
    andThen<U>(op: FlatmapOkFn<T, U, E>): Result<U, E>;

    /**
     *  Returns `res` if the result is `Err`, otherwise returns the `Ok` value of self.
     */
    or<F>(res: Result<T, F>): Result<T, F>;

    /**
     *  Calls `op` if the result is `Err`, otherwise returns the `Ok` value of self.
     *  This function can be used for control flow based on result values.
     */
    orElse<F>(op: FlatmapErrFn<T, E, F>): Result<T, F>;

    /**
     *  Return the inner `T` of a `Ok(T)`.
     *
     *  @throws {Error}
     *      Throws if the self is a `Err`.
     */
    unwrap(): T;

    /**
     *  Return the inner `E` of a `Err(E)`.
     *
     *  @throws {Error}
     *      Throws if the self is a `Ok`.
     */
    unwrapErr(): E;

    /**
     *  Unwraps a result, return the content of an `Ok`. Else it returns `optb`.
     */
    unwrapOr(optb: T): T;

    /**
     *  Unwraps a result, returns the content of an `Ok`.
     *  If the value is an `Err` then it calls `op` with its value.
     */
    unwrapOrElse(op: RecoveryFn<E, T>): T;

    /**
     *  Return the inner `T` of a `Ok(T)`.
     *
     *  @throws {Error}
     *      Throws the passed `message` if the self is a `Err`.
     */
    expect(message: string): T;

    /**
     *  The destructor method inspired by Rust's `Drop` trait.
     *  We don't define the object's behavior after calling this.
     *
     *  @param  destructor
     *      This would be called with the inner value if self is `Ok<T>`.
     *  @param  errDestructor
     *      This would be called with the inner value if self is `Err<E>`.
     */
    drop(destructor?: (v: T) => void, errDestructor?: (e: E) => void): void;
}

// XXX:
// This is only used for the instanceof-basis runtime checking. (e.g. `React.PropTypes.instanceOf()`)
// You MUST NOT use for other purpose.
export abstract class ResultBase {}

// XXX:
// This implementation is specialized to erase `Ok<T, E>`'s type parameter `E`.
// In almost (maybe all) case, we write `a: Result<T, E> = new Ok<T>(e)` explicitly,
// we don't use `Ok<T>` as a type annotation of a variable.
// And we don't write `(new Ok()).map().orElse()` or such code.
// We always use `Result<T, E>` and its methods, not `Ok<T>` or `Err<E>`' specialized ones.
export class Ok<T> extends ResultBase implements ResultMethods<T, any> {

    private _is_ok: boolean;
    private _v: T;
    private _e: any;

    constructor(v: T);

    isOk(): this is Ok<T>;
    isErr(): this is Err<any>;
    ok(): Option<T>;
    err(): Option<any>;
    map<U>(op: MapFn<T, U>): Result<U, any>;
    mapErr<F>(op: MapFn<any, F>): Result<T, F>;
    and<U>(res: Result<U, any>): Result<U, any>;
    andThen<U>(op: FlatmapOkFn<T, U, any>): Result<U, any>;
    or<F>(res: Result<T, F>): Result<T, F>;
    orElse<F>(op: FlatmapErrFn<T, any, F>): Result<T, F>;
    unwrap(): T;
    unwrapErr(): any;
    unwrapOr(optb: T): T;
    unwrapOrElse(op: RecoveryFn<any, T>): T;
    expect(message: string): T;
    drop(destructor?: (v: T) => void, errDestructor?: (e: any) => void): void;
}

// XXX:
// This class intend to represent the container of some error type `E`.
// So we don't define this as `Error`'s subclass
// or don't restrict type parameter `E`'s upper bound to `Error`.
//
// XXX:
// This implementation is specialized to erase `Err<T, E>`'s type parameter `T`.
// In almost (maybe all) case, we write `a: Result<T, E> = new Err<E>(e)` explicitly,
// we don't use `Err<E>` as a type annotation of a variable.
// And we don't write `(new Err()).map().orElse()` or such code.
// We always use `Result<T, E>` and its methods, not `Ok<T>` or `Err<E>`' specialized ones.
export class Err<E> extends ResultBase implements ResultMethods<any, E> {

    private _is_ok: boolean;
    private _v: any;
    private _e: E;

    constructor(e: E);

    isOk(): this is Ok<any>;
    isErr(): this is Err<E>;
    ok(): Option<any>;
    err(): Option<E>;
    map<U>(op: MapFn<any, U>): Result<U, E>;
    mapErr<F>(op: MapFn<E, F>): Result<any, F>;
    and<U>(res: Result<U, E>): Result<U, E>;
    andThen<U>(op: FlatmapOkFn<any, U, E>): Result<U, E>;
    or<F>(res: Result<any, F>): Result<any, F>;
    orElse<F>(op: FlatmapErrFn<any, E, F>): Result<any, F>;
    unwrap(): any;
    unwrapErr(): E;
    unwrapOr(optb: any): any;
    unwrapOrElse(op: RecoveryFn<E, any>): any;
    expect(message: string): any;
    drop(destructor?: (v: any) => void, errDestructor?: (e: E) => void): void;
}
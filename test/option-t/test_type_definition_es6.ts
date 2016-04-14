/*
 * @license MIT License
 *
 * Copyright (c) 2015 Tetsuharu OHZEKI <saneyuki.snyk@gmail.com>
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

// XXX:
// The type definitions for '--moduleResolution node' is a ES6 format,
// So it would test it by importing it simply.
import {Option, Some, None, OptionBase} from '../../src/Option';

// `Some<T>`
(function(){
    var option: Some<number> = new Some(1);
    var isSome: boolean = option.isSome;
    var isNone: boolean = option.isNone;
    var unwrap: number = option.unwrap();
    var unwrapOr: number = option.unwrapOr(10);
    var unwrapOrElse: number = option.unwrapOrElse((): number => 10);
    var expect: number = option.expect('barfoo');
    var map: Option<string> = option.map((val: number): string => String(val));
    var flatMap: Option<string> = option.flatMap((val: number): Option<string> => {
        return new Some( String(val) );
    });
    var mapOr: string = option.mapOr("bar", (val: number): string => String(val));
    var mapOrElse: string = option.mapOrElse((): string => { return String(10); },
                                             (v: number) => { return String(v); });
    var and: Option<string> = option.and(new Some<string>("bar"));
    var andThen: Option<string> = option.andThen((val: number): Option<string> => {
        return new None();
    });
    var or: Option<number> = option.or(new Some<number>(10));
    var orElse: Option<number> = option.orElse((): Option<number> => {
        return new Some<number>(2);
    });
    option.drop();
    option.drop((v: number) => {});

    if (option instanceof OptionBase) {
        const bar: any = null;
    }
})();

// `None<T>`
(function(){
    var option: Option<number> = new None();
    var isSome: boolean = option.isSome;
    var isNone: boolean = option.isNone;
    var unwrap: number = option.unwrap();
    var unwrapOr: number = option.unwrapOr(10);
    var unwrapOrElse: number = option.unwrapOrElse((): number => 10);
    var expect: number = option.expect('barfoo');
    var map: Option<string> = option.map((val: number): string => String(val));
    var flatMap: Option<string> = option.flatMap((val: number): Option<string> => {
        return new None();
    });
    var mapOr: string = option.mapOr("bar", (val: number): string => String(val));
    var mapOrElse: string = option.mapOrElse((): string => { return String(10); },
                                             (v: number) => { return String(v); });
    var and: Option<string> = option.and(new Some<string>("bar"));
    var andThen: Option<string> = option.andThen((val: number): Option<string> => {
        return new None();
    });
    var or: Option<number> = option.or(new Some<number>(10));
    var orElse: Option<number> = option.orElse((): Option<number> => {
        return new Some<number>(2);
    });
    option.drop();
    option.drop((v: number) => {});

    if (option instanceof OptionBase) {
        const bar: any = null;
    }
})();

// `Option<T>`
(function(){
    var option: Option<number> = new None();
    option = new Some(1);

    var option2: Option<string> = new Some('bar');
    option2 = new None();
})();

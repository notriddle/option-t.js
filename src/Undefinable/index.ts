export * from './Undefinable';
// XXX: `and()` operation is equivalent of `a && b` so we don't ship it by default set.
//export { andUndefinable as and} from './and';
export { andThenForUndefinable as andThen} from './andThen';
export { doOnUndefinable as do } from './do';
export { expectNotUndefined as expect } from './expect';
export { mapForUndefinable as map } from './map';
export { mapOrForUndefinable as mapOr } from './mapOr';
export { mapOrElseForUndefinable as mapOrElse } from './mapOrElse';
// XXX: `or()` operation is equivalent of `a || b` so we don't ship it by default set.
// export { orUndefinable as or} from './or';
export { orElseForUndefinable as orElse} from './orElse';
export { unwrapUndefinable as unwrap } from './unwrap';
export { unwrapOrFromUndefinable as unwrapOr } from './unwrapOr';
export { unwrapOrElseFromUndefinable as unwrapOrElse } from './unwrapOrElse';

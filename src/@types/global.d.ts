import { ComponentPublicInstance } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { Cypress } from 'local-cypress';
import 'pinia';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NonNullish = {}; // {} is banned as it stands for any non-nullish value, and not for any (empty) object. Adding this alias just for clarity, so eslint-disable has to be applied only here.

export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
type Cast<X, Y> = X extends Y ? X : Y;
type FromEntries<T> = T extends [infer Key, any][] ? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, any]>[1] } : { [key in string]: any };

export type FromEntriesWithReadOnly<T> = FromEntries<DeepWriteable<T>>;

declare global {
  interface ObjectConstructor {
    fromEntries<T>(obj: T): FromEntriesWithReadOnly<T>;
  }
}

type MountType = typeof shallowMount;
declare global {
  let mount: MountType;
  let shallowMount: MountType;
  let shallowMountView: MountType;

  interface Window {
    __app__: ComponentPublicInstance;
    Cypress: typeof Cypress;
    promiseSupport: boolean;
    initRequest: Promise<string | false>;
  }
}
export {};

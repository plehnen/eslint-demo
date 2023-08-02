import { FormItemRule } from 'element-plus/packages/form/src/form.type';

type FormRules<T, Except = never> = { [Property in keyof Omit<Required<T>, Except>]?: FormItemRule | FormItemRule[] | FormRules<T[Property]> };

declare global {
  interface Array<T> {
    includes<U>(searchElement: U, fromIndex?: number): U extends T ? boolean : false;
  }
}

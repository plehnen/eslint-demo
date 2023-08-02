# eslint-demo

After updating from version "5.62.0" I am getting a lot of false positive "@typescript-eslint/no-unused-vars" errors

See App.vue for an example.

```
export const XY: InjectionKey<Ref<boolean | ((arg: string) => boolean)>> = Symbol('XY'); // 'arg' is defined but never used              @typescript-eslint/no-unused-vars (still worked in version "5.62.0")

export type MyType = Record<
  string,
  {
    label?: (value: any) => string; // 'value' is defined but never used  @typescript-eslint/no-unused-vars (still worked in version "5.62.0")
  }
>;

export default defineComponent({
  props: {
    disabledDate: {
      type: Function as PropType<(date: string) => boolean>, // 'date' is defined but never used  @typescript-eslint/no-unused-vars (still worked in version "5.62.0")
      required: true,
    },
  },
});
```

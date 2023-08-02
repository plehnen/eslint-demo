<template>
  <h1>DEMO</h1>
  <p>
    After updating from version "5.62.0" I am getting a lot of false positive "@typescript-eslint/no-unused-vars" errors
  </p>
</template>

<script lang="ts">
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

  setup() {
    const test: MyType = {
      foo: { label: v => 'xy' + v },
    };
    console.log(XY);
    console.log(test);
  },
});
</script>

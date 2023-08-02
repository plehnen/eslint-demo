import { DefineComponent } from 'vue';

declare global {
  module '*.vue' {
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
    export default component;
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $style: { [key: string]: string };
  }
}

// export {};

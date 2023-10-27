# @antik-web/vue-import-federation

This library is targeting developers who use vite-module-federaion within Vue 3 typescript project. It is a facade for importing federated modules, but it prevents from killing your JS code when you try to import non-existent module. Also, this provides you complete typing (assuming the Vue team can fix [this issue](https://github.com/vuejs/language-tools/issues/3616)).

## Installation

**npm**:
```
npm i @antik-web/vue-import-federation
```

**pnpm**:
```
pnpm add @antik-web/vue-import-federation
```

## Importing

**ESM import**:
```
import { importFederation } from '@antik-web/vue-import-federation';
```

## Example code / Usage

In below examples, you can see how easily you can use the library to import federated component.

### Useful type info

If you want to have typing provided, it is important to declare type of the federated component you want to import. This can be done by creating `someComponent.d.ts` file in your typeRoots directory (defined by *compilerOptions.typeRoots* array in *tsconfig.json*) and obtaining it with alike code:

```ts
declare module 'appRemote/SomeComponent' {
    import type { DefineComponent } from 'vue';
    interface Props {
        someTypedProp: boolean;
    }
    const SomeComponent: DefineComponent<Props>;
    export default SomeComponent;
}
```

After that, you can import type of it easily like this:

```ts
import type SomeComponentType from 'appRemote/SomeComponent';
```

and provide it as generic parameter for *importFederation* function.

It is important that the module is of type `DefineComponent<SomePropInteface>` where the *SomePropInteface* is containing prop types you want to use for the component.

### Import federation function prototype

The function has 3 parameters:

1. lazy import() function for importing remote component

2. *beforeResolveCallback* which is **optional** function called whenever the component is successfully fetched from remote (but before it is shown in the template).

3. *errorCallback* which is **optional** function called whenever error happened during the module fetching. This callback will be provided with the exception that happened in the parameter. 


### Example

```html
<script setup lang="ts">
import { importFederation } from '@antik-web/vue-import-federation';
import type SomeComponentType from 'appRemote/SomeComponent';


const emit = defineEmits(['someEvent']);
const SomeComponent = importFederation<typeof SomeComponentType>(
    () => import('appRemote/SomeComponent'),
    () => {
        console.log('Do something right before the component is shown');
    },
    (e: Error) => {
        console.error(e);
        emit('someEvent');
    },
);
</script>

<template>
    <EventRoot :some-typed-prop="true" />
</template>
```

## Authors and acknowledgment
Jakub Frankovic - Web developer ANTIK Telecom | [Send Mail](mailto:web@antik.sk)
import {type AsyncComponentLoader, defineAsyncComponent} from 'vue';

export const importFederation = <ComponentType extends object>(importFn: () => Promise<object>, beforeResolveCallback?: () => void, errorCallback?: (e?: any) => void) => {
	const importFederatedModule = async (): ReturnType<AsyncComponentLoader<ComponentType>> => {
		try {
			const component = await importFn() as unknown as ReturnType<AsyncComponentLoader<ComponentType>>;
			if (beforeResolveCallback) {
				await beforeResolveCallback();
			}
			return component;
		} catch (e: any) {
			if (errorCallback) {
				await errorCallback(e);
			}

			return undefined as unknown as ReturnType<AsyncComponentLoader<ComponentType>>;
		}
	};

	return defineAsyncComponent(importFederatedModule);
};
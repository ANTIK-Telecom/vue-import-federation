import {type AsyncComponentLoader, defineAsyncComponent} from 'vue';

export const importFederation = <ComponentType extends object>(importFn: () => Promise<object>, errorCallback?: () => void) => {
	const importFederatedModule = async (): ReturnType<AsyncComponentLoader<ComponentType>> => {
		try {
			return await importFn() as unknown as ReturnType<AsyncComponentLoader<ComponentType>>;
		} catch {
			if (errorCallback) {
				errorCallback();
			}

			return undefined as unknown as ReturnType<AsyncComponentLoader<ComponentType>>;
		}
	};

	return defineAsyncComponent(importFederatedModule);
};
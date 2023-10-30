import { type AsyncComponentLoader, defineAsyncComponent } from 'vue';

export const importFederation = <ComponentType extends object>(
	importFn: () => Promise<object>,
	beforeFetchCallback?: () => void | Promise<any>,
	beforeMountCallback?: () => void | Promise<any>,
	errorCallback?: (e?: any) => void | Promise<any>) => {
	const importFederatedModule = async (): ReturnType<AsyncComponentLoader<ComponentType>> => {
		await beforeFetchCallback?.()
		try {
			const component = await importFn() as unknown as ReturnType<AsyncComponentLoader<ComponentType>>;
			await beforeMountCallback?.();
			return component;
		} catch (e: any) {
			await errorCallback?.(e)

			return undefined as unknown as ReturnType<AsyncComponentLoader<ComponentType>>;
		}
	};

	return defineAsyncComponent(importFederatedModule);
};
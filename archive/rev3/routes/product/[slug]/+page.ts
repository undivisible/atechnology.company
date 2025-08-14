import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const productData = await import(`../../../lib/data/products/${params.slug}.json`);

		return {
			product: productData.default
		};
	} catch (e) {
		throw error(404, 'Product not found');
	}
}

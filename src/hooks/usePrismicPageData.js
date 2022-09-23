import {useSinglePrismicDocument} from "@prismicio/react";

export const usePrismicPageData = (type) => {
	const [document] = useSinglePrismicDocument(type);

	return document ? document.data : undefined
}

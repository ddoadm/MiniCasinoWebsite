export interface Game {
	id: string;
	slug: string;
	title: string;
	tag: string;
	thumb: {
		title: string,
		url: string
	};
	providerName: string;
	startUrl: string;
}

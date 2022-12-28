import qs from 'qs';

export const fetchResult = async imageData => {
	const { url } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
	const headers = new Headers({
		'Content-Type': 'application/json',
	});

	const URL = `https://cors-anywhere.herokuapp.com/${url}`;
	const body = JSON.stringify({
		data: [imageData],
	});

	const result = await fetch(URL, { method: 'POST', headers, body });

	return result.json();
};

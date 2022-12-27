export const fetchResult = async imageData => {
	const headers = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
	});

	const URL = 'https://88f1654b-07d2-4c0a.gradio.live/run/predict';
	const body = JSON.stringify({
		data: [imageData],
	});

	const result = await fetch(URL, { method: 'POST', headers, body });

	return result.json();
};

export const fetchResult = async imageData => {
	const headers = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
	});

	const URL = 'https://4fbbb495b20a685c.gradio.app/run/predict';
	const body = JSON.stringify({
		data: [imageData],
	});

	const result = await fetch(URL, { method: 'POST', headers, body });

	return result.json();
};

export const fetchResult = async imageData => {
	const headers = new Headers({
		'Content-Type': 'application/json',
	});

	const URL = 'https://cors-anywhere.herokuapp.com/https://3c313f9d-bd0c-43f4.gradio.live/run/predict';
	const body = JSON.stringify({
		data: [imageData],
	});

	const result = await fetch(URL, { method: 'POST', headers, body });

	return result.json();
};

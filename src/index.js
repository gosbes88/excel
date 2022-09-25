import './scss/index.scss'

async function a () {
	const a = await Promise.resolve(2);
	console.info(a);
	return 12;
}

a();

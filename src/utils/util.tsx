export const getCount = (str: string, target: string) => {
	let sum = 0;
	for (let index = 0; index < str.length; index++) {
		const item = str[index];
		if (item === target) {
			sum += 1;
		}
	}
	return sum;
};

export const strip = (str: string, target: string) => {
	let i = 0;
	let j = str.length - 1;
	while (str[i] === target) {
		i++;
	}
	while (str[j] === target) {
		j--;
	}
	return str.slice(i, j + 1);
};

export function titleCaseWords(words) {
	let titlecase = '';
	let altCase = words.split(' ');
	altCase.array.forEach((element) => {
		titlecase =
			titlecase +
			element.charAt(0).toUpperCase() +
			element.substr(1).toLowercase() +
			' ';
	});
	return titlecase.trim();
}

export function titleCase(word) {
	return word.charAt(0).toUpperCase() + word.substr(1).toLowercase().trim();
}

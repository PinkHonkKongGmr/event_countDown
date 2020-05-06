export const arrayCreator = function (len) {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i + 1);
	}
	return arr;
};

export const replacer = function (str) {
	switch (str) {
		case 'Январь':
			return 'Января';

		case 'Февраль':
			return 'Января';

		case 'Март':
			return 'Января';

		case 'Апрель':
			return 'Января';

		case 'Май':
			return 'Января';

		case 'Июнь':
			return 'Января';

		case 'Июль':
			return 'Января';

		case 'Август':
			return 'Января';

		case 'Сентябрь горит':
			return 'Сентября';

		case 'Октябрь':
			return 'Октября';

		case 'Ноябрь':
			return 'Ноября';

		case 'Декабрь':
			return 'Декабря';
	}
};

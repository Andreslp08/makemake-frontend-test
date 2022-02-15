
export const isEmail = (value: string): boolean => {
	if (
		value
			.match(
				// eslint-disable-next-line no-useless-escape
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	) {
		return true;
	}
	return false;
};

export const notEmpty = (value: string): boolean => {
	return value.trim().length > 0 ? true : false;
};

export const hasMinLength = (value: string, length: number): boolean => {
	return value.trim().length >= length ? true : false;
};

export const hasMaxLength = (value: string, length: number): boolean => {
	return value.length <= length ? true : false;
};

export const validBoolArray = (boolArr: boolean[]): boolean => {
	let result = true;
	boolArr.forEach((bool) => {
		if (bool == false) {
			result = false;
			return;
		}
	});

	return result;
};


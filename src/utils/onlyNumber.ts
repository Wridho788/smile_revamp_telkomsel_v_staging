const onlyNumber = (value: string): boolean => {
	return /^\d*$/.test(value);
};

export default onlyNumber;

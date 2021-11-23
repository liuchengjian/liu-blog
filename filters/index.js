/**
 * 将字符串转 K为单位的字符
 * @param {Object} val
 */
export function hotNumber(val) {
	const num = parseInt(val);
	if (num < 1000) return val;
	val = val + '';
	return val.substring(0, val.length - 3) + 'k';
}

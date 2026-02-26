/* import ora from 'ora';
const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'magenta';
	spinner.text = 'Loading rainbows';
}, 1000);
 */

// 原理 \r 会将光标移动到行首 从而实现覆盖
console.log('aaaaaaaaaaaaaaaaaaaaaaaa\rccccc\rbbb');
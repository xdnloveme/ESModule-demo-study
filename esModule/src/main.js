import childModule from './childModule.js'

export default function test () {
	console.log('test import');
	childModule();
}
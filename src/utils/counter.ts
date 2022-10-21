export const counter = (() => {
	let i = 0

	function reset() {
		i = 0
		return i
	}

	function increment() {
		return i++
	}

	return {
		reset,
		increment,
	}
})()

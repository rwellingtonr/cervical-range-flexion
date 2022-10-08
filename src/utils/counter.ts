export const counter = (() => {
	let i = 0

	function reset() {
		return (i = 0)
	}

	function increment() {
		return i++
	}

	return {
		reset,
		increment,
	}
})()

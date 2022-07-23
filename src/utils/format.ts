export const capitalize = (str: string) => {
    const firstLetter = str.charAt(0).toUpperCase()
    const rest = str.slice(1)
    return firstLetter + rest
}

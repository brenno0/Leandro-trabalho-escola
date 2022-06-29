export const normalizer = (text: string) => {
    const formattedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    return formattedText
}
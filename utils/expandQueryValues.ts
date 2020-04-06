export const expandQueryValues = (
    rowCount: number,
    columnCount: number,
    startIndex = 1,
): string => {
    return Array(rowCount).fill(0)
        .map(() => `(${Array(columnCount).fill(0)
            .map(() => `$${startIndex++}`)
            .join(', ')})`)
        .join(', ');
};

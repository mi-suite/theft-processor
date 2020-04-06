export const flattenArray = (values: any[]): any[] => {
    return values.reduce((accumulator: any[], currentValue: any) => {
        if (Array.isArray(currentValue)) {
            accumulator.push(...currentValue);
        }

        return accumulator;
    }, []);
};

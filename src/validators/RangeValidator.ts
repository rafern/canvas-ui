export function MakeRangeValidator<V>(min: V, max: V): (value: V) => [boolean, V] {
    return (value: V): [boolean, V] => {
        if(value < min)
            return [false, value];

        if(value > max)
            return [false, value];

        return [true, value];
    };
}
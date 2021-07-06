export default function(number: number, roundUp = true): number {
    const roundFun = roundUp ? Math.ceil : Math.floor;
    return Math.pow(2, roundFun(Math.log2(number)));
}
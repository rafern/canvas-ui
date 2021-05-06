export default function(number: number, roundUp: boolean = true) {
    let roundFun = roundUp ? Math.ceil : Math.floor;
    return Math.pow(2, roundFun(Math.log2(number)));
}
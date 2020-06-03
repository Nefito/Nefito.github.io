export const sum = (x, y) => {

    if(typeof x === "number" && typeof y === "number" ) return x + y;
    return "Agruments should be type of Number!";
}

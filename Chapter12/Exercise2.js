function parse(expr, env = {}) {
    const tokens = expr.match(/\S+/g); 
    const operator = tokens[0];
    let result;
    function evaluate(token) {
        if (Number(token).toString() !== 'NaN') {
            return Number(token);
        } else {
            return env[token];
        }
    }
    if (operator === '+') {
        result = evaluate(tokens[1]) + evaluate(tokens[2]);
    } else if (operator === '-') {
        result = evaluate(tokens[1]) - evaluate(tokens[2]);
    } else if (operator === '*') {
        result = evaluate(tokens[1]) * evaluate(tokens[2]);
    } else if (operator === '/') {
        result = evaluate(tokens[1]) / evaluate(tokens[2]);
    } else if (operator === 'let') {
        const varName = tokens[1]; 
        const value = evaluate(tokens[2]);
        env[varName] = value;
        result = value;
    } else {
        throw new Error('Unknown operator: ' + operator);
    }
    return result;
}
let env = {};
console.log(parse("( + 2 3 )", env));
console.log(parse("( - 2 3 )", env));
console.log(parse("( * 2 3 )", env));
console.log(parse("( / 6 3 )", env));
console.log(parse("( let x 10 )", env));
console.log(parse("( + x 5 )", env));
function parse(expr) {
    const tokens = expr.split(' ');
    const operator = tokens[0];
    const operand1 = Number(tokens[1]);
    const operand2 = Number(tokens[2]);
    if (operator === '+') {
        return operand1 + operand2;
    } else if (operator === '-') {
        return operand1 - operand2;
    } else {
        throw new Error('Unknown operator: ' + operator);
    }
}
console.log(parse("(+ 2 3)"));
console.log(parse("(- 2 3)"));
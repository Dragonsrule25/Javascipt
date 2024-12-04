function parse(expr, env = {}) {
    const tokens = expr.match(/\S+/g);
    const operator = tokens[0]; 
    let result;
    function evaluate(token, localEnv) {
        if (Number(token).toString() !== 'NaN') {
            return Number(token);  
        } else if (localEnv[token] !== undefined) {
            return localEnv[token];  
        } else if (env[token] !== undefined) {
            return env[token];  
        } else {
            throw new Error('Unknown identifier: ' + token); 
        }
    }
    if (operator === '+') {
        result = evaluate(tokens[1], env) + evaluate(tokens[2], env);
    } else if (operator === '-') {
        result = evaluate(tokens[1], env) - evaluate(tokens[2], env);
    } else if (operator === '*') {
        result = evaluate(tokens[1], env) * evaluate(tokens[2], env);
    } else if (operator === '/') {
        result = evaluate(tokens[1], env) / evaluate(tokens[2], env);
    } else if (operator === 'let') {
        const varName = tokens[1];
        const value = evaluate(tokens[2], env);
        env[varName] = value; 
        result = value; 
    } else if (operator === 'define') {
        const funcName = tokens[1]; 
        const params = tokens[2]; 
        const body = tokens.slice(3).join(' '); 
        env[funcName] = function(...args) {
            const localEnv = Object.create(env);
            params.forEach((param, index) => {
                localEnv[param] = args[index]; 
            });
            return parse(body, localEnv); 
        };
        result = env[funcName]; 
    } else if (operator === 'if') {
        const condition = evaluate(tokens[1], env);
        if (condition) {
            result = parse(tokens[2], env); 
        } else {
            result = parse(tokens[3], env); 
        }
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
console.log(parse("( define square (x) ( * x x ) )", env));
console.log(parse("( square 4 )", env)); 
console.log(parse("( if ( > 2 3 ) ( + 5 5 ) ( - 5 5 ) )", env)); 
console.log(parse("( if ( > 3 2 ) ( + 5 5 ) ( - 5 5 ) )", env)); 
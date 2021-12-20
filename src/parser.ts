import { Token } from "./lexer"

// interface for parsing nodes
declare interface Node {
    type: string
    value: string | number
    expr?: Node[]
}

// This is the parse function that will take an array of tokens
// and return an AST (Abstract Syntax Tree)
export function Parser(token: Token[]){

    // We set current to 0 because we want to start from the first token
    let current = 0
    // peek function will help us to get the token of current index
    let peek = (): Token => token[current]
    // consume function will help us to consume the current token and increment the current index
    // so that the current index will point to the next token
    let consume = (): Token => token[current++]

    // this the the parseExpr function that will parse the expression based on the grammar
    let parseExpr = () : Node => {
        // if the current token's type is number then we will return a node with type number and value of the token
        if(peek().type === 'number'){
            return parseNumber()
        }
        // else if the current token's type is keyword then we will return a node with type keyword and value of the token
        // and expression will be an empty array
        return parseKeyword()
    }

    // this is the parseNumber function and it will simply return a node with type number and value of the token
    let parseNumber = (): Node => {
        return {
            type: 'number',
            value: consume().value
        }
    }


    // this is also a main function that will parse the keyword
    // a keyword might be add, mul, sub or div
    // so we will return a node with type keyword and value of the token
    // and expression will be an empty array
    let parseKeyword = () : Node => {
        // consume the current token and point current to the next token
        var token = consume()
        let node = {
            type: token.type,
            value: token.value,
            // right now expr is empty
            // let's see what happens later
            expr: <Node[]>[]
        }
        // now (while) will run until we reach the end of the token array
        // everything after a keywork will be an expression and will be added to the expression array
        while(peek()){
            // now we will call parseExpr for upcoming tokens
            node.expr.push(parseExpr())
        }

        // finally return the node
        return node
    }


    // calling the parseExpr function first to start the process
    // and get the root node
    return parseExpr()
}

var output = Parser([
    {
        type: 'keyword',
        value: 'add'
    },
    {
        type: 'number',
        value: 2
    },
    {
        type: 'number',
        value: 3
    },
    {
        type: 'keyword',
        value: 'mul'
    },
    {
        type: 'number',
        value: 4
    },
])

console.log(output)
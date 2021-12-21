// This is the interface for Tokens
// This contains the token type and the lexeme (the actual value)
// It can also contain the start index and the end index of the token
// But as it is a simple compiler, we don't need to store these values
export declare interface Token {
    type: string
    value: string | number
}

export function Lexer(input: string) {
    /*
    In our SimplestProgrammingLanguage, we are only going to work
    with keywords and numbers.
    For Example let's say that the input string is add 2 3

    add 2 3
    here
    add is an keyword
    2 is a number
    3 is a number

    Our task is to tokenize each valid lex and return an array of tokens
    so we are going to return an array of tokens
    [
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
        }
    ]
    
    Note - each valid lex is a token and invalid lexes are will throw an error
    this output will be used by the parser to build the AST
    Let's write the code to perform this task
     */

    // First I am going to saprate the input string into an array of strings
    // using the split method
    // As we can see that all the lex are separated by spaces
    // so we can use space as a parameter to split the string

    let lexes = input.split(' ')
    let tokens : Token[] = []

    // Let's create some helper functions to help us tokenize the lexes
    // These functions will be called by the for loop below
    // We will use the helper functions to tokenize the lexes

    function isNumber(lex: string) {
        return /^[0-9]+$/.test(lex)
    }

    function isValidKeyword(lex: string) {
        return /^(add|sub|mul|div)$/.test(lex)
    }
    
    // Now we are going to iterate over the array of lexes
    // and for each lex we are going to check if it is a valid lex
    // if it is a valid lex we are going to create a token and push it to the tokens array
    // if it is not a valid lex we are going to throw an error

    for (let lex of lexes) {
        if (isNumber(lex)) {
            tokens.push({
                type: 'number',
                // converting the lex (string) to a number
                value: +lex
            })
        } else {
            if(isValidKeyword(lex)){
                tokens.push({
                    type: 'keyword',
                    value: lex
                })
            }else{
                throw new Error(`Error: Invalid Token/Lex: "${lex}"`)
            }
        }
    }
    
    // Finally we are going to return the tokens array
    return tokens
}

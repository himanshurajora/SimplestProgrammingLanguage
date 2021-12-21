// Now Let's make a transpiler

// The ASTNode interface will be used in this phase just for typing purposes
import { ASTNode } from "./parser";

/*
    This is the transpiler also code generator in this case
    It will take an AST and return a string

    What will be the output of this transpiler?
    The output will be the compiled code that is what we wanted to get

    It will simply iterate over the AST and generate the code

    For example:
    Let's say that the AST is:
    {
        type: 'keyword',
        value: 'add',
        expr: [
            {
                type: 'number',
                value: 2
            },
            {
                type: 'number',
                value: 3
            }
        ]
    }
    
    The output will be:
    (2 + 3)
        
    Let's write the transpiler
*/

// This is the transpiler function
export function Transpiler(node: ASTNode) {

    // this function will return the operator for any given keyword
    const getOperator = (value: string) => {
        const keywordMap: any = {
            'add': '+',
            'sub': '-',
            'mul': '*',
            'div': '/'
        }
        return keywordMap[value]
    }
    // this function will transpile the node that contains a number
    const transpileNum = (node: ASTNode) => `${node.value}`
    // this function will transpile the node that contains a keyword
    const transpileExpression = (node: ASTNode): string => `(${(node.expr as []).map(transpileNode).join(' ' + getOperator(node.value.toString()) + ' ')})`
    // this is the main function that triggers the transpiler
    const transpileNode = (node: ASTNode) => node.type === 'number' ? transpileNum(node) : transpileExpression(node)
    return transpileNode(node)
}

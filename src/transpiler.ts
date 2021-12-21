// Now Let's make a transpiler

import { ASTNode } from "./parser";

export function Transpiler(node: ASTNode) {
    
    const getOperator = (value : string) => {
        const keywordMap : any = {
            'add': '+',
            'sub': '-',
            'mul': '*',
            'div': '/'
        } 
        return keywordMap[value]
    }
    const transpileNum = (node: ASTNode) => `${node.value}`
    const transpileExpression = (node: ASTNode) : string => `(${(node.expr as []).map(transpileNode).join(' ' + getOperator(node.value.toString()) + ' ')})`
    const transpileNode = (node: ASTNode) => node.type === 'number' ? transpileNum(node) : transpileExpression(node)
    return transpileNode(node)
}

const input = {
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

const result = Transpiler(input);
console.log(result);
"use strict";
const { Lexer } = require("./lexer");
const { Parser } = require("./parser");
const { Transpiler } = require("./transpiler");
// Lexer Tests
test('The Test of Lexing add 2 3', () => {
    expect(Lexer('add 2 3')).toEqual([
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
    ]);
});
test('The Test of Lexing sub 8 add 2 4 2', () => {
    expect(Lexer('sub 8 add 2 4 2')).toEqual([
        {
            type: 'keyword',
            value: 'sub'
        },
        {
            type: 'number',
            value: 8
        },
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
            value: 4
        },
        {
            type: 'number',
            value: 2
        }
    ]);
});

// Parser Tests
test('The test of parsing add 2 3', () => {
    expect(Parser(Lexer('add 2 3'))).toEqual({
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
    });
});
test('The test of parsing sub 8 add 2 4 2', () => {
    expect(Parser(Lexer('sub 8 add 2 4 2'))).toEqual({
        type: 'keyword',
        value: 'sub',
        expr: [
            {
                type: 'number',
                value: 8
            },
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
                        value: 4
                    },
                    {
                        type: 'number',
                        value: 2
                    }
                ]
            }
        ]
    });
});


// Transpiler Tests
test('The test of transpiling add 2 3', () => {
    expect(Transpiler({
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
    })).toEqual('(2 + 3)');
});

test('The test of transpiling sub 8 add 2 4 2', () => {
    expect(Transpiler({
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
            },
            {
                type: 'number',
                value: 4
            },
            {
                type: 'keyword',
                value: 'sub',
                expr: [
                    {
                        type: 'number',
                        value: 5
                    },
                    {
                        type: 'number',
                        value: 6
                    },
                    {
                        type: 'keyword',
                        value: 'mul',
                        expr: [
                            {
                                type: 'number',
                                value: 7
                            },
                            {
                                type: 'number',
                                value: 8
                            }
                        ]
                    }
                ]
            }
        ]
    })).toEqual('(2 + 3 + 4 + (5 - 6 - (7 * 8)))');
});

// Final Test
test('Full compilation of add 2 3 mul 5 5 sub 2 3 div 1 4', () => {
    expect(
        Transpiler(
            Parser(
                Lexer(
                    'add 2 3 mul 5 5 sub 2 3 div 1 4'
                )
            )
        )
    ).toEqual('(2 + 3 + (5 * 5 * (2 - 3 - (1 / 4))))');
});
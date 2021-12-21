import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Transpiler } from "./transpiler";

const input = process.argv[2];

const compile = () => {
    console.log(`The Input Is:  ${input}\n`);
    let output = ''
    console.time("Time Taken");
    try{
        output = Transpiler(Parser(Lexer(input)));
    }catch(e:any){
        console.log(e.message);
        output = e.message;
    }
    console.timeEnd("Time Taken");
    console.log('\n---------Output----------\n');
    console.log(output + "\n");
    console.log('---------------------------\n');
}

if(input) {
    if(process.argv[3]){
        console.log('Please Enter A Valid Input');
        console.log('The Format of input is pnpm compiler "<The input string in double quotes>"');
        console.log('Example: pnpm compiler "add 2 3"\n\n'); 
    } else {
        compile();
    }
}else{
    console.warn("Error: Please Enter An Input\n\n");
}


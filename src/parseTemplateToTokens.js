import Scanner from './Scanner';
import nestTokens from './nestTokens'

/**
 * 将模板字符串变为Tokens数组
 * @param {} templateStr 
 */
export default function (templateStr) {
    let tokens = [];
    let scanner = new Scanner(templateStr);
    let words;
    while (!scanner.eos()) {
        words = scanner.scanUntil('{{')
        if (words !== '') {
            // 去空格操作
            let _words = '';
            let isInJJH = false;
            for(let i = 0; i < words.length; i++){
                if(words[i] === '<'){
                    isInJJH = true;
                }else if(words[i] === '>'){
                    isInJJH = false;
                }

                if(words[i] !== ' '){
                    _words += words[i];
                }else{
                    if(isInJJH){
                        _words += ' ';
                    }
                }
            }
            tokens.push(['text', _words]);
        }

        scanner.scan('{{');
        words = scanner.scanUntil('}}')
        if (words !== '') {
            if (words[0] === '#') {
                tokens.push(['#', words.slice(1)])
            } else if (words[0] === '/') {
                tokens.push(['/', words.slice(1)])
            } else {
                tokens.push(['name', words]);
            }
        }
        scanner.scan('}}');
    }
    tokens = nestTokens(tokens);
    console.log(tokens)
    return tokens;
}
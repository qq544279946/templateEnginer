/**
 * 折叠tokens
 * @param {*} tokens 
 */
export default function (tokens) {
    // 结果数组
    let nestedTokens = [];
    // 搜集器
    let collector = nestedTokens;
    // 栈结构
    let sections = [];
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token[0]) {
            case '#':
                collector.push(token);
                sections.push(token);
                collector = token[2] = [];   
                break;
            case '/':
                sections.pop();
                collector = sections.length > 0? sections[sections.length - 1][2]: nestedTokens;
                break;
            default:
                collector.push(token);
                break;
        }
    }

    return nestedTokens;
}
/**
 * 函数的功能是让tokens数组变为dom字符串
 */

// 获取data对象中的值
function getValue(dataStr, data) {
    let value = data;
    if (dataStr.indexOf('.') !== -1) {
        let keys = dataStr.split('.');
        for (let i = 0; i < keys.length; i++) {
            value = value[keys[i]];
        }
        return value;
    }

    return data[dataStr];
}
export default function renderTemplate(tokens, data) {
    let resultStr = '';
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token[0] === 'text') {
            resultStr += token[1];
        } else if (token[0] === 'name') {
            if(token[1] === '.'){
                resultStr += data;
            }else{
                resultStr += getValue(token[1], data);
            }
            
        } else if (token[0] === '#') {
            let tem = getValue(token[1], data);
            for(let j = 0; j < tem.length; j++){
                let item = tem[j];
                resultStr += renderTemplate(token[2], item);
            }
        }
    }
    return resultStr;
}
/**
 * 扫描器
 */

export default class Scanner{
    constructor(templateStr){
        this.pos = 0;
        this.tail = templateStr;
        this.templateStr = templateStr;
    }

    // 走过指定内容，没有返回值
    scan(tag){
        if(this.tail.indexOf(tag) === 0){
            this.pos += tag.length;
            this.tail = this.templateStr.slice(this.pos);
        }
    }
    
    // 让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
    scanUntil(stopTag){
        let lastPos = this.pos;
        while(!this.eos() && this.tail.indexOf(stopTag) !== 0){
            this.pos++;
            this.tail = this.templateStr.slice(this.pos);
        }
        return this.templateStr.slice(lastPos, this.pos)
    }

    eos(){
        return this.pos >= this.templateStr.length
    }
}
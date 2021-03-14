import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'
window.TemplateEngine = {
    render(templateStr, data) {
        let tokens = parseTemplateToTokens(templateStr);
        let renderTem = renderTemplate(tokens, data);
        console.log(renderTem)
        return renderTem;
    }
}
/** A narrow sanitizer check with real lexical bindings, never string-based suppression. */
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
const traverse = (traverseModule.default ?? traverseModule);
export function sanitizedHtmlLines(content) {
    const sinks = new Map();
    const add = (line, safe) => { if (line)
        sinks.set(line, [...sinks.get(line) ?? [], safe]); };
    function trustedSanitizer(node, at) {
        if (node?.type !== 'CallExpression' || node.arguments.length !== 1 || node.callee.type !== 'MemberExpression' || node.callee.computed || node.callee.object.type !== 'Identifier' || node.callee.property.type !== 'Identifier' || node.callee.property.name !== 'sanitize')
            return false;
        const binding = at.scope.getBinding(node.callee.object.name);
        if (!binding?.constant || !binding.path.isImportDefaultSpecifier() && !binding.path.isImportNamespaceSpecifier())
            return false;
        if (!binding.path.parentPath.isImportDeclaration() || binding.path.parentPath.node.source.value !== 'dompurify')
            return false;
        return binding.referencePaths.every(ref => {
            const member = ref.parentPath, call = member?.parentPath;
            return member?.isMemberExpression() && !member.node.computed && member.node.property.type === 'Identifier' && member.node.property.name === 'sanitize' && call?.isCallExpression() && call.node.callee === member.node;
        });
    }
    try {
        const ast = parse(content, { sourceType: 'unambiguous', plugins: ['typescript', 'jsx'], allowReturnOutsideFunction: true });
        traverse(ast, {
            AssignmentExpression(at) {
                const left = at.node.left;
                if (left.type === 'MemberExpression' && !left.computed && left.property.type === 'Identifier' && left.property.name === 'innerHTML')
                    add(left.loc?.start.line, trustedSanitizer(at.node.right, at));
            },
            JSXAttribute(at) {
                if (at.node.name.type !== 'JSXIdentifier' || at.node.name.name !== 'dangerouslySetInnerHTML')
                    return;
                const expression = at.node.value?.type === 'JSXExpressionContainer' ? at.node.value.expression : undefined;
                const html = expression?.type === 'ObjectExpression' ? expression.properties.find(prop => prop.type === 'ObjectProperty' && !prop.computed && prop.key.type === 'Identifier' && prop.key.name === '__html') : undefined;
                add(at.node.loc?.start.line, html?.type === 'ObjectProperty' && trustedSanitizer(html.value, at));
            },
        });
    }
    catch {
        return new Set();
    }
    return new Set([...sinks].filter(([, safe]) => safe.length > 0 && safe.every(Boolean)).map(([line]) => line));
}

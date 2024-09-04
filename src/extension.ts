import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('curlyBracesFormatter.formatCurlyBraces', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const fullText = document.getText();

        const formattedText = formatCurlyBraces(fullText);

        editor.edit(editBuilder => {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(document.lineCount, 0);
            editBuilder.replace(new vscode.Range(start, end), formattedText);
        });
    });

    context.subscriptions.push(disposable);
}

function formatCurlyBraces(text: string): string {
    const regex = /(\bif\b|\belse if\b|\bfor\b|\bwhile\b|\bdo\b|\btry\b|\bcatch\b|\bfinally\b)(\s*\(.*?\)\s*)([^{;]*)([;|\n])|(\belse\b)(\s*)([^;{]*)([;|\n])/g;

    const wrapInBraces = (keyword: string, condition: string, statement: string, end: string) => {
        const trimmed_statement = statement.trim();
        return `${keyword}${condition} {\n    ${trimmed_statement}${end || ""}\n}`;
    };

    return text.replace(regex, (match, keyword, condition, statement, end, elseKeyword, _, elseStatement) => {
        const statementToUse = statement ? statement.trim() : (elseStatement ? elseStatement.trim() : "");

        // Handle 'do...while' loop separately
        if (keyword && keyword.trim() === 'do') {
            return `do {\n${statementToUse}${end || ""}\n} while ${condition.trim()}${end || ""}`;
        }

        // Handle 'else if' and 'if'
        if (keyword && (keyword.trim() === 'else if' || keyword.trim() === 'if')) {
            return wrapInBraces(keyword, condition, statementToUse, end);
        }

        // Handle 'else'
        if (elseKeyword && elseKeyword.trim() === 'else' && !elseStatement.startsWith('{')) {
            return `else {\n${statementToUse || 'undefined'}${end || ""}\n}`;
        }

        // Handle 'try', 'catch', 'finally'
        if (keyword && ['try', 'catch', 'finally'].includes(keyword.trim())) {
            return wrapInBraces(keyword, condition, statementToUse, end);
        }

        // General case
        return wrapInBraces(keyword, condition, statementToUse, end);
    });
}

export function deactivate() {}

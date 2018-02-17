import { Expression, SpreadElement, LVal, ArrayExpression, AssignmentExpression, BinaryExpression, DirectiveLiteral, Directive,
         Statement, BlockStatement, Identifier, BreakStatement, CallExpression, CatchClause, ConditionalExpression, ContinueStatement,
         DebuggerStatement, DoWhileStatement, EmptyStatement, ExpressionStatement, Program, VariableDeclaration, 
         ForInStatement, ForStatement, FunctionDeclaration, FunctionExpression, IfStatement, LabeledStatement,
         StringLiteral, NumericLiteral, NullLiteral, BooleanLiteral, RegExpLiteral, LogicalExpression,MemberExpression,
         Super, NewExpression, ModuleDeclaration, ObjectProperty, ObjectMethod, SpreadProperty, ObjectExpression,
         Decorator, TypeAnnotation, RestElement, ReturnStatement, SequenceExpression, SwitchCase, SwitchStatement,
         ThisExpression, ThrowStatement, TryStatement, UpdateExpression, VariableDeclarator, WhileStatement, AssignmentPattern,
         WithStatement, ArrayPattern, ArrowFunctionExpression, ClassMethod, ClassProperty, ClassBody, ClassDeclaration, ClassExpression,
         ExportAllDeclaration, ExportDefaultDeclaration, Declaration, ExportSpecifier, ForOfStatement, ExportNamedDeclaration,
         ImportSpecifier, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportDeclaration, MetaProperty,
         AssignmentProperty, RestProperty, ObjectPattern, TemplateElement, TemplateLiteral, TaggedTemplateExpression,
         YieldExpression, AnyTypeAnnotation, FlowTypeAnnotation, ArrayTypeAnnotation, BooleanLiteralTypeAnnotation,BooleanTypeAnnotation,
         NullLiteralTypeAnnotation, TypeParameterDeclaration, TypeParameterInstantiation, ClassImplements, InterfaceExtends,
         ObjectTypeAnnotation, DeclareClass, DeclareFunction, DeclareModule, DeclareTypeAlias, DeclareInterface, DeclareVariable, ExistentialTypeParam,
         FunctionTypeParam, GenericTypeAnnotation, InterfaceDeclaration, IntersectionTypeAnnotation, MixedTypeAnnotation, NullableTypeAnnotation,
         NumberTypeAnnotation, NumericLiteralTypeAnnotation, StringLiteralTypeAnnotation, StringTypeAnnotation, ThisTypeAnnotation,
         TupleTypeAnnotation, TypeCastExpression, TypeofTypeAnnotation, TypeAlias, Flow, TypeParameter, ObjectTypeProperty, ObjectTypeIndexer,ObjectTypeCallProperty,
         QualifiedTypeIdentifier, UnionTypeAnnotation, VoidTypeAnnotation, JSXIdentifier, JSXNamespacedName, JSXElement, JSXExpressionContainer, JSXAttribute,
         JSXClosingElement, JSXMemberExpression, JSXOpeningElement, JSXEmptyExpression, JSXText, JSXSpreadAttribute, ParenthesizedExpression, 
         AwaitExpression, Noop, BindExpression, DoExpression, ExportDefaultSpecifier, ExportNamespaceSpecifier, TSType, TSEntityName, TSTypeElement,
         UnaryExpression, FunctionTypeAnnotation, Binary, Scopable, BlockParent, Block, Terminatorless, CompletionStatement, Conditional,
         Loop, While, ExpressionWrapper, For, ForXStatement, FunctionParent, Pureish, Literal, Immutable, UserWhitespacable, Method, ObjectMember,
         Property, UnaryLike, Pattern, Class, ExportDeclaration, ModuleSpecifier, FlowBaseAnnotation, FlowDeclaration, JSX,
         
      } from 'babel-types';
import {transform, transformFromAst, transformFile,transformFileSync, traverse, template, PluginObj, BabelFileResult,
        TransformOptions, BabylonOptions} from 'babel-core';
import {TraverseOptions} from 'babel-traverse';

type UseTemplate = (nodes?: {[placeholder: string]: Node}) => Node;

interface TSAnyKeyword extends Node {
    type: "TSAnyKeyword";
}

interface TSArrayType extends Node {
    type: "TSArrayType";
    elementType: TSType;
}

interface TSAsExpression extends Node {
    type: "TSAsExpression";
    expression: Expression;
    typeAnnotation: TSType;
}

interface TSBooleanKeyword extends Node {
    type: "TSBooleanKeyword";
}

interface TSCallSignatureDeclaration extends Node {
    type: "TSCallSignatureDeclaration";
    typeParameters: TypeParameterDeclaration | null;
    parameters: Array<Identifier | RestElement> | null;
    typeAnnotation: TSTypeAnnotation | null;
}

interface TSConstructSignatureDeclaration extends Node {
    type: "TSConstructSignatureDeclaration";
    typeParameters: TypeParameterDeclaration | null;
    parameters: Array<Identifier | RestElement> | null;
    typeAnnotation: TSTypeAnnotation | null;
}

interface TSConstructorType extends Node {
    type: "TSConstructorType";
    typeParameters: TypeParameterDeclaration | null;
    typeAnnotation: TSTypeAnnotation | null;
    parameters: Array<Identifier | RestElement> | null;
}

interface TSDeclareFunction extends Node {
    type: "TSDeclareFunction";
    id: Identifier | null;
    typeParameters: TypeParameterDeclaration | Noop | null;
    params: LVal[];
    returnType: TypeAnnotation | TSTypeAnnotation | Noop | null;
    async: boolean;
    declare: boolean | null;
    generator: boolean;
}

interface TSDeclareMethod extends Node {
    type: "TSDeclareMethod";
    decorators: Decorator[] | null;
    key: Expression;
    typeParameters: TypeParameterDeclaration | Noop | null;
    params: LVal[];
    returnType: TypeAnnotation | TSTypeAnnotation | Noop | null;
    abstract: boolean | null;
    access: "public" | "private" | "protected" | null;
    accessibility: "public" | "private" | "protected" | null;
    async: boolean;
    computed: boolean;
    generator: boolean;
    kind: "get" | "set" | "method" | "constructor";
    optional: boolean | null;
    static: boolean | null;
}

interface TSEnumDeclaration extends Node {
    type: "TSEnumDeclaration";
    id: Identifier;
    members: TSEnumMember[];
    const: boolean | null;
    declare: boolean | null;
    initializer: Expression | null;
}

interface TSEnumMember extends Node {
    type: "TSEnumMember";
    id: Identifier | StringLiteral;
    initializer: Expression | null;
}

interface TSExportAssignment extends Node {
    type: "TSExportAssignment";
    expression: Expression;
}

interface TSExpressionWithTypeArguments extends Node {
    type: "TSExpressionWithTypeArguments";
    expression: TSEntityName;
    typeParameters: TypeParameterInstantiation | null;
}

interface TSExternalModuleReference extends Node {
    type: "TSExternalModuleReference";
    expression: StringLiteral;
}

interface TSFunctionType extends Node {
    type: "TSFunctionType";
    typeParameters: TypeParameterDeclaration | null;
    typeAnnotation: TSTypeAnnotation | null;
    parameters: Array<Identifier | RestElement> | null;
}

interface TSImportEqualsDeclaration extends Node {
    type: "TSImportEqualsDeclaration";
    id: Identifier;
    moduleReference: TSEntityName | TSExternalModuleReference;
    isExport: boolean | null;
}

interface TSIndexSignature extends Node {
    type: "TSIndexSignature";
    parameters: Identifier[];
    typeAnnotation: TSTypeAnnotation | null;
    readonly: boolean | null;
}

interface TSIndexedAccessType extends Node {
    type: "TSIndexedAccessType";
    objectType: TSType;
    indexType: TSType;
}

interface TSInterfaceBody extends Node {
    type: "TSInterfaceBody";
    body: TSTypeElement[];
}

interface TSInterfaceDeclaration extends Node {
    type: "TSInterfaceDeclaration";
    id: Identifier;
    typeParameters: TypeParameterDeclaration | null;
    extends: TSExpressionWithTypeArguments[] | null;
    body: TSInterfaceBody;
    declare: boolean | null;
}

interface TSIntersectionType extends Node {
    type: "TSIntersectionType";
    types: TSType[];
}

interface TSLiteralType extends Node {
    type: "TSLiteralType";
    literal: NumericLiteral | StringLiteral | BooleanLiteral;
}

interface TSMappedType extends Node {
    type: "TSMappedType";
    typeParameter: TypeParameter;
    typeAnnotation: TSType | null;
    optional: boolean | null;
    readonly: boolean | null;
}

interface TSMethodSignature extends Node {
    type: "TSMethodSignature";
    key: Expression;
    typeParameters: TypeParameterDeclaration | null;
    parameters: Array<Identifier | RestElement> | null;
    typeAnnotation: TSTypeAnnotation | null;
    computed: boolean | null;
    optional: boolean | null;
}

interface TSModuleBlock extends Node {
    type: "TSModuleBlock";
    body: Statement[];
}

interface TSModuleDeclaration extends Node {
    type: "TSModuleDeclaration";
    id: Identifier | StringLiteral;
    body: TSModuleBlock | TSModuleDeclaration;
    declare: boolean | null;
    global: boolean | null;
}

interface TSNamespaceExportDeclaration extends Node {
    type: "TSNamespaceExportDeclaration";
    id: Identifier;
}

interface TSNeverKeyword extends Node {
    type: "TSNeverKeyword";
}

interface TSNonNullExpression extends Node {
    type: "TSNonNullExpression";
    expression: Expression;
}

interface TSNullKeyword extends Node {
    type: "TSNullKeyword";
}

interface TSNumberKeyword extends Node {
    type: "TSNumberKeyword";
}

interface TSObjectKeyword extends Node {
    type: "TSObjectKeyword";
}

interface TSParameterProperty extends Node {
    type: "TSParameterProperty";
    parameter: Identifier | AssignmentPattern;
    accessibility: 'public' | 'private' | 'protected' | null;
    readonly: boolean | null;
}

interface TSParenthesizedType extends Node {
    type: "TSParenthesizedType";
    typeAnnotation: TSType;
}

interface TSPropertySignature extends Node {
    type: "TSPropertySignature";
    key: Expression;
    typeAnnotation: TSTypeAnnotation | null;
    initializer: Expression | null;
    computed: boolean | null;
    optional: boolean | null;
    readonly: boolean | null;
}

interface TSQualifiedName extends Node {
    type: "TSQualifiedName";
    left: TSEntityName;
    right: Identifier;
}

interface TSStringKeyword extends Node {
    type: "TSStringKeyword";
}

interface TSSymbolKeyword extends Node {
    type: "TSSymbolKeyword";
}

interface TSThisType extends Node {
    type: "TSThisType";
}

interface TSTupleType extends Node {
    type: "TSTupleType";
    elementTypes: TSType[];
}

interface TSTypeAliasDeclaration extends Node {
    type: "TSTypeAliasDeclaration";
    id: Identifier;
    typeParameters: TypeParameterDeclaration | null;
    typeAnnotation: TSType;
    declare: boolean | null;
}

interface TSTypeAnnotation extends Node {
    type: "TSTypeAnnotation";
    typeAnnotation: TSType;
}

interface TSTypeAssertion extends Node {
    type: "TSTypeAssertion";
    typeAnnotation: TSType;
    expression: Expression;
}

interface TSTypeLiteral extends Node {
    type: "TSTypeLiteral";
    members: TSTypeElement[];
}

interface TSTypeOperator extends Node {
    type: "TSTypeOperator";
    typeAnnotation: TSType;
    operator: string | null;
}

interface TSTypeParameter extends Node {
    type: "TSTypeParameter";
    constraint: TSType | null;
    default: TSType | null;
    name: string | null;
}

interface TSTypeParameterDeclaration extends Node {
    type: "TSTypeParameterDeclaration";
    params: TSTypeParameter[];
}

interface TSTypeParameterInstantiation extends Node {
    type: "TSTypeParameterInstantiation";
    params: TSType[];
}

interface TSTypePredicate extends Node {
    type: "TSTypePredicate";
    parameterName: Identifier | TSThisType;
    typeAnnotation: TSTypeAnnotation;
}

interface TSTypeQuery extends Node {
    type: "TSTypeQuery";
    exprName: TSEntityName;
}

interface TSTypeReference extends Node {
    type: "TSTypeReference";
    typeName: TSEntityName;
    typeParameters: TypeParameterInstantiation | null;
}

interface TSUndefinedKeyword extends Node {
    type: "TSUndefinedKeyword";
}

interface TSUnionType extends Node {
    type: "TSUnionType";
    types: TSType[];
}

interface TSVoidKeyword extends Node {
    type: "TSVoidKeyword";
}

// React specific
interface ReactHelpers {
    isCompatTag(tagName?: string): boolean;
    buildChildren(node: object): Node[];
}
declare const react: ReactHelpers;

export declare class Types {
   arrayExpression(elements?: Array<Expression | SpreadElement>): ArrayExpression;
   assignmentExpression(operator?: string, left?: LVal, right?: Expression): AssignmentExpression;
   binaryExpression(
      operator?: "+" | "-" | "/" | "%" | "*" | "**" | "&" | "|" | ">>" | ">>>" | "<<" | "^" | "==" | "===" | "!=" | "!==" | "in" | "instanceof" | ">" | "<" | ">=" | "<=",
      left?: Expression,
      right?: Expression
  ): BinaryExpression;
   directive(value?: DirectiveLiteral): Directive;
   directiveLiteral(value?: string): DirectiveLiteral;
   blockStatement(body?: Statement[], directives?: Directive[]): BlockStatement;
   breakStatement(label?: Identifier): BreakStatement;
   callExpression(callee?: Expression, _arguments?: Array<Expression | SpreadElement>): CallExpression;
   catchClause(param?: Identifier, body?: BlockStatement): CatchClause;
   conditionalExpression(test?: Expression, consequent?: Expression, alternate?: Expression): ConditionalExpression;
   continueStatement(label?: Identifier): ContinueStatement;
   debuggerStatement(): DebuggerStatement;
   doWhileStatement(test?: Expression, body?: Statement): DoWhileStatement;
   emptyStatement(): EmptyStatement;
   expressionStatement(expression?: Expression): ExpressionStatement;
   file(program?: Program, comments?: Comment[], tokens?: any[]): File;
   forInStatement(left?: VariableDeclaration | LVal, right?: Expression, body?: Statement): ForInStatement;
   forStatement(init?: VariableDeclaration | Expression, test?: Expression, update?: Expression, body?: Statement): ForStatement;
   functionDeclaration(id?: Identifier, params?: LVal[], body?: BlockStatement, generator?: boolean, async?: boolean): FunctionDeclaration;
   functionExpression(id?: Identifier, params?: LVal[], body?: BlockStatement, generator?: boolean, async?: boolean): FunctionExpression;
   identifier(name?: string): Identifier;
   ifStatement(test?: Expression, consequent?: Statement, alternate?: Statement): IfStatement;
   labeledStatement(label?: Identifier, body?: Statement): LabeledStatement;
   stringLiteral(value?: string): StringLiteral;
   numericLiteral(value?: number): NumericLiteral;
   nullLiteral(): NullLiteral;
   booleanLiteral(value?: boolean): BooleanLiteral;
   regExpLiteral(pattern?: string, flags?: string): RegExpLiteral;
   logicalExpression(operator?: "||" | "&&", left?: Expression, right?: Expression): LogicalExpression;
   memberExpression(object?: Expression | Super, property?: Expression, computed?: boolean): MemberExpression;
   newExpression(callee?: Expression | Super, _arguments?: Array<Expression | SpreadElement>): NewExpression;
   program(body?: Array<Statement | ModuleDeclaration>, directives?: Directive[]): Program;
   objectExpression(properties?: Array<ObjectProperty | ObjectMethod | SpreadProperty>): ObjectExpression;
   objectMethod(kind?: "get" | "set" | "method", key?: Expression, params?: LVal[], body?: BlockStatement, computed?: boolean): ObjectMethod;
   objectProperty(key?: Expression, value?: Expression, computed?: boolean, shorthand?: boolean, decorators?: Decorator[]): ObjectProperty;
   restElement(argument?: LVal, typeAnnotation?: TypeAnnotation): RestElement;
   returnStatement(argument?: Expression): ReturnStatement;
   sequenceExpression(expressions?: Expression[]): SequenceExpression;
   switchCase(test?: Expression, consequent?: Statement[]): SwitchCase;
   switchStatement(discriminant?: Expression, cases?: SwitchCase[]): SwitchStatement;
   thisExpression(): ThisExpression;
   throwStatement(argument?: Expression): ThrowStatement;
   tryStatement(block?: BlockStatement, handler?: CatchClause, finalizer?: BlockStatement): TryStatement;
   unaryExpression(operator?: "void" | "delete" | "!" | "+" | "-" | "++" | "--" | "~" | "typeof", argument?: Expression, prefix?: boolean): UnaryExpression;
   updateExpression(operator?: "++" | "--", argument?: Expression, prefix?: boolean): UpdateExpression;
   variableDeclaration(kind?: "var" | "let" | "const", declarations?: VariableDeclarator[]): VariableDeclaration;
   variableDeclarator(id?: LVal, init?: Expression): VariableDeclarator;
   whileStatement(test?: Expression, body?: BlockStatement | Statement): WhileStatement;
   withStatement(object?: Expression, body?: BlockStatement | Statement): WithStatement;
   assignmentPattern(left?: Identifier, right?: Expression): AssignmentPattern;
   arrayPattern(elements?: Expression[], typeAnnotation?: TypeAnnotation): ArrayPattern;
   arrowFunctionExpression(params?: LVal[], body?: BlockStatement | Expression, async?: boolean): ArrowFunctionExpression;
   classBody(body?: Array<ClassMethod | ClassProperty>): ClassBody;
   classDeclaration(id?: Identifier, superClass?: Expression, body?: ClassBody, decorators?: Decorator[]): ClassDeclaration;
   classExpression(id?: Identifier, superClass?: Expression, body?: ClassBody, decorators?: Decorator[]): ClassExpression;
   exportAllDeclaration(source?: StringLiteral): ExportAllDeclaration;
   exportDefaultDeclaration(declaration?: FunctionDeclaration | ClassDeclaration | Expression): ExportDefaultDeclaration;
   exportNamedDeclaration(declaration?: Declaration, specifiers?: ExportSpecifier[], source?: StringLiteral): ExportNamedDeclaration;
   exportSpecifier(local?: Identifier, exported?: Identifier): ExportSpecifier;
   forOfStatement(left?: VariableDeclaration | LVal, right?: Expression, body?: Statement): ForOfStatement;
   importDeclaration(specifiers?: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>, source?: StringLiteral): ImportDeclaration;
   importDefaultSpecifier(local?: Identifier): ImportDefaultSpecifier;
   importNamespaceSpecifier(local?: Identifier): ImportNamespaceSpecifier;
   importSpecifier(local?: Identifier, imported?: Identifier): ImportSpecifier;
   metaProperty(meta?: string, property?: string): MetaProperty;
   classMethod(kind?: "constructor" | "method" | "get" | "set", key?: Expression, params?: LVal[], body?: BlockStatement, computed?: boolean, _static?: boolean): ClassMethod;
   objectPattern(properties?: Array<AssignmentProperty | RestProperty>, typeAnnotation?: TypeAnnotation): ObjectPattern;
   spreadElement(argument?: Expression): SpreadElement;
   taggedTemplateExpression(tag?: Expression, quasi?: TemplateLiteral): TaggedTemplateExpression;
   templateElement(value?: { cooked?: string; raw?: string; }, tail?: boolean): TemplateElement;
   templateLiteral(quasis?: TemplateElement[], expressions?: Expression[]): TemplateLiteral;
   yieldExpression(argument?: Expression, delegate?: boolean): YieldExpression;
   anyTypeAnnotation(): AnyTypeAnnotation;
   arrayTypeAnnotation(elementType?: FlowTypeAnnotation): ArrayTypeAnnotation;
   booleanTypeAnnotation(): BooleanTypeAnnotation;
   booleanLiteralTypeAnnotation(): BooleanLiteralTypeAnnotation;
   nullLiteralTypeAnnotation(): NullLiteralTypeAnnotation;
   classImplements(id?: Identifier, typeParameters?: TypeParameterInstantiation): ClassImplements;
   classProperty(key?: Identifier, value?: Expression, typeAnnotation?: TypeAnnotation, decorators?: Decorator[]): ClassProperty;
   declareClass(id?: Identifier, typeParameters?: TypeParameterDeclaration, _extends?: InterfaceExtends[], body?: ObjectTypeAnnotation): DeclareClass;
   declareFunction(id?: Identifier): DeclareFunction;
   declareInterface(id?: Identifier, typeParameters?: TypeParameterDeclaration, _extends?: InterfaceExtends[], body?: ObjectTypeAnnotation): DeclareInterface;
   declareModule(id?: StringLiteral | Identifier, body?: BlockStatement): DeclareModule;
   declareTypeAlias(id?: Identifier, typeParameters?: TypeParameterDeclaration, right?: FlowTypeAnnotation): DeclareTypeAlias;
   declareVariable(id?: Identifier): DeclareVariable;
   existentialTypeParam(): ExistentialTypeParam;
   functionTypeAnnotation(typeParameters?: TypeParameterDeclaration, params?: FunctionTypeParam[], rest?: FunctionTypeParam, returnType?: FlowTypeAnnotation): FunctionTypeAnnotation;
   functionTypeParam(name?: Identifier, typeAnnotation?: FlowTypeAnnotation): FunctionTypeParam;
   genericTypeAnnotation(id?: Identifier, typeParameters?: TypeParameterInstantiation): GenericTypeAnnotation;
   interfaceExtends(id?: Identifier, typeParameters?: TypeParameterInstantiation): InterfaceExtends;
   interfaceDeclaration(id?: Identifier, typeParameters?: TypeParameterDeclaration, _extends?: InterfaceExtends[], body?: ObjectTypeAnnotation): InterfaceDeclaration;
   intersectionTypeAnnotation(types?: FlowTypeAnnotation[]): IntersectionTypeAnnotation;
   mixedTypeAnnotation(): MixedTypeAnnotation;
   nullableTypeAnnotation(typeAnnotation?: FlowTypeAnnotation): NullableTypeAnnotation;
   numericLiteralTypeAnnotation(): NumericLiteralTypeAnnotation;
   numberTypeAnnotation(): NumberTypeAnnotation;
   stringLiteralTypeAnnotation(): StringLiteralTypeAnnotation;
   stringTypeAnnotation(): StringTypeAnnotation;
   thisTypeAnnotation(): ThisTypeAnnotation;
   tupleTypeAnnotation(types?: FlowTypeAnnotation[]): TupleTypeAnnotation;
   typeofTypeAnnotation(argument?: FlowTypeAnnotation): TypeofTypeAnnotation;
   typeAlias(id?: Identifier, typeParameters?: TypeParameterDeclaration, right?: FlowTypeAnnotation): TypeAlias;
   typeAnnotation(typeAnnotation?: FlowTypeAnnotation): TypeAnnotation;
   typeCastExpression(expression?: Expression, typeAnnotation?: FlowTypeAnnotation): TypeCastExpression;
   typeParameter(bound?: TypeAnnotation, default_?: Flow): TypeParameter;
   typeParameterDeclaration(params?: Identifier[]): TypeParameterDeclaration;
   typeParameterInstantiation(params?: FlowTypeAnnotation[]): TypeParameterInstantiation;
   objectTypeAnnotation(properties?: ObjectTypeProperty[], indexers?: ObjectTypeIndexer[], callProperties?: ObjectTypeCallProperty[]): ObjectTypeAnnotation;
   objectTypeCallProperty(value?: FlowTypeAnnotation): ObjectTypeCallProperty;
   objectTypeIndexer(id?: Expression, key?: FlowTypeAnnotation, value?: FlowTypeAnnotation): ObjectTypeIndexer;
   objectTypeProperty(key?: Expression, value?: FlowTypeAnnotation): ObjectTypeProperty;
   qualifiedTypeIdentifier(id?: Identifier, qualification?: Identifier | QualifiedTypeIdentifier): QualifiedTypeIdentifier;
   unionTypeAnnotation(types?: FlowTypeAnnotation[]): UnionTypeAnnotation;
   voidTypeAnnotation(): VoidTypeAnnotation;
   jSXAttribute(name?: JSXIdentifier | JSXNamespacedName, value?: JSXElement | StringLiteral | JSXExpressionContainer): JSXAttribute;
   jSXClosingElement(name?: JSXIdentifier | JSXMemberExpression): JSXClosingElement;
   jSXElement(openingElement?: JSXOpeningElement, closingElement?: JSXClosingElement, children?: Array<JSXElement | JSXExpressionContainer | JSXText>, selfClosing?: boolean): JSXElement;
   jSXEmptyExpression(): JSXEmptyExpression;
   jSXExpressionContainer(expression?: Expression): JSXExpressionContainer;
   jSXIdentifier(name?: string): JSXIdentifier;
   jSXMemberExpression(object?: JSXMemberExpression | JSXIdentifier, property?: JSXIdentifier): JSXMemberExpression;
   jSXNamespacedName(namespace?: JSXIdentifier, name?: JSXIdentifier): JSXNamespacedName;
   jSXOpeningElement(name?: JSXIdentifier | JSXMemberExpression, attributes?: JSXAttribute[], selfClosing?: boolean): JSXOpeningElement;
   jSXSpreadAttribute(argument?: Expression): JSXSpreadAttribute;
   jSXText(value?: string): JSXText;
   noop(): Noop;
   parenthesizedExpression(expression?: Expression): ParenthesizedExpression;
   awaitExpression(argument?: Expression): AwaitExpression;
   bindExpression(object?: Expression, callee?: Expression): BindExpression;
   decorator(expression?: Expression): Decorator;
   doExpression(body?: BlockStatement): DoExpression;
   exportDefaultSpecifier(exported?: Identifier): ExportDefaultSpecifier;
   exportNamespaceSpecifier(exported?: Identifier): ExportNamespaceSpecifier;
   restProperty(argument?: LVal): RestProperty;
   spreadProperty(argument?: Expression): SpreadProperty;

   TSAnyKeyword(): TSAnyKeyword;
   TSArrayType(elementType: TSType): TSArrayType;
   TSAsExpression(expression: Expression, typeAnnotation: TSType): TSAsExpression;
   TSBooleanKeyword(): TSBooleanKeyword;
   TSCallSignatureDeclaration(typeParameters?: TypeParameterDeclaration, parameters?: Array<Identifier | RestElement>, typeAnnotation?: TSTypeAnnotation): TSCallSignatureDeclaration;
   TSConstructSignatureDeclaration(typeParameters?: TypeParameterDeclaration, parameters?: Array<Identifier | RestElement>, typeAnnotation?: TSTypeAnnotation): TSTypeElement;
   TSConstructorType(typeParameters?: TypeParameterDeclaration, typeAnnotation?: TSTypeAnnotation): TSConstructorType;
   TSDeclareFunction(
      id: Identifier | undefined | null,
      typeParameters: TypeParameterDeclaration | Noop | undefined | null,
      params: LVal[],
      returnType: TypeAnnotation | TSTypeAnnotation | Noop | undefined | null): TSDeclareFunction;
   TSDeclareMethod(
      decorators: Decorator[] | undefined | null,
      key: Expression,
      typeParameters: TypeParameterDeclaration | Noop | undefined | null,
      params: LVal[],
      returnType?: TypeAnnotation | TSTypeAnnotation | Noop): TSDeclareMethod;
   TSEnumDeclaration(id: Identifier, members: TSEnumMember[]): TSEnumDeclaration;
   TSEnumMember(id: Identifier | StringLiteral, initializer?: Expression): TSEnumMember;
   TSExportAssignment(expression: Expression): TSExportAssignment;
   TSExpressionWithTypeArguments(expression: TSEntityName, typeParameters?: TypeParameterInstantiation): TSExpressionWithTypeArguments;
   TSExternalModuleReference(expression: StringLiteral): TSExternalModuleReference;
   TSFunctionType(typeParameters?: TypeParameterDeclaration, typeAnnotation?: TSTypeAnnotation): TSFunctionType;
   TSImportEqualsDeclaration(id: Identifier, moduleReference: TSEntityName | TSExternalModuleReference): TSImportEqualsDeclaration;
   TSIndexSignature(parameters: Identifier[], typeAnnotation?: TSTypeAnnotation): TSIndexSignature;
   TSIndexedAccessType(objectType: TSType, indexType: TSType): TSIndexedAccessType;
   TSInterfaceBody(body: TSTypeElement[]): TSInterfaceBody;
   TSInterfaceDeclaration(
      id: Identifier,
      typeParameters: TypeParameterDeclaration | undefined | null,
      extends_: TSExpressionWithTypeArguments[] | undefined | null,
      body: TSInterfaceBody): TSInterfaceDeclaration;
   TSIntersectionType(types: TSType[]): TSIntersectionType;
   TSLiteralType(literal: NumericLiteral | StringLiteral | BooleanLiteral): TSLiteralType;
   TSMappedType(typeParameter: TypeParameter, typeAnnotation?: TSType): TSMappedType;
   TSMethodSignature(key: Expression, typeParameters?: TypeParameterDeclaration, parameters?: Array<Identifier | RestElement>, typeAnnotation?: TSTypeAnnotation): TSMethodSignature;
   TSModuleBlock(body: Statement[]): TSModuleBlock;
   TSModuleDeclaration(id: Identifier | StringLiteral, body: TSModuleBlock | TSModuleDeclaration): TSModuleDeclaration;
   TSNamespaceExportDeclaration(id: Identifier): TSNamespaceExportDeclaration;
   TSNeverKeyword(): TSNeverKeyword;
   TSNonNullExpression(expression: Expression): TSNonNullExpression;
   TSNullKeyword(): TSNullKeyword;
   TSNumberKeyword(): TSNumberKeyword;
   TSObjectKeyword(): TSObjectKeyword;
   TSParameterProperty(parameter: Identifier | AssignmentPattern): TSParameterProperty;
   TSParenthesizedType(typeAnnotation: TSType): TSParenthesizedType;
   TSPropertySignature(key: Expression, typeAnnotation?: TSTypeAnnotation, initializer?: Expression): TSPropertySignature;
   TSQualifiedName(left: TSEntityName, right: Identifier): TSQualifiedName;
   TSStringKeyword(): TSStringKeyword;
   TSSymbolKeyword(): TSSymbolKeyword;
   TSThisType(): TSThisType;
   TSTupleType(elementTypes: TSType[]): TSTupleType;
   TSTypeAliasDeclaration(id: Identifier, typeParameters: TypeParameterDeclaration | undefined | null, typeAnnotation: TSType): TSTypeAliasDeclaration;
   TSTypeAnnotation(typeAnnotation: TSType): TSTypeAnnotation;
   TSTypeAssertion(typeAnnotation: TSType, expression: Expression): TSTypeAssertion;
   TSTypeLiteral(members: TSTypeElement[]): TSTypeLiteral;
   TSTypeOperator(typeAnnotation: TSType): TSTypeOperator;
   TSTypeParameter(constraint?: TSType, default_?: TSType): TSTypeParameter;
   TSTypeParameterDeclaration(params: TSTypeParameter[]): TSTypeParameterDeclaration;
   TSTypeParameterInstantiation(params: TSType[]): TSTypeParameterInstantiation;
   TSTypePredicate(parameterName: Identifier | TSThisType, typeAnnotation: TSTypeAnnotation): TSTypePredicate;
   TSTypeQuery(exprName: TSEntityName): TSTypeQuery;
   TSTypeReference(typeName: TSEntityName, typeParameters?: TypeParameterInstantiation): TSTypeReference;
   TSUndefinedKeyword(): TSUndefinedKeyword;
   TSUnionType(types: TSType[]): TSUnionType;
   TSVoidKeyword(): TSVoidKeyword;

   isArrayExpression(node: object, opts?: object): node is ArrayExpression;
   isAssignmentExpression(node: object, opts?: object): node is AssignmentExpression;
   isBinaryExpression(node: object, opts?: object): node is BinaryExpression;
   isDirective(node: object, opts?: object): node is Directive;
   isDirectiveLiteral(node: object, opts?: object): node is DirectiveLiteral;
   isBlockStatement(node: object, opts?: object): node is BlockStatement;
   isBreakStatement(node: object, opts?: object): node is BreakStatement;
   isCallExpression(node: object, opts?: object): node is CallExpression;
   isCatchClause(node: object, opts?: object): node is CatchClause;
   isConditionalExpression(node: object, opts?: object): node is ConditionalExpression;
   isContinueStatement(node: object, opts?: object): node is ContinueStatement;
   isDebuggerStatement(node: object, opts?: object): node is DebuggerStatement;
   isDoWhileStatement(node: object, opts?: object): node is DoWhileStatement;
   isEmptyStatement(node: object, opts?: object): node is EmptyStatement;
   isExpressionStatement(node: object, opts?: object): node is ExpressionStatement;
   isFile(node: object, opts?: object): node is File;
   isForInStatement(node: object, opts?: object): node is ForInStatement;
   isForStatement(node: object, opts?: object): node is ForStatement;
   isFunctionDeclaration(node: object, opts?: object): node is FunctionDeclaration;
   isFunctionExpression(node: object, opts?: object): node is FunctionExpression;
   isIdentifier(node: object, opts?: object): node is Identifier;
   isIfStatement(node: object, opts?: object): node is IfStatement;
   isLabeledStatement(node: object, opts?: object): node is LabeledStatement;
   isStringLiteral(node: object, opts?: object): node is StringLiteral;
   isNumericLiteral(node: object, opts?: object): node is NumericLiteral;
   isNullLiteral(node: object, opts?: object): node is NullLiteral;
   isBooleanLiteral(node: object, opts?: object): node is BooleanLiteral;
   isRegExpLiteral(node: object, opts?: object): node is RegExpLiteral;
   isLogicalExpression(node: object, opts?: object): node is LogicalExpression;
   isMemberExpression(node: object, opts?: object): node is MemberExpression;
   isNewExpression(node: object, opts?: object): node is NewExpression;
   isProgram(node: object, opts?: object): node is Program;
   isObjectExpression(node: object, opts?: object): node is ObjectExpression;
   isObjectMethod(node: object, opts?: object): node is ObjectMethod;
   isObjectProperty(node: object, opts?: object): node is ObjectProperty;
   isRestElement(node: object, opts?: object): node is RestElement;
   isReturnStatement(node: object, opts?: object): node is ReturnStatement;
   isSequenceExpression(node: object, opts?: object): node is SequenceExpression;
   isSwitchCase(node: object, opts?: object): node is SwitchCase;
   isSwitchStatement(node: object, opts?: object): node is SwitchStatement;
   isThisExpression(node: object, opts?: object): node is ThisExpression;
   isThrowStatement(node: object, opts?: object): node is ThrowStatement;
   isTryStatement(node: object, opts?: object): node is TryStatement;
   isUnaryExpression(node: object, opts?: object): node is UnaryExpression;
   isUpdateExpression(node: object, opts?: object): node is UpdateExpression;
   isVariableDeclaration(node: object, opts?: object): node is VariableDeclaration;
   isVariableDeclarator(node: object, opts?: object): node is VariableDeclarator;
   isWhileStatement(node: object, opts?: object): node is WhileStatement;
   isWithStatement(node: object, opts?: object): node is WithStatement;
   isAssignmentPattern(node: object, opts?: object): node is AssignmentPattern;
   isArrayPattern(node: object, opts?: object): node is ArrayPattern;
   isArrowFunctionExpression(node: object, opts?: object): node is ArrowFunctionExpression;
   isClassBody(node: object, opts?: object): node is ClassBody;
   isClassDeclaration(node: object, opts?: object): node is ClassDeclaration;
   isClassExpression(node: object, opts?: object): node is ClassExpression;
   isExportAllDeclaration(node: object, opts?: object): node is ExportAllDeclaration;
   isExportDefaultDeclaration(node: object, opts?: object): node is ExportDefaultDeclaration;
   isExportNamedDeclaration(node: object, opts?: object): node is ExportNamedDeclaration;
   isExportSpecifier(node: object, opts?: object): node is ExportSpecifier;
   isForOfStatement(node: object, opts?: object): node is ForOfStatement;
   isImportDeclaration(node: object, opts?: object): node is ImportDeclaration;
   isImportDefaultSpecifier(node: object, opts?: object): node is ImportDefaultSpecifier;
   isImportNamespaceSpecifier(node: object, opts?: object): node is ImportNamespaceSpecifier;
   isImportSpecifier(node: object, opts?: object): node is ImportSpecifier;
   isMetaProperty(node: object, opts?: object): node is MetaProperty;
   isClassMethod(node: object, opts?: object): node is ClassMethod;
   isObjectPattern(node: object, opts?: object): node is ObjectPattern;
   isSpreadElement(node: object, opts?: object): node is SpreadElement;
   isSuper(node: object, opts?: object): node is Super;
   isTaggedTemplateExpression(node: object, opts?: object): node is TaggedTemplateExpression;
   isTemplateElement(node: object, opts?: object): node is TemplateElement;
   isTemplateLiteral(node: object, opts?: object): node is TemplateLiteral;
   isYieldExpression(node: object, opts?: object): node is YieldExpression;
   isAnyTypeAnnotation(node: object, opts?: object): node is AnyTypeAnnotation;
   isArrayTypeAnnotation(node: object, opts?: object): node is ArrayTypeAnnotation;
   isBooleanTypeAnnotation(node: object, opts?: object): node is BooleanTypeAnnotation;
   isBooleanLiteralTypeAnnotation(node: object, opts?: object): node is BooleanLiteralTypeAnnotation;
   isNullLiteralTypeAnnotation(node: object, opts?: object): node is NullLiteralTypeAnnotation;
   isClassImplements(node: object, opts?: object): node is ClassImplements;
   isClassProperty(node: object, opts?: object): node is ClassProperty;
   isDeclareClass(node: object, opts?: object): node is DeclareClass;
   isDeclareFunction(node: object, opts?: object): node is DeclareFunction;
   isDeclareInterface(node: object, opts?: object): node is DeclareInterface;
   isDeclareModule(node: object, opts?: object): node is DeclareModule;
   isDeclareTypeAlias(node: object, opts?: object): node is DeclareTypeAlias;
   isDeclareVariable(node: object, opts?: object): node is DeclareVariable;
   isExistentialTypeParam(node: object, opts?: object): node is ExistentialTypeParam;
   isFunctionTypeAnnotation(node: object, opts?: object): node is FunctionTypeAnnotation;
   isFunctionTypeParam(node: object, opts?: object): node is FunctionTypeParam;
   isGenericTypeAnnotation(node: object, opts?: object): node is GenericTypeAnnotation;
   isInterfaceExtends(node: object, opts?: object): node is InterfaceExtends;
   isInterfaceDeclaration(node: object, opts?: object): node is InterfaceDeclaration;
   isIntersectionTypeAnnotation(node: object, opts?: object): node is IntersectionTypeAnnotation;
   isMixedTypeAnnotation(node: object, opts?: object): node is MixedTypeAnnotation;
   isNullableTypeAnnotation(node: object, opts?: object): node is NullableTypeAnnotation;
   isNumericLiteralTypeAnnotation(node: object, opts?: object): node is NumericLiteralTypeAnnotation;
   isNumberTypeAnnotation(node: object, opts?: object): node is NumberTypeAnnotation;
   isStringLiteralTypeAnnotation(node: object, opts?: object): node is StringLiteralTypeAnnotation;
   isStringTypeAnnotation(node: object, opts?: object): node is StringTypeAnnotation;
   isThisTypeAnnotation(node: object, opts?: object): node is ThisTypeAnnotation;
   isTupleTypeAnnotation(node: object, opts?: object): node is TupleTypeAnnotation;
   isTypeofTypeAnnotation(node: object, opts?: object): node is TypeofTypeAnnotation;
   isTypeAlias(node: object, opts?: object): node is TypeAlias;
   isTypeAnnotation(node: object, opts?: object): node is TypeAnnotation;
   isTypeCastExpression(node: object, opts?: object): node is TypeCastExpression;
   isTypeParameter(node: object, opts?: object): node is TypeParameter;
   isTypeParameterDeclaration(node: object, opts?: object): node is TypeParameterDeclaration;
   isTypeParameterInstantiation(node: object, opts?: object): node is TypeParameterInstantiation;
   isObjectTypeAnnotation(node: object, opts?: object): node is ObjectTypeAnnotation;
   isObjectTypeCallProperty(node: object, opts?: object): node is ObjectTypeCallProperty;
   isObjectTypeIndexer(node: object, opts?: object): node is ObjectTypeIndexer;
   isObjectTypeProperty(node: object, opts?: object): node is ObjectTypeProperty;
   isQualifiedTypeIdentifier(node: object, opts?: object): node is QualifiedTypeIdentifier;
   isUnionTypeAnnotation(node: object, opts?: object): node is UnionTypeAnnotation;
   isVoidTypeAnnotation(node: object, opts?: object): node is VoidTypeAnnotation;
   isJSXAttribute(node: object, opts?: object): node is JSXAttribute;
   isJSXClosingElement(node: object, opts?: object): node is JSXClosingElement;
   isJSXElement(node: object, opts?: object): node is JSXElement;
   isJSXEmptyExpression(node: object, opts?: object): node is JSXEmptyExpression;
   isJSXExpressionContainer(node: object, opts?: object): node is JSXExpressionContainer;
   isJSXIdentifier(node: object, opts?: object): node is JSXIdentifier;
   isJSXMemberExpression(node: object, opts?: object): node is JSXMemberExpression;
   isJSXNamespacedName(node: object, opts?: object): node is JSXNamespacedName;
   isJSXOpeningElement(node: object, opts?: object): node is JSXOpeningElement;
   isJSXSpreadAttribute(node: object, opts?: object): node is JSXSpreadAttribute;
   isJSXText(node: object, opts?: object): node is JSXText;
   isNoop(node: object, opts?: object): node is Noop;
   isParenthesizedExpression(node: object, opts?: object): node is ParenthesizedExpression;
   isAwaitExpression(node: object, opts?: object): node is AwaitExpression;
   isBindExpression(node: object, opts?: object): node is BindExpression;
   isDecorator(node: object, opts?: object): node is Decorator;
   isDoExpression(node: object, opts?: object): node is DoExpression;
   isExportDefaultSpecifier(node: object, opts?: object): node is ExportDefaultSpecifier;
   isExportNamespaceSpecifier(node: object, opts?: object): node is ExportNamespaceSpecifier;
   isRestProperty(node: object, opts?: object): node is RestProperty;
   isSpreadProperty(node: object, opts?: object): node is SpreadProperty;
   isExpression(node: object, opts?: object): node is Expression;
   isBinary(node: object, opts?: object): node is Binary;
   isScopable(node: object, opts?: object): node is Scopable;
   isBlockParent(node: object, opts?: object): node is BlockParent;
   isBlock(node: object, opts?: object): node is Block;
   isStatement(node: object, opts?: object): node is Statement;
   isTerminatorless(node: object, opts?: object): node is Terminatorless;
   isCompletionStatement(node: object, opts?: object): node is CompletionStatement;
   isConditional(node: object, opts?: object): node is Conditional;
   isLoop(node: object, opts?: object): node is Loop;
   isWhile(node: object, opts?: object): node is While;
   isExpressionWrapper(node: object, opts?: object): node is ExpressionWrapper;
   isFor(node: object, opts?: object): node is For;
   isForXStatement(node: object, opts?: object): node is ForXStatement;
  // tslint:disable-next-line ban-types
   isFunction(node: object, opts?: object): node is Function;
   isFunctionParent(node: object, opts?: object): node is FunctionParent;
   isPureish(node: object, opts?: object): node is Pureish;
   isDeclaration(node: object, opts?: object): node is Declaration;
   isLVal(node: object, opts?: object): node is LVal;
   isLiteral(node: object, opts?: object): node is Literal;
   isImmutable(node: object, opts?: object): node is Immutable;
   isUserWhitespacable(node: object, opts?: object): node is UserWhitespacable;
   isMethod(node: object, opts?: object): node is Method;
   isObjectMember(node: object, opts?: object): node is ObjectMember;
   isProperty(node: object, opts?: object): node is Property;
   isUnaryLike(node: object, opts?: object): node is UnaryLike;
   isPattern(node: object, opts?: object): node is Pattern;
   isClass(node: object, opts?: object): node is Class;
   isModuleDeclaration(node: object, opts?: object): node is ModuleDeclaration;
   isExportDeclaration(node: object, opts?: object): node is ExportDeclaration;
   isModuleSpecifier(node: object, opts?: object): node is ModuleSpecifier;
   isFlow(node: object, opts?: object): node is Flow;
   isFlowBaseAnnotation(node: object, opts?: object): node is FlowBaseAnnotation;
   isFlowDeclaration(node: object, opts?: object): node is FlowDeclaration;
   isJSX(node: object, opts?: object): node is JSX;
   isNumberLiteral(node: object, opts?: object): node is NumericLiteral;
   isRegexLiteral(node: object, opts?: object): node is RegExpLiteral;

   isReferencedIdentifier(node: object, opts?: object): node is Identifier | JSXIdentifier;
   isReferencedMemberExpression(node: object, opts?: object): node is MemberExpression;
   isBindingIdentifier(node: object, opts?: object): node is Identifier;
   isScope(node: object, opts?: object): node is Scopable;
   isReferenced(node: object, opts?: object): boolean;
   isBlockScoped(node: object, opts?: object): node is FunctionDeclaration | ClassDeclaration | VariableDeclaration;
   isVar(node: object, opts?: object): node is VariableDeclaration;
   isUser(node: object, opts?: object): boolean;
   isGenerated(node: object, opts?: object): boolean;
   isPure(node: object, opts?: object): boolean;

   isTSAnyKeyword(node: object, opts?: object): node is TSAnyKeyword;
   isTSArrayType(node: object, opts?: object): node is TSArrayType;
   isTSAsExpression(node: object, opts?: object): node is TSAsExpression;
   isTSBooleanKeyword(node: object, opts?: object): node is TSBooleanKeyword;
   isTSCallSignatureDeclaration(node: object, opts?: object): node is TSCallSignatureDeclaration;
   isTSConstructSignatureDeclaration(node: object, opts?: object): node is TSTypeElement;
   isTSConstructorType(node: object, opts?: object): node is TSConstructorType;
   isTSDeclareFunction(node: object, opts?: object): node is TSDeclareFunction;
   isTSDeclareMethod(node: object, opts?: object): node is TSDeclareMethod;
   isTSEnumDeclaration(node: object, opts?: object): node is TSEnumDeclaration;
   isTSEnumMember(node: object, opts?: object): node is TSEnumMember;
   isTSExportAssignment(node: object, opts?: object): node is TSExportAssignment;
   isTSExpressionWithTypeArguments(node: object, opts?: object): node is TSExpressionWithTypeArguments;
   isTSExternalModuleReference(node: object, opts?: object): node is TSExternalModuleReference;
   isTSFunctionType(node: object, opts?: object): node is TSFunctionType;
   isTSImportEqualsDeclaration(node: object, opts?: object): node is TSImportEqualsDeclaration;
   isTSIndexSignature(node: object, opts?: object): node is TSIndexSignature;
   isTSIndexedAccessType(node: object, opts?: object): node is TSIndexedAccessType;
   isTSInterfaceBody(node: object, opts?: object): node is TSInterfaceBody;
   isTSInterfaceDeclaration(node: object, opts?: object): node is TSInterfaceDeclaration;
   isTSIntersectionType(node: object, opts?: object): node is TSIntersectionType;
   isTSLiteralType(node: object, opts?: object): node is TSLiteralType;
   isTSMappedType(node: object, opts?: object): node is TSMappedType;
   isTSMethodSignature(node: object, opts?: object): node is TSMethodSignature;
   isTSModuleBlock(node: object, opts?: object): node is TSModuleBlock;
   isTSModuleDeclaration(node: object, opts?: object): node is TSModuleDeclaration;
   isTSNamespaceExportDeclaration(node: object, opts?: object): node is TSNamespaceExportDeclaration;
   isTSNeverKeyword(node: object, opts?: object): node is TSNeverKeyword;
   isTSNonNullExpression(node: object, opts?: object): node is TSNonNullExpression;
   isTSNullKeyword(node: object, opts?: object): node is TSNullKeyword;
   isTSNumberKeyword(node: object, opts?: object): node is TSNumberKeyword;
   isTSObjectKeyword(node: object, opts?: object): node is TSObjectKeyword;
   isTSParameterProperty(node: object, opts?: object): node is TSParameterProperty;
   isTSParenthesizedType(node: object, opts?: object): node is TSParenthesizedType;
   isTSPropertySignature(node: object, opts?: object): node is TSPropertySignature;
   isTSQualifiedName(node: object, opts?: object): node is TSQualifiedName;
   isTSStringKeyword(node: object, opts?: object): node is TSStringKeyword;
   isTSSymbolKeyword(node: object, opts?: object): node is TSSymbolKeyword;
   isTSThisType(node: object, opts?: object): node is TSThisType;
   isTSTupleType(node: object, opts?: object): node is TSTupleType;
   isTSTypeAliasDeclaration(node: object, opts?: object): node is TSTypeAliasDeclaration;
   isTSTypeAnnotation(node: object, opts?: object): node is TSTypeAnnotation;
   isTSTypeAssertion(node: object, opts?: object): node is TSTypeAssertion;
   isTSTypeLiteral(node: object, opts?: object): node is TSTypeLiteral;
   isTSTypeOperator(node: object, opts?: object): node is TSTypeOperator;
   isTSTypeParameter(node: object, opts?: object): node is TSTypeParameter;
   isTSTypeParameterDeclaration(node: object, opts?: object): node is TSTypeParameterDeclaration;
   isTSTypeParameterInstantiation(node: object, opts?: object): node is TSTypeParameterInstantiation;
   isTSTypePredicate(node: object, opts?: object): node is TSTypePredicate;
   isTSTypeQuery(node: object, opts?: object): node is TSTypeQuery;
   isTSTypeReference(node: object, opts?: object): node is TSTypeReference;
   isTSUndefinedKeyword(node: object, opts?: object): node is TSUndefinedKeyword;
   isTSUnionType(node: object, opts?: object): node is TSUnionType;
   isTSVoidKeyword(node: object, opts?: object): node is TSVoidKeyword;
   // React
   assertArrayExpression(node: object, opts?: object): void;
   assertAssignmentExpression(node: object, opts?: object): void;
   assertBinaryExpression(node: object, opts?: object): void;
   assertDirective(node: object, opts?: object): void;
   assertDirectiveLiteral(node: object, opts?: object): void;
   assertBlockStatement(node: object, opts?: object): void;
   assertBreakStatement(node: object, opts?: object): void;
   assertCallExpression(node: object, opts?: object): void;
   assertCatchClause(node: object, opts?: object): void;
   assertConditionalExpression(node: object, opts?: object): void;
   assertContinueStatement(node: object, opts?: object): void;
   assertDebuggerStatement(node: object, opts?: object): void;
   assertDoWhileStatement(node: object, opts?: object): void;
   assertEmptyStatement(node: object, opts?: object): void;
   assertExpressionStatement(node: object, opts?: object): void;
   assertFile(node: object, opts?: object): void;
   assertForInStatement(node: object, opts?: object): void;
   assertForStatement(node: object, opts?: object): void;
   assertFunctionDeclaration(node: object, opts?: object): void;
   assertFunctionExpression(node: object, opts?: object): void;
   assertIdentifier(node: object, opts?: object): void;
   assertIfStatement(node: object, opts?: object): void;
   assertLabeledStatement(node: object, opts?: object): void;
   assertStringLiteral(node: object, opts?: object): void;
   assertNumericLiteral(node: object, opts?: object): void;
   assertNullLiteral(node: object, opts?: object): void;
   assertBooleanLiteral(node: object, opts?: object): void;
   assertRegExpLiteral(node: object, opts?: object): void;
   assertLogicalExpression(node: object, opts?: object): void;
   assertMemberExpression(node: object, opts?: object): void;
   assertNewExpression(node: object, opts?: object): void;
   assertProgram(node: object, opts?: object): void;
   assertObjectExpression(node: object, opts?: object): void;
   assertObjectMethod(node: object, opts?: object): void;
   assertObjectProperty(node: object, opts?: object): void;
   assertRestElement(node: object, opts?: object): void;
   assertReturnStatement(node: object, opts?: object): void;
   assertSequenceExpression(node: object, opts?: object): void;
   assertSwitchCase(node: object, opts?: object): void;
   assertSwitchStatement(node: object, opts?: object): void;
   assertThisExpression(node: object, opts?: object): void;
   assertThrowStatement(node: object, opts?: object): void;
   assertTryStatement(node: object, opts?: object): void;
   assertUnaryExpression(node: object, opts?: object): void;
   assertUpdateExpression(node: object, opts?: object): void;
   assertVariableDeclaration(node: object, opts?: object): void;
   assertVariableDeclarator(node: object, opts?: object): void;
   assertWhileStatement(node: object, opts?: object): void;
   assertWithStatement(node: object, opts?: object): void;
   assertAssignmentPattern(node: object, opts?: object): void;
   assertArrayPattern(node: object, opts?: object): void;
   assertArrowFunctionExpression(node: object, opts?: object): void;
   assertClassBody(node: object, opts?: object): void;
   assertClassDeclaration(node: object, opts?: object): void;
   assertClassExpression(node: object, opts?: object): void;
   assertExportAllDeclaration(node: object, opts?: object): void;
   assertExportDefaultDeclaration(node: object, opts?: object): void;
   assertExportNamedDeclaration(node: object, opts?: object): void;
   assertExportSpecifier(node: object, opts?: object): void;
   assertForOfStatement(node: object, opts?: object): void;
   assertImportDeclaration(node: object, opts?: object): void;
   assertImportDefaultSpecifier(node: object, opts?: object): void;
   assertImportNamespaceSpecifier(node: object, opts?: object): void;
   assertImportSpecifier(node: object, opts?: object): void;
   assertMetaProperty(node: object, opts?: object): void;
   assertClassMethod(node: object, opts?: object): void;
   assertObjectPattern(node: object, opts?: object): void;
   assertSpreadElement(node: object, opts?: object): void;
   assertSuper(node: object, opts?: object): void;
   assertTaggedTemplateExpression(node: object, opts?: object): void;
   assertTemplateElement(node: object, opts?: object): void;
   assertTemplateLiteral(node: object, opts?: object): void;
   assertYieldExpression(node: object, opts?: object): void;
   assertAnyTypeAnnotation(node: object, opts?: object): void;
   assertArrayTypeAnnotation(node: object, opts?: object): void;
   assertBooleanTypeAnnotation(node: object, opts?: object): void;
   assertBooleanLiteralTypeAnnotation(node: object, opts?: object): void;
   assertNullLiteralTypeAnnotation(node: object, opts?: object): void;
   assertClassImplements(node: object, opts?: object): void;
   assertClassProperty(node: object, opts?: object): void;
   assertDeclareClass(node: object, opts?: object): void;
   assertDeclareFunction(node: object, opts?: object): void;
   assertDeclareInterface(node: object, opts?: object): void;
   assertDeclareModule(node: object, opts?: object): void;
   assertDeclareTypeAlias(node: object, opts?: object): void;
   assertDeclareVariable(node: object, opts?: object): void;
   assertExistentialTypeParam(node: object, opts?: object): void;
   assertFunctionTypeAnnotation(node: object, opts?: object): void;
   assertFunctionTypeParam(node: object, opts?: object): void;
   assertGenericTypeAnnotation(node: object, opts?: object): void;
   assertInterfaceExtends(node: object, opts?: object): void;
   assertInterfaceDeclaration(node: object, opts?: object): void;
   assertIntersectionTypeAnnotation(node: object, opts?: object): void;
   assertMixedTypeAnnotation(node: object, opts?: object): void;
   assertNullableTypeAnnotation(node: object, opts?: object): void;
   assertNumericLiteralTypeAnnotation(node: object, opts?: object): void;
   assertNumberTypeAnnotation(node: object, opts?: object): void;
   assertStringLiteralTypeAnnotation(node: object, opts?: object): void;
   assertStringTypeAnnotation(node: object, opts?: object): void;
   assertThisTypeAnnotation(node: object, opts?: object): void;
   assertTupleTypeAnnotation(node: object, opts?: object): void;
   assertTypeofTypeAnnotation(node: object, opts?: object): void;
   assertTypeAlias(node: object, opts?: object): void;
   assertTypeAnnotation(node: object, opts?: object): void;
   assertTypeCastExpression(node: object, opts?: object): void;
   assertTypeParameter(node: object, opts?: object): void;
   assertTypeParameterDeclaration(node: object, opts?: object): void;
   assertTypeParameterInstantiation(node: object, opts?: object): void;
   assertObjectTypeAnnotation(node: object, opts?: object): void;
   assertObjectTypeCallProperty(node: object, opts?: object): void;
   assertObjectTypeIndexer(node: object, opts?: object): void;
   assertObjectTypeProperty(node: object, opts?: object): void;
   assertQualifiedTypeIdentifier(node: object, opts?: object): void;
   assertUnionTypeAnnotation(node: object, opts?: object): void;
   assertVoidTypeAnnotation(node: object, opts?: object): void;
   assertJSXAttribute(node: object, opts?: object): void;
   assertJSXClosingElement(node: object, opts?: object): void;
   assertJSXElement(node: object, opts?: object): void;
   assertJSXEmptyExpression(node: object, opts?: object): void;
   assertJSXExpressionContainer(node: object, opts?: object): void;
   assertJSXIdentifier(node: object, opts?: object): void;
   assertJSXMemberExpression(node: object, opts?: object): void;
   assertJSXNamespacedName(node: object, opts?: object): void;
   assertJSXOpeningElement(node: object, opts?: object): void;
   assertJSXSpreadAttribute(node: object, opts?: object): void;
   assertJSXText(node: object, opts?: object): void;
   assertNoop(node: object, opts?: object): void;
   assertParenthesizedExpression(node: object, opts?: object): void;
   assertAwaitExpression(node: object, opts?: object): void;
   assertBindExpression(node: object, opts?: object): void;
   assertDecorator(node: object, opts?: object): void;
   assertDoExpression(node: object, opts?: object): void;
   assertExportDefaultSpecifier(node: object, opts?: object): void;
   assertExportNamespaceSpecifier(node: object, opts?: object): void;
   assertRestProperty(node: object, opts?: object): void;
   assertSpreadProperty(node: object, opts?: object): void;
   assertExpression(node: object, opts?: object): void;
   assertBinary(node: object, opts?: object): void;
   assertScopable(node: object, opts?: object): void;
   assertBlockParent(node: object, opts?: object): void;
   assertBlock(node: object, opts?: object): void;
   assertStatement(node: object, opts?: object): void;
   assertTerminatorless(node: object, opts?: object): void;
   assertCompletionStatement(node: object, opts?: object): void;
   assertConditional(node: object, opts?: object): void;
   assertLoop(node: object, opts?: object): void;
   assertWhile(node: object, opts?: object): void;
   assertExpressionWrapper(node: object, opts?: object): void;
   assertFor(node: object, opts?: object): void;
   assertForXStatement(node: object, opts?: object): void;
   assertFunction(node: object, opts?: object): void;
   assertFunctionParent(node: object, opts?: object): void;
   assertPureish(node: object, opts?: object): void;
   assertDeclaration(node: object, opts?: object): void;
   assertLVal(node: object, opts?: object): void;
   assertLiteral(node: object, opts?: object): void;
   assertImmutable(node: object, opts?: object): void;
   assertUserWhitespacable(node: object, opts?: object): void;
   assertMethod(node: object, opts?: object): void;
   assertObjectMember(node: object, opts?: object): void;
   assertProperty(node: object, opts?: object): void;
   assertUnaryLike(node: object, opts?: object): void;
   assertPattern(node: object, opts?: object): void;
   assertClass(node: object, opts?: object): void;
   assertModuleDeclaration(node: object, opts?: object): void;
   assertExportDeclaration(node: object, opts?: object): void;
   assertModuleSpecifier(node: object, opts?: object): void;
   assertFlow(node: object, opts?: object): void;
   assertFlowBaseAnnotation(node: object, opts?: object): void;
   assertFlowDeclaration(node: object, opts?: object): void;
   assertJSX(node: object, opts?: object): void;
   assertNumberLiteral(node: object, opts?: object): void;
   assertRegexLiteral(node: object, opts?: object): void;

   assertTSAnyKeyword(node: object, opts?: object): void;
   assertTSArrayType(node: object, opts?: object): void;
   assertTSAsExpression(node: object, opts?: object): void;
   assertTSBooleanKeyword(node: object, opts?: object): void;
   assertTSCallSignatureDeclaration(node: object, opts?: object): void;
   assertTSConstructSignatureDeclaration(node: object, opts?: object): void;
   assertTSConstructorType(node: object, opts?: object): void;
   assertTSDeclareFunction(node: object, opts?: object): void;
   assertTSDeclareMethod(node: object, opts?: object): void;
   assertTSEnumDeclaration(node: object, opts?: object): void;
   assertTSEnumMember(node: object, opts?: object): void;
   assertTSExportAssignment(node: object, opts?: object): void;
   assertTSExpressionWithTypeArguments(node: object, opts?: object): void;
   assertTSExternalModuleReference(node: object, opts?: object): void;
   assertTSFunctionType(node: object, opts?: object): void;
   assertTSImportEqualsDeclaration(node: object, opts?: object): void;
   assertTSIndexSignature(node: object, opts?: object): void;
   assertTSIndexedAccessType(node: object, opts?: object): void;
   assertTSInterfaceBody(node: object, opts?: object): void;
   assertTSInterfaceDeclaration(node: object, opts?: object): void;
   assertTSIntersectionType(node: object, opts?: object): void;
   assertTSLiteralType(node: object, opts?: object): void;
   assertTSMappedType(node: object, opts?: object): void;
   assertTSMethodSignature(node: object, opts?: object): void;
   assertTSModuleBlock(node: object, opts?: object): void;
   assertTSModuleDeclaration(node: object, opts?: object): void;
   assertTSNamespaceExportDeclaration(node: object, opts?: object): void;
   assertTSNeverKeyword(node: object, opts?: object): void;
   assertTSNonNullExpression(node: object, opts?: object): void;
   assertTSNullKeyword(node: object, opts?: object): void;
   assertTSNumberKeyword(node: object, opts?: object): void;
   assertTSObjectKeyword(node: object, opts?: object): void;
   assertTSParameterProperty(node: object, opts?: object): void;
   assertTSParenthesizedType(node: object, opts?: object): void;
   assertTSPropertySignature(node: object, opts?: object): void;
   assertTSQualifiedName(node: object, opts?: object): void;
   assertTSStringKeyword(node: object, opts?: object): void;
   assertTSSymbolKeyword(node: object, opts?: object): void;
   assertTSThisType(node: object, opts?: object): void;
   assertTSTupleType(node: object, opts?: object): void;
   assertTSTypeAliasDeclaration(node: object, opts?: object): void;
   assertTSTypeAnnotation(node: object, opts?: object): void;
   assertTSTypeAssertion(node: object, opts?: object): void;
   assertTSTypeLiteral(node: object, opts?: object): void;
   assertTSTypeOperator(node: object, opts?: object): void;
   assertTSTypeParameter(node: object, opts?: object): void;
   assertTSTypeParameterDeclaration(node: object, opts?: object): void;
   assertTSTypeParameterInstantiation(node: object, opts?: object): void;
   assertTSTypePredicate(node: object, opts?: object): void;
   assertTSTypeQuery(node: object, opts?: object): void;
   assertTSTypeReference(node: object, opts?: object): void;
   assertTSUndefinedKeyword(node: object, opts?: object): void;
   assertTSUnionType(node: object, opts?: object): void;
   assertTSVoidKeyword(node: object, opts?: object): void;
}

export default class PluginArgs {
  types:Types;
  version: string;
  cache: any;
  env: any;
  getEnv: Function;
  loadOptions: Function;
  buildExternalHelpers: Function;
  resolvePlugin: Function;
  resolvePreset: Function;
  Plugin:PluginObj;
  transform(code: string, opts?: TransformOptions): BabelFileResult;
  transformFile(filename: string, opts: TransformOptions, callback: (err: any, result: BabelFileResult) => void): void;
  transformFileSync(filename: string, opts?: TransformOptions): BabelFileResult;
  transformFromAst(ast: Node, code?: string, opts?: TransformOptions): BabelFileResult;
  traverse(node: Node | Node[], opts?: TraverseOptions, state?: any): void;
  template(code: string, opts?: BabylonOptions): UseTemplate;
  DEFAULT_EXTENSIONS:any;
}

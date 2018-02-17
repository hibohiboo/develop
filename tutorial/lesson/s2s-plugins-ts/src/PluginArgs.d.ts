/* tslint:disable */
import {BabelFileResult, BabylonOptions, PluginObj,template, transform, transformFile, transformFileSync, transformFromAst,
        TransformOptions, traverse} from 'babel-core';
import { TraverseOptions } from 'babel-traverse';
import { AnyTypeAnnotation, ArrayExpression, ArrayPattern, ArrayTypeAnnotation, ArrowFunctionExpression, AssignmentExpression, AssignmentPattern, AssignmentProperty,
         AwaitExpression, Binary, BinaryExpression, BindExpression, Block, BlockParent, BlockStatement, BooleanLiteral,
         BooleanLiteralTypeAnnotation, BooleanTypeAnnotation, BreakStatement, CallExpression, CatchClause, Class,
         ClassBody, ClassDeclaration, ClassExpression, ClassImplements, ClassMethod, ClassProperty,
         CompletionStatement, Conditional, ConditionalExpression, ContinueStatement, DebuggerStatement, Declaration,DeclareClass,
         DeclareFunction, DeclareInterface, DeclareModule, DeclareTypeAlias, DeclareVariable, Decorator, Directive,
         DirectiveLiteral, DoExpression, DoWhileStatement, EmptyStatement, ExistentialTypeParam, ExportAllDeclaration, ExportDeclaration,
         ExportDefaultDeclaration, ExportDefaultSpecifier, ExportNamedDeclaration, ExportNamespaceSpecifier, ExportSpecifier, Expression, ExpressionStatement,
         ExpressionWrapper, Flow, FlowBaseAnnotation, FlowDeclaration, FlowTypeAnnotation, For, ForInStatement, ForOfStatement,
         ForStatement, ForXStatement, FunctionDeclaration, FunctionExpression, FunctionParent, FunctionTypeAnnotation,
         FunctionTypeParam, GenericTypeAnnotation, Identifier, IfStatement, Immutable,
         ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, InterfaceDeclaration, InterfaceExtends,
         IntersectionTypeAnnotation, JSX, JSXAttribute, JSXClosingElement, JSXElement,JSXEmptyExpression,
         JSXExpressionContainer, JSXIdentifier, JSXMemberExpression, JSXNamespacedName, JSXOpeningElement,
         JSXSpreadAttribute, JSXText, LabeledStatement, Literal, LogicalExpression, Loop, LVal, MemberExpression,
         MetaProperty, Method, MixedTypeAnnotation, ModuleDeclaration, ModuleSpecifier, NewExpression,
         Noop, NullableTypeAnnotation, NullLiteral, NullLiteralTypeAnnotation, NumberTypeAnnotation,
         NumericLiteral, NumericLiteralTypeAnnotation, ObjectExpression, ObjectMember, ObjectMethod, ObjectPattern, ObjectProperty, ObjectTypeAnnotation,ObjectTypeCallProperty,
         ObjectTypeIndexer, ObjectTypeProperty, ParenthesizedExpression, Pattern, Program, Property, Pureish, QualifiedTypeIdentifier,
         RegExpLiteral, RestElement, RestProperty, ReturnStatement, Scopable, SequenceExpression, SpreadElement,
         SpreadProperty, Statement, StringLiteral, StringLiteralTypeAnnotation, StringTypeAnnotation, Super, SwitchCase, SwitchStatement, TaggedTemplateExpression,
         TemplateElement, TemplateLiteral, Terminatorless, ThisExpression, ThisTypeAnnotation, ThrowStatement, TryStatement, TSEntityName, TSType,
         TSTypeElement, TupleTypeAnnotation, TypeAlias, TypeAnnotation, TypeCastExpression, TypeofTypeAnnotation, TypeParameter, TypeParameterDeclaration, TypeParameterInstantiation, UnaryExpression, UnaryLike, UnionTypeAnnotation,
         UpdateExpression, UserWhitespacable, VariableDeclaration, VariableDeclarator, VoidTypeAnnotation, While, WhileStatement, WithStatement, YieldExpression,

      } from 'babel-types';

type UseTemplate = (nodes?: {[placeholder: string]: Node}) => Node;

interface TSAnyKeyword extends Node {
  type: 'TSAnyKeyword';
}

interface TSArrayType extends Node {
  type: 'TSArrayType';
  elementType: TSType;
}

interface TSAsExpression extends Node {
  type: 'TSAsExpression';
  expression: Expression;
  typeAnnotation: TSType;
}

interface TSBooleanKeyword extends Node {
  type: 'TSBooleanKeyword';
}

interface TSCallSignatureDeclaration extends Node {
  type: 'TSCallSignatureDeclaration';
  typeParameters: TypeParameterDeclaration | null;
  parameters: Array<Identifier | RestElement> | null;
  typeAnnotation: TSTypeAnnotation | null;
}

interface TSConstructSignatureDeclaration extends Node {
  type: 'TSConstructSignatureDeclaration';
  typeParameters: TypeParameterDeclaration | null;
  parameters: Array<Identifier | RestElement> | null;
  typeAnnotation: TSTypeAnnotation | null;
}

interface TSConstructorType extends Node {
  type: 'TSConstructorType';
  typeParameters: TypeParameterDeclaration | null;
  typeAnnotation: TSTypeAnnotation | null;
  parameters: Array<Identifier | RestElement> | null;
}

interface TSDeclareFunction extends Node {
  type: 'TSDeclareFunction';
  id: Identifier | null;
  typeParameters: TypeParameterDeclaration | Noop | null;
  params: LVal[];
  returnType: TypeAnnotation | TSTypeAnnotation | Noop | null;
  async: boolean;
  declare: boolean | null;
  generator: boolean;
}

interface TSDeclareMethod extends Node {
  type: 'TSDeclareMethod';
  decorators: Decorator[] | null;
  key: Expression;
  typeParameters: TypeParameterDeclaration | Noop | null;
  params: LVal[];
  returnType: TypeAnnotation | TSTypeAnnotation | Noop | null;
  abstract: boolean | null;
  access: 'public' | 'private' | 'protected' | null;
  accessibility: 'public' | 'private' | 'protected' | null;
  async: boolean;
  computed: boolean;
  generator: boolean;
  kind: 'get' | 'set' | 'method' | 'constructor';
  optional: boolean | null;
  static: boolean | null;
}

interface TSEnumDeclaration extends Node {
  type: 'TSEnumDeclaration';
  id: Identifier;
  members: TSEnumMember[];
  const: boolean | null;
  declare: boolean | null;
  initializer: Expression | null;
}

interface TSEnumMember extends Node {
  type: 'TSEnumMember';
  id: Identifier | StringLiteral;
  initializer: Expression | null;
}

interface TSExportAssignment extends Node {
  type: 'TSExportAssignment';
  expression: Expression;
}

interface TSExpressionWithTypeArguments extends Node {
  type: 'TSExpressionWithTypeArguments';
  expression: TSEntityName;
  typeParameters: TypeParameterInstantiation | null;
}

interface TSExternalModuleReference extends Node {
  type: 'TSExternalModuleReference';
  expression: StringLiteral;
}

interface TSFunctionType extends Node {
  type: 'TSFunctionType';
  typeParameters: TypeParameterDeclaration | null;
  typeAnnotation: TSTypeAnnotation | null;
  parameters: Array<Identifier | RestElement> | null;
}

interface TSImportEqualsDeclaration extends Node {
  type: 'TSImportEqualsDeclaration';
  id: Identifier;
  moduleReference: TSEntityName | TSExternalModuleReference;
  isExport: boolean | null;
}

interface TSIndexSignature extends Node {
  type: 'TSIndexSignature';
  parameters: Identifier[];
  typeAnnotation: TSTypeAnnotation | null;
  readonly: boolean | null;
}

interface TSIndexedAccessType extends Node {
  type: 'TSIndexedAccessType';
  objectType: TSType;
  indexType: TSType;
}

interface TSInterfaceBody extends Node {
  type: 'TSInterfaceBody';
  body: TSTypeElement[];
}

interface TSInterfaceDeclaration extends Node {
  type: 'TSInterfaceDeclaration';
  id: Identifier;
  typeParameters: TypeParameterDeclaration | null;
  extends: TSExpressionWithTypeArguments[] | null;
  body: TSInterfaceBody;
  declare: boolean | null;
}

interface TSIntersectionType extends Node {
  type: 'TSIntersectionType';
  types: TSType[];
}

interface TSLiteralType extends Node {
  type: 'TSLiteralType';
  literal: NumericLiteral | StringLiteral | BooleanLiteral;
}

interface TSMappedType extends Node {
  type: 'TSMappedType';
  typeParameter: TypeParameter;
  typeAnnotation: TSType | null;
  optional: boolean | null;
  readonly: boolean | null;
}

interface TSMethodSignature extends Node {
  type: 'TSMethodSignature';
  key: Expression;
  typeParameters: TypeParameterDeclaration | null;
  parameters: Array<Identifier | RestElement> | null;
  typeAnnotation: TSTypeAnnotation | null;
  computed: boolean | null;
  optional: boolean | null;
}

interface TSModuleBlock extends Node {
  type: 'TSModuleBlock';
  body: Statement[];
}

interface TSModuleDeclaration extends Node {
  type: 'TSModuleDeclaration';
  id: Identifier | StringLiteral;
  body: TSModuleBlock | TSModuleDeclaration;
  declare: boolean | null;
  global: boolean | null;
}

interface TSNamespaceExportDeclaration extends Node {
  type: 'TSNamespaceExportDeclaration';
  id: Identifier;
}

interface TSNeverKeyword extends Node {
  type: 'TSNeverKeyword';
}

interface TSNonNullExpression extends Node {
  type: 'TSNonNullExpression';
  expression: Expression;
}

interface TSNullKeyword extends Node {
  type: 'TSNullKeyword';
}

interface TSNumberKeyword extends Node {
  type: 'TSNumberKeyword';
}

interface TSObjectKeyword extends Node {
  type: 'TSObjectKeyword';
}

interface TSParameterProperty extends Node {
  type: 'TSParameterProperty';
  parameter: Identifier | AssignmentPattern;
  accessibility: 'public' | 'private' | 'protected' | null;
  readonly: boolean | null;
}

interface TSParenthesizedType extends Node {
  type: 'TSParenthesizedType';
  typeAnnotation: TSType;
}

interface TSPropertySignature extends Node {
  type: 'TSPropertySignature';
  key: Expression;
  typeAnnotation: TSTypeAnnotation | null;
  initializer: Expression | null;
  computed: boolean | null;
  optional: boolean | null;
  readonly: boolean | null;
}

interface TSQualifiedName extends Node {
  type: 'TSQualifiedName';
  left: TSEntityName;
  right: Identifier;
}

interface TSStringKeyword extends Node {
  type: 'TSStringKeyword';
}

interface TSSymbolKeyword extends Node {
  type: 'TSSymbolKeyword';
}

interface TSThisType extends Node {
  type: 'TSThisType';
}

interface TSTupleType extends Node {
  type: 'TSTupleType';
  elementTypes: TSType[];
}

interface TSTypeAliasDeclaration extends Node {
  type: 'TSTypeAliasDeclaration';
  id: Identifier;
  typeParameters: TypeParameterDeclaration | null;
  typeAnnotation: TSType;
  declare: boolean | null;
}

interface TSTypeAnnotation extends Node {
  type: 'TSTypeAnnotation';
  typeAnnotation: TSType;
}

interface TSTypeAssertion extends Node {
  type: 'TSTypeAssertion';
  typeAnnotation: TSType;
  expression: Expression;
}

interface TSTypeLiteral extends Node {
  type: 'TSTypeLiteral';
  members: TSTypeElement[];
}

interface TSTypeOperator extends Node {
  type: 'TSTypeOperator';
  typeAnnotation: TSType;
  operator: string | null;
}

interface TSTypeParameter extends Node {
  type: 'TSTypeParameter';
  constraint: TSType | null;
  default: TSType | null;
  name: string | null;
}

interface TSTypeParameterDeclaration extends Node {
  type: 'TSTypeParameterDeclaration';
  params: TSTypeParameter[];
}

interface TSTypeParameterInstantiation extends Node {
  type: 'TSTypeParameterInstantiation';
  params: TSType[];
}

interface TSTypePredicate extends Node {
  type: 'TSTypePredicate';
  parameterName: Identifier | TSThisType;
  typeAnnotation: TSTypeAnnotation;
}

interface TSTypeQuery extends Node {
  type: 'TSTypeQuery';
  exprName: TSEntityName;
}

interface TSTypeReference extends Node {
  type: 'TSTypeReference';
  typeName: TSEntityName;
  typeParameters: TypeParameterInstantiation | null;
}

interface TSUndefinedKeyword extends Node {
  type: 'TSUndefinedKeyword';
}

interface TSUnionType extends Node {
  type: 'TSUnionType';
  types: TSType[];
}

interface TSVoidKeyword extends Node {
  type: 'TSVoidKeyword';
}

// React specific
interface ReactHelpers {
  isCompatTag(tagName?: string): boolean;
  buildChildren(node: object): Node[];
}
declare const react: ReactHelpers;

export declare class Types {
  public arrayExpression(elements?: Array<Expression | SpreadElement>): ArrayExpression;
  public assignmentExpression(operator?: string, left?: LVal, right?: Expression): AssignmentExpression;
  public binaryExpression(
      operator?: '+' | '-' | '/' | '%' | '*' | '**' | '&' | '|' | '>>' | '>>>' | '<<' | '^' | '==' | '===' | '!=' | '!==' | 'in' | 'instanceof' | '>' | '<' | '>=' | '<=',
      left?: Expression,
      right?: Expression,
  ): BinaryExpression;
  public directive(value?: DirectiveLiteral): Directive;
  public directiveLiteral(value?: string): DirectiveLiteral;
  public blockStatement(body?: Statement[], directives?: Directive[]): BlockStatement;
  public breakStatement(label?: Identifier): BreakStatement;
  public callExpression(callee?: Expression, _arguments?: Array<Expression | SpreadElement>): CallExpression;
  public catchClause(param?: Identifier, body?: BlockStatement): CatchClause;
  public conditionalExpression(test?: Expression, consequent?: Expression, alternate?: Expression): ConditionalExpression;
  public continueStatement(label?: Identifier): ContinueStatement;
  public debuggerStatement(): DebuggerStatement;
  public doWhileStatement(test?: Expression, body?: Statement): DoWhileStatement;
  public emptyStatement(): EmptyStatement;
  public expressionStatement(expression?: Expression): ExpressionStatement;
  public file(program?: Program, comments?: Comment[], tokens?: any[]): File;
  public forInStatement(left?: VariableDeclaration | LVal, right?: Expression, body?: Statement): ForInStatement;
  public forStatement(init?: VariableDeclaration | Expression, test?: Expression, update?: Expression, body?: Statement): ForStatement;
  public functionDeclaration(id?: Identifier, params?: LVal[], body?: BlockStatement, generator?: boolean, async?: boolean): FunctionDeclaration;
  public functionExpression(id?: Identifier, params?: LVal[], body?: BlockStatement, generator?: boolean, async?: boolean): FunctionExpression;
  public identifier(name?: string): Identifier;
  public ifStatement(test?: Expression, consequent?: Statement, alternate?: Statement): IfStatement;
  public labeledStatement(label?: Identifier, body?: Statement): LabeledStatement;
  public stringLiteral(value?: string): StringLiteral;
  public numericLiteral(value?: number): NumericLiteral;
  public nullLiteral(): NullLiteral;
  public booleanLiteral(value?: boolean): BooleanLiteral;
  public regExpLiteral(pattern?: string, flags?: string): RegExpLiteral;
  public logicalExpression(operator?: '||' | '&&', left?: Expression, right?: Expression): LogicalExpression;
  public memberExpression(object?: Expression | Super, property?: Expression, computed?: boolean): MemberExpression;
  public newExpression(callee?: Expression | Super, _arguments?: Array<Expression | SpreadElement>): NewExpression;
  public program(body?: Array<Statement | ModuleDeclaration>, directives?: Directive[]): Program;
  public objectExpression(properties?: Array<ObjectProperty | ObjectMethod | SpreadProperty>): ObjectExpression;
  public objectMethod(kind?: 'get' | 'set' | 'method', key?: Expression, params?: LVal[], body?: BlockStatement, computed?: boolean): ObjectMethod;
  public objectProperty(key?: Expression, value?: Expression, computed?: boolean, shorthand?: boolean, decorators?: Decorator[]): ObjectProperty;
  public restElement(argument?: LVal, typeAnnotation?: TypeAnnotation): RestElement;
  public returnStatement(argument?: Expression): ReturnStatement;
  public sequenceExpression(expressions?: Expression[]): SequenceExpression;
  public switchCase(test?: Expression, consequent?: Statement[]): SwitchCase;
  public switchStatement(discriminant?: Expression, cases?: SwitchCase[]): SwitchStatement;
  public thisExpression(): ThisExpression;
  public throwStatement(argument?: Expression): ThrowStatement;
  public tryStatement(block?: BlockStatement, handler?: CatchClause, finalizer?: BlockStatement): TryStatement;
  public unaryExpression(operator?: 'void' | 'delete' | '!' | '+' | '-' | '++' | '--' | '~' | 'typeof', argument?: Expression, prefix?: boolean): UnaryExpression;
  public updateExpression(operator?: '++' | '--', argument?: Expression, prefix?: boolean): UpdateExpression;
  public variableDeclaration(kind?: 'var' | 'let' | 'const', declarations?: VariableDeclarator[]): VariableDeclaration;
  public variableDeclarator(id?: LVal, init?: Expression): VariableDeclarator;
  public whileStatement(test?: Expression, body?: BlockStatement | Statement): WhileStatement;
  public withStatement(object?: Expression, body?: BlockStatement | Statement): WithStatement;
  public assignmentPattern(left?: Identifier, right?: Expression): AssignmentPattern;
  public arrayPattern(elements?: Expression[], typeAnnotation?: TypeAnnotation): ArrayPattern;
  public arrowFunctionExpression(params?: LVal[], body?: BlockStatement | Expression, async?: boolean): ArrowFunctionExpression;
  public classBody(body?: Array<ClassMethod | ClassProperty>): ClassBody;
  public classDeclaration(id?: Identifier, superClass?: Expression, body?: ClassBody, decorators?: Decorator[]): ClassDeclaration;
  public classExpression(id?: Identifier, superClass?: Expression, body?: ClassBody, decorators?: Decorator[]): ClassExpression;
  public exportAllDeclaration(source?: StringLiteral): ExportAllDeclaration;
  public exportDefaultDeclaration(declaration?: FunctionDeclaration | ClassDeclaration | Expression): ExportDefaultDeclaration;
  public exportNamedDeclaration(declaration?: Declaration, specifiers?: ExportSpecifier[], source?: StringLiteral): ExportNamedDeclaration;
  public exportSpecifier(local?: Identifier, exported?: Identifier): ExportSpecifier;
  public forOfStatement(left?: VariableDeclaration | LVal, right?: Expression, body?: Statement): ForOfStatement;
  public importDeclaration(specifiers?: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>, source?: StringLiteral): ImportDeclaration;
  public importDefaultSpecifier(local?: Identifier): ImportDefaultSpecifier;
  public importNamespaceSpecifier(local?: Identifier): ImportNamespaceSpecifier;
  public importSpecifier(local?: Identifier, imported?: Identifier): ImportSpecifier;
  public metaProperty(meta?: string, property?: string): MetaProperty;
  public classMethod(kind?: 'constructor' | 'method' | 'get' | 'set', key?: Expression, params?: LVal[], body?: BlockStatement, computed?: boolean, _static?: boolean): ClassMethod;
  public objectPattern(properties?: Array<AssignmentProperty | RestProperty>, typeAnnotation?: TypeAnnotation): ObjectPattern;
  public spreadElement(argument?: Expression): SpreadElement;
  public taggedTemplateExpression(tag?: Expression, quasi?: TemplateLiteral): TaggedTemplateExpression;
  public templateElement(value?: { cooked?: string; raw?: string; }, tail?: boolean): TemplateElement;
  public templateLiteral(quasis?: TemplateElement[], expressions?: Expression[]): TemplateLiteral;
  public yieldExpression(argument?: Expression, delegate?: boolean): YieldExpression;
  public anyTypeAnnotation(): AnyTypeAnnotation;
  public arrayTypeAnnotation(elementType?: FlowTypeAnnotation): ArrayTypeAnnotation;
  public booleanTypeAnnotation(): BooleanTypeAnnotation;
  public booleanLiteralTypeAnnotation(): BooleanLiteralTypeAnnotation;
  public nullLiteralTypeAnnotation(): NullLiteralTypeAnnotation;
  public classImplements(id?: Identifier, typeParameters?: TypeParameterInstantiation): ClassImplements;
  public classProperty(key?: Identifier, value?: Expression, typeAnnotation?: TypeAnnotation, decorators?: Decorator[]): ClassProperty;
  public declareClass(id?: Identifier, typeParameters?: TypeParameterDeclaration, _extends?: InterfaceExtends[], body?: ObjectTypeAnnotation): DeclareClass;
  public declareFunction(id?: Identifier): DeclareFunction;
  public declareInterface(id?: Identifier, typeParameters?: TypeParameterDeclaration, _extends?: InterfaceExtends[], body?: ObjectTypeAnnotation): DeclareInterface;
  public declareModule(id?: StringLiteral | Identifier, body?: BlockStatement): DeclareModule;
  public declareTypeAlias(id?: Identifier, typeParameters?: TypeParameterDeclaration, right?: FlowTypeAnnotation): DeclareTypeAlias;
  public declareVariable(id?: Identifier): DeclareVariable;
  public existentialTypeParam(): ExistentialTypeParam;
  public functionTypeAnnotation(typeParameters?: TypeParameterDeclaration, params?: FunctionTypeParam[], rest?: FunctionTypeParam, returnType?: FlowTypeAnnotation): FunctionTypeAnnotation;
  public functionTypeParam(name?: Identifier, typeAnnotation?: FlowTypeAnnotation): FunctionTypeParam;
  public genericTypeAnnotation(id?: Identifier, typeParameters?: TypeParameterInstantiation): GenericTypeAnnotation;
  public interfaceExtends(id?: Identifier, typeParameters?: TypeParameterInstantiation): InterfaceExtends;
  public interfaceDeclaration(id?: Identifier, typeParameters?: TypeParameterDeclaration, _extends?: InterfaceExtends[], body?: ObjectTypeAnnotation): InterfaceDeclaration;
  public intersectionTypeAnnotation(types?: FlowTypeAnnotation[]): IntersectionTypeAnnotation;
  public mixedTypeAnnotation(): MixedTypeAnnotation;
  public nullableTypeAnnotation(typeAnnotation?: FlowTypeAnnotation): NullableTypeAnnotation;
  public numericLiteralTypeAnnotation(): NumericLiteralTypeAnnotation;
  public numberTypeAnnotation(): NumberTypeAnnotation;
  public stringLiteralTypeAnnotation(): StringLiteralTypeAnnotation;
  public stringTypeAnnotation(): StringTypeAnnotation;
  public thisTypeAnnotation(): ThisTypeAnnotation;
  public tupleTypeAnnotation(types?: FlowTypeAnnotation[]): TupleTypeAnnotation;
  public typeofTypeAnnotation(argument?: FlowTypeAnnotation): TypeofTypeAnnotation;
  public typeAlias(id?: Identifier, typeParameters?: TypeParameterDeclaration, right?: FlowTypeAnnotation): TypeAlias;
  public typeAnnotation(typeAnnotation?: FlowTypeAnnotation): TypeAnnotation;
  public typeCastExpression(expression?: Expression, typeAnnotation?: FlowTypeAnnotation): TypeCastExpression;
  public typeParameter(bound?: TypeAnnotation, default_?: Flow): TypeParameter;
  public typeParameterDeclaration(params?: Identifier[]): TypeParameterDeclaration;
  public typeParameterInstantiation(params?: FlowTypeAnnotation[]): TypeParameterInstantiation;
  public objectTypeAnnotation(properties?: ObjectTypeProperty[], indexers?: ObjectTypeIndexer[], callProperties?: ObjectTypeCallProperty[]): ObjectTypeAnnotation;
  public objectTypeCallProperty(value?: FlowTypeAnnotation): ObjectTypeCallProperty;
  public objectTypeIndexer(id?: Expression, key?: FlowTypeAnnotation, value?: FlowTypeAnnotation): ObjectTypeIndexer;
  public objectTypeProperty(key?: Expression, value?: FlowTypeAnnotation): ObjectTypeProperty;
  public qualifiedTypeIdentifier(id?: Identifier, qualification?: Identifier | QualifiedTypeIdentifier): QualifiedTypeIdentifier;
  public unionTypeAnnotation(types?: FlowTypeAnnotation[]): UnionTypeAnnotation;
  public voidTypeAnnotation(): VoidTypeAnnotation;
  public jSXAttribute(name?: JSXIdentifier | JSXNamespacedName, value?: JSXElement | StringLiteral | JSXExpressionContainer): JSXAttribute;
  public jSXClosingElement(name?: JSXIdentifier | JSXMemberExpression): JSXClosingElement;
  public jSXElement(openingElement?: JSXOpeningElement, closingElement?: JSXClosingElement, children?: Array<JSXElement | JSXExpressionContainer | JSXText>, selfClosing?: boolean): JSXElement;
  public jSXEmptyExpression(): JSXEmptyExpression;
  public jSXExpressionContainer(expression?: Expression): JSXExpressionContainer;
  public jSXIdentifier(name?: string): JSXIdentifier;
  public jSXMemberExpression(object?: JSXMemberExpression | JSXIdentifier, property?: JSXIdentifier): JSXMemberExpression;
  public jSXNamespacedName(namespace?: JSXIdentifier, name?: JSXIdentifier): JSXNamespacedName;
  public jSXOpeningElement(name?: JSXIdentifier | JSXMemberExpression, attributes?: JSXAttribute[], selfClosing?: boolean): JSXOpeningElement;
  public jSXSpreadAttribute(argument?: Expression): JSXSpreadAttribute;
  public jSXText(value?: string): JSXText;
  public noop(): Noop;
  public parenthesizedExpression(expression?: Expression): ParenthesizedExpression;
  public awaitExpression(argument?: Expression): AwaitExpression;
  public bindExpression(object?: Expression, callee?: Expression): BindExpression;
  public decorator(expression?: Expression): Decorator;
  public doExpression(body?: BlockStatement): DoExpression;
  public exportDefaultSpecifier(exported?: Identifier): ExportDefaultSpecifier;
  public exportNamespaceSpecifier(exported?: Identifier): ExportNamespaceSpecifier;
  public restProperty(argument?: LVal): RestProperty;
  public spreadProperty(argument?: Expression): SpreadProperty;

  public TSAnyKeyword(): TSAnyKeyword;
  public TSArrayType(elementType: TSType): TSArrayType;
  public TSAsExpression(expression: Expression, typeAnnotation: TSType): TSAsExpression;
  public TSBooleanKeyword(): TSBooleanKeyword;
  public TSCallSignatureDeclaration(typeParameters?: TypeParameterDeclaration, parameters?: Array<Identifier | RestElement>, typeAnnotation?: TSTypeAnnotation): TSCallSignatureDeclaration;
  public TSConstructSignatureDeclaration(typeParameters?: TypeParameterDeclaration, parameters?: Array<Identifier | RestElement>, typeAnnotation?: TSTypeAnnotation): TSTypeElement;
  public TSConstructorType(typeParameters?: TypeParameterDeclaration, typeAnnotation?: TSTypeAnnotation): TSConstructorType;
  public TSDeclareFunction(
      id: Identifier | undefined | null,
      typeParameters: TypeParameterDeclaration | Noop | undefined | null,
      params: LVal[],
      returnType: TypeAnnotation | TSTypeAnnotation | Noop | undefined | null): TSDeclareFunction;
  public TSDeclareMethod(
      decorators: Decorator[] | undefined | null,
      key: Expression,
      typeParameters: TypeParameterDeclaration | Noop | undefined | null,
      params: LVal[],
      returnType?: TypeAnnotation | TSTypeAnnotation | Noop): TSDeclareMethod;
  public TSEnumDeclaration(id: Identifier, members: TSEnumMember[]): TSEnumDeclaration;
  public TSEnumMember(id: Identifier | StringLiteral, initializer?: Expression): TSEnumMember;
  public TSExportAssignment(expression: Expression): TSExportAssignment;
  public TSExpressionWithTypeArguments(expression: TSEntityName, typeParameters?: TypeParameterInstantiation): TSExpressionWithTypeArguments;
  public TSExternalModuleReference(expression: StringLiteral): TSExternalModuleReference;
  public TSFunctionType(typeParameters?: TypeParameterDeclaration, typeAnnotation?: TSTypeAnnotation): TSFunctionType;
  public TSImportEqualsDeclaration(id: Identifier, moduleReference: TSEntityName | TSExternalModuleReference): TSImportEqualsDeclaration;
  public TSIndexSignature(parameters: Identifier[], typeAnnotation?: TSTypeAnnotation): TSIndexSignature;
  public TSIndexedAccessType(objectType: TSType, indexType: TSType): TSIndexedAccessType;
  public TSInterfaceBody(body: TSTypeElement[]): TSInterfaceBody;
  public TSInterfaceDeclaration(
      id: Identifier,
      typeParameters: TypeParameterDeclaration | undefined | null,
      extends_: TSExpressionWithTypeArguments[] | undefined | null,
      body: TSInterfaceBody): TSInterfaceDeclaration;
  public TSIntersectionType(types: TSType[]): TSIntersectionType;
  public TSLiteralType(literal: NumericLiteral | StringLiteral | BooleanLiteral): TSLiteralType;
  public TSMappedType(typeParameter: TypeParameter, typeAnnotation?: TSType): TSMappedType;
  public TSMethodSignature(key: Expression, typeParameters?: TypeParameterDeclaration, parameters?: Array<Identifier | RestElement>, typeAnnotation?: TSTypeAnnotation): TSMethodSignature;
  public TSModuleBlock(body: Statement[]): TSModuleBlock;
  public TSModuleDeclaration(id: Identifier | StringLiteral, body: TSModuleBlock | TSModuleDeclaration): TSModuleDeclaration;
  public TSNamespaceExportDeclaration(id: Identifier): TSNamespaceExportDeclaration;
  public TSNeverKeyword(): TSNeverKeyword;
  public TSNonNullExpression(expression: Expression): TSNonNullExpression;
  public TSNullKeyword(): TSNullKeyword;
  public TSNumberKeyword(): TSNumberKeyword;
  public TSObjectKeyword(): TSObjectKeyword;
  public TSParameterProperty(parameter: Identifier | AssignmentPattern): TSParameterProperty;
  public TSParenthesizedType(typeAnnotation: TSType): TSParenthesizedType;
  public TSPropertySignature(key: Expression, typeAnnotation?: TSTypeAnnotation, initializer?: Expression): TSPropertySignature;
  public TSQualifiedName(left: TSEntityName, right: Identifier): TSQualifiedName;
  public TSStringKeyword(): TSStringKeyword;
  public TSSymbolKeyword(): TSSymbolKeyword;
  public TSThisType(): TSThisType;
  public TSTupleType(elementTypes: TSType[]): TSTupleType;
  public TSTypeAliasDeclaration(id: Identifier, typeParameters: TypeParameterDeclaration | undefined | null, typeAnnotation: TSType): TSTypeAliasDeclaration;
  public TSTypeAnnotation(typeAnnotation: TSType): TSTypeAnnotation;
  public TSTypeAssertion(typeAnnotation: TSType, expression: Expression): TSTypeAssertion;
  public TSTypeLiteral(members: TSTypeElement[]): TSTypeLiteral;
  public TSTypeOperator(typeAnnotation: TSType): TSTypeOperator;
  public TSTypeParameter(constraint?: TSType, default_?: TSType): TSTypeParameter;
  public TSTypeParameterDeclaration(params: TSTypeParameter[]): TSTypeParameterDeclaration;
  public TSTypeParameterInstantiation(params: TSType[]): TSTypeParameterInstantiation;
  public TSTypePredicate(parameterName: Identifier | TSThisType, typeAnnotation: TSTypeAnnotation): TSTypePredicate;
  public TSTypeQuery(exprName: TSEntityName): TSTypeQuery;
  public TSTypeReference(typeName: TSEntityName, typeParameters?: TypeParameterInstantiation): TSTypeReference;
  public TSUndefinedKeyword(): TSUndefinedKeyword;
  public TSUnionType(types: TSType[]): TSUnionType;
  public TSVoidKeyword(): TSVoidKeyword;

  public isArrayExpression(node: object, opts?: object): node is ArrayExpression;
  public isAssignmentExpression(node: object, opts?: object): node is AssignmentExpression;
  public isBinaryExpression(node: object, opts?: object): node is BinaryExpression;
  public isDirective(node: object, opts?: object): node is Directive;
  public isDirectiveLiteral(node: object, opts?: object): node is DirectiveLiteral;
  public isBlockStatement(node: object, opts?: object): node is BlockStatement;
  public isBreakStatement(node: object, opts?: object): node is BreakStatement;
  public isCallExpression(node: object, opts?: object): node is CallExpression;
  public isCatchClause(node: object, opts?: object): node is CatchClause;
  public isConditionalExpression(node: object, opts?: object): node is ConditionalExpression;
  public isContinueStatement(node: object, opts?: object): node is ContinueStatement;
  public isDebuggerStatement(node: object, opts?: object): node is DebuggerStatement;
  public isDoWhileStatement(node: object, opts?: object): node is DoWhileStatement;
  public isEmptyStatement(node: object, opts?: object): node is EmptyStatement;
  public isExpressionStatement(node: object, opts?: object): node is ExpressionStatement;
  public isFile(node: object, opts?: object): node is File;
  public isForInStatement(node: object, opts?: object): node is ForInStatement;
  public isForStatement(node: object, opts?: object): node is ForStatement;
  public isFunctionDeclaration(node: object, opts?: object): node is FunctionDeclaration;
  public isFunctionExpression(node: object, opts?: object): node is FunctionExpression;
  public isIdentifier(node: object, opts?: object): node is Identifier;
  public isIfStatement(node: object, opts?: object): node is IfStatement;
  public isLabeledStatement(node: object, opts?: object): node is LabeledStatement;
  public isStringLiteral(node: object, opts?: object): node is StringLiteral;
  public isNumericLiteral(node: object, opts?: object): node is NumericLiteral;
  public isNullLiteral(node: object, opts?: object): node is NullLiteral;
  public isBooleanLiteral(node: object, opts?: object): node is BooleanLiteral;
  public isRegExpLiteral(node: object, opts?: object): node is RegExpLiteral;
  public isLogicalExpression(node: object, opts?: object): node is LogicalExpression;
  public isMemberExpression(node: object, opts?: object): node is MemberExpression;
  public isNewExpression(node: object, opts?: object): node is NewExpression;
  public isProgram(node: object, opts?: object): node is Program;
  public isObjectExpression(node: object, opts?: object): node is ObjectExpression;
  public isObjectMethod(node: object, opts?: object): node is ObjectMethod;
  public isObjectProperty(node: object, opts?: object): node is ObjectProperty;
  public isRestElement(node: object, opts?: object): node is RestElement;
  public isReturnStatement(node: object, opts?: object): node is ReturnStatement;
  public isSequenceExpression(node: object, opts?: object): node is SequenceExpression;
  public isSwitchCase(node: object, opts?: object): node is SwitchCase;
  public isSwitchStatement(node: object, opts?: object): node is SwitchStatement;
  public isThisExpression(node: object, opts?: object): node is ThisExpression;
  public isThrowStatement(node: object, opts?: object): node is ThrowStatement;
  public isTryStatement(node: object, opts?: object): node is TryStatement;
  public isUnaryExpression(node: object, opts?: object): node is UnaryExpression;
  public isUpdateExpression(node: object, opts?: object): node is UpdateExpression;
  public isVariableDeclaration(node: object, opts?: object): node is VariableDeclaration;
  public isVariableDeclarator(node: object, opts?: object): node is VariableDeclarator;
  public isWhileStatement(node: object, opts?: object): node is WhileStatement;
  public isWithStatement(node: object, opts?: object): node is WithStatement;
  public isAssignmentPattern(node: object, opts?: object): node is AssignmentPattern;
  public isArrayPattern(node: object, opts?: object): node is ArrayPattern;
  public isArrowFunctionExpression(node: object, opts?: object): node is ArrowFunctionExpression;
  public isClassBody(node: object, opts?: object): node is ClassBody;
  public isClassDeclaration(node: object, opts?: object): node is ClassDeclaration;
  public isClassExpression(node: object, opts?: object): node is ClassExpression;
  public isExportAllDeclaration(node: object, opts?: object): node is ExportAllDeclaration;
  public isExportDefaultDeclaration(node: object, opts?: object): node is ExportDefaultDeclaration;
  public isExportNamedDeclaration(node: object, opts?: object): node is ExportNamedDeclaration;
  public isExportSpecifier(node: object, opts?: object): node is ExportSpecifier;
  public isForOfStatement(node: object, opts?: object): node is ForOfStatement;
  public isImportDeclaration(node: object, opts?: object): node is ImportDeclaration;
  public isImportDefaultSpecifier(node: object, opts?: object): node is ImportDefaultSpecifier;
  public isImportNamespaceSpecifier(node: object, opts?: object): node is ImportNamespaceSpecifier;
  public isImportSpecifier(node: object, opts?: object): node is ImportSpecifier;
  public isMetaProperty(node: object, opts?: object): node is MetaProperty;
  public isClassMethod(node: object, opts?: object): node is ClassMethod;
  public isObjectPattern(node: object, opts?: object): node is ObjectPattern;
  public isSpreadElement(node: object, opts?: object): node is SpreadElement;
  public isSuper(node: object, opts?: object): node is Super;
  public isTaggedTemplateExpression(node: object, opts?: object): node is TaggedTemplateExpression;
  public isTemplateElement(node: object, opts?: object): node is TemplateElement;
  public isTemplateLiteral(node: object, opts?: object): node is TemplateLiteral;
  public isYieldExpression(node: object, opts?: object): node is YieldExpression;
  public isAnyTypeAnnotation(node: object, opts?: object): node is AnyTypeAnnotation;
  public isArrayTypeAnnotation(node: object, opts?: object): node is ArrayTypeAnnotation;
  public isBooleanTypeAnnotation(node: object, opts?: object): node is BooleanTypeAnnotation;
  public isBooleanLiteralTypeAnnotation(node: object, opts?: object): node is BooleanLiteralTypeAnnotation;
  public isNullLiteralTypeAnnotation(node: object, opts?: object): node is NullLiteralTypeAnnotation;
  public isClassImplements(node: object, opts?: object): node is ClassImplements;
  public isClassProperty(node: object, opts?: object): node is ClassProperty;
  public isDeclareClass(node: object, opts?: object): node is DeclareClass;
  public isDeclareFunction(node: object, opts?: object): node is DeclareFunction;
  public isDeclareInterface(node: object, opts?: object): node is DeclareInterface;
  public isDeclareModule(node: object, opts?: object): node is DeclareModule;
  public isDeclareTypeAlias(node: object, opts?: object): node is DeclareTypeAlias;
  public isDeclareVariable(node: object, opts?: object): node is DeclareVariable;
  public isExistentialTypeParam(node: object, opts?: object): node is ExistentialTypeParam;
  public isFunctionTypeAnnotation(node: object, opts?: object): node is FunctionTypeAnnotation;
  public isFunctionTypeParam(node: object, opts?: object): node is FunctionTypeParam;
  public isGenericTypeAnnotation(node: object, opts?: object): node is GenericTypeAnnotation;
  public isInterfaceExtends(node: object, opts?: object): node is InterfaceExtends;
  public isInterfaceDeclaration(node: object, opts?: object): node is InterfaceDeclaration;
  public isIntersectionTypeAnnotation(node: object, opts?: object): node is IntersectionTypeAnnotation;
  public isMixedTypeAnnotation(node: object, opts?: object): node is MixedTypeAnnotation;
  public isNullableTypeAnnotation(node: object, opts?: object): node is NullableTypeAnnotation;
  public isNumericLiteralTypeAnnotation(node: object, opts?: object): node is NumericLiteralTypeAnnotation;
  public isNumberTypeAnnotation(node: object, opts?: object): node is NumberTypeAnnotation;
  public isStringLiteralTypeAnnotation(node: object, opts?: object): node is StringLiteralTypeAnnotation;
  public isStringTypeAnnotation(node: object, opts?: object): node is StringTypeAnnotation;
  public isThisTypeAnnotation(node: object, opts?: object): node is ThisTypeAnnotation;
  public isTupleTypeAnnotation(node: object, opts?: object): node is TupleTypeAnnotation;
  public isTypeofTypeAnnotation(node: object, opts?: object): node is TypeofTypeAnnotation;
  public isTypeAlias(node: object, opts?: object): node is TypeAlias;
  public isTypeAnnotation(node: object, opts?: object): node is TypeAnnotation;
  public isTypeCastExpression(node: object, opts?: object): node is TypeCastExpression;
  public isTypeParameter(node: object, opts?: object): node is TypeParameter;
  public isTypeParameterDeclaration(node: object, opts?: object): node is TypeParameterDeclaration;
  public isTypeParameterInstantiation(node: object, opts?: object): node is TypeParameterInstantiation;
  public isObjectTypeAnnotation(node: object, opts?: object): node is ObjectTypeAnnotation;
  public isObjectTypeCallProperty(node: object, opts?: object): node is ObjectTypeCallProperty;
  public isObjectTypeIndexer(node: object, opts?: object): node is ObjectTypeIndexer;
  public isObjectTypeProperty(node: object, opts?: object): node is ObjectTypeProperty;
  public isQualifiedTypeIdentifier(node: object, opts?: object): node is QualifiedTypeIdentifier;
  public isUnionTypeAnnotation(node: object, opts?: object): node is UnionTypeAnnotation;
  public isVoidTypeAnnotation(node: object, opts?: object): node is VoidTypeAnnotation;
  public isJSXAttribute(node: object, opts?: object): node is JSXAttribute;
  public isJSXClosingElement(node: object, opts?: object): node is JSXClosingElement;
  public isJSXElement(node: object, opts?: object): node is JSXElement;
  public isJSXEmptyExpression(node: object, opts?: object): node is JSXEmptyExpression;
  public isJSXExpressionContainer(node: object, opts?: object): node is JSXExpressionContainer;
  public isJSXIdentifier(node: object, opts?: object): node is JSXIdentifier;
  public isJSXMemberExpression(node: object, opts?: object): node is JSXMemberExpression;
  public isJSXNamespacedName(node: object, opts?: object): node is JSXNamespacedName;
  public isJSXOpeningElement(node: object, opts?: object): node is JSXOpeningElement;
  public isJSXSpreadAttribute(node: object, opts?: object): node is JSXSpreadAttribute;
  public isJSXText(node: object, opts?: object): node is JSXText;
  public isNoop(node: object, opts?: object): node is Noop;
  public isParenthesizedExpression(node: object, opts?: object): node is ParenthesizedExpression;
  public isAwaitExpression(node: object, opts?: object): node is AwaitExpression;
  public isBindExpression(node: object, opts?: object): node is BindExpression;
  public isDecorator(node: object, opts?: object): node is Decorator;
  public isDoExpression(node: object, opts?: object): node is DoExpression;
  public isExportDefaultSpecifier(node: object, opts?: object): node is ExportDefaultSpecifier;
  public isExportNamespaceSpecifier(node: object, opts?: object): node is ExportNamespaceSpecifier;
  public isRestProperty(node: object, opts?: object): node is RestProperty;
  public isSpreadProperty(node: object, opts?: object): node is SpreadProperty;
  public isExpression(node: object, opts?: object): node is Expression;
  public isBinary(node: object, opts?: object): node is Binary;
  public isScopable(node: object, opts?: object): node is Scopable;
  public isBlockParent(node: object, opts?: object): node is BlockParent;
  public isBlock(node: object, opts?: object): node is Block;
  public isStatement(node: object, opts?: object): node is Statement;
  public isTerminatorless(node: object, opts?: object): node is Terminatorless;
  public isCompletionStatement(node: object, opts?: object): node is CompletionStatement;
  public isConditional(node: object, opts?: object): node is Conditional;
  public isLoop(node: object, opts?: object): node is Loop;
  public isWhile(node: object, opts?: object): node is While;
  public isExpressionWrapper(node: object, opts?: object): node is ExpressionWrapper;
  public isFor(node: object, opts?: object): node is For;
  public isForXStatement(node: object, opts?: object): node is ForXStatement;
  // tslint:disable-next-line ban-types
  public isFunction(node: object, opts?: object): node is Function;
  public isFunctionParent(node: object, opts?: object): node is FunctionParent;
  public isPureish(node: object, opts?: object): node is Pureish;
  public isDeclaration(node: object, opts?: object): node is Declaration;
  public isLVal(node: object, opts?: object): node is LVal;
  public isLiteral(node: object, opts?: object): node is Literal;
  public isImmutable(node: object, opts?: object): node is Immutable;
  public isUserWhitespacable(node: object, opts?: object): node is UserWhitespacable;
  public isMethod(node: object, opts?: object): node is Method;
  public isObjectMember(node: object, opts?: object): node is ObjectMember;
  public isProperty(node: object, opts?: object): node is Property;
  public isUnaryLike(node: object, opts?: object): node is UnaryLike;
  public isPattern(node: object, opts?: object): node is Pattern;
  public isClass(node: object, opts?: object): node is Class;
  public isModuleDeclaration(node: object, opts?: object): node is ModuleDeclaration;
  public isExportDeclaration(node: object, opts?: object): node is ExportDeclaration;
  public isModuleSpecifier(node: object, opts?: object): node is ModuleSpecifier;
  public isFlow(node: object, opts?: object): node is Flow;
  public isFlowBaseAnnotation(node: object, opts?: object): node is FlowBaseAnnotation;
  public isFlowDeclaration(node: object, opts?: object): node is FlowDeclaration;
  public isJSX(node: object, opts?: object): node is JSX;
  public isNumberLiteral(node: object, opts?: object): node is NumericLiteral;
  public isRegexLiteral(node: object, opts?: object): node is RegExpLiteral;

  public isReferencedIdentifier(node: object, opts?: object): node is Identifier | JSXIdentifier;
  public isReferencedMemberExpression(node: object, opts?: object): node is MemberExpression;
  public isBindingIdentifier(node: object, opts?: object): node is Identifier;
  public isScope(node: object, opts?: object): node is Scopable;
  public isReferenced(node: object, opts?: object): boolean;
  public isBlockScoped(node: object, opts?: object): node is FunctionDeclaration | ClassDeclaration | VariableDeclaration;
  public isVar(node: object, opts?: object): node is VariableDeclaration;
  public isUser(node: object, opts?: object): boolean;
  public isGenerated(node: object, opts?: object): boolean;
  public isPure(node: object, opts?: object): boolean;

  public isTSAnyKeyword(node: object, opts?: object): node is TSAnyKeyword;
  public isTSArrayType(node: object, opts?: object): node is TSArrayType;
  public isTSAsExpression(node: object, opts?: object): node is TSAsExpression;
  public isTSBooleanKeyword(node: object, opts?: object): node is TSBooleanKeyword;
  public isTSCallSignatureDeclaration(node: object, opts?: object): node is TSCallSignatureDeclaration;
  public isTSConstructSignatureDeclaration(node: object, opts?: object): node is TSTypeElement;
  public isTSConstructorType(node: object, opts?: object): node is TSConstructorType;
  public isTSDeclareFunction(node: object, opts?: object): node is TSDeclareFunction;
  public isTSDeclareMethod(node: object, opts?: object): node is TSDeclareMethod;
  public isTSEnumDeclaration(node: object, opts?: object): node is TSEnumDeclaration;
  public isTSEnumMember(node: object, opts?: object): node is TSEnumMember;
  public isTSExportAssignment(node: object, opts?: object): node is TSExportAssignment;
  public isTSExpressionWithTypeArguments(node: object, opts?: object): node is TSExpressionWithTypeArguments;
  public isTSExternalModuleReference(node: object, opts?: object): node is TSExternalModuleReference;
  public isTSFunctionType(node: object, opts?: object): node is TSFunctionType;
  public isTSImportEqualsDeclaration(node: object, opts?: object): node is TSImportEqualsDeclaration;
  public isTSIndexSignature(node: object, opts?: object): node is TSIndexSignature;
  public isTSIndexedAccessType(node: object, opts?: object): node is TSIndexedAccessType;
  public isTSInterfaceBody(node: object, opts?: object): node is TSInterfaceBody;
  public isTSInterfaceDeclaration(node: object, opts?: object): node is TSInterfaceDeclaration;
  public isTSIntersectionType(node: object, opts?: object): node is TSIntersectionType;
  public isTSLiteralType(node: object, opts?: object): node is TSLiteralType;
  public isTSMappedType(node: object, opts?: object): node is TSMappedType;
  public isTSMethodSignature(node: object, opts?: object): node is TSMethodSignature;
  public isTSModuleBlock(node: object, opts?: object): node is TSModuleBlock;
  public isTSModuleDeclaration(node: object, opts?: object): node is TSModuleDeclaration;
  public isTSNamespaceExportDeclaration(node: object, opts?: object): node is TSNamespaceExportDeclaration;
  public isTSNeverKeyword(node: object, opts?: object): node is TSNeverKeyword;
  public isTSNonNullExpression(node: object, opts?: object): node is TSNonNullExpression;
  public isTSNullKeyword(node: object, opts?: object): node is TSNullKeyword;
  public isTSNumberKeyword(node: object, opts?: object): node is TSNumberKeyword;
  public isTSObjectKeyword(node: object, opts?: object): node is TSObjectKeyword;
  public isTSParameterProperty(node: object, opts?: object): node is TSParameterProperty;
  public isTSParenthesizedType(node: object, opts?: object): node is TSParenthesizedType;
  public isTSPropertySignature(node: object, opts?: object): node is TSPropertySignature;
  public isTSQualifiedName(node: object, opts?: object): node is TSQualifiedName;
  public isTSStringKeyword(node: object, opts?: object): node is TSStringKeyword;
  public isTSSymbolKeyword(node: object, opts?: object): node is TSSymbolKeyword;
  public isTSThisType(node: object, opts?: object): node is TSThisType;
  public isTSTupleType(node: object, opts?: object): node is TSTupleType;
  public isTSTypeAliasDeclaration(node: object, opts?: object): node is TSTypeAliasDeclaration;
  public isTSTypeAnnotation(node: object, opts?: object): node is TSTypeAnnotation;
  public isTSTypeAssertion(node: object, opts?: object): node is TSTypeAssertion;
  public isTSTypeLiteral(node: object, opts?: object): node is TSTypeLiteral;
  public isTSTypeOperator(node: object, opts?: object): node is TSTypeOperator;
  public isTSTypeParameter(node: object, opts?: object): node is TSTypeParameter;
  public isTSTypeParameterDeclaration(node: object, opts?: object): node is TSTypeParameterDeclaration;
  public isTSTypeParameterInstantiation(node: object, opts?: object): node is TSTypeParameterInstantiation;
  public isTSTypePredicate(node: object, opts?: object): node is TSTypePredicate;
  public isTSTypeQuery(node: object, opts?: object): node is TSTypeQuery;
  public isTSTypeReference(node: object, opts?: object): node is TSTypeReference;
  public isTSUndefinedKeyword(node: object, opts?: object): node is TSUndefinedKeyword;
  public isTSUnionType(node: object, opts?: object): node is TSUnionType;
  public isTSVoidKeyword(node: object, opts?: object): node is TSVoidKeyword;
   // React
  public assertArrayExpression(node: object, opts?: object): void;
  public assertAssignmentExpression(node: object, opts?: object): void;
  public assertBinaryExpression(node: object, opts?: object): void;
  public assertDirective(node: object, opts?: object): void;
  public assertDirectiveLiteral(node: object, opts?: object): void;
  public assertBlockStatement(node: object, opts?: object): void;
  public assertBreakStatement(node: object, opts?: object): void;
  public assertCallExpression(node: object, opts?: object): void;
  public assertCatchClause(node: object, opts?: object): void;
  public assertConditionalExpression(node: object, opts?: object): void;
  public assertContinueStatement(node: object, opts?: object): void;
  public assertDebuggerStatement(node: object, opts?: object): void;
  public assertDoWhileStatement(node: object, opts?: object): void;
  public assertEmptyStatement(node: object, opts?: object): void;
  public assertExpressionStatement(node: object, opts?: object): void;
  public assertFile(node: object, opts?: object): void;
  public assertForInStatement(node: object, opts?: object): void;
  public assertForStatement(node: object, opts?: object): void;
  public assertFunctionDeclaration(node: object, opts?: object): void;
  public assertFunctionExpression(node: object, opts?: object): void;
  public assertIdentifier(node: object, opts?: object): void;
  public assertIfStatement(node: object, opts?: object): void;
  public assertLabeledStatement(node: object, opts?: object): void;
  public assertStringLiteral(node: object, opts?: object): void;
  public assertNumericLiteral(node: object, opts?: object): void;
  public assertNullLiteral(node: object, opts?: object): void;
  public assertBooleanLiteral(node: object, opts?: object): void;
  public assertRegExpLiteral(node: object, opts?: object): void;
  public assertLogicalExpression(node: object, opts?: object): void;
  public assertMemberExpression(node: object, opts?: object): void;
  public assertNewExpression(node: object, opts?: object): void;
  public assertProgram(node: object, opts?: object): void;
  public assertObjectExpression(node: object, opts?: object): void;
  public assertObjectMethod(node: object, opts?: object): void;
  public assertObjectProperty(node: object, opts?: object): void;
  public assertRestElement(node: object, opts?: object): void;
  public assertReturnStatement(node: object, opts?: object): void;
  public assertSequenceExpression(node: object, opts?: object): void;
  public assertSwitchCase(node: object, opts?: object): void;
  public assertSwitchStatement(node: object, opts?: object): void;
  public assertThisExpression(node: object, opts?: object): void;
  public assertThrowStatement(node: object, opts?: object): void;
  public assertTryStatement(node: object, opts?: object): void;
  public assertUnaryExpression(node: object, opts?: object): void;
  public assertUpdateExpression(node: object, opts?: object): void;
  public assertVariableDeclaration(node: object, opts?: object): void;
  public assertVariableDeclarator(node: object, opts?: object): void;
  public assertWhileStatement(node: object, opts?: object): void;
  public assertWithStatement(node: object, opts?: object): void;
  public assertAssignmentPattern(node: object, opts?: object): void;
  public assertArrayPattern(node: object, opts?: object): void;
  public assertArrowFunctionExpression(node: object, opts?: object): void;
  public assertClassBody(node: object, opts?: object): void;
  public assertClassDeclaration(node: object, opts?: object): void;
  public assertClassExpression(node: object, opts?: object): void;
  public assertExportAllDeclaration(node: object, opts?: object): void;
  public assertExportDefaultDeclaration(node: object, opts?: object): void;
  public assertExportNamedDeclaration(node: object, opts?: object): void;
  public assertExportSpecifier(node: object, opts?: object): void;
  public assertForOfStatement(node: object, opts?: object): void;
  public assertImportDeclaration(node: object, opts?: object): void;
  public assertImportDefaultSpecifier(node: object, opts?: object): void;
  public assertImportNamespaceSpecifier(node: object, opts?: object): void;
  public assertImportSpecifier(node: object, opts?: object): void;
  public assertMetaProperty(node: object, opts?: object): void;
  public assertClassMethod(node: object, opts?: object): void;
  public assertObjectPattern(node: object, opts?: object): void;
  public assertSpreadElement(node: object, opts?: object): void;
  public assertSuper(node: object, opts?: object): void;
  public assertTaggedTemplateExpression(node: object, opts?: object): void;
  public assertTemplateElement(node: object, opts?: object): void;
  public assertTemplateLiteral(node: object, opts?: object): void;
  public assertYieldExpression(node: object, opts?: object): void;
  public assertAnyTypeAnnotation(node: object, opts?: object): void;
  public assertArrayTypeAnnotation(node: object, opts?: object): void;
  public assertBooleanTypeAnnotation(node: object, opts?: object): void;
  public assertBooleanLiteralTypeAnnotation(node: object, opts?: object): void;
  public assertNullLiteralTypeAnnotation(node: object, opts?: object): void;
  public assertClassImplements(node: object, opts?: object): void;
  public assertClassProperty(node: object, opts?: object): void;
  public assertDeclareClass(node: object, opts?: object): void;
  public assertDeclareFunction(node: object, opts?: object): void;
  public assertDeclareInterface(node: object, opts?: object): void;
  public assertDeclareModule(node: object, opts?: object): void;
  public assertDeclareTypeAlias(node: object, opts?: object): void;
  public assertDeclareVariable(node: object, opts?: object): void;
  public assertExistentialTypeParam(node: object, opts?: object): void;
  public assertFunctionTypeAnnotation(node: object, opts?: object): void;
  public assertFunctionTypeParam(node: object, opts?: object): void;
  public assertGenericTypeAnnotation(node: object, opts?: object): void;
  public assertInterfaceExtends(node: object, opts?: object): void;
  public assertInterfaceDeclaration(node: object, opts?: object): void;
  public assertIntersectionTypeAnnotation(node: object, opts?: object): void;
  public assertMixedTypeAnnotation(node: object, opts?: object): void;
  public assertNullableTypeAnnotation(node: object, opts?: object): void;
  public assertNumericLiteralTypeAnnotation(node: object, opts?: object): void;
  public assertNumberTypeAnnotation(node: object, opts?: object): void;
  public assertStringLiteralTypeAnnotation(node: object, opts?: object): void;
  public assertStringTypeAnnotation(node: object, opts?: object): void;
  public assertThisTypeAnnotation(node: object, opts?: object): void;
  public assertTupleTypeAnnotation(node: object, opts?: object): void;
  public assertTypeofTypeAnnotation(node: object, opts?: object): void;
  public assertTypeAlias(node: object, opts?: object): void;
  public assertTypeAnnotation(node: object, opts?: object): void;
  public assertTypeCastExpression(node: object, opts?: object): void;
  public assertTypeParameter(node: object, opts?: object): void;
  public assertTypeParameterDeclaration(node: object, opts?: object): void;
  public assertTypeParameterInstantiation(node: object, opts?: object): void;
  public assertObjectTypeAnnotation(node: object, opts?: object): void;
  public assertObjectTypeCallProperty(node: object, opts?: object): void;
  public assertObjectTypeIndexer(node: object, opts?: object): void;
  public assertObjectTypeProperty(node: object, opts?: object): void;
  public assertQualifiedTypeIdentifier(node: object, opts?: object): void;
  public assertUnionTypeAnnotation(node: object, opts?: object): void;
  public assertVoidTypeAnnotation(node: object, opts?: object): void;
  public assertJSXAttribute(node: object, opts?: object): void;
  public assertJSXClosingElement(node: object, opts?: object): void;
  public assertJSXElement(node: object, opts?: object): void;
  public assertJSXEmptyExpression(node: object, opts?: object): void;
  public assertJSXExpressionContainer(node: object, opts?: object): void;
  public assertJSXIdentifier(node: object, opts?: object): void;
  public assertJSXMemberExpression(node: object, opts?: object): void;
  public assertJSXNamespacedName(node: object, opts?: object): void;
  public assertJSXOpeningElement(node: object, opts?: object): void;
  public assertJSXSpreadAttribute(node: object, opts?: object): void;
  public assertJSXText(node: object, opts?: object): void;
  public assertNoop(node: object, opts?: object): void;
  public assertParenthesizedExpression(node: object, opts?: object): void;
  public assertAwaitExpression(node: object, opts?: object): void;
  public assertBindExpression(node: object, opts?: object): void;
  public assertDecorator(node: object, opts?: object): void;
  public assertDoExpression(node: object, opts?: object): void;
  public assertExportDefaultSpecifier(node: object, opts?: object): void;
  public assertExportNamespaceSpecifier(node: object, opts?: object): void;
  public assertRestProperty(node: object, opts?: object): void;
  public assertSpreadProperty(node: object, opts?: object): void;
  public assertExpression(node: object, opts?: object): void;
  public assertBinary(node: object, opts?: object): void;
  public assertScopable(node: object, opts?: object): void;
  public assertBlockParent(node: object, opts?: object): void;
  public assertBlock(node: object, opts?: object): void;
  public assertStatement(node: object, opts?: object): void;
  public assertTerminatorless(node: object, opts?: object): void;
  public assertCompletionStatement(node: object, opts?: object): void;
  public assertConditional(node: object, opts?: object): void;
  public assertLoop(node: object, opts?: object): void;
  public assertWhile(node: object, opts?: object): void;
  public assertExpressionWrapper(node: object, opts?: object): void;
  public assertFor(node: object, opts?: object): void;
  public assertForXStatement(node: object, opts?: object): void;
  public assertFunction(node: object, opts?: object): void;
  public assertFunctionParent(node: object, opts?: object): void;
  public assertPureish(node: object, opts?: object): void;
  public assertDeclaration(node: object, opts?: object): void;
  public assertLVal(node: object, opts?: object): void;
  public assertLiteral(node: object, opts?: object): void;
  public assertImmutable(node: object, opts?: object): void;
  public assertUserWhitespacable(node: object, opts?: object): void;
  public assertMethod(node: object, opts?: object): void;
  public assertObjectMember(node: object, opts?: object): void;
  public assertProperty(node: object, opts?: object): void;
  public assertUnaryLike(node: object, opts?: object): void;
  public assertPattern(node: object, opts?: object): void;
  public assertClass(node: object, opts?: object): void;
  public assertModuleDeclaration(node: object, opts?: object): void;
  public assertExportDeclaration(node: object, opts?: object): void;
  public assertModuleSpecifier(node: object, opts?: object): void;
  public assertFlow(node: object, opts?: object): void;
  public assertFlowBaseAnnotation(node: object, opts?: object): void;
  public assertFlowDeclaration(node: object, opts?: object): void;
  public assertJSX(node: object, opts?: object): void;
  public assertNumberLiteral(node: object, opts?: object): void;
  public assertRegexLiteral(node: object, opts?: object): void;

  public assertTSAnyKeyword(node: object, opts?: object): void;
  public assertTSArrayType(node: object, opts?: object): void;
  public assertTSAsExpression(node: object, opts?: object): void;
  public assertTSBooleanKeyword(node: object, opts?: object): void;
  public assertTSCallSignatureDeclaration(node: object, opts?: object): void;
  public assertTSConstructSignatureDeclaration(node: object, opts?: object): void;
  public assertTSConstructorType(node: object, opts?: object): void;
  public assertTSDeclareFunction(node: object, opts?: object): void;
  public assertTSDeclareMethod(node: object, opts?: object): void;
  public assertTSEnumDeclaration(node: object, opts?: object): void;
  public assertTSEnumMember(node: object, opts?: object): void;
  public assertTSExportAssignment(node: object, opts?: object): void;
  public assertTSExpressionWithTypeArguments(node: object, opts?: object): void;
  public assertTSExternalModuleReference(node: object, opts?: object): void;
  public assertTSFunctionType(node: object, opts?: object): void;
  public assertTSImportEqualsDeclaration(node: object, opts?: object): void;
  public assertTSIndexSignature(node: object, opts?: object): void;
  public assertTSIndexedAccessType(node: object, opts?: object): void;
  public assertTSInterfaceBody(node: object, opts?: object): void;
  public assertTSInterfaceDeclaration(node: object, opts?: object): void;
  public assertTSIntersectionType(node: object, opts?: object): void;
  public assertTSLiteralType(node: object, opts?: object): void;
  public assertTSMappedType(node: object, opts?: object): void;
  public assertTSMethodSignature(node: object, opts?: object): void;
  public assertTSModuleBlock(node: object, opts?: object): void;
  public assertTSModuleDeclaration(node: object, opts?: object): void;
  public assertTSNamespaceExportDeclaration(node: object, opts?: object): void;
  public assertTSNeverKeyword(node: object, opts?: object): void;
  public assertTSNonNullExpression(node: object, opts?: object): void;
  public assertTSNullKeyword(node: object, opts?: object): void;
  public assertTSNumberKeyword(node: object, opts?: object): void;
  public assertTSObjectKeyword(node: object, opts?: object): void;
  public assertTSParameterProperty(node: object, opts?: object): void;
  public assertTSParenthesizedType(node: object, opts?: object): void;
  public assertTSPropertySignature(node: object, opts?: object): void;
  public assertTSQualifiedName(node: object, opts?: object): void;
  public assertTSStringKeyword(node: object, opts?: object): void;
  public assertTSSymbolKeyword(node: object, opts?: object): void;
  public assertTSThisType(node: object, opts?: object): void;
  public assertTSTupleType(node: object, opts?: object): void;
  public assertTSTypeAliasDeclaration(node: object, opts?: object): void;
  public assertTSTypeAnnotation(node: object, opts?: object): void;
  public assertTSTypeAssertion(node: object, opts?: object): void;
  public assertTSTypeLiteral(node: object, opts?: object): void;
  public assertTSTypeOperator(node: object, opts?: object): void;
  public assertTSTypeParameter(node: object, opts?: object): void;
  public assertTSTypeParameterDeclaration(node: object, opts?: object): void;
  public assertTSTypeParameterInstantiation(node: object, opts?: object): void;
  public assertTSTypePredicate(node: object, opts?: object): void;
  public assertTSTypeQuery(node: object, opts?: object): void;
  public assertTSTypeReference(node: object, opts?: object): void;
  public assertTSUndefinedKeyword(node: object, opts?: object): void;
  public assertTSUnionType(node: object, opts?: object): void;
  public assertTSVoidKeyword(node: object, opts?: object): void;
}

export default class PluginArgs {
  public types: Types;
  public version: string;
  public cache: any;
  public env: any;
  public getEnv: Function;
  public loadOptions: Function;
  public buildExternalHelpers: Function;
  public resolvePlugin: Function;
  public resolvePreset: Function;
  public Plugin: PluginObj;
  public transform(code: string, opts?: TransformOptions): BabelFileResult;
  public transformFile(filename: string, opts: TransformOptions, callback: (err: any, result: BabelFileResult) => void): void;
  public transformFileSync(filename: string, opts?: TransformOptions): BabelFileResult;
  public transformFromAst(ast: Node, code?: string, opts?: TransformOptions): BabelFileResult;
  public traverse(node: Node | Node[], opts?: TraverseOptions, state?: any): void;
  public template(code: string, opts?: BabylonOptions): UseTemplate;
  public DEFAULT_EXTENSIONS: any;
}

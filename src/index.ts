import type { ASTNode } from 'magicast'
import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import { generateCode, parseModule } from 'magicast'
import { createUnplugin } from 'unplugin'

function isAwait(node: ASTNode): boolean {
  return node.type === 'MemberExpression' && node.property.type === 'Identifier' && node.property.name === 'await'
}

declare global {
  interface Promise<T> {
    await: Awaited<T>
  }
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = () => ({
  name: 'chainawait',
  transformInclude(id) {
    return id.endsWith('main.ts')
  },
  transform(code) {
    const ast = parseModule(code)

    function transformAwaitProperties(node: any): void {
      if (isAwait(node)) {
        // Transform the node structure directly
        const awaitExpression = {
          type: 'AwaitExpression',
          argument: node.object,
        }
        // Replace the MemberExpression with AwaitExpression
        Object.assign(node, awaitExpression)
      }

      // Recursively traverse all properties that might be nodes
      for (const key in node) {
        if (node[key] && typeof node[key] === 'object') {
          transformAwaitProperties(node[key])
        }
      }
    }

    transformAwaitProperties(ast.$ast)

    const generated = generateCode(ast.$ast)
    return generated
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

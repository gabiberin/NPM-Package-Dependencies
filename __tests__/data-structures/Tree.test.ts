import { Tree } from "../../src/data-structures/Tree";
import { Node } from "../../src/data-structures/Node";

jest.setTimeout(30000)

describe('Tree data structure', () => {

    it('creates a tree', () => {
        const nodeName = 'testNode';
        const node = new Node(nodeName);

        const tree = new Tree(node)

        expect(tree.rootNode.name).toBe(nodeName)
    })

    it('creates a tree from an npm package', async () => {
        const tree = await Tree.buildTree('loose-envify', '1.4.0');

        expect(tree.rootNode.name).toBe('loose-envify@1.4.0')
        expect(tree.rootNode.children!.length).toBe(1);
        expect(tree.rootNode.children![0].name).toBe('js-tokens@4.0.0');
    })

    it('prints a tree', async () => {
        const tree = await Tree.buildTree('loose-envify', '1.4.0');

        const print = tree.printTree();

        expect(print.name).toBe('loose-envify@1.4.0')
        expect(print.children!.length).toBe(1);
        expect(print.children![0].name).toBe('js-tokens@4.0.0');
        
    })
    
});
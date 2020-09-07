import { Node } from "../../src/data-structures/Node";

jest.setTimeout(30000)

describe('Node data structure', () => {

    it('creates a single node', () => {
        const nodeName = 'testNode';
        const node = new Node(nodeName);

        expect(node.name).toBe(nodeName)
    })

    it('creates a multi level node', () => {
        const nodeName = 'testNode';
        const node2Name = 'test2Node';
        const node3Name = 'test3Node';

        const node3 = new Node(node3Name);
        const node2 = new Node(node2Name);

        const node = new Node(nodeName, [ node3, node2 ]);

        expect(node.name).toBe(nodeName);

        expect(node.children!.length).toBe(2);

        expect(node.children![0]).toBe(node3);

        expect(node.children![1].name).toBe(node2Name);
    })

    it('builds a node from an npm package', async () => {

        const node = await Node.buildNode('loose-envify', '1.4.0');

        expect(node.name).toBe('loose-envify@1.4.0')
        expect(node.children!.length).toBe(1);
        expect(node.children![0].name).toBe('js-tokens@4.0.0');
    })

    it('prints a node', () => {

        const nodeName = 'testNode';
        const node2Name = 'test2Node';
        const node3Name = 'test3Node';

        const node3 = new Node(node3Name);
        const node2 = new Node(node2Name);

        const node = new Node(nodeName, [ node3, node2 ]);

        const printedNode = node.printFromNode();

        expect(printedNode.name).toBe(nodeName);
        expect(printedNode.children!.length).toBe(2);
        expect(printedNode.children[0].name).toBe(node3Name);
        expect(printedNode.children[1].children.length).toBe(0);
    })
    
});
import {
    NPMPackage
} from "../types";
import {
    Node
} from './Node'

export class Tree {
    constructor(public rootNode: Node) {}

    printTree() {
        return this.rootNode.printFromNode();
    }

    static async buildTree(name: string, version: string): Promise <Tree> {
        const rootNode = await Node.buildNode(name, version);

        return new Tree(rootNode);
    }
}
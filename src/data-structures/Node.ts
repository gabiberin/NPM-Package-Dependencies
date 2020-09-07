import {
    getLink,
    getVersion
} from '../utils'
import {
    NPMPackage,
    NodeView
} from '../types';
import {
    cache
} from '../cache'
import got from 'got';

export class Node {
    constructor(public name: string, public children ? : Node[]) {}

    printFromNode(): NodeView {
        let children;
        const result: NodeView = {
            name: this.name,
            children: this.printChildren()
        };

        return result;
    }

    printChildren(): [] | NodeView[] {
        if (!this.children) {
            return [];
        }

        let children: NodeView[] = [];
        this.children.forEach(node => {
            children.push(node.printFromNode());
        });

        return children;
    }

    static async buildNode(name: string, version: string): Promise <Node> {

        const npmPackage: NPMPackage = cache.get(name) || await got(
            getLink(name),
        ).json();

        if (!cache.has(name)) {
            cache.set(name, npmPackage);
        }
        
        const pVersion = getVersion(npmPackage, version);
        
        if ( ! pVersion ) {
            throw new Error('Package not found');
        }

        if (!pVersion.dependencies) {
            return new Node(`${pVersion.name}@${pVersion.version}`);
        }
        let children: Promise<Node>[] = [];

        for (const [key, version] of Object.entries(pVersion.dependencies)) {
            children.push(Node.buildNode(key, version));
        }

        const childrenNodes: Node[] = await Promise.all(children);

        return new Node(`${pVersion.name}@${pVersion.version}`, childrenNodes);
    }
}
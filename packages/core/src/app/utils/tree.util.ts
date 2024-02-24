export class TreeNode<T> {
    public value: T;
    public children: TreeNode<T>[];

    public constructor(value: T) {
        this.value = value;
        this.children = [];
    }

    public addChild(child: TreeNode<T>) {
        this.children.push(child);
    }

    public removeChild(child: TreeNode<T>) {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }
}

export class Tree<T> {
    public root: TreeNode<T>;

    public constructor(value: T) {
        this.root = new TreeNode<T>(value);
    }

    public traverse(callback: (node: TreeNode<T>) => void) {
        function traverseNode(node: TreeNode<T>) {
            callback(node);
            node.children.forEach(traverseNode);
        }

        traverseNode(this.root);
    }

    public async asyncTraverse(callback: (node: TreeNode<T>) => Promise<void>) {
        async function traverseNode(node: TreeNode<T>) {
            await callback(node);
            await Promise.all(node.children.map(traverseNode));
        }

        await traverseNode(this.root);
    }

    public toString(): string {
        let result = '';
        const lines: string[] = [];

        function traverseNode(node: TreeNode<T>, depth: number) {
            lines.push(`${'-'.repeat(depth * 2)}${node.value}`);
            node.children.forEach((child) => traverseNode(child, depth + 1));
        }

        traverseNode(this.root, 0);
        result = lines.join('\n');

        return result;
    }
}

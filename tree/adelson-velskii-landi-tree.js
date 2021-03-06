import {BinarySearchTree} from './binary-search-tree.js';


const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};



class AVLTree extends BinarySearchTree{
    static defalutCompare = (a,b) => {
        if(a > b) return '>';
        if(a < b) return '<';
        if(a == b) return '=';
    }

    constructor(compareFn = AVLTree.defalutCompare){
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }


    getNodeHeight(node){
        if(node == null){
            return -1;
        }
        return Math.max(this.getNodeHeight(node.left),this.getNodeHeight(node.right)) + 1;
    }

}

console.log(new AVLTree());

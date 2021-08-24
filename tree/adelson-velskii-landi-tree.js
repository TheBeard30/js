import {BinarySearchTree} from './binary-search-tree.js';



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

}

console.log(new AVLTree());

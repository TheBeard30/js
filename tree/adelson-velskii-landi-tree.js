import {BinarySearchTree} from './binary-search-tree';



class AVLTree extends BinarySearchTree{
    defalutCompare = (a,b) => {
        if(a > b) return '>';
        if(a < b) return '<';
        if(a == b) return '=';
    }

    constructor(compareFn = this.defalutCompare){
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

}

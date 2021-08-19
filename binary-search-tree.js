

class BinarySearchTree{

    defalutCompare = (a,b) => {
        if(a > b) return '>';
        if(a < b) return '<';
        if(a == b) return '=';
    }

    constructor(compareFn = this.defalutCompare){
        this.root = null;
        this.compareFn = compareFn;
    }

    /**
     * 插入节点
     * @param {*} key  节点值 
     */
    insert(key){
        if(this.root == null){
            this.root = new Node(key);
        }else{
            this.insertNode(this.root,key);
        }
    }

    insertNode(node,key){
        if(this.compareFn(key,node.key) === '<'){
            if(node.left == null){
                node.left = new Node(key);
            }else{
                this.insertNode(node.left,key);
            }
        }else{
            if(node.right == null){
                node.right = new Node(key);
            }else{
                this.insertNode(node.right,key);
            }
        }
    }


    /**
     * 中序遍历  左 --> 中 --> 右
     * @param {Function} callback 回调函数
     */
    inorderTraverse(callback){
        this.inorderTraverseNode(this.root,callback);
    }   


    inorderTraverseNode(node,callback){
        if(node != null){
            this.inorderTraverseNode(node.left,callback);
            callback(node.key);
            this.inorderTraverseNode(node.right,callback);
        }
    }


    /**
     * 先序遍历  中 --> 左 --> 右
     * @param {Function} callback 回调函数
     */
    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root,callback);
    }

    preOrderTraverseNode(node,callback){
        if(node != null){
            callback(node.key);
            this.preOrderTraverseNode(node.left,callback);
            this.preOrderTraverseNode(node.right,callback);
        }
    }

    /**
     * 后序遍历  左 --> 右 --> 中
     * @param {Function} callback 回调函数
     */
    postOrderTraverse(callback){
        this.postOrderTraverseNode(this.root,callback);
    }

    postOrderTraverseNode(node,callback){
        if(node != null){
            this.postOrderTraverseNode(node.left,callback);
            this.postOrderTraverseNode(node.right,callback);
            callback(node.key);
        }
    }


    /**
     * 找到最小值
     */
    min(){
        return this.minNode(this.root);
    }

    minNode(node){
        let current = node;
        while(current != null && current.left != null){
            current = current.left;
        }
        return current;
    }

    /**
     * 找到最大值
     */
    max(){
        this.maxNode(this.root);
    }

    maxNode(node){
        let current = node;
        while(current != null && current.right != null){
            current = current.right;
        }
        return current;
    }


    /**
     * 搜索一个给定的值
     * @param {*} key 要搜索的值
     * @returns {boolean}
     */
    search(key){
        return this.searchNode(this.root,key);
    }

    searchNode(node,key){
        if(node == null){
            return false;
        }
        if(this.compareFn(key,node.key) === '<'){
            return this.searchNode(node.left,key);
        }else if(this.compareFn(key,node.key) === '>'){
            return this.searchNode(node.right,key);
        }else{
            return true;
        }
    }


    /**
     * 删除一个节点
     * @param {*} key 
     */
    remove(key){
        this.root = this.removeNode(this.root,key);
    }

    removeNode(node,key){
        if(node == null){
            return null;
        }
        if(this.compareFn(key,node.key) == '<'){
            node.left = this.removeNode(node.left,key);
            return node;
        }else if(this.compareFn(key,node.key) == '>'){
            node.right = this.removeNode(node.right,key);
            return node;
        }else{
            // 没有左右子节点
            if(node.left == null && node.right == null){
                node = null;
                return node;
            }
            // 存在一个左节点或者右节点
            if(node.left == null){
                node = node.right;
                return node;
            }else if(node.right == null){
                node = node.left;
                return node;
            }
            // 存在左右节点
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right,aux.key);
            return node;
        }
    }
    
}


class Node{
    constructor(key){
        this.key = key;
        // 左侧子节点引用
        this.left = null; 
        // 右侧子节点引用
        this.right = null; 
    }
}



function test(){
    const tree = new BinarySearchTree();
    const list = [11,7,15,5,3,9,8,10,13,12,14,20,18,25,6];
    list.forEach(val => tree.insert(val));

    const printNode = (value) => console.log(value);

    tree.inorderTraverse(printNode);

}

test();
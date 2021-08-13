class BinarySearchTree{

    constructor(){
        this.root = null;
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
        if(key < node.key){
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
     * 中序遍历
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
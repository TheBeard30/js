/**
 * 二叉堆（最小堆）
 */
class MinHeap{
    constructor(compareFn){
        this.compareFn = compareFn;
        this.heap = [];
    }

    getLeftIndex(index){
        return 2 * index + 1;
    }

    getRightIndex(index){
        return 2 * index + 2;
    }

    getParentIndex(index){
        if(index == 0){
            return undefined;
        }
        return Math.floor((index - 1)/2);
    }

    insert(value){
        if(value != null){
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }

    extract(){
        if(this.isEmpty()){
            return undefined;
        }
        if(this.size() == 1){
            return this.heap.shift();
        }
        const removedValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.siftDown(0);
        return removedValue;
    }
    
    /**
     * 上移操作
     * @param {*} index 索引
     */
    siftUp(index){
        let parentIndex = this.getParentIndex(index);
        while(index > 0 && this.compareFn(this.heap[parentIndex],this.heap[index]) > 0){
            this.swap(this.heap,parentIndex,index);
            index = parentIndex;
            parentIndex = this.getParentIndex(index);
        }
    }

    /**
     * 下移操作
     * @param {*} index 
     */
    siftDown(index){
        let elementIndex = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();

        if(left < size && this.compareFn(this.heap[elementIndex],this.heap[left]) > 0){
            elementIndex = left;
        }
        if(right < size && this.compareFn(this.heap[elementIndex],this.heap[right]) > 0){
            elementIndex = right;
        }
        if(index !== elementIndex){
            this.swap(this.heap,index,elementIndex);
            this.siftDown(elementIndex);
        }
    }

    size(){
        return this.heap.length;
    }


    findMinimum(){
        return this.isEmpty() ? undefined : this.heap[0];
    }

    isEmpty(){
        return this.heap.length == 0;
    }


    swap(array,a,b){
        [array[a],array[b]] = [array[b],array[a]];
    }
    
}


const a = new MinHeap((a,b) => a - b);

a.insert(4);
a.insert(3);
a.insert(32);
a.insert(6);
a.insert(1);
const arr = [];
const size = a.size();
for(let i = 0; i < size; i++){
    arr.push(a.extract());
}

console.log(arr);
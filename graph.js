/**
 * 图是一组由边连接的节点或定点
 * 一个图 G = (V,E) 由以下元素组成
 * V: 一组顶点
 * E: 一组边，连接V中的顶点
 */
class Graph{
    constructor(isDirected = false){
        // 是否有向
        this.isDirected = isDirected;
        // 顶点数组
        this.vertices = [];
        // 邻接表：顶点为key,邻接顶点列表作为值
        this.adjList = new Map();
    }

    /**
     * 添加顶点
     * @param {*} v 
     */
    addVertex(v){
        if(!this.vertices.includes(v)){
            this.vertices.push(v);
            this.adjList.set(v,[]);
        }
    }

    /**
     * 添加边
     * @param {*} v 
     * @param {*} w 
     */
    addEdge(v,w){
        if(!this.adjList.get(v)){
            this.addVertex(v);
        }
        if(!this.adjList.get(w)){
            this.addVertex(w);
        }
        this.adjList.get(v).push(w);
        if(!this.isDirected){
            this.adjList.get(w).push(v);
        }
    }
}
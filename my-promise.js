class MyPromise{

    static PENDING = 'pending';

    static FULFILLED = 'fulfilled';

    static REJECTED = 'rejected';

    constructor(executor){
        this.status = MyPromise.PENDING;
        this.value = null;
        this.callbacks = [];
        try {
            executor(this.resolve.bind(this),this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }


    resolve(value){
        if(this.status == MyPromise.PENDING){
            this.status = MyPromise.FULFILLED;
            this.value = value;
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(value);
                });
            });
        }
    }

    reject(reason){
        if(this.status == MyPromise.PENDING){
            this.status = MyPromise.FULFILLED;
            this.value = reason;
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onRejected(reason);
                });
            });
            
        }
    }

    then(onFulfilled,onRejected){
        if(typeof onFulfilled != "function"){
            onFulfilled = () => this.value;
        }

        if(typeof onRejected != "function"){
            onRejected = () => this.reason;
        }

        let promise = new MyPromise((resolve,reject) => {
            if(this.status == MyPromise.PENDING){
                this.callbacks.push({
                    onFulfilled: value => {
                        this.parse(promise,onFulfilled(value),resolve,reject);
                    },
                    onRejected: value => {
                        this.parse(promise,onRejected(value),resolve,reject);
                    }
                });
            }
    
            if(this.status == MyPromise.FULFILLED){
                setTimeout(() => {
                    this.parse(promise,onFulfilled(this.value),resolve,reject);
                });
      
            }
    
            if(this.status == MyPromise.REJECTED){
                setTimeout(() => {
                    this.parse(promise,onRejected(this.value),resolve,reject);
                });   
            }
        });

        return promise;
    }

    parse(promise,result,resolve,reject){
        if(promise == result){
            throw new TypeError("Chaining cycle detected");
        }
        try {
            if(result instanceof MyPromise){
                 result.then(resolve,reject);
            }else{
                resolve(result);
            }
         } catch (error) {
             reject(error);
         }
    }


    static resolve(value){
        return new MyPromise((resolve,reject) => {
            if(value instanceof MyPromise){
                value.then(resolve,reject);
            }else{
                resolve(value);
            }
            
        });
    }

    static reject(reason){
        return new MyPromise((resolve,reject) => {
            reject(reason);  
        });
    }

    static all(promises){
        const values = [];
        return new MyPromise((resolve,reject) => {
            
            promises.forEach(promise => {
                promise.then(
                    value => {
                        values.push(value);
                        if(values.length == promises.length){
                            resolve(values);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                )
            });
        });
        
    }


    static race(promises){
        return new MyPromise((resolve,reject) => {
            promises.map(promise => {
                promise.then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        reject(reason);
                    }
                );
            });
        });
    }

}
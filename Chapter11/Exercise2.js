class SimplePromise {
    constructor(executor) {
      this.state = 'pending';
      this.value = undefined;
      this.reason = undefined;
      this.onFulfilled = [];
      this.onRejected = [];
      const resolve = (value) => {
        if (this.state === 'pending') {
          this.state = 'fulfilled';
          this.value = value;
          this.onFulfilled.forEach(callback => callback(value));
        }
      };
      const reject = (reason) => {
        if (this.state === 'pending') {
          this.state = 'rejected';
          this.reason = reason;
          this.onRejected.forEach(callback => callback(reason));
        }
      };
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }
    then(onFulfilled, onRejected) {
      return new SimplePromise((resolve, reject) => {
        const handleFulfillment = () => {
          try {
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
        const handleRejection = () => {
          try {
            if (onRejected) {
              const result = onRejected(this.reason);
              resolve(result);
            } else {
              reject(this.reason);
            }
          } catch (error) {
            reject(error);
          }
        };
        if (this.state === 'fulfilled') {
          handleFulfillment();
        } else if (this.state === 'rejected') {
          handleRejection();
        } else {
          this.onFulfilled.push(handleFulfillment);
          this.onRejected.push(handleRejection);
        }
      });
    }
    catch(onRejected) {
      return this.then(null, onRejected);
    }
    finally(onFinally) {
      return this.then(
        value => {
          return SimplePromise.resolve(onFinally()).then(() => value);
        },
        reason => {
          return SimplePromise.resolve(onFinally()).then(() => { throw reason; });
        }
      );
    }
    static resolve(value) {
      return new SimplePromise((resolve) => resolve(value));
    } 
    static reject(reason) {
      return new SimplePromise((_, reject) => reject(reason));
    }
  }
  const promise = new SimplePromise((resolve, reject) => {
    setTimeout(() => resolve("Success!"), 1000);
  });
  promise
    .then(result => {
      console.log(result); 
      return "Next step";
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      console.log("Finished");
    });  
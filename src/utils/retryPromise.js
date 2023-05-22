export default function retryPromise(promiseFn, maxRetries, delay) {
   return new Promise((resolve, reject) => {
      let retries = 0;

      function execute() {
         promiseFn()
            .then(resolve)
            .catch((error) => {
               retries += 1;
               if (retries <= maxRetries) {
                  setTimeout(execute, delay);
               } else {
                  reject(error);
               }
            });
      }

      execute();
   });
}

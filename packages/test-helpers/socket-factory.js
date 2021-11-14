const { Duplex } = require("stream");

// TODO: refactor into something cleaner https://github.com/drazisil/mco-server/issues/1007
class SocketFactory extends Duplex {
  /** @returns {Socket} */
  static createSocket() {
    const duplex = new Duplex();

    /** @type {Socket} */
    const self = Object.assign({}, duplex, {
      localPort: 7003,
      write: () => true,
      connect: () => self,
      setEncoding: () => self,
      pause: () => self,
      resume: () => self,
      setTimeout: () => self,
      setNoDelay: () => self,
      setKeepAlive: () => self,
      address: () => {
        return { address: "", family: "", port: 0 };
      },
      unref: () => self,
      ref: () => self,
      bufferSize: 0,
      bytesRead: 0,
      bytesWritten: 0,
      connecting: false,
      localAddress: "",
      end: () => self,
      addListener: () => self,
      emit: () => false,
      on: () => self,
      once: () => self,
      prependListener: () => self,
      prependOnceListener: () => self,
      _write: () => self,
      _destroy: () => self,
      _final: () => self,
      setDefaultEncoding: () => self,
      cork: () => self,
      uncork: () => self,
      _read: () => self,
      read: () => self,
      isPaused: () => false,
      unpipe: () => self,
      unshift: () => self,
      wrap: () => self,
      push: () => true,
      destroy: () => {
        return;
      },
      removeListener: () => self,
      /** @type {AsyncIterableIterator<string>} */
      [Symbol.asyncIterator]() {
        return {
          /** @type {AsyncIterableIterator<string>} */
          [Symbol.asyncIterator]() {
            if (this.return !== undefined) {
              this.return("foo").then(
                () => {
                  // do nothing.
                },
                () => {
                  // do nothing.
                }
              );
            }
            return this;
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          /** @type {Promise<IteratorResult<string, string>>} */
          next() {
            return new Promise(() => {
              // do nothing.
            });
          },
        };
      },

      pipe(destination) {
        return destination;
      },
    });

    return self;
  }
}
module.exports = { SocketFactory };

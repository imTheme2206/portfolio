// PDF.js uses `for await` for text content. Safari can support streams without
// supporting their async iterator, even when using the legacy PDF.js build.
if (
  typeof ReadableStream !== "undefined" &&
  !(Symbol.asyncIterator in ReadableStream.prototype)
) {
  Object.defineProperty(ReadableStream.prototype, Symbol.asyncIterator, {
    configurable: true,
    writable: true,
    value: async function* (
      this: ReadableStream<unknown>,
      { preventCancel = false }: { preventCancel?: boolean } = {},
    ) {
      const reader = this.getReader();
      let finished = false;
      try {
        while (true) {
          const result = await reader.read();
          if (result.done) {
            finished = true;
            return;
          }
          yield result.value;
        }
      } finally {
        try {
          if (!finished && !preventCancel) await reader.cancel();
        } finally {
          reader.releaseLock();
        }
      }
    },
  });
}

export {};

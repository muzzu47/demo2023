const { pipeline, Readable } = require('stream');
const fs = require('fs');

// Create a custom readable stream to concatenate multiple streams
class ConcatenatedStream extends Readable {
  constructor(streams) {
    super({ objectMode: true });
    this.streams = streams;
  }

  _read() {
    const currentStream = this.streams.shift();

    if (currentStream) {
      currentStream.on('data', (chunk) => {
        this.push(chunk);
      });

      currentStream.on('end', () => {
        this._read();
      });
    } else {
      this.push(null);
    }
  }
}

// Create two readable streams for two files
const readableStream1 = fs.createReadStream('write.txt', { encoding: 'utf8' });
const readableStream2 = fs.createReadStream('write2.txt', { encoding: 'utf8' });

// Create an instance of the custom ConcatenatedStream
const concatenatedStream = new ConcatenatedStream([readableStream1, readableStream2]);

// Consume the concatenated stream
pipeline(
  concatenatedStream,
  process.stdout,
  (err) => {
    if (err) {
      console.error('Concatenation failed:', err);
    } else {
      console.log('Concatenation complete');
    }
  }
);

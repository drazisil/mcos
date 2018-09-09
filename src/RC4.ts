export default class RC4 {
  public key: string;
  public mState: number[];
  private keyBytes: Buffer;
  private keyLen: number;
  private mX: number;
  private mY: number;

  public setEncryptionKey(key: Buffer) {
    this.key = key.toString("hex");
    this.keyBytes = key;
    this.keyLen = this.keyBytes.length;
    this.mState = Array(256);
    this.mX = 0;
    this.mY = 0;

    for (let counter = 0; counter < 256; counter++) {
      this.mState[counter] = counter;
    }

    let index1 = 0;
    let j = 0;

    for (let counter = 0; counter < 256; counter++) {
      j = (j + this.mState[counter] + this.keyBytes[index1++]) % 256;
      this.swapByte(counter, j);
      if (index1 >= this.keyLen) {
        index1 = 0;
      }
    }
  }

  public processBuffer(inBytes: Buffer) {
    let idx1 = 0;
    let idx2 = 0;
    let length = inBytes.length;
    const output = Buffer.alloc(length);
    const s = this.mState;
    let x = this.mX;
    let y = this.mY;

    while (length--) {
      // tslint:disable-next-line no-bitwise
      x = (x + 1) & 0xff;
      const a = s[x];
      // tslint:disable-next-line no-bitwise
      y = (y + a) & 0xff;
      this.swapByte(x, y);

      // tslint:disable-next-line no-bitwise
      output[idx1++] = inBytes[idx2++] ^ s[(s[y] + s[x]) & 0xff];
    }

    this.mX = x;
    this.mY = y;
    return output;
  }

  public processString(inString: string) {
    const inBytes = Buffer.from(inString, "hex");
    let idx1 = 0;
    let idx2 = 0;
    let length = inBytes.length;
    const output = Buffer.alloc(length);
    const s = this.mState;
    let x = this.mX;
    let y = this.mY;

    while (length--) {
      // tslint:disable-next-line no-bitwise
      x = (x + 1) & 0xff;
      const a = s[x];
      // tslint:disable-next-line no-bitwise
      y = (y + a) & 0xff;
      this.swapByte(x, y);

      // tslint:disable-next-line no-bitwise
      output[idx1++] = inBytes[idx2++] ^ s[(s[y] + s[x]) & 0xff];
    }

    this.mX = x;
    this.mY = y;
    return output;
  }

  private swapByte(b1: number, b2: number) {
    const t1 = this.mState[b1];
    this.mState[b1] = this.mState[b2];
    this.mState[b2] = t1;
  }
}

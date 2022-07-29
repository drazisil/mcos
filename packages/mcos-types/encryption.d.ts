/// <reference types="node" />
/**
 *
 *
 * @param {unknown} error
 * @return {string}
 */
export declare function errorMessage(error: unknown): string;
/**
 *
 * @param {IBufferWithConnection} dataConnection
 * @returns {IEncryptionSession}
 */
export declare function selectEncryptors(dataConnection: IBufferWithConnection): IEncryptionSession;
/**
 *
 * @param {ISocketWithConnectionInfo} dataConnection
 * @returns {IEncryptionSession}
 */
export declare function selectEncryptorsForSocket(dataConnection: ISocketWithConnectionInfo): IEncryptionSession;
/**
 *
 * @param {ISocketWithConnectionInfo} dataConnection
 * @param {ISessionRecord} keys
 * @returns {IEncryptionSession}
 */
export declare function selectOrCreateEncryptors(dataConnection: ISocketWithConnectionInfo, keys: ISessionRecord): IEncryptionSession;
/**
   * Update the internal connection record
   */
export declare function updateEncryptionSession(connectionId: string, updatedSession: IEncryptionSession): void;
/**
   * CipherBufferDES
   * @param {import('./types/index.js').EncryptionSession} encryptionSession
   * @param {Buffer} data
   * @return {{session: import('./types/index.js').EncryptionSession, data: Buffer}}
   */
export declare function cipherBufferDES(encryptionSession: IEncryptionSession, data: Buffer): {
    session: IEncryptionSession;
    data: Buffer;
};
/**
   * Decrypt a command that is encrypted with DES
   * @param {import('./types/index.js').EncryptionSession} encryptionSession
   * @param {Buffer} data
   * @return {{session: import('./types/index.js').EncryptionSession, data: Buffer}}
   */
export declare function decipherBufferDES(encryptionSession: IEncryptionSession, data: Buffer): {
    session: IEncryptionSession;
    data: Buffer;
};
/**
   * Decrypt the buffer contents
   */
export declare function decryptBuffer(dataConnection: IBufferWithConnection, buffer: Buffer): {
    session: IEncryptionSession;
    data: Buffer;
};

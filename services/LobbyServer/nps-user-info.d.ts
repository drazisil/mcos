/// <reference types="node" />
/**
 */
/**
 * @class
 * @extends {NPSMessage}
 * @property {number} userId
 * @property {Buffer} userName
 * @property {Buffer} userData
 */
export class NPSUserInfo extends NPSMessage {
  userId: number
  userName: Buffer
  userData: Buffer
  /**
   * @return {void}
   */
  dumpInfo(): void
}
import { NPSMessage } from '../MCOTS/nps-msg.js'
import { Buffer } from 'buffer'

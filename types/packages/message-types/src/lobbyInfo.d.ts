/// <reference types="node" />
/**
 * @class
 * @property {ILobbyInfo} data
 */
export class LobbyInfoPacket {
  /** @type {LobbyInfo} */
  data: LobbyInfo;
  /**
   *
   * @return {Buffer}
   */
  toPacket(): Buffer;
}
/**
 * Object for Loby information
 */
export type LobbyInfo = {
  raceCashFactor: number;
  teamtrialbaseTUP: number;
  teamtrialnumlaps: number;
  bteamtrialbackward: number;
  bteamtrialnight: number;
  clubLogoId: number;
  partPrizesWon: number;
  partPrizesMax: number;
  powerClassMax: number;
  bodyClassMax: number;
  racePointsFactor: number;
  numClubsMin: number;
  clubNumPlayersDefault: number;
  clubNumPlayersMin: number;
  clubNumPlayersMax: number;
  driverHelmetFlag: number;
  newbieFlag: number;
  maxResetSlice: number;
  minResetSlice: number;
  minLevel: number;
  ttvictory_3rd_cash: number;
  ttvictory_3rd_points: number;
  ttvictory_2nd_cash: number;
  ttvictory_2nd_points: number;
  ttvictory_1st_cash: number;
  ttvictory_1st_points: number;
  ttTimeIncrements: number;
  ttCashBonusFasterIncs: number;
  ttPointBonusFasterIncs: number;
  ttCashForQualify: number;
  ttPointForQualify: number;
  lobbyDifficulty: number;
  bestLapTime: number;
  clubBackwards: number;
  clubWeather: number;
  clubNight: number;
  clubNumRounds: number;
  clubNumLaps: number;
  clubNumPlayers: number;
  qualifyingTime: number;
  turfOwner: number;
  topDog: number;
  baienabled: number;
  baidefault: number;
  bdamageenabled: number;
  bdamagedefault: number;
  btrafficenabled: number;
  btrafficdefault: number;
  bbackwardenabled: number;
  bbackwarddefault: number;
  bnightenabled: number;
  bnightdefault: number;
  bweatherenabled: number;
  bweatherdefault: number;
  bnumroundsenabled: number;
  numrouundsdefault: number;
  numroundsmax: number;
  numroundsmin: number;
  bnumlapsenabled: number;
  numlapsdefault: number;
  numlapsmax: number;
  numlapsmin: number;
  bnumplayersenabled: number;
  numplayersdefault: number;
  numplayersmax: number;
  numplayersmin: number;
  linear: number;
  gridSpreadFactor: number;
  dragStagingSlice: number;
  dragStageRight: number;
  dragStageLeft: number;
  endSlice: number;
  startSlice: number;
  turfLength: number;
  elementId: number;
  clientArt: number;
  eTurfName: number;
  NPSRiffName: string;
  turfId: number;
  racetypeId: number;
  lobbyId: number;
};
import { Buffer } from "buffer";

import { UserStatus } from "./messageStructs/UserStatus.js";

export class UserStatusManager {
	static newUserStatus() {
		return new UserStatus({ customerId: 0 });
	}
	static _instance: UserStatusManager;

	static getInstance() {
		if (!UserStatusManager._instance) {
			UserStatusManager._instance = new UserStatusManager();
		}
		return UserStatusManager._instance;
	}
	private _userStatuses: Map<number, UserStatus> = new Map();

	public addUserStatus(userStatus: UserStatus) {
		this._userStatuses.set(userStatus.getCustomerId(), userStatus);
	}

	public removeUserStatus(customerId: number) {
		this._userStatuses.delete(customerId);
	}

	public getUserStatus(customerId: number): UserStatus | undefined {
		return this._userStatuses.get(customerId);
	}

	public getUserStatuses(): UserStatus[] {
		return Array.from(this._userStatuses.values());
	}

	public clearUserStatuses() {
		this._userStatuses.clear();
	}

	static addUserStatus(userStatus: UserStatus) {
		UserStatusManager.getInstance().addUserStatus(userStatus);
	}

	static removeUserStatus(customerId: number) {
		UserStatusManager.getInstance().removeUserStatus(customerId);
	}

	static getUserStatus(customerId: number): UserStatus | undefined {
		const userStatus =
			UserStatusManager.getInstance().getUserStatus(customerId);

		if (userStatus) {
			return userStatus;
		}

		const newUserStatus = new UserStatus({ customerId });

		UserStatusManager.getInstance().addUserStatus(newUserStatus);

		return newUserStatus;
	}

	static getUserStatusBySessionId(sessionId: string): UserStatus | undefined {
		const userStatus = UserStatusManager.getInstance()
			.getUserStatuses()
			.find((userStatus) => {
				return userStatus.getSessionId() === sessionId;
			});

		if (userStatus) {
			return userStatus;
		}

		return undefined;
	}

	getUserStatuseByMachineIdAndIp(
		machineId: string,
		remoteIp: string,
	): UserStatus | undefined {
		return Array.from(this._userStatuses.values()).find((userStatus) => {
			return (
				userStatus.getMachineId() === machineId &&
				userStatus.getRemoteIp() === remoteIp
			);
		});
	}

	static getUserStatuses(): UserStatus[] {
		return UserStatusManager.getInstance().getUserStatuses();
	}
}

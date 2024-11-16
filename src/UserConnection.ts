export interface UserConnectionEntity {
	connected: boolean;
	connectUser(): Promise<void>;
	setupComplete: boolean;
	configureSecureConnection(sessionKey: string): Promise<void>;    
	disconnect(): Promise<void>;
	send(data: Buffer): Promise<void>;
	receive(data: Buffer): Promise<void>;
}

export class UserConnection implements UserConnectionEntity {
	private state: "connected" | "disconnected" = "disconnected";

	// Public properties

	get connected(): boolean {
		return this.state === "connected";
	}
	get setupComplete(): boolean {
		return false;
	}
	async connectUser(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
            reject(new Error("Not implemented"));
        });
	}
	async configureSecureConnection(sessionKey: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			reject(new Error("Not implemented"));
		});
	}
	async send(data: Buffer): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			reject(new Error("Not implemented"));
		});
	}
	async receive(data: Buffer): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			reject(new Error("Not implemented"));
		});
	}

    async disconnect(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            reject(new Error("Not implemented"));
        })
    }
}

import readline from "readline";

export class HotkeyManager {
	private rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	constructor() {
		this.setupHotkeys();
	}

	private setupHotkeys(): void {
		readline.emitKeypressEvents(process.stdin);
		if (process.stdin.isTTY) {
			process.stdin.setRawMode(true);
		}

		process.stdin.on("keypress", (_str, key) => {
			this.handleKeypress(key);
		});

		console.log('Hotkeys enabled. Press "h" for help.');
	}

	private handleKeypress(key: readline.Key): void {
		if (key.ctrl && key.name === "c") {
			this.exit();
		} else {
			switch (key.name) {
				case "h":
					this.showHelp();
					break;
				case "g":
					this.greetUser();
					break;
				case "e":
					this.exit();
					break;
				default:
					console.log(`Unknown key: ${key.name}`);
					break;
			}
		}
	}

	private showHelp(): void {
		console.log("Available hotkeys:");
		console.log("  h - Show this help message");
		console.log("  g - Greet the user");
		console.log("  e - Exit the program");
	}

	private greetUser(): void {
		console.log("Hello, user!");
	}

	private exit(): void {
		console.log("Exiting...");
		this.rl.close();
		process.exit(0);
	}
}

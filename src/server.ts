import { AdminServer } from "./services/AdminServer/AdminServer";
import { IServerConfiguration } from "./services/shared/interfaces/IServerConfiguration";
import { MCServer } from "./services/MCServer/MCServer";
import { Logger } from "./loggerManager";
import { ConfigManager } from "./configManager";

export class Server {
  public config = new ConfigManager().getConfig();
  public logger = new Logger().getLogger("Server");
  public mcServer!: MCServer;
  public adminServer!: AdminServer;

  public async start() {
    this.logger.info("Starting servers...");

    // Start the MC Server
    this.mcServer = new MCServer();
    this.mcServer.startServers(this.config);

    // Start the Admin server
    this.adminServer = new AdminServer(this.mcServer);
    this.adminServer.start(this.config.serverConfig);
    this.logger.info("[adminServer] Web Server started");

    this.logger.info("Servers started, ready for connections.");
  }
}

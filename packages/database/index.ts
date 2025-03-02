// export {
// 	type DatabaseManager,
// 	databaseManager,
// 	getDatabase,
// } from "./src/DatabaseManager.js";
export { getDatabase } from "./src/services/database.js";
export { databaseService, findCustomerByContext } from "./src/databaseService.js";
export { getTunables as getTuneables } from "./src/services/tunables.js";
export { databaseManager } from "./src/DatabaseManager.js";
export { purchaseCar,  } from "./src/functions/purchaseCar.js";
export { getOwnedVehiclesForPerson, getVehicleAndParts } from "./src/functions/createNewCar.js";


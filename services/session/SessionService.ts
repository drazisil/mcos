export class SessionService {
    private static service: SessionService

    constructor() {
        if (SessionService.service) {
            return SessionService.service
        }
        SessionService.service = this
    }

    async new() {
        throw new Error("Not implemented")
    }
}

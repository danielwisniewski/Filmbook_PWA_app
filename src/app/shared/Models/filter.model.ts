export class FilterModel {
    constructor(
        public isOnService: boolean,
        public type: string,
        public isOnSeen: boolean,
        public isOnWatchlist: boolean,
    ) {}
}
export class FilterModel {
    constructor(
        public isOnService: boolean = false,
        public type: string = '',
        public isOnSeen: boolean = false,
        public isOnWatchlist: boolean = false,
        public isOnIgnore: boolean = true,
        public minRating: number = 1
    ) {}
}
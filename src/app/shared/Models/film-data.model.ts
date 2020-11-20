export class FilmData {
    constructor(
        public link: string,
        public poster: string,
        public rating: string,
        public title: string,
        public year: string,
        public time?: string
    ) {}
}
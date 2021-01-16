export class TelevisionSeancesModel {
    constructor(
        public date: string,
        public channel: string,
        public logo: string,
        public seances: {
            time: string,
            duration: number,
            desc: string
        }[]
    ) {}
}
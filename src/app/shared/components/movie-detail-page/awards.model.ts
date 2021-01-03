export class AwardsModel {
    constructor(
        public title: string,
        public image: string,
        public won: {
            name: string,
            desc: string,
        }[],
        public nominations: {
            name: string,
            desc: string
        }[],
    ) {}
}
import { StreamingServicesModel } from "../components/movie-detail-page/streamingServices.model";
import { TelevisionSeancesModel } from "../components/movie-detail-page/televisionSeances.model";

export class FilmData {
    constructor(
        public link?: string,
        public poster?: string,
        public rating?: number,
        public title?: string,
        public year?: number,
        public type?: string,
        public id?: string,
        public myRating?: number,
        public country?: string,
        public director?: string,
        public facts?: string[],
        public duration?: string,
        public time?: string,
        public genre?: string[],
        public plot?: string,
        public awards?: string,
        public service?: string,
        public filmwebUrl?: string,
        public longPlot?: string,
        public seen?: boolean,
        public watchlist?: boolean,
        public ignore?: boolean,
        public timeAdded?: number,
        public timeSeen?: number,
        public tvSeances?: TelevisionSeancesModel[],
        public channel?: string,
        public servicesAvailibility?: StreamingServicesModel[],
        public cast?: {
            actor: string,
            link: string,
            picture: string,
            role: string
        }[],
        public similar?: FilmData[],
    ) {}
}
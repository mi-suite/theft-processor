export interface IPublishOptions {
    topic: string;
    message: any;
}

export interface ISubscribeOptions {
    topic: string;
    fromBeginning?: boolean;
    callback?: Function;
}

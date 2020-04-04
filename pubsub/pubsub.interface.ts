export interface IPubSuB<TPub, TSub> {
    publish: (options: TPub) => any;
    subscribe: (options: TSub) => any;
}

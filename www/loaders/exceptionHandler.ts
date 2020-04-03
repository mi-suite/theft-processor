import {
    UNHANDLED_REJECTION,
    UNCAUGHT_EXCEPTION,
    SIGTERM,
    SIGINT,
} from '../../settings';

process.on(UNHANDLED_REJECTION, (reason) => {
    console.log(`UNHANDLED_REJECTION:::${reason}`);
});

process.on(UNCAUGHT_EXCEPTION, (reason) => {
    console.log(`UNCAUGHT_EXCEPTION:::${reason}`);
    process.exit(0);
});

process.on(SIGTERM, () => {
    process.exit(0);
});

process.on(SIGINT, () => {
    process.exit(0);
});

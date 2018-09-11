const ORMConfig = {
    type: "mysql",
    host: process.env.MYSQL_SERVER,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["backend/entity/**/*.ts"],
    migrations: ["backend/migration/**/*.ts"],
    subscribers: ["backend/subscriber/**/*.ts"]
};

export default ORMConfig;

import { Options } from 'mikro-orm';

require('dotenv').config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_TYPE,
} = process.env;

export default {
    entitiesDirs: ['dist/**/entities'],
    entitiesDirsTs: ['src/**/entities'],
    user: DB_USER,
    password: DB_PASSWORD,
    dbName: DB_NAME,
    type: DB_TYPE,
    autoFlush: false, // read more here: https://mikro-orm.io/unit-of-work/
    migrations: {
        tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
        path: './migrations', // path to the folder with migrations
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: true, // wrap all migrations in master transaction
    },
    tsNode: true,
} as Options;
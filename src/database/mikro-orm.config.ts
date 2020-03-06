import { Options } from 'mikro-orm';

export default {
    entitiesDirs: ['dist/**/entities'],
    entitiesDirsTs: ['src/**/entities'],
    user: 'username',
    password: 'password',
    dbName: 'database',
    type: 'postgresql',
    autoFlush: false, // read more here: https://mikro-orm.io/unit-of-work/
    migrations: {
        tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
        path: './src/migrations', // path to the folder with migrations
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: true, // wrap all migrations in master transaction
    },
} as Options;
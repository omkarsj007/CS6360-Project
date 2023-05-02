# CS 6360 Ecommerce Database
## Deployment

### Initialize Database State
In the mysql shell:
```
source init_db/create_tables.sql
source init_db/populate_tables.sql
source init_db/create_views.sql
```

Update the MySQL config in `expressExample/config/db.config.js`

### Start React front-end
```
npm install
npm start
```

### Start Express back-end
```
cd expressExample
npm install
npm start
```

Login page is at http://localhost:3000/sample
## Instructions
- composer install 
- cp .env.example .env
- php artisan key:generate
- npm install && npm run dev
- touch database/database.sqlite && touch database/database.test.sqlite
- php artisan migrate:fresh --seed
- php artisan serve

## Tests

Front end:
- npm run test

Backend: 
- backend: php artisan test

--------------------------------------------------

# Cyber-Duck Laravel task

Documentation should be kept in the `docs` folder

## TABLE OF CONTENTS

| Title                  | File                                 |
|------------------------|--------------------------------------|
| LOCAL DEV SETUP        | `docs/01-local-development-setup.md` |
| TESTING                | `docs/02-testing.md`                 |
| PACKAGES               | `docs/03-packages.md`                |
| LOCAL DATA             | `docs/04-local-data.md`              |

----

Made with ♥ by [Cyber-Duck Ltd](https://www.cyber-duck.co.uk).
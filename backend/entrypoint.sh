#!/bin/sh

while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

python manage.py migrate

exec daphne -b 0.0.0.0 -p 8000 backend.asgi:application
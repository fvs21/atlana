FROM python:3.13.3-slim

ENV PYTHONBUFFERED=1

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y build-essential libpq-dev
RUN apt-get install exiftool -y
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "backend.asgi:application"]
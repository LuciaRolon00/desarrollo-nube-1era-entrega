#Imagen base
FROM python:3.11-slim

#Metadatos
LABEL mantainer="Lucia luciarolon00@gmail.com"
LABEL project="Space Reviews"
LABEL description="API Backend para Space Reviews - Proyecto UADE"
LABEL version="1.0"

#Configuraciones de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#Directorio de trabajo
WORKDIR /app

#Caché y dependecias
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

#Seguridad
RUN adduser --disabled-password --no-create-home lucia_app

COPY . .

RUN chown -R lucia_app:lucia_app /app

USER lucia_app

#Puerto de la aplicación
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
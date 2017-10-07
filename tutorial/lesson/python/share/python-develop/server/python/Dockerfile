from python:3.6

RUN groupadd -r uwsgi && useradd -r -g uwsgi uwsgi

ARG project_dir=/app/

WORKDIR $project_dir

RUN pip install flask-restful uwsgi jsonify sqlalchemy PyMySQL
# RUN pip install flask uwsgi jsonify sqlalchemy PyMySQL flask-restful
# RUN pip install -r requirements.txt

RUN pip install  simplejson
CMD ["uwsgi", "--ini", "/app/uwsgi.ini"]

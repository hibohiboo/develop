#!/usr/bin/env python
# -- coding: utf-8 --

from flask import Flask, jsonify
# from flask_restful import Resource, Api
from sqlalchemy import Column, ForeignKey, Integer, String, create_engine
from sqlalchemy.orm import Session, relationship, backref, joinedload_all
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.collections import attribute_mapped_collection

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

Base = declarative_base()

class Customer(Base):
    __tablename__ = 'Customer'
    Id = Column(Integer, primary_key=True)
    FirstName = Column(String(15), nullable=False)
    LastName = Column(String(15), nullable=False)
    City = Column(String(40), nullable=False)
    Country = Column(String(40), nullable=True)
    Phone = Column(String(20), nullable=True)

    def __init__(self, firstName, lastName, city, country, phone):
        self.FirstName = firstName
        self.LastName = lastName
        self.City = city
        self.Country = country
        self.Phone = phone

    def __repr__(self):
        return "Customer(Id=%r, FirstName=%r, LastName=%r, City=%r, Country=%r, Phone=%r)" % (
            self.Id,
            self.FirstName,
            self.LastName,
            self.City,
            self.Country,
            self.Phone
        )

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

@app.route("/")
def hello():
    return "Hello World!!日本語"

tasks = [
    {
        'id': 1,
        'title': 'Buy groceries',
        'description': 'ミルク, チーズ, ピザ, フルーツ, Tylenol', 
        'done': False
    },
    {
        'id': 2,
        'title': 'Learn Python',
        'description': 'Need to find a good Python tutorial on the web', 
        'done': False
    }
]

@app.route('/todo/api/v1.0/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

@app.route('/dbtest', methods=['GET'])
def test_db():
    url = 'mysql+pymysql://root:password@db/northwind?charset=utf8'
    engine = create_engine(url, echo=True)
    session = Session(engine)

    # customer = session.query(Customer).first()
    # return jsonify(customer.as_dict())

    customers = session.query(Customer).all()
    if type(customers) == list:
        return jsonify(results=[c.as_dict() for c in customers])
    else:
        return jsonify(result=customers.as_dict())



# Hello World
# class HelloWorld(Resource):
#     def get(self):
#         return {'hello': 'world by get'}

#     def post(self):
#         return {'hello': 'world by post'}

#     def put(self):
#         return {'hello': 'world by put'}

#     def delete(self):
#         return {'hello': 'world by delete'}

# api.add_resource(HelloWorld, '/hello')


if __name__ == "__main__":
    app.run(debug=True)

#!/usr/bin/env python
# -- coding: utf-8 --

from flask import Flask, jsonify, json
# from flask_restful import Resource, Api
from sqlalchemy import Column, ForeignKey, Integer, String, create_engine, DateTime, Float
from sqlalchemy.orm import Session, relationship, backref, joinedload_all
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.collections import attribute_mapped_collection

# datetimeを扱う
import datetime

import decimal
def datetime_handler(x):
    if isinstance(x, datetime.datetime):
        return x.isoformat()
    raise TypeError("Unknown type")

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

Base = declarative_base()

class MyJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            # Convert decimal instances to strings.
            return str(obj)
        return super(MyJSONEncoder, self).default(obj)

app.json_encoder = MyJSONEncoder

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


class Order(Base):
    __tablename__ = 'Order'
    Id = Column(Integer, primary_key=True)
    OrderDate = Column(DateTime, nullable=True)
    OrderNumber = Column(String(10), nullable=True)
    CustomerId = Column(Integer, nullable=False)
    TotalAmount = Column(Float, nullable=True)

    def __init__(self, orderDate, orderNumber, customerId, totalAmount):
    # def __init__(self, orderDate, orderNumber, customerId):
        self.OrderDate = orderDate
        self.OrderNumber = orderNumber
        self.CustomerId = customerId
        self.TotalAmount = totalAmount

    def __repr__(self):
        return "Order(Id=%r, OrderDate=%r, OrderNumber=%r, CustomerId=%r, TotalAmount=%r)" % (
        # return "Order(Id=%r, OrderDate=%r, OrderNumber=%r, CustomerId=%r)" % (
            self.Id,
            self.OrderDate,
            self.OrderNumber,
            self.CustomerId,
            self.TotalAmount
        )

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}



@app.route("/")
def hello():
    return "Hello World!!日本語!!"

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

# flask.jsonを継承して作成
# class DecimalEncoder(json.JSONEncoder):
#     def _iterencode(self, o, markers=None):
#         if isinstance(o, decimal.Decimal):
#             return (str(o) for o in [o])
#         return super(DecimalEncoder, self)._iterencode(o, markers)

@app.route('/order', methods=['GET'])
def test_db_order():
    url = 'mysql+pymysql://root:password@db/northwind?charset=utf8'
    engine = create_engine(url, echo=True)
    session = Session(engine)

    order = session.query(Order).first()
    return jsonify(order.as_dict())
    # return json.dumps(order.as_dict(), default=datetime_handler)



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

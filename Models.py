#-*- coding:utf-8 -*-

from manager_flask_test import db


######db create tables

class pc_Interface(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(200))
    method = db.Column(db.String(100))
    url = db.Column(db.String(1000))
    source = db.Column(db.String(200))
    Token = db.Column(db.String(100))
    param = db.Column(db.Text)
    expect_result = db.Column(db.Text)
    page = db.Column(db.String(100))
    
    def __init__(self,id,name,method,url,source,Token,param,expect_result,page):
        self.id = id
        self.name = name
        self.method = method
        self.url = url
        self.source = source
        self.Token = Token
        self.param = param
        self.page = page
        self.expect_result = expect_result
        



class shunguang_Interface(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(200))
    method = db.Column(db.String(100))
    url = db.Column(db.String(1000))
    source = db.Column(db.String(200))
    Token = db.Column(db.String(100))
    param = db.Column(db.Text)
    expect_result = db.Column(db.Text)
    page = db.Column(db.String(100))
    
    
    def __init__(self,id,name,method,url,source,Token,param,expect_result,page):
        self.id = id
        self.name = name
        self.method = method
        self.url = url
        self.source = source
        self.Token = Token
        self.param = param
        self.page = page
        self.expect_result = expect_result



if __name__=='__main__':
    db.drop_all()
    db.create_all()
    print db

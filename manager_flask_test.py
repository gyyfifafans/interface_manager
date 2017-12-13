#-*- coding:utf-8 -*-

import os.path
from flask import Flask,make_response,request,render_template,send_file,send_from_directory,redirect,url_for
import logging
logger = logging.getLogger(__name__)
from flask_sqlalchemy import SQLAlchemy
import json
import Models
from werkzeug.utils import secure_filename
import time_transfor
import time


app = Flask(__name__)
#app.debug = True
app.root_path = os.path.dirname(os.path.abspath(__file__))
#sql 
app.config['SQLALCHEMY_DATABASE_URI']="mysql://root:jkkcjkkc@localhost:3306/test"
#app.config['SQLALCHEMY_DATABASE_URI']="mysql://root:jkkcjkkc@172.18.22.105:3306/test"
db = SQLAlchemy(app)

@app.route('/login')
def login():
    return "login"

@app.route('/')
def index():
    return "hello world"

@app.route('/test',methods=['GET'])
def test_page():
    #render_template(html,context on html)
    return render_template("index.html")
#
@app.route('/check',methods=['POST','GET'])
def check():
    return render_template('check.html')

@app.route('/swagger',methods=['GET'])
def swagger():
    return render_template("swagger.html")


#pagenation
#'/page=<page>'
@app.route('/page',methods=['GET'])
def pagi(page=1):
    #page should add ++
    pagination = Models.shunguang_Interface.query.paginate(page+3,per_page=2,error_out=False)
    shunguang = pagination.items
    for s in shunguang:
        print s.name

    ps = Models.shunguang_Interface.query.paginate(2,per_page=6,error_out=False)
    shun = ps.items
    for t in shun:
        print t.name
    print pagination.pages
    print pagination.page
    print pagination.has_prev
    print ps.has_prev
    print ps.has_next
    for i in pagination.iter_pages():
        print 'page:'+str(i)
    return render_template('pagination.html',data=shunguang,pagination=pagination)
#
@app.route("/test/<mtype>",methods=['GET','POST'])
def test(mtype):
    
    data = []
    '''
    if mtype=='wap':
        wap = wap_Interface(2,'2',"3",'4','5','6','7')
        db.session.add(wap)
        db.session.commit()
        '''
    if mtype == 'shunguang':
        shunguang = Models.shunguang_Interface.query.all()
        for i in shunguang:
            data.append({"id":i.id,"name":i.name,"method":i.method,"url":i.url,"source":i.source,"token":i.Token,"page":i.page})
        return json.dumps(data)
        
    elif mtype == 'pc':
        pc = Models.pc_Interface.query.all()
        #query return [wap_Interface's list] every element have (.property)
        for i in pc:
            data.append({"id":i.id,"name":i.name,"method":i.method,"url":i.url,"source":i.source,"token":i.Token,"page":i.page})
        return  json.dumps(data)


@app.route('/add',methods=['POST'])      
def addInfo():
    print 1


@app.route('/del',methods=['POST'])
def delInfo():
    if request.method == 'POST':
        print request.get_json()
        print request.get_data()
        return 'yes,got it!'


@app.route('/search',methods=['POST'])
def searchInfo():
    print 3


@app.route('/<filename>')
def download_file(filename):
    #filepath = "test.mp4"
    filepath = filename
    return app.send_static_file(filepath)
'''
@app.route('/<filename>')
def get_file(filename):
    directory = os.getcwd()+"\static"
    print app.root_path
    return send_from_directory(directory,filename,as_attachment=True)
'''
@app.route('/hotrepair',methods=['GET'])
def hot_repair():
    #directory = os.getcwd()+"\hot_repair"
    directory = os.getcwd()+"\static"
    filelist = os.listdir(directory)
    fileslist = []
    dirslist = []
    timelist = {}
    for files in filelist:
        #os.path.isfile(path)
        #os.stat(path)
        filepath = os.path.join(directory,files)
        filetime = time_transfor.timestamp_time(os.stat(filepath).st_mtime)
        if os.path.isfile(filepath):
            timelist[files] = filetime
            fileslist.append(files)
        #os.path.isdir(path)
        elif os.path.isdir(filepath):
            dirslist.append(files)
    return render_template("hotrepair.html",filesresult = fileslist,dirsresult = dirslist,timeresult = timelist)


@app.route('/upload',methods=['GET','POST'])
def upload():
    print request.method
    if request.method == 'POST':
        f = request.files['file']
        directory = os.getcwd()+'\static'
        #upload_path = os.path.join(directory,'\static',secure_filename(f.filename))
        upload_path = os.path.join(directory,f.filename)
        print upload_path
        f.save(upload_path)
        
    #return render_template('hot_repair.html')
    return redirect(url_for('hot_repair'))

if __name__=='__main__':
    print(app.view_functions)
    app.run(host='0.0.0.0',port=5000,debug=True)
    

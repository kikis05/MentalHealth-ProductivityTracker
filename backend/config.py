from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydata.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False 

# for image uploads
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


db = SQLAlchemy(app)
# migrate = Migrate(app, d)
from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(80), unique = False, nullable = False)
    last_name = db.Column(db.String(80), unique = False, nullable = False)
    email = db.Column(db.String(120), unique = False, nullable = False)

    def to_json(self):
        return {
            "id" : self.id,
            "firstName" : self.first_name,
            "lastName" : self.last_name,
            "email" : self.email
        }
    
class ToDoItem(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    list_item = db.Column(db.String(200), unique = False, nullable = False)
    completion_status = db.Column(db.String(1), unique = False, nullable = False)

    def to_json(self):
        return{
            "id" : self.id,
            "listItem" : self.list_item,
            "completionStatus" : self.completion_status
        }
    
class Task(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    task_name = db.Column(db.String, unique=False, nullable=False)
    number_days = db.Column(db.Integer, unique=False, nullable=False)

    def to_json(self):
        return {
            "id" : self.id,
            "taskName" : self.task_name,
            "numberDays" : self.number_days,
        }
    
class Project(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    task_name = db.Column(db.String, unique=False, nullable=False)
    number_days = db.Column(db.Integer, unique=False, nullable=False)
    color = db.Column(db.String, unique = False, nullable=False)

    def to_json(self):
        return {
            "id" : self.id,
            "taskName" : self.task_name,
            "numberDays" : self.number_days,
            "color" : self.color
        }
    
class TaskUpdate(db.Model):
    #add this as a structure to Task'
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String, unique=False, nullable=False)
    task_name = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique = False, nullable = True)
    color = db.Column(db.String, unique = False, nullable = False)
    #denormalizing color and task_name because initial color will not be updated in the future. 
    #OR WILL IT?

    def to_json(self):
        return {
            "id" : self.id,
            "date" : self.date,
            "description" : self.description,
            "color" : self.color,
            "taskName" : self.task_name
        }
    
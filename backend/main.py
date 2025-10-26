import os
from flask import request, jsonify
from werkzeug.utils import secure_filename
from sqlalchemy import desc
from config import app, db
from models import Contact
from models import ToDoItem
from models import Project
from models import TaskUpdate
from models import ImageUpload
from models import HealthUpdate
import random
import pandas as pd
import datetime
from datetime import date as DATE

def random_color_generator():
    cbf_colors = ["#AA4499", "#882255", "#CC6677", "#DDCC77", "#88CCEE", "#44AA99", "#117733", "#332288"]
    return random.choice(cbf_colors)

def format_dates(date_str):
    str = date_str[12:] + "-"
    month = date_str[8:11]
    match month:
        case "Jan":
            str += "01"
        case "Feb":
            str += "02"
        case "Mar":
            str += "03"
        case "Apr":
            str += "04"
        case "May":
            str += "05"
        case "Jun":
            str += "06"
        case "Jul":
            str += "07"
        case "Aug":
            str += "08"
        case "Sep":
            str += "09"
        case "Oct":
            str += "10"
        case "Nov":
            str += "11"
        case "Dec":
            str += "12"
    str = str + "-" + date_str[5:7]
    return str

def organize_updates_by_date(task_updates, health_updates, today):
    #later see if you can save this json and keep updating it rather than recreating list
    json_date_formatted_updates = []
    if len(task_updates) == 0:
        start = format_dates(health_updates[0].date)
    elif len(health_updates) == 0:
        start = format_dates(task_updates[0].date)
    else:
        task_start = format_dates(task_updates[0].date)
        health_start = format_dates(health_updates[0].date)
        if pd.to_datetime(task_start) < pd.to_datetime(health_start):
            start = task_start
        else:
            start = health_start
    #print("start today", start, today)
    if start != today:
        list_of_dates = pd.date_range(start = start,
                                 end = today, freq = "D")
    else:
        list_of_dates = [start]

    #print("lod", list_of_dates)
    iter_t = 0
    iter_h = 0
    for date in list_of_dates:
        comparable_date = pd.to_datetime(date)
        #print("date", date)
        task_update_list = []
        while (iter_t < len(task_updates) and pd.to_datetime(format_dates(task_updates[iter_t].date)) == comparable_date):
            #print("task_updates added", task_updates[iter_t].to_json())
            task_update_list.append(task_updates[iter_t].to_json())
            iter_t += 1
        health_update_list = []
        while (iter_h < len(health_updates) and pd.to_datetime(format_dates(health_updates[iter_h].date)) == comparable_date):
            #print("health_updates added", health_updates[iter_h].to_json())
            health_update_list.append(health_updates[iter_h].to_json())
            iter_h += 1
        json_date_formatted_updates.append(to_date_json(date, task_update_list, health_update_list))
    #print("json Formatted upd", json_date_formatted_updates)
    return json_date_formatted_updates

def to_date_json(date, tasks, health):
    #print("Date is, ", str(date))
    return {
        "date": str(date)[:10],
        "task_updates": tasks,
        "health_updates": health
    }

def organize_updates_by_task(updates, tasks):
    json_task_formatted_updates = []
    for task in tasks:
        temp_update_list = []
        for update in updates:
            # #print("comparing " + update.task_name + " to " + task.task_name)
            if (update.task_name == task.task_name):
                # #print("matched")
                temp_update_list.append(update.to_json())
        json_task_formatted_updates.append(to_task_json(task, temp_update_list))
    return json_task_formatted_updates
        
def to_task_json(task, ls):
    return {
        "taskName": task.task_name,
        "upd": ls
    }

def allowed_file(filename):
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route("/list", methods = ["GET"])
def get_list():
    task_list = Project.query.all()
    json_task_list = list(map(lambda x: x.to_json(), task_list))
    return jsonify({"taskList" : json_task_list})

@app.route("/task_updates", methods = ["GET"])
def get_task_updates():
    updates = TaskUpdate.query.all()
    json_updates = list(map(lambda x: x.to_json(), updates))
    #json_updates = organize_updates_by_date(updates)
    return jsonify({"taskUpdates" : json_updates})

@app.route("/updates_by_date", methods = ["GET"])
def get_task_updates_by_date():
    task_updates = TaskUpdate.query.all()
    health_updates = HealthUpdate.query.all()
    if (len(task_updates) + len(health_updates) > 0):
        # json_updates = list(map(lambda x: x.to_json(), updates))
        json_updates = organize_updates_by_date(task_updates, health_updates, DATE.today())
        return jsonify({"updates" : json_updates})
    else:
        message = "No updates yet"
        return jsonify({"updates" : message})
    
@app.route("/health_updates_by_date", methods = ["GET"])
def get_health_updates_by_date():
    updates = HealthUpdate.query.all()
    #print("updates are", updates)
    if (len(updates) > 0):
        # json_updates = list(map(lambda x: x.to_json(), updates))
        json_updates = organize_health_updates_by_date(updates, DATE.today())
        #print("formatted updates", json_updates)
        return jsonify({"healthUpdates" : json_updates})
    else:
        message = "No updates yet"
        return jsonify({"healthUpdates" : message})

@app.route("/task_updates_by_task", methods = ["GET"])
def get_task_updates_by_task():
    updates = TaskUpdate.query.all()
    tasks = Project.query.all()
    if (len(updates) > 0):
        # json_updates = list(map(lambda x: x.to_json(), updates))
        json_updates = organize_updates_by_task(updates, tasks)
        return jsonify({"taskUpdates" : json_updates})
    else:
        message = "No updates yet"
        return jsonify({"taskUpdates" : message})

@app.route("/start_date", methods = ["GET"])
def get_start_date():
    firstUpdate = TaskUpdate.query.get(1)
    return jsonify({"startDate" : firstUpdate.date})


@app.route("/create_task", methods = ["POST"])
def create_task():
    item = request.json.get("taskName")
    number_days = request.json.get("numberDays")
    color = random_color_generator()
    if not item:
        return jsonify({"message" : "Please enter a task description"}), 400
    new_task = Project(task_name = item, number_days = number_days, color = color)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message" : "Task created!"}), 201


@app.route("/create_update/<int:task_id>", methods = ["POST"])
def create_update(task_id):
    task = Project.query.get(task_id)
    task_name = task.task_name
    color = task.color
    description = request.json.get("description")
    date = request.json.get("date")
    #print("TASK DATE" , date)
    if not description:
        description = ""
    if not date:
        return jsonify({"message": "no date added"}), 404
    new_update = TaskUpdate(date = date, description = description, color = color, task_name = task_name)
    try:
        db.session.add(new_update)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message" : "Update to " + task_name + " created!"}), 201


@app.route("/increase_task_counter/<int:task_id>", methods = ["PATCH"])
def increase_task_counter(task_id):
    item = Project.query.get(task_id)
    if not item:
        return jsonify({"message": "item not found"}), 404
    item.number_days += 1
    db.session.commit()
    return jsonify({"message": "Number of days increased."}),200

@app.route("/delete_task/<int:task_id>", methods = ["DELETE"])
def delete_task(task_id):
    item = Project.query.get(task_id)
    if not item:
        return jsonify({"message": "Task not found"}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message" : "Task deleted."}), 200

# @app.route("/upload_image", methods = ["POST"])
# def upload_image():
#     #print("Uploaded Image!!!")
#     file = request.files['file']
#     if not file:
#         return jsonify({"message": "No string uploaded"}), 404
#     file_name = secure_filename(file.filename)
#     if not allowed_file(file_name):
#         return jsonify({"message": "Invalid file format. Allowed formats: png, jpg, jpeg, and gif."}), 400
#     file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name))
#                 # Store 'filename' in your database if needed
#     #print("saved image")
#     new_image = ImageUpload(file_name = file_name)
#     #print("new image", new_image)
#     try:
#         db.session.add(new_image)
#         db.session.commit()
#         #print("image has been uploaded")
#     except Exception as e:
#         return jsonify({"message": str(e)}), 400
#     return jsonify({"message" : "Image uploaded!"}), 201

# @app.route("/get_image", methods = ["GET"])
# def get_image():
#     images = ImageUpload.query.all()
#     json_image_list = list(map(lambda x: x.to_json(), images))
#     #print("image", json_image_list)
#     return jsonify({"images" : json_image_list})

@app.route("/create_health_update", methods = ["POST"])
def create_health_update():
        date = request.json.get("dateFormatted")
        time = datetime.datetime.strptime(request.json.get("time"),'%H:%M').strftime('%I:%M %p')
        mood = request.json.get("mood")
        satisfaction = request.json.get("satisfaction")
        stress = request.json.get("stress")
        energy = request.json.get("energy")
        appetite = request.json.get("appetite")
        sleep = request.json.get("sleep")
        notes = request.json.get("note")
        #print("NOTES ARE", notes)
        new_update = HealthUpdate(
            date = date,
            time = time,
            mood = mood,
            satisfaction = satisfaction,
            stress = stress,
            energy = energy,
            appetite = appetite,
            sleep = sleep,
            notes = notes
        )
        try:
            db.session.add(new_update)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": str(e)}), 400
        return jsonify({"message" : "Health Update created!"}), 201

@app.route("/health_updates", methods = ["GET"])
def health_udpates():
    health_updates_list = HealthUpdate.query.all()
    json_health_update_list = list(map(lambda x: x.to_json(), health_updates_list))
    return jsonify({"healthUpdateList" : json_health_update_list})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
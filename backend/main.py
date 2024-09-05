from flask import request, jsonify
from config import app, db
from models import Contact
from models import ToDoItem
from models import Project
from models import TaskUpdate
import random
import pandas as pd
from datetime import date as date

def random_color_generator():
    #return "hsl(" + str(360 * random.random()) + "," + str(35 + 60 * random.random()) + "%," + str(65 + 10 * random.random()) + "%)"
    cbf_colors = ["#AA4499", "#882255", "#CC6677", "#DDCC77", "#88CCEE", "#44AA99", "#117733", "#332288"]
    return random.choice(cbf_colors)

def format_dates(date_str):
    print("PRINT WORKS")
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

def organize_updates_by_date(updates, today):
    #later see if you can save this json and keep updating it rather than recreating list
    print("came in here")
    json_date_formatted_updates = []
    list_of_dates = pd.date_range(start = format_dates(updates[0].date),
                                 end = today, freq = "D")
    print("list of dates are"+ str(list_of_dates))
    #for loop
    iter = 0
    for date in list_of_dates:
        temp_update_list = []
        while (iter < len(updates) and format_dates(updates[iter].date) == str(date)[:10]):
            print ("came into match loop")
            temp_update_list.append(updates[iter].to_json())
            iter += 1
        json_date_formatted_updates.append(to_date_json(date, temp_update_list))
    return json_date_formatted_updates


def to_date_json(date, ls):
    return {
        "date": str(date)[:10],
        "upd": ls
    }

def organize_updates_by_task(updates, tasks):
    json_task_formatted_updates = []
    for task in tasks:
        temp_update_list = []
        for update in updates:
            print("comparing " + update.task_name + " to " + task.task_name)
            if (update.task_name == task.task_name):
                print("matched")
                temp_update_list.append(update.to_json())
        json_task_formatted_updates.append(to_task_json(task, temp_update_list))
    return json_task_formatted_updates
        
def to_task_json(task, ls):
    return {
        "taskName": task.task_name,
        "upd": ls
    }
        


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

@app.route("/task_updates_by_date", methods = ["GET"])
def get_task_updates_by_date():
    updates = TaskUpdate.query.all()
    if (len(updates) > 0):
        # json_updates = list(map(lambda x: x.to_json(), updates))
        json_updates = organize_updates_by_date(updates, date.today())
        return jsonify({"taskUpdates" : json_updates})
    else:
        message = "No updates yet"
        return jsonify({"taskUpdates" : message})

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

# @app.route("/update_contact/<int:user_id>", methods = ["PATCH"])
# def update_contact(user_id):
#     contact = Contact.query.get(user_id)
#     if not contact:
#         return jsonify({"message": "User not found"}), 404
    
#     data = request.json
#     contact.first_name = data.get("firstName", contact.first_name)
#     contact.last_name = data.get("lastName", contact.last_name)
#     contact.email = data.get("email", contact.email)

#     db.session.commit()
    
#     return jsonify({"message" : "User updated."}), 200

# @app.route("/update_item_completion/<int:list_item_id>", methods = ["PATCH"])
# def update_item_completion(list_item_id):
#     item = ToDoItem.query.get(list_item_id)
#     if not item:
#         return jsonify({"message": "item not found"}), 404
#     if item.completion_status == "N":
#         item.completion_status = "C"
#     else:
#         item.completion_status = "N"
#     db.session.commit()
#     return jsonify({"message": "Item completion status updated."}),200

@app.route("/increase_task_counter/<int:task_id>", methods = ["PATCH"])
def increase_task_counter(task_id):
    item = Project.query.get(task_id)
    if not item:
        return jsonify({"message": "item not found"}), 404
    item.number_days += 1
    db.session.commit()
    return jsonify({"message": "Number of days increased."}),200

# @app.route("/decrease_task_counter/<int:task_id>", methods = ["PATCH"])
# def decrease_task_counter(task_id):
#     item = Project.query.get(task_id)
#     if not item:
#         return jsonify({"message": "item not found"}), 404
#     if (item.number_days > 0):
#         item.number_days -= 1
#         db.session.commit()
#     return jsonify({"message": "Number of days decreased."}),200

@app.route("/delete_task/<int:task_id>", methods = ["DELETE"])
def delete_task(task_id):
    item = Project.query.get(task_id)
    if not item:
        return jsonify({"message": "Task not found"}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message" : "Task deleted."}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
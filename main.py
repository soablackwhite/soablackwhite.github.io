# imports
from flask import Flask, render_template, request, jsonify, session
from google.cloud import storage, datastore
import datetime
import uuid
import json

########################### SET UP ################################
app = Flask(__name__)
app.secret_key = 'nopls'
storage_client = storage.Client()
datastore_client = datastore.Client()

########################### FUNCTIONS ################################
def store_time(dt):
    entity = datastore.Entity(key=datastore_client.key('visit'))
    entity.update({
        'timestamp': dt
    })
    datastore_client.put(entity)

def fetch_times(limit):
    query = datastore_client.query(kind='visit')
    query.order = ['-timestamp']
    times = query.fetch(limit=limit)
    return times

def store_slider_history(session_id, slider_value, time_spent):
    entity_key = datastore_client.key('slider_history', session_id)
    entity = datastore.Entity(key=entity_key)

    slider_history = json.loads(entity.get('history', '[]'))
    slider_history.append({
        'value': slider_value,
        'time_spent': time_spent
    })
    entity.update({
        'history': json.dumps(slider_history)
    })
    datastore_client.put(entity)

########################### DEFAULT ROUTE ################################
@app.route("/")
def index():
    # get a reference to your bucket and the media folder
    bucket = storage_client.get_bucket('bucket-portfolio')
    folder = bucket.blob('media/')
    #list all blobs in the media folder and filter for image files
    blobs = bucket.list_blobs(prefix='media/')
    image_blobs = [blob for blob in blobs if blob.name.endswith(('.jpg', '.jpeg', '.png', '.gif', 'svg'))]
    # Store the current access time in Datastore.
    store_time(datetime.datetime.now(tz=datetime.timezone.utc))
    # Fetch the most recent 10 access times from Datastore.
    times = fetch_times(10)
    return render_template("index.html", times=times)

########################### SLIDER UPDATE ROUTE ################################
@app.route('/slider_update', methods=['POST'])
def slider_update():
    slider_value = request.form.get('slider_value')
    time_spent = request.form.get('time_spent')

    # Check if the session has an ID. If not, generate a new ID.
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())

    session_id = session['session_id']

    # Update the slider history and store it in Google Cloud Datastore
    store_slider_history(session_id, slider_value, time_spent)

    return jsonify(success=True)

if __name__ == '__main__':
    # only when running locally
    app.run(host='127.0.0.1', port=8080, debug=True)

# @app.errorhandler(404)
# def page_not_found(e):
#     return render_template('404.html'), 404
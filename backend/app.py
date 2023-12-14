import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv
# IMPORT MODEL
from Models.UserModel import db
# IMPORT CONTROLLER
from Controllers.UserController import main_bp
from Controllers.TransactionController import transaction_bp

app = Flask(__name__)
CORS(app)
load_dotenv()

# Konfigurasi database
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inisialisasi objek SQLAlchemy
db.init_app(app)
migrate = Migrate(app, db)

# Registrasi blueprint
app.register_blueprint(main_bp)
app.register_blueprint(transaction_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
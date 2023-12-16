from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nim = db.Column(db.Integer, unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    presensi_kelas = db.relationship('Presensi', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class Presensi(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prodi = db.Column(db.String(60), nullable=False)
    matakuliah = db.Column(db.String(60), nullable=False)
    kelas = db.Column(db.String(60), nullable=False)
    tanggal = db.Column(db.String(60), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

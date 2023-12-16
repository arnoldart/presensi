from flask_bcrypt import Bcrypt
from flask import Blueprint, jsonify, request
from sqlalchemy import desc, join
from Models.UserModel import MahasiswaPresensi, Presensi, User, db

main_bp = Blueprint('main', __name__)
bcrypt = Bcrypt()

@main_bp.route('/add_user', methods=['POST'])
def add_user():
    data = request.json  # Mengambil data JSON dari body permintaan

    print(data)
    
    # Memeriksa keberadaan username dan password dalam data JSON
    if 'nim' not in data or not data['nim'] or \
       'password' not in data or not data['password'] or \
       'username' not in data or not data['username']:
        return jsonify({'error': 'Username, and password cannot be empty'}), 400
    
    nim = data['nim']
    nama = data['username']
    password = data['password']
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    new_user = User(nim=nim, password=hashed_password, nama=nama)
    db.session.add(new_user)

    try:
        # Melakukan commit untuk menyimpan data ke dalam database
        db.session.commit()
        return jsonify({'message': 'User added successfully'}), 201
    except Exception as e:
        # Jika terjadi kesalahan, batalkan transaksi dan kirim respons kesalahan
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        # Selalu tutup sesi database setelah penggunaan
        db.session.close()

@main_bp.route('/login', methods=['POST'])
def login():
    data = request.json

    if 'nim' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400

    user = User.query.filter_by(nim=data['nim']).first()

    if user and user.check_password(data['password']):
        # Menambahkan pemeriksaan peran di sini
        return jsonify({'message': 'User login successful','token': "token", 'id': user.id}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
    
@main_bp.route('/add_new_presensi', methods=['POST'])
def add_new_presensi():
    data = request.json
    
    try:
        # Assuming you will receive JSON data in the request
        data = request.get_json()

        # Retrieve the user by user_id

        # Create a new Presensi entry
        presensi = Presensi(
            prodi=data['prodi'],
            matakuliah=data['matkul'],
            kelas=data['kelas'],
            tanggal=data['tanggal'],
            user_id=data['user_id']
        )

        db.session.add(presensi)
        db.session.commit()
        
        new_presensi_id = presensi.id

        return jsonify({'message': 'Presensi added successfully', 'id_presensi_kelas': new_presensi_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@main_bp.route('/add_presensi_mahasiswa', methods=['POST'])
def add_presensi_mahasiswa():
    data = request.get_json()

    try:
        user = User.query.filter_by(nim=data['nim']).first()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        existing_presensi = MahasiswaPresensi.query.filter_by(nim_id=user.id, presensi_id=data['id_presensi_kelas']).first()

        if existing_presensi:
            return jsonify({'error': 'Presensi for this nim and presensi_id already exists'}), 400

        presensi_mahasiswa = MahasiswaPresensi(
            nim_id=user.id,
            presensi_id=data['id_presensi_kelas'],
        )

        db.session.add(presensi_mahasiswa)
        db.session.commit()

        return jsonify({'message': 'Presensi added successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main_bp.route('/get_users', methods=['GET'])
def get_users():
    try:
        search_nim = request.args.get('nim', default=None, type=str)

        # If search_nim is provided, filter by nim
        if search_nim:
            users = User.query.filter(User.nim.ilike(f'%{search_nim}%')).all()
        else:
            # Fetch users in descending order based on their id
            users = User.query.order_by(desc(User.id)).all()

        user_data = []

        for user in users:
            user_data.append({
                'id': user.id,
                'nim': user.nim,
                'name': user.nama
            })

        return jsonify(user_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@main_bp.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'error': 'User not found'}), 404
    
@main_bp.route('/get_all_presensi_by_id/<int:presensi_id>', methods=['GET'])
def get_all_presensi_by_id(presensi_id):
    try:
        search_nim = request.args.get('nim', default=None, type=str)
        
        # Lakukan kueri untuk mendapatkan data berdasarkan presensi_id dan filter NIM jika ada
        presensi_data = db.session.query(
            User.nim,
            User.nama
        ).join(
            MahasiswaPresensi, User.id == MahasiswaPresensi.nim_id
        ).join(
            Presensi, MahasiswaPresensi.presensi_id == Presensi.id
        ).filter(
            Presensi.id == presensi_id
        )
        
        # Filter berdasarkan NIM menggunakan LIKE jika ada nilai pencarian
        if search_nim:
            presensi_data = presensi_data.filter(User.nim.ilike(f'%{search_nim}%'))

        # Eksekusi kueri
        presensi_data = presensi_data.all()

        # Format hasil kueri ke dalam bentuk JSON
        result = [{'nim': row.nim, 'nama': row.nama} for row in presensi_data]

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@main_bp.route('/delete_presensi_mahasiswa/<int:presensi_id>/<string:nim>', methods=['DELETE'])
def delete_presensi_mahasiswa(presensi_id, nim):
    
    try:
        # Cari id User berdasarkan nim
        user_id = User.query.filter_by(nim=nim).first()

        if not user_id:
            return jsonify({'error': 'User not found for the given nim'}), 404

        # Hapus entri MahasiswaPresensi berdasarkan presensi_id dan nim
        deleted_entry = MahasiswaPresensi.query.filter_by(presensi_id=presensi_id, nim_id=user_id.id).first()

        if not deleted_entry:
            return jsonify({'error': 'Presensi for this nim and presensi_id not found'}), 404

        db.session.delete(deleted_entry)
        db.session.commit()

        return jsonify({'message': 'Presensi deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
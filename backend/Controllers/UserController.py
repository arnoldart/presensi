from flask_bcrypt import Bcrypt
from flask import Blueprint, jsonify, request
from sqlalchemy import desc
from Models.UserModel import User, db

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
        return jsonify({'message': 'User login successful', 'token': "token user", 'id': user.id}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

# @main_bp.route('/get_users', methods=['GET'])
# def get_user():
#     users = User.query.all()
#     user_data = []

#     for user in users:
#         user_transactions = Transaction.query.filter_by(user_id=user.id).all()
#         transactions = [{'status': transaction.status, 'type': transaction.type} for transaction in user_transactions]

#         user_data.append({
#             'id': user.id,
#             'username': user.username,
#             'email': user.email,
#             'transactions': transactions,
#             'role': user.role
#         })

#     return jsonify(user_data)

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
    # try:
    #     search_username = request.args.get('username', default=None, type=str)

    #     # If search_username is provided, filter by username
    #     if search_username:
    #         users = User.query.filter(User.username.ilike(f'%{search_username}%')).all()
    #     else:
    #         # Fetch users in descending order based on their id
    #         users = User.query.order_by(desc(User.id)).all()

    #     user_data = []

    #     for user in users:
    #         user_transactions = Transaction.query.filter_by(user_id=user.id).all()
    #         transactions = [{'status': transaction.status, 'type': transaction.type} for transaction in user_transactions]

    #         user_data.append({
    #             'id': user.id,
    #             'nim': user.nim,
    #             'email': user.email,
    #             'transactions': transactions,
    #             'role': user.role
    #         })

    #     return jsonify(user_data)
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500

@main_bp.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'error': 'User not found'}), 404
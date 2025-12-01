![WhatsApp Image 2025-12-01 at 9 57 27 PM](https://github.com/user-attachments/assets/0b50336d-1584-4c27-b5bd-6311c009e27d)

![WhatsApp Image 2025-12-01 at 9 57 27 PM](https://github.com/user-attachments/assets/9b01f250-5c78-4dbd-8430-3ef9e0621aa4)



# Todo App (React Native + Django + MySQL)

A simple Todo application with:
- React Native frontend
- Django REST Framework backend
- MySQL database
- JWT authentication

---

## 📱 Frontend (React Native)

### Install & Run
cd frontend
npm install
npm start

###Backend (Django + MySQL)

cd backend
python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt

###Add MySQL settings in settings.py:
  'USER': 'root',
  'PASSWORD': 'your_password',

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


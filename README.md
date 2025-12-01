<img src="https://github.com/user-attachments/assets/1c678e95-5b16-4e4a-ab42-cc4f0828bf4e" width="250"/>

<img src="https://github.com/user-attachments/assets/9b01f250-5c78-4dbd-8430-3ef9e0621aa4" width="250"/>




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


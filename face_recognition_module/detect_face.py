import cv2
import face_recognition
import numpy as np
import pickle
import requests
from utils.preprocess import preprocess_image
from utils.helpers import load_embeddings, find_match

# Paths & backend endpoint
EMBEDDINGS_PATH = './models/face_encodings.pkl'
BACKEND_API = "http://localhost:8000/attendance/mark"  # Replace with your actual endpoint

def recognize_and_mark():
    # Load saved embeddings
    embeddings = load_embeddings(EMBEDDINGS_PATH)

    # Open webcam
    cap = cv2.VideoCapture(0)

    print("Starting face recognition. Press 'q' to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        # Resize for faster processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.5, fy=0.5)
        rgb_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

        # Detect faces
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        for face_encoding in face_encodings:
            student_id = find_match(face_encoding, embeddings)
            if student_id:
                print(f"Student recognized: {student_id}")
                # Send POST request to backend to mark attendance
                try:
                    response = requests.post(BACKEND_API, json={"student_id": student_id})
                    print(f"Attendance marked: {response.json()}")
                except Exception as e:
                    print(f"Error marking attendance: {e}")

        # Display the camera feed
        for (top, right, bottom, left) in face_locations:
            # Scale back up face locations since frame was resized
            top *= 2
            right *= 2
            bottom *= 2
            left *= 2
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

        cv2.imshow('Face Recognition Attendance', frame)

        # Exit on 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    recognize_and_mark()

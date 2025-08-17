import os
import pickle
import numpy as np
import cv2
import face_recognition
from utils.preprocess import preprocess_image
from utils.helpers import save_embeddings, load_embeddings

# Paths
DATASET_DIR = './dataset/'            # Folder containing student images
EMBEDDINGS_PATH = './models/face_encodings.pkl'  # Save embeddings here

def encode_faces():
    """
    Encode all faces in the dataset and save embeddings.
    """
    embeddings = load_embeddings(EMBEDDINGS_PATH)  # Load existing embeddings if any

    for student_folder in os.listdir(DATASET_DIR):
        folder_path = os.path.join(DATASET_DIR, student_folder)
        if not os.path.isdir(folder_path):
            continue

        print(f"Encoding faces for student: {student_folder}")

        # You can choose multiple images per student
        for image_file in os.listdir(folder_path):
            img_path = os.path.join(folder_path, image_file)
            try:
                # Preprocess image
                img = preprocess_image(img_path)
                # Detect and encode face
                face_locations = face_recognition.face_locations(img)
                if len(face_locations) == 0:
                    print(f"No face detected in {img_path}")
                    continue
                face_encoding = face_recognition.face_encodings(img, face_locations)[0]
                embeddings[student_folder] = face_encoding
            except Exception as e:
                print(f"Error encoding {img_path}: {e}")

    # Save updated embeddings
    save_embeddings(embeddings, EMBEDDINGS_PATH)
    print("All faces encoded and saved successfully!")

if __name__ == "__main__":
    encode_faces()

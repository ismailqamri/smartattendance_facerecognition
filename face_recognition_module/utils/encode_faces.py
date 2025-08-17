import os
import face_recognition
from utils.preprocess import preprocess_image
from utils.helpers import load_embeddings, save_embeddings

# Paths
DATASET_DIR = './dataset/'                 # Each student has a folder with images
EMBEDDINGS_PATH = './models/face_encodings.pkl'

def encode_faces():
    """
    Encode all faces in the dataset and update embeddings file.
    """
    embeddings = load_embeddings(EMBEDDINGS_PATH)

    # Loop through each student folder
    for student_id in os.listdir(DATASET_DIR):
        student_folder = os.path.join(DATASET_DIR, student_id)
        if not os.path.isdir(student_folder):
            continue

        print(f"Encoding faces for student: {student_id}")

        # Loop through images of the student
        for image_file in os.listdir(student_folder):
            img_path = os.path.join(student_folder, image_file)
            try:
                # Preprocess the image
                img = preprocess_image(img_path)
                # Detect face
                face_locations = face_recognition.face_locations(img)
                if len(face_locations) == 0:
                    print(f"No face detected in {img_path}")
                    continue
                # Encode face (take the first detected face)
                face_encoding = face_recognition.face_encodings(img, face_locations)[0]
                # Update embeddings dictionary (overwrites old embedding if exists)
                embeddings[student_id] = face_encoding
            except Exception as e:
                print(f"Error processing {img_path}: {e}")

    # Save all embeddings
    save_embeddings(embeddings, EMBEDDINGS_PATH)
    print("All faces encoded and saved successfully!")

if __name__ == "__main__":
    encode_faces()

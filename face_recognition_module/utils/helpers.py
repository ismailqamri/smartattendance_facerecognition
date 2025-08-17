import pickle
import numpy as np
from scipy.spatial.distance import euclidean

# ---------------------------
# Embeddings Storage
# ---------------------------

def save_embeddings(embeddings, path):
    """
    Save embeddings dictionary to a file using pickle.
    embeddings: dict {student_id: embedding_vector}
    path: file path to save the pickle
    """
    with open(path, 'wb') as f:
        pickle.dump(embeddings, f)
    print(f"Embeddings saved to {path}")


def load_embeddings(path):
    """
    Load embeddings dictionary from a pickle file.
    Returns empty dict if file doesn't exist.
    """
    try:
        with open(path, 'rb') as f:
            embeddings = pickle.load(f)
        return embeddings
    except FileNotFoundError:
        return {}


# ---------------------------
# Face Matching
# ---------------------------

def find_match(face_encoding, embeddings, threshold=0.5):
    """
    Compare detected face encoding with stored embeddings.
    Returns student_id if match found, else None.

    face_encoding: np.array of detected face
    embeddings: dict {student_id: embedding_vector}
    threshold: distance threshold to consider a match
    """
    min_distance = float('inf')
    matched_student = None

    for student_id, stored_embedding in embeddings.items():
        dist = euclidean(face_encoding, stored_embedding)
        if dist < min_distance:
            min_distance = dist
            matched_student = student_id

    if min_distance <= threshold:
        return matched_student
    else:
        return None

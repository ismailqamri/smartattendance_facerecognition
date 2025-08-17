import cv2
import numpy as np

def preprocess_image(image_path, target_size=(160, 160)):
    """
    Load an image from disk, convert to RGB, resize, and normalize.

    Args:
        image_path (str): Path to the image file.
        target_size (tuple): Target size for resizing (width, height).

    Returns:
        np.ndarray: Preprocessed image array ready for face recognition.
    """
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Image not found: {image_path}")

    # Convert BGR (OpenCV default) to RGB
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Resize to target size
    img_resized = cv2.resize(img_rgb, target_size)

    # Normalize pixel values to range [0, 1]
    img_normalized = img_resized / 255.0

    return img_normalized


def preprocess_frame(frame, target_size=(160, 160)):
    """
    Preprocess a frame from a webcam (numpy array).
    Resize, convert to RGB, normalize.
    """
    # Convert BGR to RGB
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Resize
    frame_resized = cv2.resize(frame_rgb, target_size)

    # Normalize
    frame_normalized = frame_resized / 255.0

    return frame_normalized

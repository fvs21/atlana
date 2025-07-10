import hashlib
import os

def generate_state_token() -> str:
    return hashlib.sha256(os.urandom(1024)).hexdigest()
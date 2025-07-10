import hashlib
import os
from typing import Dict
from attrs import define
import jwt

def generate_state_token() -> str:
    return hashlib.sha256(os.urandom(1024)).hexdigest()

@define
class GoogleAccessTokens:
    id_token: str
    access_token: str

    def decode_id_token(self) -> Dict[str, str]:
        id_token = self.id_token

        return jwt.decode(jwt=id_token, options={"verify_signature": False})
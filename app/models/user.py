from .db import db, likes, following
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    profile_pic_url = db.Column(db.String)
    bio = db.Column(db.String(500))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    #relationships
    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    user_likes = db.relationship("Post", back_populates="post_likes", secondary=likes, cascade="all, delete")
    followers = db.relationship(
        "User",
        secondary= following,
        primaryjoin=(following.c.followers_id == id),
        secondaryjoin= (following.c.following_id == id),
        backref=db.backref('following', lazy='dynamic'),
        lazy= 'dynamic'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "profilePicUrl": self.profile_pic_url,
            "bio": self.bio,
            "numPosts": len(self.posts),
            # we dont need numFollowing & numFollowers=> directly query from following table,
        }

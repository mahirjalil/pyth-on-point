from application import app, db
from flask import Blueprint
from application.controllers.packingListController import *

user_routes = Blueprint("packing_routes", __name__)
import mysql.connector.pooling
from .config import settings

db_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="ai_pool",
    pool_size=5,
    host=settings.db_host,
    user=settings.db_user,
    password=settings.db_password,
    database=settings.db_name
)
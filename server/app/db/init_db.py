from app.db.base import Base
from app.db.session import engine

# Import ALL models so SQLAlchemy registers them
from app.features.users import models as users_models
from app.features.servers import models as servers_models
from app.features.channels import models as channels_models
from app.features.messages import models as messages_models


def init_db():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()
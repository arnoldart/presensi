"""empty message

Revision ID: 32fd23caa39e
Revises: 70ae4c3010f7
Create Date: 2023-12-16 15:43:19.149121

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '32fd23caa39e'
down_revision = '70ae4c3010f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('nama', sa.String(length=80), nullable=False))
        batch_op.create_unique_constraint(None, ['nama'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('nama')

    # ### end Alembic commands ###

# Generated by Django 4.0.5 on 2022-06-30 07:36

from django.conf import settings
import django.contrib.postgres.indexes
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth_service', '0002_alter_user_full_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('place_name', models.CharField(db_index=True, max_length=200)),
                ('state_name', models.CharField(db_index=True, max_length=100)),
                ('postal_code', models.CharField(db_index=True, max_length=100)),
            ],
        ),
        migrations.AddIndex(
            model_name='useraddress',
            index=django.contrib.postgres.indexes.BTreeIndex(fields=['user_id', 'state_name', 'postal_code'], fillfactor=30, name='auth_servic_user_id_df7bd3_btree'),
        ),
    ]
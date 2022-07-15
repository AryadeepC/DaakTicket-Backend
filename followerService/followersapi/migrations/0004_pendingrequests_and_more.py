# Generated by Django 4.0.5 on 2022-07-14 06:58

import django.contrib.postgres.indexes
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('followersapi', '0003_followers_followersap_user_id_62ca1e_btree'),
    ]

    operations = [
        migrations.CreateModel(
            name='PendingRequests',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=10)),
                ('req_user_id', models.CharField(max_length=10)),
            ],
        ),
        migrations.RemoveIndex(
            model_name='followers',
            name='followersap_user_id_62ca1e_btree',
        ),
        migrations.AddIndex(
            model_name='followers',
            index=django.contrib.postgres.indexes.BTreeIndex(fields=['user_id', 'following_id', 'id'], fillfactor=80, name='followersap_user_id_62ca1e_btree'),
        ),
        migrations.AddIndex(
            model_name='pendingrequests',
            index=django.contrib.postgres.indexes.BTreeIndex(fields=['user_id', 'req_user_id', 'id'], fillfactor=50, name='followersap_user_id_ff1e75_btree'),
        ),
    ]
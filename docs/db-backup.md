# Database Backup & Restore

This guide explains how to backup and restore your PostgreSQL database using the provided scripts. The backup system uses PostgreSQL's native `pg_dump` and `pg_restore` utilities, executed inside the Docker container to avoid requiring local PostgreSQL client installation.

## Overview

The project includes two scripts for database operations:

- **`scripts/pg-dump-local-db.sh`** - Creates a backup of the local database
- **`scripts/pg-restore-backup.sh`** - Restores a backup to local or remote databases

Both scripts use the PostgreSQL utilities inside the Docker container, so you don't need `pg_dump` or `pg_restore` installed locally.

## Prerequisites & Setup

Before performing backup or restore operations, ensure the following:

### 1. Docker Container Running

The PostgreSQL container must be running. Start it with:

```bash
# Using npm script
pnpm start:postgres

# Or directly with docker compose
docker compose up -d
```

Verify the container is running:

```bash
docker ps | grep payload-playground-db-dev
```

### 2. Environment Variables

Your `.env` file must contain the following required variables:

```env
DATABASE_NAME=db_payload_dev
DATABASE_USERNAME=payload_db_user
DATABASE_PASSWORD=payload_db_pw
```

Optional variables (with defaults):

```env
# Container name (defaults to payload-playground-db-dev)
DATABASE_CONTAINER_NAME=payload-playground-db-dev

# Backup directory (defaults to ./db-backup)
BACKUP_DIR=./db-backup
```

For more information about environment variables, see [Environment Variables](./environment-variables.md).

### 3. Docker Volume Mount

Ensure `docker-compose.yml` includes the backup directory mount:

```yaml
volumes:
  - ./db-backup:/db-backup
```

This allows the container to access the backup directory on the host machine.

## Backup Local Database

Create a backup of your local database using the dump script.

### Using npm Script

```bash
pnpm db:dump:local
```

### Using Script Directly

```bash
bash ./scripts/pg-dump-local-db.sh .env
```

### How It Works

1. The script reads database credentials from your `.env` file
2. Executes `pg_dump` inside the Docker container
3. Creates a compressed backup file in custom format (`.dump`)
4. Saves the file to `./db-backup/` directory on the host

### Output

The backup file is saved with a timestamped filename:

```
./db-backup/{DATABASE_NAME}_{YYYYMMDD}_{HHMMSS}.dump
```

**Example:**

```
./db-backup/db_payload_dev_20241215_143022.dump
```

### Example Output

```bash
$ pnpm db:dump:local

Using:
  CONTAINER_NAME=payload-playground-db-dev
  DB_NAME=db_payload_dev
  DB_USER=payload_db_user
  BACKUP_DIR=./db-backup

==> Exporting DB 'db_payload_dev' from container 'payload-playground-db-dev' ...
    Writing to host: /Users/magnus/Dev/payload-playground/db-backup/db_payload_dev_20241215_143022.dump

✅ Done. Dump written to: /Users/magnus/Dev/payload-playground/db-backup/db_payload_dev_20241215_143022.dump
```

### Backup Format

The backup uses PostgreSQL's custom format (`-Fc`), which provides:

- **Compression**: Smaller file sizes
- **Selective restore**: Restore specific tables or schemas
- **Parallel restore**: Faster restore with multiple jobs
- **No owner/ACL**: Excludes ownership and access control lists for portability

## Restore to Local Database

Restore a backup to your local database using the restore script.

### Using npm Script

```bash
pnpm db:restore
```

### Using Script Directly

```bash
bash ./scripts/pg-restore-backup.sh
```

### Interactive Prompts

The script will prompt you for:

1. **Dump file path**: 
   - Host path: `./db-backup/db_payload_dev_20241215_143022.dump`
   - Container path: `/db-backup/db_payload_dev_20241215_143022.dump`
   - Or just filename: `db_payload_dev_20241215_143022.dump` (assumes it's in `/db-backup`)

2. **Database URL**: 
   ```
   postgresql://payload_db_user:payload_db_pw@localhost:5432/db_payload_dev
   ```

### Example Session

```bash
$ pnpm db:restore

Dump file (host ./db-backup/... or container /db-backup/...): db_payload_dev_20241215_143022.dump
Postgres DB_URL (e.g. postgresql://user@host:5432/db?sslmode=require): postgresql://payload_db_user:payload_db_pw@localhost:5432/db_payload_dev

==> Restoring '/db-backup/db_payload_dev_20241215_143022.dump' into 'postgresql://payload_db_user:payload_db_pw@localhost:5432/db_payload_dev' ...
    container=payload-playground-db-dev
    jobs=4
    clean_flags='--clean --if-exists'

✅ Done. Restore completed.
```

### Restore Behavior

By default, the restore script:

- **Cleans existing data**: Uses `--clean --if-exists` flags to drop existing objects before restoring
- **Parallel restore**: Uses 4 parallel jobs (`-j 4`) for faster restore
- **No owner/ACL**: Excludes ownership and access control lists

### Customizing Restore

You can customize the restore behavior with environment variables:

```bash
# Merge data instead of cleaning (don't drop existing objects)
CLEAN_FLAGS="" pnpm db:restore

# Use more parallel jobs for faster restore
JOBS=8 pnpm db:restore

# Combine both
CLEAN_FLAGS="" JOBS=8 pnpm db:restore
```

## Restore to Server/Remote Database

You can restore a backup to a remote or production database using the same restore script.

### Using Script

```bash
bash ./scripts/pg-restore-backup.sh
```

### Interactive Prompts

The script will prompt you for:

1. **Dump file path**: Same as local restore
2. **Remote database URL**: 
   ```
   postgresql://user:password@host:port/database?sslmode=require
   ```

### Example Session

```bash
$ bash ./scripts/pg-restore-backup.sh

Dump file (host ./db-backup/... or container /db-backup/...): db_payload_dev_20241215_143022.dump
Postgres DB_URL (e.g. postgresql://user@host:5432/db?sslmode=require): postgresql://prod_user:secure_password@prod-db.example.com:5432/production_db?sslmode=require

==> Restoring '/db-backup/db_payload_dev_20241215_143022.dump' into 'postgresql://prod_user:secure_password@prod-db.example.com:5432/production_db?sslmode=require' ...
    container=payload-playground-db-dev
    jobs=4
    clean_flags='--clean --if-exists'

✅ Done. Restore completed.
```

### Security Considerations

When restoring to remote databases:

1. **Always use SSL**: Include `?sslmode=require` in the connection URL for encrypted connections
2. **Never commit credentials**: Database credentials should never be committed to version control
3. **Use environment variables**: Store sensitive credentials in environment variables or secure credential management systems
4. **Verify backups**: Test restore procedures on staging environments before production
5. **Backup before restore**: Always create a backup of the target database before restoring

### How Remote Restore Works

The restore script runs `pg_restore` inside your local Docker container, but connects to the remote database using the provided connection URL. This means:

- ✅ No need to install PostgreSQL client tools locally
- ✅ Uses the container's PostgreSQL utilities
- ✅ Secure connection to remote database
- ✅ Works with any PostgreSQL database (local or remote)

## Advanced Usage

### Custom Backup Directory

Set a custom backup directory in your `.env` file:

```env
BACKUP_DIR=/path/to/custom/backup/dir
```

### Custom Container Name

If you're using a different container name:

```env
DATABASE_CONTAINER_NAME=my-custom-db-container
```

### Passing Arguments

You can pass the dump file as an argument to skip the prompt:

```bash
bash ./scripts/pg-restore-backup.sh ./db-backup/my-backup.dump
```

### Using Environment Variables

Set `DB_URL` as an environment variable to skip the database URL prompt:

```bash
DB_URL=postgresql://user:password@host:5432/db?sslmode=require \
  bash ./scripts/pg-restore-backup.sh ./db-backup/my-backup.dump
```

### Parallel Restore

Increase the number of parallel jobs for faster restore:

```bash
JOBS=8 bash ./scripts/pg-restore-backup.sh
```

### Merge Restore (Don't Clean)

To merge data instead of dropping existing objects:

```bash
CLEAN_FLAGS="" bash ./scripts/pg-restore-backup.sh
```

**Warning**: Merging can cause conflicts if objects already exist. Use with caution.

## Troubleshooting

### Container Not Running

**Error:**
```
❌ Container not running: payload-playground-db-dev
   Start it with: docker compose up -d
```

**Solution:**
```bash
pnpm start:postgres
# or
docker compose up -d
```

### Missing Backup Directory Mount

**Error:**
```
❌ Container cannot access /db-backup.
   Add this to docker-compose volumes and restart:
     - ./db-backup:/db-backup
```

**Solution:**

1. Add the volume mount to `docker-compose.yml`:
   ```yaml
   volumes:
     - ./db-backup:/db-backup
   ```

2. Restart the container:
   ```bash
   docker compose down
   docker compose up -d
   ```

### Database Connection Errors

**Error:**
```
pg_restore: error: connection to database "..." failed: FATAL: password authentication failed
```

**Solutions:**

1. Verify database credentials in `.env` file
2. Check database URL format: `postgresql://user:password@host:port/database`
3. For remote databases, ensure SSL is enabled: `?sslmode=require`
4. Verify network connectivity to remote database
5. Check firewall rules if connecting to remote database

### File Not Found

**Error:**
```
❌ Dump file not found in container: /db-backup/my-backup.dump
   Tip: put the dump into ./db-backup on the host, then reference it here.
```

**Solutions:**

1. Verify the dump file exists in `./db-backup/` directory
2. Check file permissions
3. Ensure the volume mount is configured correctly
4. Use absolute path or relative path from project root

### Permission Issues

If you encounter permission errors:

1. Check file permissions on the backup directory:
   ```bash
   chmod 755 ./db-backup
   ```

2. Ensure Docker has access to the directory:
   ```bash
   ls -la ./db-backup
   ```

### Missing Environment Variables

**Error:**
```
❌ Missing DATABASE_NAME in .env
```

**Solution:**

Ensure your `.env` file contains all required variables:
- `DATABASE_NAME`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`

## Best Practices

### Regular Backups

1. **Schedule regular backups**: Set up automated backups for production databases
2. **Before major changes**: Always backup before schema migrations or data updates
3. **Before deployments**: Create a backup before deploying new versions

### Backup File Management

1. **Naming convention**: The script automatically uses timestamped names, but you can rename for clarity:
   ```bash
   mv db_payload_dev_20241215_143022.dump production_backup_20241215.dump
   ```

2. **Storage location**: Keep backups in a secure, version-controlled location (not in git)
3. **Retention policy**: Establish a retention policy (e.g., keep daily backups for 30 days, weekly for 3 months)

### Testing Restore Procedures

1. **Regular testing**: Periodically test restore procedures to ensure backups are valid
2. **Staging environment**: Test restores on staging before production
3. **Documentation**: Document your restore procedures and keep them updated

### Backup Verification

1. **Verify file creation**: Check that backup files are created successfully
2. **File size checks**: Monitor backup file sizes for anomalies
3. **Test restores**: Periodically restore backups to verify they work correctly

### Production Database Operations

**⚠️ Warning**: Restoring to production databases can cause data loss.

1. **Always backup first**: Create a backup of the production database before restoring
2. **Test in staging**: Test restore procedures in staging environment first
3. **Maintenance window**: Schedule production restores during maintenance windows
4. **Verify backups**: Ensure backup files are valid before restoring
5. **Rollback plan**: Have a rollback plan in case restore fails

### Security

1. **Encrypt backups**: Consider encrypting backup files for sensitive data
2. **Secure storage**: Store backups in secure locations with proper access controls
3. **Access control**: Limit access to backup files and restore scripts
4. **Audit logs**: Keep logs of backup and restore operations

## Related Documentation

- [Environment Variables](./environment-variables.md) - Database configuration
- [Getting Started](./getting-started.md) - Initial setup and database startup
- [Development Guide](./development.md) - Development practices
- [Deployment Guide](./deployment.md) - Production deployment

## Scripts Reference

### pg-dump-local-db.sh

**Location:** `scripts/pg-dump-local-db.sh`

**Usage:**
```bash
bash ./scripts/pg-dump-local-db.sh [.env]
```

**Environment Variables:**
- `DATABASE_NAME` (required)
- `DATABASE_USERNAME` (required)
- `DATABASE_PASSWORD` (required)
- `DATABASE_CONTAINER_NAME` (optional, defaults to `payload-playground-db-dev`)
- `BACKUP_DIR` (optional, defaults to `./db-backup`)

**Output:**
- Creates timestamped `.dump` file in `BACKUP_DIR`

### pg-restore-backup.sh

**Location:** `scripts/pg-restore-backup.sh`

**Usage:**
```bash
bash ./scripts/pg-restore-backup.sh [dump-file]
```

**Environment Variables:**
- `CONTAINER_NAME` (optional, defaults to `payload-playground-db-dev`)
- `JOBS` (optional, defaults to `4`)
- `CLEAN_FLAGS` (optional, defaults to `--clean --if-exists`)
- `DB_URL` (optional, can be provided to skip prompt)

**Interactive Prompts:**
- Dump file path
- Database connection URL

**Output:**
- Restores database from dump file

## Summary

This backup and restore system provides a simple, reliable way to manage your database backups:

- ✅ **Easy to use**: Simple npm scripts and clear prompts
- ✅ **No local dependencies**: Uses Docker container's PostgreSQL tools
- ✅ **Flexible**: Works with local and remote databases
- ✅ **Safe**: Includes warnings and best practices
- ✅ **Portable**: Backup files can be restored anywhere

For questions or issues, refer to the troubleshooting section or check the script source code for detailed implementation.

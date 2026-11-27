<div v-pre>

# File storage

oneCRM keeps attachments, email attachments, logos and profile photos on the server where it is installed.
You can keep them in an S3-compatible bucket instead, set up in **Settings → System → File storage**.

On a VPS or shared host, files are stored in `storage/app/` and nothing needs to be set up. Imports and data exports are working files and always stay on the server.

## Your own bucket

Any S3-compatible service works. There are presets for:

- Amazon S3
- Cloudflare R2
- Hetzner Object Storage
- DigitalOcean Spaces
- Backblaze B2
- Wasabi

For anything else, such as MinIO, choose **Other S3-compatible service** and enter its endpoint, region and whether it uses path-style URLs.

The bucket stays private. oneCRM serves every file itself, so the bucket needs no public access, no ACLs and no CORS rules.

### Create a bucket and an access key

1. In your provider's console, create a bucket. Keep public access blocked.
2. Create an access key that can use only this bucket. It needs to list the bucket and to read, write and delete objects in it. On Amazon S3, that is `s3:ListBucket` on the bucket and `s3:GetObject`, `s3:PutObject` and `s3:DeleteObject` on its objects.
3. Note the bucket's region. On Cloudflare R2 you need your account ID instead, and on Hetzner the location (`fsn1`, `nbg1` or `hel1`).

### Connect it

1. Open **Settings → System → File storage** and click **Connect your own bucket**.
2. Choose the provider, then enter the region (or account ID or location), the bucket name, the access key and the secret key.
3. Click **Connect**.

oneCRM first writes, reads and deletes a small test file. If any step fails, nothing is saved and the dialog shows what the bucket answered. Once connected, new files are stored in the bucket.

The secret key is stored encrypted and is never shown again. To rotate keys, click **Change keys**. To use a different bucket, disconnect this one first.

## Moving existing files

After you connect a bucket, or switch back to this server, the files stored before are moved for you. Until then they keep opening from where they are, and links to them keep working afterwards.

Files move in small batches while the File storage dialog stays open, with a progress bar. If you close the dialog, moving stops. Open it again and click **Move them to …** to continue where it stopped.

A file that was already missing before the move is reported, not copied.

## Switching back and disconnecting

- **Use this server** stores new files on this server again and moves the files in the bucket back. **Use this bucket** switches to the bucket again.
- **Disconnect** removes the bucket's settings.

> [!WARNING]
> **Files left in the bucket**
> If you disconnect while files are still in the bucket, they stop opening in oneCRM. They are not deleted: connect the same bucket again and they open again. To keep them, click **Use this server** and let the move finish before you disconnect.

## Storage set by the server

On platform hosting such as Laravel Cloud or Vapor, local files are lost on every redeploy and are not shared between servers. Set the storage in the platform's environment instead:

1. Attach **Laravel Object Storage** (or another S3-compatible bucket) to your environment.
2. Make sure `FILESYSTEM_DISK=s3` is set, together with the `AWS_*` variables of the bucket.
3. Do **not** add `php artisan storage:link` to your deploy commands.

The File storage dialog then shows that files are kept in the server's storage. You can still connect a bucket of your own there, which then takes over.

See the [installation guide](./installation.md#platform-deployments-laravel-cloud-vapor) for platform-specific notes.

To check where new files are kept, see the **File storage** line in the **Filesystem** section of **Platform Health**.


</div>

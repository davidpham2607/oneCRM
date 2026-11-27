<div v-pre>

# Updates & patches

This page explains how to update oneCRM and apply patches, either from the admin area or by uploading files manually.

> [!WARNING]
> **Always back up**
> Back up your files and database before updating.

New versions and patches are listed on **Settings → System → Update** (`/admin/settings/updater`) and in **Platform health**. When an important or critical fix is waiting, admins also see a notice at the top of the admin area.

## One-click update

### Requirements

| Requirement | Details |
|-------------|---------|
| PHP **zip** extension | Extracts the update archives |
| PHP **cURL** extension | Downloads releases. The server must allow outbound HTTPS connections |
| File permissions | All application files writable by the web server user |
| License | A saved license key and a [registered installation](./license.md) |

### License key

The key you entered during installation is already saved. To change it:

1. Copy the key from [**Account → Licenses**](https://onecrm.pages.dev/account/licenses) on onecrm.example.com, or from your order confirmation email.
2. In oneCRM, open **License** from the sidebar logo menu, or click **Open license** on the Update page.
3. Enter the key and click **Save license key**.

### Steps

1. Go to **Settings → System → Update**.
2. Apply the waiting [patches](./update.md#patches) first. The update button appears once they are applied.
3. Click **Update to** followed by the new version.
4. Wait for the update to finish. The site is briefly in maintenance mode. If a screen asks you to migrate the database or finalize the update, click its button.
5. Review **Platform health** (sidebar logo menu → **Debug** → **Platform health**) for warnings.

## Common update errors

| Problem | What to do |
|---------|------------|
| The license does not cover this installation | Open **License** from the sidebar logo menu to see why, then follow [License warnings](./license.md#license-warnings). |
| Invalid or missing license key | Copy the key again from [Account → Licenses](https://onecrm.pages.dev/account/licenses) and [save it](./update.md#license-key). |
| Support and update period expired | [Renew on onecrm.example.com](https://onecrm.pages.dev/account/licenses) to download new releases and patches. |
| PHP version too low for the release | Upgrade PHP with your host, then try again. |
| The release does not exist | Refresh the Update page and try again, or do a [manual update](./update.md#manual-update). |
| **Can't check for updates** | Your server cannot reach the update server. Ask your host to allow outbound HTTPS connections and check the PHP cURL extension. |
| Files could not be extracted, or permission errors | Free up disk space, set files to `644` and directories to `755`, and make them owned by the web server user. Then run the update again. |

## Manual update

Use a manual update when the one-click update is unavailable or fails. Read the [changelog](https://onecrm.pages.dev/changelog) first.

1. Download the latest release from [your licenses page](https://onecrm.pages.dev/account/licenses).
2. If you customized any of these files, delete them from the release archive so your versions are kept:
   - `public/.htaccess`
   - `public/web.config`
   - `public/robots.txt`
   - `public/favicon.ico`
3. Click **Clear optimize** in Platform health, or delete the files in `bootstrap/cache/` except `.gitignore`.
4. Upload all files from the release archive over your existing installation.
5. Open your CRM URL. If a screen asks you to migrate the database or finalize the update, click its button.
6. Click **Run optimize** in Platform health.

## Patches

Patches are small fixes released between versions. Like updates, they need an active update period on your license.

To apply them, go to **Settings → System → Update**. Click **Apply** on a patch in the **Patches** list, or the button that applies all waiting patches. Patches are applied in order, oldest first.

> [!NOTE]
> **Check patches when troubleshooting**
> If you hit a bug, check for patches first. The fix may already be available.

### Automatic patches

Critical patches are applied automatically. To apply every new patch automatically, set `AUTO_PATCH=true` in `.env`.

The [cron job](./cron.md) checks for patches twice a day. It waits until no user has been active for 30 minutes, and it needs a saved license key.

## CLI updates

If you have SSH access, you can update from the command line. Run the commands as the user that owns the files, not as root.

```bash
php artisan updater:update
php artisan migrate --force
php artisan updater:finalize
```

To apply patches, run `php artisan updater:patch`. It applies only critical patches unless [automatic patches](./update.md#automatic-patches) are on.

`updater:update` and `updater:patch` use the saved license key, or the one passed with `--key=`. They do nothing if a user was active in the last 30 minutes. Add `--force` to run anyway.

After a manual upload, run the last two commands to finish the update.


</div>

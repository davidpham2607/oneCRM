<div v-pre>

# Files and uploads

Every file your module keeps is stored as media on the record that owns it, so it follows the storage the administrator chose.
That is the server's disk or the bucket connected in [Settings → System → File storage](../file-storage.md). Your module never names a disk, keeps a file path in a column, or adds a route to serve a file.

## A model that holds files

The model implements Spatie's `HasMedia` contract and uses Core's `HasMedia` trait:

```php
use Modules\Core\Media\HasMedia;
use Modules\Core\Models\Model;
use Spatie\MediaLibrary\HasMedia as HasMediaContract;

class Contract extends Model implements HasMediaContract
{
    use HasMedia;
}
```

Delete a record that holds files through its model (`$contract->delete()`). A database cascade or a query delete removes the rows and leaves the files behind.

## Files users attach

For files staff attach to a record, add the `Attachments` [record feature](./module-definition.md#features). It brings the upload area, the file list and the permissions with it. Attach from code with:

```php
use Modules\Core\Models\Media;

Media::attachTo($contract, $request->file('file'));
```

## Files with a role

A file that has a job, such as an uploaded source PDF, a signed copy or a cover image, goes in a named collection of its model. `singleFile()` keeps one file and replaces it on the next upload:

```php
public function registerMediaCollections(): void
{
    $this->addMediaCollection('signed-copy')->singleFile();
}
```

```php
$contract->addMedia($request->file('pdf'))->toMediaCollection('signed-copy');
$contract->addMediaFromString($output)->usingFileName('contract.pdf')->toMediaCollection('signed-copy');

$signedCopy = $contract->getFirstMedia('signed-copy');
```

## Validating uploads

Use the application's upload limit instead of a number of your own. Your limit may be lower, never higher:

```php
use Modules\Core\Models\Media;

$this->validate(Media::uploadRules('uploads'));              // an array of files

$request->validate([
    'pdf' => ['required', 'file', 'mimes:pdf', 'max:'.Media::maxUploadKilobytes()],
]);
```

## Reading a file

Read through the media, which works the same on the server's disk and in a bucket:

| Call | Gives |
|------|-------|
| `$media->contents()` | The file's bytes |
| `$media->localPath()` | A path on the server, for code that needs one (a scanner, a PDF library, a zip) |
| `$media->copy($record, 'collection')` | A copy of the file owned by another record |

## Who may open a file

Link a file with `$media->getUrl()`. For a [public file](./files-and-uploads.md#public-files) that is its permanent link. For any other file the link is signed and opens for whoever holds it until the end of the next day, so show it only to someone who may see the file.

Without a signature, the record decides. The default lets admin users who may `view` the record open its files. Override `canViewMedia()` when that is the wrong answer: the model has no `view` policy, or its files are for other people. The viewer is an admin user, a signed-in portal contact, or `null` when nobody is signed in.

```php
use Illuminate\Contracts\Auth\Authenticatable;
use Modules\Core\Models\Media;

public function canViewMedia(Media $media, ?Authenticatable $viewer): bool
{
    return $viewer !== null && $this->room->hasMember($viewer);
}
```

A viewer the application does not sign in, such as a chat visitor identified by a token, gets signed links.

## Public files

A public file opens for anyone and has a permanent link. There are two ways to make one.

The record makes a group of its files public by returning `true` for them when nobody is signed in:

```php
public function canViewMedia(Media $media, ?Authenticatable $viewer): bool
{
    return $media->collection_name === 'cover' || ($viewer instanceof User && $viewer->can('view', $this));
}
```

One file is set on its own, and that setting comes before what its record answers:

```php
$media->makePublic();    // anyone opens it
$media->makePrivate();   // never public, even where the record lets anyone
$media->isPublic();
$media->getUrl();        // the permanent link while the file is public
```

A copy of a file does not take that setting along.

HTML that links files, such as rich text you render yourself, gets working links from `MediaLinks`. Editor content already has them.

```php
use Modules\Core\Media\MediaLinks;

$html = MediaLinks::from($html)->signed();      // shown inside the application
$html = MediaLinks::from($html)->published();   // an email or a public page: each file's getUrl()
```

Any file type can be public. Images (except SVG), PDF, video, audio and plain text show in the browser; every other type downloads.

## Working files

Files your code deletes when its job ends, such as an import upload, an export zip or an extracted archive, are not media. Keep them on the server, on the `local` disk or under `storage_path()`, in a folder named after your module.

## See also

- [Notifications and mail](./notifications-and-mail.md) for images in emails


</div>

# reCaptcha

<div v-pre>


Google reCaptcha protects oneCRM login and public forms from bots and spam.
Once your keys are saved, reCaptcha checks visitors in the background on:

- The staff login page
- [Web forms](../usage/web-forms.md) (leads and tickets) that have **Spam protected (reCAPTCHA)** turned on
- The public privacy request form

Configure reCaptcha in **Settings → Security and privacy → reCaptcha**. Only super admins can see this setting.

## Create reCaptcha keys

1. Open the [Google reCaptcha admin](https://www.google.com/recaptcha/admin) and click **Create**.
2. Enter a label, for example **oneCRM**.
3. Choose **reCAPTCHA v2 → Invisible reCAPTCHA badge**. Keys for reCAPTCHA v3 will not work.
4. Add your domain, for example `your-domain.com`.
5. Accept the terms, submit, and copy the **Site Key** and **Secret Key**.

## Add keys in oneCRM

1. Open **Settings → Security and privacy → reCaptcha**.
2. Paste the **Site key** and **Secret key**.
3. Optional: in **Ignored IP addresses**, enter comma-separated IP addresses that skip the check, such as your office network.
4. Click **Save**.

reCaptcha shows as **Configured** once both keys are saved.

> [!WARNING]
> **Test without locking yourself out**
> Wrong keys can block login. Keep your current session open and log in from an **Incognito** or **Private** window. If login fails, fix the keys in your original window, or clear both keys and save to turn reCaptcha off.


</div>
